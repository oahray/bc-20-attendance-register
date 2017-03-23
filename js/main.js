
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



var getAdmin = function() {
	dbRef.admin.child()
}

var isAdmin = function(adminName) {
	if (adminName === "oare") {
		return true;
	}
	else {
		return false;
	}
};

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

checkinBtn.click(function() {
	getCurrentDetails();
	username = userName;
	password = userPassword;
	email = userEmail;

	if (password.length >= 6) {

		alert("Your presence has been logged in!");

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
		alert(errorMessage);
		});
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
		  alert(errorMessage);
		})
	}
	else {
		alert("You are not an admin!")
	}
})


logoutBtn.click(function() {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.

	}).catch(function(error) {
	  // An error happened.
	});
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	getCurrentDetails();
  	console.log(user.uid);
    // User is signed in.
    if (isAdmin(adminName)) {
    	$('loginOrSignUp').hide();
    	userLogin.hide();
    	adminDashBoard.show();
    }
  } else {
    // No user is signed in.
    adminLoginNow();
  }
});
