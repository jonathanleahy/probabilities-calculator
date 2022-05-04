namespace server.ProbilitiesCalc;

public class Either : IProbabilities
{

    public string Name()
    {
        return "Either";
    }
    
    public double Calc(double a, double b)
    {
        return a * b;
    }

}