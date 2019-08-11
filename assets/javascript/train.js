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


//Creating a variable to reference the database
var database = firebase.database();
console.log(database);

var currentTime = moment(database);
console.log(database);


//Creating listener to detect changes made to database, passing through to childSnap parameter
database.ref().on("child_added", function (childSnap) {
    console.log(childSnap.val());

    //Making variables to store values from user input
    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    //Console logging the variables
    console.log(childSnap.val().name);
    console.log(childSnap.val().destination);
    console.log(childSnap.val().firstTrain);
    console.log(childSnap.val().frequency);
    console.log(childSnap.val().min);
    console.log(childSnap.val().next);



    //Taking information from variables above and appending them to the table row in HTML
    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

//Creating listener to listen for changes made to database, passing through to snaphot variable and printing to console to check for errors
database.ref().on("value", function (snapshot) {
    console.log(snapshot);



});

//Grabbing all the information from form fields on button click, storing the values in variables
$("#addTrainBtn").on("click", function () {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    //Making sure the input fields have data in them, if not sending alert to user
    if (trainName == "") {
        alert('Enter a train name.');
        return false;
    }
    if (destination == "") {
        alert('Enter a destination.');
        return false;
    }
    if (firstTrain == "") {
        alert('Enter a first train time.');
        return false;
    }
    if (frequency == "") {
        alert('Enter a frequency');
        return false;
    }


    //Subtracting the first train time back one year to make sure its before current time
    var firstTrainConverting = moment(firstTrain, "hh:mm").subtract("1, years");

    //Calculating the difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverting), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    //Creating newTrain object to store train values
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    //Console logging newTrain object to check for errors, pushing to database
    console.log(newTrain);
    database.ref().push(newTrain);


    //Clearing fields
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    return false;
});


// //moment().format('MMMM Do YYYY, h:mm:ss a'); // August 10th 2019, 12:17:13 pm
// moment().format('dddd');                    // Saturday
// moment().format("MMM Do YY");               // Aug 10th 19
// moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
// moment().format();                          // 2019-08-10T12:17:13-05:00

