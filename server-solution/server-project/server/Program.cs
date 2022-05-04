using System.Text.Json;
using System.Text.Json.Nodes;
using server.ProbilitiesCalc;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy => { policy.WithOrigins("http://localhost:3000"); });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

// 0 get unit tests into project

// variable parameters?
app.MapGet("/calc", async (
        double? a,
        double? b,
        string? calcType
    ) =>
    {
        // a Into Usecase
        
        // 1 DTO
        double aA = a ?? 3;
        double bB = b ?? 2;
        string cCalc = calcType ?? "combined";

        // 2 validation

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

        // 5 log it to file

        // 6 Tranform it to Json object
        string jsonData = JsonSerializer.Serialize(myData);

        // 7 status with the .OK()
        // 8 status with errors()

        return jsonData;
    }
);

app.MapGet("/logs", async () =>
    {
       
        
        // // read logs via DTO

        // // DTO

        Thread.Sleep(500);

        /*
        id
        userId
        date/time
        type of calc
        inputs
        result
        */

        // DTO
        var back = new
        {
            id = 1,
            userId = 1,
            date = "23423423",
            typeCalc = "ewrwe",
            inputs = "[1, 2]",
            result = 3
        };
        
        // add in the type of DTO
        var a = back;
        
        var myData = new
        {
            results = back
        };
        
        // Tranform it to Json object
        string jsonData = JsonSerializer.Serialize(myData);
        
        return jsonData;
    }
);

app.Run();