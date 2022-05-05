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
    // 0. into usecase
    string[] available = (new ProbabilitiesCalculationFactory()).Available();
    return JsonSerializer.Serialize(available);
});

app.MapGet("/calc", async (
    double? aIn,
    double? bIn,
    string? calcnameIn
) =>
{
    // 1. into usecase

    // 2. use dto
    double a = aIn ?? 3;
    double b = bIn ?? 2;
    string calcname = calcnameIn ?? "";

    // 3. add validation

    IProbabilities eng = (new ProbabilitiesCalculationFactory()).getCalculation(calcname);
    double engResult = eng.Calc(a, b);

    var myData = new
    {
        a = a,
        b = b,
        type = calcname,
        result = engResult
    };

    // 4 log to file

    // 5 transform to json object
    string jsonData = JsonSerializer.Serialize(myData);

    // 6 status with the .OK()/ with errors()
    return jsonData;
});

app.Run();
