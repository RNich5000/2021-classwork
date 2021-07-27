// writing global variables always feels lazy to me, but I can't think of a better way
// to get this all working!

var pickedAnswer = "";
var questionsGiven = 0;
var correctAnswers = 0;
var questionsList = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29];
var question = "";
var alreadyUsed = new Array(5);
var username = "";
var localStoragePos = localStorage.length; // only used to create object names for local storage
var startTime, totalTime;

// hides the main parts of the game until a user name has been given
$("document").ready(function(){
    $("#btnEnterName").show();
    $("#btnNext").hide();
    $("#btnExit").hide();
    $(".answers-grid-container").hide();
    $("#imgFile").hide();
    $("#btnCheckAns").hide();

    // loads the high scores list from local storage
    updateHighscores();
    applyPreferences();
});

function enterName()
{
    username = prompt("Please enter your name:");

    // gets a snapshot of the time the game started
    let d = new Date();
    startTime = d.getTime();

    startGame();
}

function startGame()
{
    $("#btnEnterName").hide();
    $("#btnExit").show();
    $(".answers-grid-container").show();
    $("#imgFile").show();
    $("#btnCheckAns").show();
    document.getElementById("rightOrWrong").innerHTML = "";

    // randomly picks a question from the list
    
    question = questionsList[pickQuestion()];
    displayAnswers(question);
    showImage(question);
}

function displayAnswers(question)
{
    document.getElementById("answer1").innerHTML = question.answer1;
    document.getElementById("answer2").innerHTML = question.answer2;
    document.getElementById("answer3").innerHTML = question.answer3;
    document.getElementById("answer4").innerHTML = question.answer4;
}

function checkAnswer()
{
    if (pickedAnswer == "")
    {
        document.getElementById("rightOrWrong").innerHTML = "Please select an answer!";
    }
    else if (pickedAnswer == question.correctAns) // if the question is correct
    {
        document.getElementById("rightOrWrong").innerHTML = "Correct!";
        correctAnswers++;
        $("#btnCheckAns").hide();
        $("#btnNext").show();
        pickedAnswer = "";
    }
    else
    {
        document.getElementById("rightOrWrong").innerHTML = "Incorrect... The correct answer is: " + question.correctAns;
        $("#btnCheckAns").hide();
        $("#btnNext").show();
        pickedAnswer = "";
        
    }
}

function showImage(question)
{
    document.getElementById("imgFile").innerHTML = "<img src=img/" + question.img + ".jpg alt='" + question.alt + "' height='300' />";
}

function pickQuestion()
{
    let randNum;
    do{
        randNum = Math.floor(Math.random() * 30); // generates a new random number
    } while (alreadyUsed.indexOf(randNum) != -1) // while alreadyUsed already has that value
    {
        // doesn't do anything and the loop generates a new random number
        // this loop should break when a number is generated that isn't alreadyUsed
    }

    // adds the number to the alreadyUsed array at the first empty value
    for (let i = 0; i < alreadyUsed.length; i++)
    {
        if (alreadyUsed[i] == null)
        {
            alreadyUsed[i] = randNum;
            break;
        }
    }

    return randNum;
}

function selectAns1(btn)
{
    document.getElementById("answer2").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer3").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer4").style.backgroundColor = "#f9f9f9";
    btn.style.backgroundColor = "lightblue";

    pickedAnswer = document.getElementById("answer1").innerHTML;

}

function selectAns2(btn)
{
    document.getElementById("answer1").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer3").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer4").style.backgroundColor = "#f9f9f9";
    btn.style.backgroundColor = "lightblue";

    pickedAnswer = document.getElementById("answer2").innerHTML;
}

function selectAns3(btn)
{
    document.getElementById("answer1").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer2").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer4").style.backgroundColor = "#f9f9f9";
    btn.style.backgroundColor = "lightblue";

    pickedAnswer = document.getElementById("answer3").innerHTML;
}

function selectAns4(btn)
{
    document.getElementById("answer1").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer2").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer3").style.backgroundColor = "#f9f9f9";
    btn.style.backgroundColor = "lightblue";

    pickedAnswer = document.getElementById("answer4").innerHTML;
}

function nextQuestion()
{
    questionsGiven++;
    document.getElementById("rightOrWrong").innerHTML = "";
    clearSelection();

    if (questionsGiven < 5)
    {
        $("#btnCheckAns").show();
        $("#btnNext").hide();
        startGame();
    }
    else
        endTheGame();
}

function endTheGame()
{
    $("#btnEnterName").show();
    $("#btnNext").hide();
    $("#btnExit").hide();
    $(".answers-grid-container").hide();
    $("#imgFile").hide();

    localStoragePos++;

    let str = "Game over! You scored " + correctAnswers + "/5.";
    document.getElementById("rightOrWrong").innerHTML = str;
    
    // timestamps when the person completed the quiz
    let d = new Date();
    let endTime = d.getTime();
    totalTime = endTime - startTime;

    let user = new User(username, correctAnswers, totalTime);
    let storageName = "user" + localStoragePos;
    
    try // attempts to save the user data to local storage
    {
        localStorage.setItem(storageName, JSON.stringify(user));
    }
    catch(e)
    {
        if (e == QUOTE_EXCEEDED_ERR)
            str += "<br /><br />Unfortunately your score couldn't be saved - you are out of local storage";
        else
            console.log("Unknown error, score not saved...");
    }

    questionsGiven = 0;
    correctAnswers = 0;
    alreadyUsed = new Array(5);
    updateHighscores();
    
}

function clearSelection()
{
    document.getElementById("answer1").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer2").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer3").style.backgroundColor = "#f9f9f9";
    document.getElementById("answer4").style.backgroundColor = "#f9f9f9";
}

function updateHighscores()
{
    // uses the key() method to retrieve the keys of all Objects stored in local storage
    // then adds them to an Array of keys (user1, user2, etc...)
    let keys = new Array(localStorage.length);
    for (let i = 0; i < localStorage.length; i++)
    {
        let keyName = localStorage.key(i);
            keys[i] = keyName;
    }

    // this block checks for the MyAppPrefs in the array
    // if it's not there (index of -1), nothing happens
    // if it's there, MyAppPrefs gets spliced (removed) from the array
    let deleteThis = keys.indexOf("MyAppPrefs");
    if (deleteThis > -1)
        keys.splice(deleteThis, 1);

    // uses the keys Array to iterate through local storage again, to retrieve the user data
    // based on key name
    let users = new Array(keys.length);
    for (let i = 0; i < keys.length; i++)
        users[i] = JSON.parse(localStorage.getItem(keys[i]));

    
    // a bubble sort algorithm ranks the places from best to worst
    for (let i = 0; i < keys.length - i; i++)
    {
        for (let j = 0; j < (keys.length - 1 - i); j++)
        {
            if (users[j].score < users[j+1].score)
            {
                let temp = users[j];
                users[j] = users[j+1];
                users[j+1] = temp;
            }
        }
    }

    // a second bubble sort ranks equal scores by time taken to complete the quiz
    for (let i = 0; i < keys.length - 1; i++)
    {
        for (let j = 0; j < keys.length - 1 - i; j++)
        {
            // if both scores are the same, move the lower time to the better position
            if ((users[j].score == users[j+1].score) && (users[j].time > users[j+1].time))
            {
                let temp = users[j];
                users[j] = users[j+1];
                users[j+1] = temp;
            }
        }
    }

    for (let i = 0; i < 5; i++)
    {
        let score = "score" + (i+1);
        
        if (users[i] == null)
            document.getElementById(score).innerHTML = "";
        else
        {
            let timeTaken = users[i].time/1000;

            // rounds to two decimal places
            // solution found at https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
            timeTaken = Math.round(timeTaken * 100) / 100;

            document.getElementById(score).innerHTML = 
            users[i].name + " (" + users[i].score + "/5 in " + timeTaken + " seconds)";       
        }
            
    }
}

function clearAllData()
{
    localStorage.clear();
    document.getElementById("userDataAns").innerHTML = "All user data deleted.";
    updateHighscores();
    applyPreferences();
}

function savePrefs()
{
    let bgColor = document.getElementById("txtBgColor").value;
    let fontColor = document.getElementById("txtFontColor").value;
    let fontSize = document.getElementById("txtFontSize").value;

    console.log("bgColor: " + bgColor);
    console.log("fontColor: " + fontColor);
    console.log("fontSize: " + fontSize);

    try
    {
        let myPrefs = 
        {
            "bgColor": bgColor,
            "fontColor": fontColor,
            "fontSize": fontSize
        };

        localStorage.setItem("MyAppPrefs", JSON.stringify(myPrefs));
    }
    catch(e)
    {
        if (e == QUOTE_EXCEEDED_ERR)
            console.log("You are out of local storage");
        else
            console.log("Unknown error...");
    }

    applyPreferences();
}

function applyPreferences()
{
    let bgColor = "#FFFFFF";
    let fontColor = "#000000";
    let fontSize = "16";

    if (localStorage.getItem("MyAppPrefs"))
    {
        let myPrefs = JSON.parse(localStorage.getItem("MyAppPrefs"));
        console.log(myPrefs);
        bgColor = myPrefs.bgColor;
        fontColor = myPrefs.fontColor;
        fontSize = myPrefs.fontSize;
    }

    $(".ui-mobile [data-role='page']").css({"background-color":bgColor, "color":fontColor, "font-size":fontSize + "px"})

    let newBgColor = document.querySelector("#txtBgColor");
    newBgColor.value = bgColor;
    newBgColor.select();

    let newColor = document.querySelector("#txtFontColor");
    newColor.value = fontColor;
    newColor.select();

    let newSize = document.querySelector("#txtFontSize");
    newSize.value = fontSize;
}

function removeUserSettings()
{
    // removes MyAppPrefs from local storage and applies default preferences
    localStorage.removeItem("MyAppPrefs");
    applyPreferences();

    document.getElementById("userDataAns").innerHTML = "User preferences reset.";
}

function resetHighscores()
{
    // removes all data from local storage EXCEPT MyAppPrefs
    for (let i = 0; i < localStorage.length; i++)
    {
        if (localStorage.key(i) == "MyAppPrefs")
            continue;
        else
        {
            let keyName = localStorage.key(i);
            localStorage.removeItem(keyName);
        }
    }

    document.getElementById("userDataAns").innerHTML = "High scores reset.";
}

function btnExit()
{
    // hides functionality from the user
    $("#btnEnterName").show();
    $("#btnNext").hide();
    $("#btnExit").hide();
    $(".answers-grid-container").hide();
    $("#imgFile").hide();
    $("#btnCheckAns").hide();

    // resets stats from the game
    questionsGiven = 0;
    correctAnswers = 0;
    alreadyUsed = new Array(5);
    updateHighscores();

    // takes user back to the home screen
    window.history.back();
}