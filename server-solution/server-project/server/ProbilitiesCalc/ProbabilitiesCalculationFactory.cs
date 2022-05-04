namespace server.ProbilitiesCalc;

public class ProbabilitiesCalculationFactory
{
    
    public string[] Available()
    {
        string[] cars = {"either", "combined"};
        return cars;
    }

    public IProbabilities getCalculation(string calcType)
    {
        switch (calcType)
        {
            case "either": 
                return new Either();
            case "combined":
                return new Combined();
            default:
                throw new ApplicationException(string.Format("Vehicle '{0}' cannot be created", calcType));
        }
    }
}