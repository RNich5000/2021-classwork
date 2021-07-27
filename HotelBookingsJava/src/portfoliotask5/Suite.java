package portfoliotask5;

/**
 *
 * @author Rob Nicholls
 */
public class Suite extends HotelRoom
{

    /**
     * 
     * @param roomNum Room number from user input, rate calculated accordingly
     */
    public Suite(int roomNum)
    {
        // rate seems to need tobe initialised so that it can be calculated 
        // with calcRate() and increaseRate()
        super(roomNum);
        this.rate = super.calcRate(roomNum);
        super.increaseRate();
    }
    
    @Override
    public String toString()
    {
        return "Suite " + super.roomNum +", $" + this.rate + " per night";
    }
}
