namespace server.ProbilitiesCalc;

public class ProbabilitiesCalculationFactory
{
    
    public string[] Available()
    {
        string[] cars = {"Either", "CombinedWith"};
        return cars;
    }

    public IProbabilities getCalculation(string calcType)
    {
        switch (calcType)
        {
            case "Either": 
                return new Either();
            case "CombinedWith":
                return new CombinedWith();
            default:
                throw new ApplicationException(string.Format("Calculation '{0}' cannot be created", calcType));
        }
    }
}