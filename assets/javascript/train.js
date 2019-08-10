// referencing firebase server to authenicate and initialize the application
var config = {
    apiKey: "AIzaSyBI99NPnup0E664hUhummmuSYKwX0p_UBA",
    authDomain: "project1-ebc4f.firebaseapp.com",
    databaseURL: "https://project1-ebc4f.firebaseio.com",
    projectId: "project1-ebc4f",
    storageBucket: "",
    messagingSenderId: "677210244714",
    appId: "1:677210244714:web:e074b7c2ed781fc8"
};

//initializing firebase connection and passing through config object
firebase.initializeApp(config);

var DB = firebase.database();
var Time = moment();

//creating listener to listen for changes made to database
database.ref().on("child_added", function (childSnap) {
    console.log(childSnap.val());


    //making variables to store values from user input
    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    //appending information taken from variables above to #trainTable HTML
    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");

});



































// //moment().format('MMMM Do YYYY, h:mm:ss a'); // August 10th 2019, 12:17:13 pm
// moment().format('dddd');                    // Saturday
// moment().format("MMM Do YY");               // Aug 10th 19
// moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
// moment().format();                          // 2019-08-10T12:17:13-05:00

