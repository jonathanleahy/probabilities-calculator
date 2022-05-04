namespace server.ProbilitiesCalc;

public interface IProbabilities
{
    string Name();

    bool Validate(string toCheck, string validation);

    double Calc(double a, double b);

}