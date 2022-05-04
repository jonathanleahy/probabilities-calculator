namespace server.ProbilitiesCalc;

public class Combined : IProbabilities
{

    public string Name()
    {
        return "Combined";
    }
    public double Calc(double a, double b)
    {
        return a + b;
    }

}