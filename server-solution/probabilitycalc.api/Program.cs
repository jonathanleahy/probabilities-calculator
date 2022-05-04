using System.Text.Json;
using server.ProbilitiesCalc;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapGet("/calc/available", () =>
{
    // into usecase
    string[] available = (new ProbabilitiesCalculationFactory()).Available();
    return JsonSerializer.Serialize(available);
});

// variable parameters?
app.MapGet("/calc", async (
    double? a,
    double? b,
    string? calcname
) =>
{
    // a Into Usecase

    // 1 DTO
    double aA = a ?? 3;
    double bB = b ?? 2;
    string cCalc = calcname ?? "";

    // 2 validation!!!!!!!!!!!!!!1

    Thread.Sleep(500);

    // 3 too complicated
    IProbabilities eng = (new ProbabilitiesCalculationFactory()).getCalculation(cCalc);

    // 4 pass variable variables
    double engResult = eng.Calc(aA, bB);

    var myData = new
    {
        a = aA,
        b = bB,
        type = cCalc,
        result = engResult
    };

    // 99 - Trim to a specific length
    
    // 5 log it to file

    // 6 Tranform it to Json object
    string jsonData = JsonSerializer.Serialize(myData);

    // 7 status with the .OK()
    // 8 status with errors()

    return jsonData;
});

app.Run();
