package portfoliotask5;

/**
 *
 * @author Rob Nicholls
 * 
 */
public class HotelRoom
{
    protected int roomNum;
    protected double rate;

    /**
     * 
     * @param roomNum The number of the HotelRoom
     */
    public HotelRoom(int roomNum)
    {
        this.roomNum = roomNum;
        this.rate = calcRate(this.roomNum);
    }

    /**
     * 
     * @return int Room number
     */
    public int getRoomNum()
    {
        return roomNum;
    }

    /**
     * 
     * @return double Nightly rate for the HotelRoom
     */
    public double getRate()
    {
        return rate;
    }

    /**
     * 
     * @return String Provides information about the HotelRoom
     */
    @Override
    public String toString()
    {
        return "Room " + this.roomNum + ", $" + this.rate + " per night";
    }
    
    /**
     * 
     * @param roomNum Room number
     * @return double Nightly rate, based on room number
     */
    public double calcRate(int roomNum)
    {
        // calculates the rental rate of the room, based on the room number
        double roomRate;
        
        if (roomNum <= 299)
            roomRate = 69.95;
        else
            roomRate = 89.95;
        
        return roomRate;
    }
    
    public void increaseRate()
    {
        calcRate(this.roomNum);
        this.rate += 40;
    }
    
}
