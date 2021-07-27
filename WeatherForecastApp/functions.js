function xmlForecast()
{
    // city entered into the textbox
    let city = document.getElementById("txtXmlCity").value;

    let url = "", ending = "", windType = "";

    if($("#radXmlTempC").is(":checked"))
    {
        // creates the API link using the desired city
        // also sets measurement types to metric, imperial or standard (Kelvin)
        url = "http://api.openweathermap.org/data/2.5/forecast?mode=xml&units=metric&q=" + city + ",Au&cnt=40&appid=2d96b299f0267dc171aed189f11cb9b9";
        ending = "&deg;C";
        windType = "km/h";
    }
    else if ($("#radXmlTempF").is(":checked"))
    {
        url = "http://api.openweathermap.org/data/2.5/forecast?mode=xml&units=imperial&q=" + city + ",Au&cnt=40&appid=2d96b299f0267dc171aed189f11cb9b9";
        ending = "&deg;F";
        windType = "mph";
    }
    else
    {
        url = "http://api.openweathermap.org/data/2.5/forecast?mode=xml&q=" + city + ",Au&cnt=40&appid=2d96b299f0267dc171aed189f11cb9b9";
        ending = "&deg;K";
        windType = "m/s";
    }

    console.log("Loading from API: " + url);

    // performs the HTTP (Ajax) request
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(data)
        {
            console.log("1: " + data);
            let xmlData = $.parseXML(data);
            let xml = $(xmlData);
            console.log("2: " + xml);

            // sets the name of the city and times for today's sunrise and sunset
            document.getElementById("xmlCity").innerHTML = xml.find("name").text();
            document.getElementById("xmlSunrise").innerHTML = "Sunrise: " + getTheTime(xml.find("sun").attr("rise"), xml.find("timezone").text(), "xml");
            document.getElementById("xmlSunset").innerHTML = "Sunset: " + getTheTime(xml.find("sun").attr("set"), xml.find("timezone").text(), "xml");

            let str = "";
            // displays the weather conditions for that time period
            xml.find("time").each(function(i){
                // this treats the time node as an array, where i is the current index
                // a return statement acts as a 'continue' statement, skipping this iteration
                // and going to the next
                if (i % 8 != 7)
                    return;

                // listing the attributes as variables for better readability
                let currentTime = $(this).attr("from");
                let timezone = xml.find("timezone").text();
                let imgIcon = $(this).find("symbol").attr("var");
                let currentTemp = $(this).find("temperature").attr("value");
                let feelsLike = $(this).find("feels_like").attr("value");
                let description = $(this).find("symbol").attr("name");
                let windSpeed = $(this).find("windSpeed").attr("mps");
                let minTemp = $(this).find("temperature").attr("min");
                let maxTemp = $(this).find("temperature").attr("max");
                let humidity = $(this).find("humidity").attr("value");
                let cloudCover = $(this).find("clouds").attr("all");

                // converts m/s to km/h, a more common measurement for wind speed
                if ($("#radXmlTempC").is(":checked"))
                    windSpeed *= 3.6;

                str += "<container style='float: left; width: 18%; padding: 5px; border-style: none none none dashed; border-color: gray;'>";
                str += "<p>";
                str += "<div style='text-align: center'>"
                str += "<div style='font-weight: bold; color: darkblue'>";
                str += getTheDayName(currentTime, timezone, "xml") + "<br />";
                str += "</div>";
                str += getTheHour(currentTime, timezone, "xml") + "<br />";
                str += getTheDate(currentTime, timezone, "xml") + "<br />";
                str += "<img src='" + "http://openweathermap.org/img/w/" + imgIcon + ".png' /><br />";
                str += "<strong>Temperature: </strong>" + currentTemp + ending + "<br />";
                str += "<strong>Feels like: </strong>" + feelsLike + ending + "<br />";
                str += "<strong>Conditions: </strong>" + description + "<br />";
                str += "<strong>Wind speed: </strong>" + parseFloat(windSpeed).toFixed(2) + windType + "<br />";
                // the min and max temperatures don't seem realistic, 
                // but they correctly reflect the values in the data
                str += "<strong>Min: </strong>" + minTemp + ending + "<br />";
                str += "<strong>Max: </strong>" + maxTemp + ending + "<br />";
                str += "<strong>Humidity: </strong>" + humidity + "%<br />";
                str += "<strong>Cloud Coverage: </strong>" + cloudCover + "%<br />";
                str += "</div></p></container>";
            });
            

            document.getElementById("xmlResults").innerHTML = str;

            $("#xmlResultsSection").css('display', 'block');
            
        },
        error: function(){
            console.log("There was an error with the call...");
        }
    });
}

function jsonForecast()
{
    let city = document.getElementById("txtJsonCity").value;

    let url = "", ending = "", windType = "";

    if($("#radJsonTempC").is(":checked"))
    {
        url = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=metric&q=" + city + ",Au&cnt=40&appid=2d96b299f0267dc171aed189f11cb9b9";
        ending = "&deg;C";
        windType = "km/h";
    }
    else if ($("#radJsonTempF").is(":checked"))
    {
        url = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=imperial&q=" + city + ",Au&cnt=40&appid=2d96b299f0267dc171aed189f11cb9b9";
        ending = "&deg;F";
        windType = "mph";
    }
    else
    {
        url = "http://api.openweathermap.org/data/2.5/forecast?mode=json&q=" + city + ",Au&cnt=40&appid=2d96b299f0267dc171aed189f11cb9b9";
        ending = "&deg;K";
        windType = "m/s";
    }

    console.log("Loading from API: " + url);

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function(data)
        {
            console.log("1: " + data);
            
            // sets the name of the city, today's sunrise and sunset
            document.getElementById("jsonCity").innerHTML = data.city.name;
            document.getElementById("jsonSunrise").innerHTML = "Sunrise: " + getTheTime(data.city.sunrise, data.city.timezone, "json");
            document.getElementById("jsonSunset").innerHTML = "Sunset: " + getTheTime(data.city.sunset, data.city.timezone, "json");
            
            let str = "";

            // displays the weather conditions for that time period
            // the for-loop only generates every 8th set of data
            // (much more efficient than displaying every 8th set of data)
            for (let i = 7; i < data.list.length; i+=8)
            {
                // list of all the json attributes needed
                // makes for easier reading of the code underneath
                let currentTime = data.list[i].dt;
                let timezone = data.city.timezone;
                let imgIcon = data.list[i].weather[0].icon;
                let currentTemp = data.list[i].main.temp;
                let feelsLike = data.list[i].main.feels_like;
                let description = data.list[i].weather[0].description;
                let windSpeed = data.list[i].wind.speed;
                let minTemp = data.list[i].main.temp_min;
                let maxTemp = data.list[i].main.temp_max;
                let humidity = data.list[i].main.humidity;
                let cloudCover = data.list[i].clouds.all;

                // converts m/s to km/h for windspeed - more common way of reading it!
                if ($("#radJsonTempC").is(":checked"))
                {
                    windSpeed *= 3.6;
                }

                str += "<container style='float: left; width: 18%; padding: 5px; border-style: none none none dashed; border-color: gray;'>";
                str += "<p>";
                str += "<div style='text-align: center'>"
                str += "<div style='font-weight: bold; color: darkblue'>";
                str += getTheDayName(currentTime, timezone, "json") + "<br />";
                str += "</div>";
                str += getTheHour(currentTime, timezone, "json") + "<br />";
                str += getTheDate(currentTime, timezone, "json") + "<br />";
                str += "<img src='" + "http://openweathermap.org/img/w/" + imgIcon + ".png' /><br />";
                str += "<strong>Temperature: </strong>" + currentTemp + ending + "<br />";
                str += "<strong>Feels like: </strong>" + feelsLike + ending + "<br />";
                str += "<strong>Conditions: </strong>" + description + "<br />";
                str += "<strong>Wind speed: </strong>" + windSpeed.toFixed(2) + windType + "<br />";
                // the min and max temperatures don't seem realistic, 
                // but they correctly reflect the values in the data
                str += "<strong>Min: </strong>" + minTemp + ending + "<br />";
                str += "<strong>Max: </strong>" + maxTemp + ending + "<br />";
                str += "<strong>Humidity: </strong>" + humidity + "%<br />";
                str += "<strong>Cloud Coverage: </strong>" + cloudCover + "%<br />";
                str += "</div></p></container>";
            }

            document.getElementById("jsonResults").innerHTML = str;

            $("#jsonResultsSection").css('display', 'block');
            
            
        },
        error: function(){
            console.log("There was an error with the call...");
        }
    });
}

function getTheTime(time, timezone, format)
{
    console.log({time});
    console.log({timezone}); //36000ms for Melbourne, 28800 for Perth

    // in json files from this API, the time is in Unix time (seconds)
    // but the timezone is set in ms...
    // therefore, multiplying the time for json files corrects this issue
    // and if it's an xml file, then the entire time needs to be corrected

    let correction = 1;
    if (format == "json") // converts from seconds to milliseconds
        time *= 1000;
    else
        correction = 1000; // this only needs to happen for xml format

    let date = new Date(time), when = "";
    date.setTime(date.getTime() + timezone * correction);

    // this code properly calibrates the hour based on UTC time...
    // the idea was helped along by Jess Moolenschot, but the actual
    // implementation is my own.

    // unfortunately, this creates a new issue that I don't have time to
    // solve - see what happens when you try to find the sunrise and sunset
    // times in Adelaide...
    // additionally, somehow this method 'overcorrects' in XML format, so a
    // new variable has been added to use different methods for finding the hour
    // based on the format
    let newHours = date.getUTCHours();
    let jsonHours = ((newHours + (timezone / 3600)) % 24);
    let xmlHours = date.getHours();

    let hoursNum = "";

    if (format == "json")
        hoursNum = jsonHours;
    else
        hoursNum = xmlHours;
        
    let str = "";

    if (hoursNum <= 12)
        when = "am";
    else if (hoursNum == 12)
        when = "noon";
    else
        when = "pm";

    if (when == "am" || when == "noon") // morning and 12pm
        str += hoursNum;
    else
        str += (hoursNum - 12);
        

    if (date.getMinutes() < 10)

        str += ":0" + date.getMinutes();
    else
        str += ":" + date.getMinutes();

    if (when == "am")
        str += "am";
    else
        str += "pm";

    return str;
}

function getTheHour(time, timezone, format)
{
    // this is the same function as getTheTime, but doesn't give the minutes
    // (only the hour should be displayed for the forecast)

    let correction = 1;

    if (format == "json")
        time *= 1000;
    else
        correction = 1000;
    
    let date = new Date(time), when = "";
    date.setTime(date.getTime() + timezone * correction);
    console.log({date});
    let str = "";

    // finds whether its before or after noon
    if (date.getHours() <= 12)
        when = "am";
    else if (date.getHours() == 12)
        when = "noon";
    else
        when = "pm";

    if (when == "am" || when == "noon") // morning
        str += date.getHours();
    else
        str += (date.getHours() - 12);

    str += ":00";

    if (when == "am")
        str += "am";
    else
        str += "pm";

    return str;
}

function getTheDate(time, timezone, format)
{
    if (format == "json")
        time *= 1000;
    else
        timezone *= 1000;

    let date = new Date(time);

    date.setTime(date.getTime() + timezone);

    // I think it's a little strange that getMonth() is indexed to 0,
    // but getDate() is indexed to 1...
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // prefixes the day with a 0 if required
    if (day < 10)
        day = "0" + day;

    // prefixes the month with a 0 if required
    if (month < 10)
        month = "0" + month;

    // Australian date format: dd/mm//yyyy
    let str = day + "/" + month + "/" + year;
    return str;
    
}

function getTheDayName(time, timezone, format)
{
    let correction = 1;

    
    if (format == "json")
        time *= 1000;
    else
        correction = 1000;
        
    let date = new Date(time);
    date.setTime(date.getTime() + timezone * correction);
    let day = date.getDay();
    let dayName;

    // a simple switch statement to convert the array into day names
    switch (day)
    {
        case 0:
            dayName = "Sunday";
            break;
        case 1:
            dayName = "Monday";
            break;
        case 2:
            dayName = "Tuesday";
            break;
        case 3:
            dayName = "Wednesday";
            break;
        case 4:
            dayName = "Thursday";
            break;
        case 5:
            dayName = "Friday";
            break;
        default:
            dayName = "Saturday";
            break;
    }

    return dayName;
}

function savePreferences()
{
    // gets the values of each preference to be saved
    let bgColor = document.getElementById("txtBackgroundColor").value;
    let fontColor = document.getElementById("txtFontColor").value;
    let fontSize = document.getElementById("txtFontSize").value;

    // creates an Object of the user preferences
    let userPrefs = 
    {
        "bgColor": bgColor,
        "fontColor": fontColor,
        "fontSize": fontSize
    };

    // saves the preference to local storage (or overrides the existing preference)
    localStorage.setItem("userPrefs", JSON.stringify(userPrefs));

    console.log("bgColor set  to: " + userPrefs.bgColor);
    console.log("fontColor set to: " + userPrefs.fontColor);
    console.log("fontSize set to: " + userPrefs.fontSize);

    applyPreferences();

    document.getElementById("preferencesString").innerHTML = "Preferences saved!";
}

function applyPreferences()
{
    // default values if local storage is empty
    let bgColor= "#FFFFFF";
    let fontColor = "#000000";
    let fontSize = "16";

    if (localStorage.getItem("userPrefs"))
    {
        let userPrefs = JSON.parse(localStorage.getItem("userPrefs"));
        console.log(userPrefs);
        bgColor = userPrefs.bgColor;
        fontColor = userPrefs.fontColor;
        fontSize = userPrefs.fontSize;
    }

    // adds the CSS properties to the entire page
    $(".ui-mobile [data-role='page']").css({"background-color":bgColor, "color":fontColor, "font-size":fontSize + "px"});

    let newBgColor = document.querySelector("#txtBackgroundColor");
    newBgColor.value = bgColor;
    newBgColor.select();

    let newFontColor = document.querySelector("#txtFontColor");
    newFontColor.value = fontColor;
    newFontColor.select();

    let newSize = document.querySelector("#txtFontSize");
    newSize.value = fontSize;
}

function resetPreferences()
{
    if ('localStorage in Window' && window.localStorage !== null)
    {
        try
        {
            let userPrefs = 
            {
                "bgColor": "#FFFFFF",
                "fontColor": "#000000",
                "fontSize": "16"
            };
            localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        }
        catch(e)
        {
            if (e == QUOTA_EXCEEDED_ERR)
                console.log("You are out of local storage");
            else
                console.log("Unknown error");
        }
    }
    else
    {
        console.log("This browser does not support local storage");
    }

    applyPreferences();

    document.getElementById("preferencesString").innerHTML = "Preferences reset!";
}

// sets user preferences based on local storage
$(document).ready(function(){
    applyPreferences();
});