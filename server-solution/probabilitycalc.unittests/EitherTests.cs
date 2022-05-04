using server.ProbilitiesCalc;
using Xunit;

namespace probabilitycalc.unittests;

public class EitherTests
{

    [Fact]
    public void Get_Name()
    {
        // 0 - add to setup
        var sut = new Either();
        var name = sut.Name();
        Assert.Equal("either", name);
    }

    [Fact]
    public void Get_Validate_A()
    {
        var sut = new Either();
        var result = sut.Calc(0.5, 0.5);
        Assert.Equal(0.75, result);
    }

    [Fact]
    public void Get_Calc()
    {
        var sut = new Either();
        var result = sut.Calc(0.5, 0.5);
        Assert.Equal(0.75, result);
    }

}