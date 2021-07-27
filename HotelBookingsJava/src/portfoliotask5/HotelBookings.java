package portfoliotask5;

import java.util.ArrayList;
import java.util.Collections;
import javax.swing.JOptionPane;

/**
 *
 * @author Rob Nicholls
 * @version 1.0 (completed 09/06/2021)
 */
public class HotelBookings
{
    public static void main(String[] args)
    {
        ArrayList<HotelRoom> bookings = new ArrayList<>();
        
        // the below bookings can be added to assist testing
        /*
        HotelRoom room1 = new HotelRoom(125);
        HotelRoom room2 = new HotelRoom(400);
        Suite suite1 = new Suite(199);
        Suite suite2 = new Suite(250);
        HotelRoom room3 = new HotelRoom(20);
        Suite suite3 = new Suite(401);
        
        bookings.add(room1);
        bookings.add(room2);
        bookings.add(suite1);
        bookings.add(suite2);
        bookings.add(room3);
        bookings.add(suite3);
        */
        
        // keeps displaying the menu until "4" is selected to exit the program
        String input;
        do{
            input = displayMenu();
            
            switch(input)
            {
                case "1":
                    chooseRoomType(bookings);
                    break;
                case "2":
                    displayRates();
                    break;
                case "3":
                    displayAllBookings(bookings);
                    break;
                case "4":
                    // break loop, quit program
                    break;
                default:
                    JOptionPane.showMessageDialog(null,
                            "Invalid input. Please enter a number 1-4.");
                    
            }
        }while(!input.equals("4"));
    }
    
    /**
     * 
     * @return String
     */
    public static String displayMenu()
    {
        String str = "";
        str += "--HOTEL RENTAL SYSTEM--";
        str += "\n\n1. Choose a room type";
        str += "\n2. Room rates information";
        str += "\n3. Rooms currently booked";
        str += "\n\n4. Exit";
        
        return JOptionPane.showInputDialog(null, str);
    }
    
    /**
     * 
     * @param bookings The bookings ArrayList to be used in HotelRoom initialisation
     */
    public static void chooseRoomType(ArrayList<HotelRoom> bookings)
    {
        String str = "", input;
        boolean validRoomType = false;
        str += "1. Normal Hotel room";
        str += "\n2. Suite";
        str += "\n\nChoose room type:";
        
        
        do{
            input = JOptionPane.showInputDialog(null, str);
            
            // basic validation to make sure input is 1 or 2
            if (input.equals("1") || input.equals("2"))
                validRoomType = true;
            else
                JOptionPane.showMessageDialog(null,
                        "Invalid room type! Please enter 1 for a normal room, or 2 for a suite.");
            
        }while (!validRoomType);
        enterRoomNumber(bookings, input);
    }
    
    /**
     * 
     * @param bookings To be used in HotelRoom initialisation
     * @param type Type of room to be added
     */
    public static void enterRoomNumber(ArrayList<HotelRoom> bookings, String type)
    {
        String str = "", strInput;
        int input = -1;
        boolean validRoomNumber = false;
        
        str += "Enter room number";
        
        do{
            strInput = JOptionPane.showInputDialog(null, str);
            
            // if this code isn't here, you can't get out of this method
            // until you enter a valid number - can't quit the program!
            if (strInput == null)
                break;
            
            // stops the program from breaking if a person enters anything that
            // isn't a number... this is probably more like validation than
            // exception handling but I thought it could be fun to try and
            // implement
            try
            {
                input = Integer.parseInt(strInput);

                // if input is in a valid range
                if (input > 0 && input <= 500)
                    validRoomNumber = true;
                else
                    JOptionPane.showMessageDialog(null,
                            "Invalid room number! Please choose from 1-500.");

                // checks if the room is already taken
                for (int i = 0; i < bookings.size(); i++)
                {
                    if (bookings.get(i).getRoomNum() == input)
                    {
                        validRoomNumber = false;
                        JOptionPane.showMessageDialog(null,
                                "That room is already booked. " +
                                        "Please choose another room");
                        // should only break out of the inner loop
                        break;
                    }

                }
            }
            catch(NumberFormatException n)
            {
                JOptionPane.showMessageDialog(null,
                        "Invalid room number! Please choose from 1-500.");
            }
        }while(!validRoomNumber);
        
        // creates either a HotelRoom or a Suite, depending on user selection
        // ... and another check that the room number is valid prevents the
        // program from creating a new room when strInput is null (causing the
        // try-catch block and while-loop to be skipped entirely)
        if (type.equals("1") && validRoomNumber)
            createHotelRoom(bookings, input);
        else if (type.equals("2") && validRoomNumber)
            createSuite(bookings, input);
    }
    
    /**
     * 
     * @param bookings ArrayList of bookings
     * @param roomNum Room number for the HotelRoom
     */
    public static void createHotelRoom(ArrayList<HotelRoom> bookings, int roomNum)
    {
        HotelRoom room = new HotelRoom(roomNum);
        
        bookings.add(room);
        
        displaySingleRoom(room);
    }
    
    /**
     * 
     * @param bookings ArrayList of bookings
     * @param roomNum Room number from the Suite
     */
    public static void createSuite(ArrayList<HotelRoom> bookings, int roomNum)
    {
        Suite room = new Suite(roomNum);
        bookings.add(room);
        displaySingleRoom(room);
    }
    
    /**
     * 
     * @param room HotelRoom or Suite to be displayed
     */
    public static void displaySingleRoom(HotelRoom room)
    {
        String str = "";
        str += "--Room Booked Out--";
        str += "\n\nRoom No. " + room.getRoomNum();
        str += "\nNightly Rate $" + room.getRate();
        
        JOptionPane.showMessageDialog(null, str);
    }
    
    /**
     * Displays the rates for the different rooms per night
     */
    public static void displayRates()
    {
        String str = "";
        str += "NIGHTLY ROOM RATES";
        str += "\n\nRooms number 1-299: $69.95";
        str += "\nAll other rooms are $89.95";
        str += "\n\nSuites have an extra $40 surchage applied";
        
        JOptionPane.showMessageDialog(null, str);
    }
    
    /**
     * 
     * @param bookings ArrayList of HotelRooms and Suites to be displayed
     */
    public static void displayAllBookings(ArrayList<HotelRoom> bookings)
    {
        // check out the instanceof keyword
        String roomStr = "";
        String suiteStr = "";
        String output = "";

        // I was planning to sort the rooms by number, but I couldn't think
        // of an eloquent way of doing it in the amount of time available
        
        output += "ROOMS BOOKED";
        output += "\n\nNormal Rooms:";
        
        if (bookings.isEmpty())
        {
            JOptionPane.showMessageDialog(null,
                    "No rooms have been booked yet!");
        }
        else
        {
            //sorts the bookings by room number
            bubbleSort(bookings);
            
            for (int i = 0; i < bookings.size(); i++)
            {
                if (bookings.get(i) instanceof Suite)
                    suiteStr += "\n" + bookings.get(i).toString();
                else
                    roomStr += "\n" + bookings.get(i).toString();
            }
            
            output += roomStr;
            output += "\n\nSuites:";
            output += suiteStr;
            
            JOptionPane.showMessageDialog(null, output);
        }
    }
    
    /**
     * 
     * @param bookings ArrayList to be sorted into order based on room number
     */
    public static void bubbleSort(ArrayList<HotelRoom> bookings)
    {
        for (int i = 0; i < bookings.size() - 1; i++)
        {
            for (int j = 0; j < bookings.size() - 1 - i; j++)
            {
                if (bookings.get(j).getRoomNum() > bookings.get(j+1).getRoomNum())
                {
                    // I'm very glad I found this method!
                    // Credit to https://howtodoinjava.com/java/collections/arraylist/swap-two-elements-arraylist/
                    Collections.swap(bookings, j, j+1);
                }
            }
        }
    }

}
