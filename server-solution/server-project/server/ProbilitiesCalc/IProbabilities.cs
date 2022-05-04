namespace server.ProbilitiesCalc;

public interface IProbabilities
{
    string Name();

    double Calc(double a, double b);

}