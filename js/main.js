
 // Initialize Firebase
var config = {
  apiKey: "AIzaSyBwFRDCEdl8r9bgHjAXOCWfUTPcd_iPzNo",
  authDomain: "attendanceregister-ca229.firebaseapp.com",
  databaseURL: "https://attendanceregister-ca229.firebaseio.com",
  storageBucket: "attendanceregister-ca229.appspot.com",
  messagingSenderId: "1006271889035"
};
firebase.initializeApp(config);

var dbRef = firebase.database().ref();

var username, email, password, userName, userEmail, userPassword, chosenEvent, adminName, adminEmail, adminPassword;

var getCurrentDetails = function() {
	userName = $("#username").val();
	userEmail = userName + "@attend.here"
	userPassword = $("#userPassword").val();
	chosenEvent = $("#chosenEvent").val();
	
	adminName = $("#adminName").val().toLowerCase();
	adminEmail = adminName + "@attend.here"
	adminPassword = $("#adminPassword").val();
};

var userLogin = $("#userLogin");
var adminLogin = $("#adminLogin");
var logoutBtn = $("#logoutBtn");

var adminForm = $("#adminForm");
var checkinForm = $("#checkinForm");
var adminLoginBtn = $("#adminLoginBtn");

var checkinBtn = $("#checkinBtn");
var adminDashBoard = $('#adminDashBoard');
var loginOrSignup = $('#loginOrSignup')



// var getAdmin = function() {
// 	firebase.database().ref('/admin').once('value').then(function(snapshot) {
// 	  console.log(snapshot.val());
// 	  // ...
// 	});
// };
// getAdmin();


logoutBtn.hide();
userLogin.hide();
adminForm.hide();
adminDashBoard.hide();


var adminLoginNow = function() {
	adminLogin.hide();
	checkinForm.hide();
	adminForm.show();
	userLogin.show();
	adminDashBoard.hide();
};
adminLogin.click(adminLoginNow);

var userLoginNow = function() {
	userLogin.hide();
	adminForm.hide();
	adminLogin.show();
	checkinForm.show();
	adminDashBoard.hide();
};
userLogin.click(userLoginNow);

var adminOnline = function() {
	loginOrSignup.hide()
	adminDashBoard.show();
	logoutBtn.show();
	userLogin.hide();
	adminLogin.hide();
};

checkinBtn.click(function() {
	getCurrentDetails();
	username = userName;
	password = userPassword;
	email = userEmail;

	if (password.length >= 6) {
		$('#userCheckinMessage').html("Your presence has been logged in!")

		var usersRef = dbRef.child('registered');
		var eventsRef = dbRef.child('events');

		usersRef.push({
		  name: username,
		  email: email,
		  events: {
		    events: chosenEvent
		  }
		})

		eventsRef.child(chosenEvent).push({
		  name: username,
		  email: email
		})

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		});
		logoutNow();
	}
});


adminLoginBtn.click(function() {
	getCurrentDetails();
	name = adminName;
	email = adminEmail;
	password = adminPassword; 
	console.log(name);
	if (name.toLowerCase() === "oare") {
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		})
	}
	else {
		$("$adminLoginError").html("You are not an admin!");
	}
})


var logoutNow = function() {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  userLoginNow();
	}).catch(function(error) {
	  // An error happened.
	});
};
logoutBtn.click(logoutNow);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	getCurrentDetails();
  	console.log(user.uid);
    // User is signed in.
    if (user.uid === "VemNGWOMo7Yij34l7pdWYO86sLP2") {
    	adminOnline();
    	var registeredRef = firebase.database().ref('registered/');
			registeredRef.on('child-added', function(snapshot) {
			  // allUsers.html() 
			  console.log(JSON.parse(snapshot.val()));
			});
    }
    else {
    	setTimeOut(logoutNow(), 10000);
    }
  } 
  else {
    // No user is signed in.
  }
});

var allUsers = $('#allUsers'), presentationList = $('#presentationList'), 
footballList = $('#footballList'), weddingList= $('#weddingList'), 
churchList = $('#churchList'), boardMeetingList = $('#boardMeetingList');


var adminNoView = function() {
	allUsers.hide();
	presentationList.hide();
	footballList.hide();
	weddingList.hide();
	churchList.hide();
	boardMeetingList.hide();
};

var adminViewAll = function() {
	adminNoView();
	allUsers.show();
};

var adminViewPresentation = function() {
	adminNoView();
	presentationList.show();
};

var adminViewWedding = function() {
	adminNoView();
	weddingList.show();
};

var adminViewChurch = function() {
	adminNoView();
	churchList.show();
};

var adminViewFootball = function() {
	adminNoView();
	footballList.show();
};

var adminViewBoardMeeting = function() {
	adminNoView();
	boardMeetingList.show();
};

adminNoView();


$('#adminCheckList').click(function(){
	var toView = $('#adminEventSelect').val();
	switch(toView) {
		case ('all'):
			adminViewAll();
			break;
		case ('presentation'):
			adminViewPresentation();
			break;
		case ('wedding'):
			adminViewWedding();
			break;
		case ('church'):
			adminViewChurch();
			break;
		case('football'):
			adminViewFootball();
			break;
		case('board-meeting'):
			adminViewBoardMeeting();
			break;
	}
});

