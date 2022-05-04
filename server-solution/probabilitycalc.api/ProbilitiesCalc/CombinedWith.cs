namespace server.ProbilitiesCalc;

public class CombinedWith : IProbabilities
{

    public string Name()
    {
        return "combined";
    }

    public bool Validate(string toCheck, string validation)
    {
        return false;
    }
    
    public double Calc(double a, double b)
    {
        return a * b;
    }

}