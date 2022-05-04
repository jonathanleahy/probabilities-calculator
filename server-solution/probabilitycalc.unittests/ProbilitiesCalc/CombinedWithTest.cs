using server.ProbilitiesCalc;
using Xunit;

namespace probabilitycalc.unittests;

public class CombinedWithTest
{

    [Fact]
    public void Get_Name()
    {
        var sut = new CombinedWith();
        var name = sut.Name();
        Assert.Equal("combined", name);
    }

    [Fact]
    public void Get_Calc()
    {
        var sut = new CombinedWith();
        var result = sut.Calc(0.5, 0.5);
        Assert.Equal(0.25, result);
    }

}