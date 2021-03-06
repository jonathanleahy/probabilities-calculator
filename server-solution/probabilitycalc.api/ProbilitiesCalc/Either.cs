namespace server.ProbilitiesCalc;

public class Either : IProbabilities
{

    public string Name()
    {
        return "either";
    }

    public bool Validate(string toCheck, string validation)
    {
        return false;
    }

    public double Calc(double a, double b)
    {
        return a + b - a * b;
    }

}