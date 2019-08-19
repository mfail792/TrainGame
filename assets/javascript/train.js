//Referencing firebase server to authenicate and initialize the application
var firebaseConfig = {
    apiKey: "AIzaSyBI99NPnup0E664hUhummmuSYKwX0p_UBA",
    authDomain: "project1-ebc4f.firebaseapp.com",
    databaseURL: "https://project1-ebc4f.firebaseio.com",
    projectId: "project1-ebc4f",
    storageBucket: "",
    messagingSenderId: "677210244714",
    appId: "1:677210244714:web:e074b7c2ed781fc8"
};

//Initializing firebase connection and passing through firebaseConfig for authentication
firebase.initializeApp(firebaseConfig);

var dataRef = firebase.database();

//setting the starter values
var Train = "";
var Destination = "";
var firstTime = "";
var Frequency = "";

//Grabbing all the information from form fields on button click, storing the values in variables
$("#addTrainBtn").on("click", function () {

    Train = $("#trainNameInput").val().trim();
    Destination = $("#destinationInput").val().trim();
    firstTime = moment($("#firstInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    Frequency = $("#frequencyInput").val().trim();
    console.log(firstTime);

    //pushing the data to the database
    dataRef.ref().push({

        Train: Train,
        Destination: Destination,
        firstTime: firstTime,
        Frequency: Frequency,
      
    });


    //Clearing input fields
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    // disabling the refresh
    return false;
});

//Creating listener to detect changes made to database, passing through to childSnapshot parameter
dataRef.ref().on("child_added", function (childSnapshot) {


    // storing into variables
    var sTrain = childSnapshot.val().Train;
    var sDestination = childSnapshot.val().Destination;
    var sFrequency = childSnapshot.val().Frequency;
    var sFirstTime = childSnapshot.val().firstTime;

    // calculate the frequency time
    var timeDifference = moment().diff(moment.unix(sFirstTime), "minutes");
    var sRemainder = moment().diff(moment.unix(sFirstTime), "minutes") % sFrequency;
    var sMinutes = sFrequency - sRemainder;
    console.log(timeDifference);

    // calculate arrival time
    var sArrival = moment().add(sMinutes, "m").format("hh:mm A");

    console.log(sMinutes);


    //Taking information from variables above and appending them to the table row in HTML
    $("#trainTable > tbody").append("<tr><td>" + sTrain + "</td><td>" + sDestination + "</td><td>" + sFrequency + "</td><td>" + sArrival + "</td><td>" + sMinutes + "</td></tr>");
});
  

