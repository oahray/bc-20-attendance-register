
 // Initialize Firebase
var config = {
  apiKey: "AIzaSyBwFRDCEdl8r9bgHjAXOCWfUTPcd_iPzNo",
  authDomain: "attendanceregister-ca229.firebaseapp.com",
  databaseURL: "https://attendanceregister-ca229.firebaseio.com",
  storageBucket: "attendanceregister-ca229.appspot.com",
  messagingSenderId: "1006271889035"
};
firebase.initializeApp(config);

var username = $("#username").val();
var email = username + "@attend.here"
var password = $("#password").val();
var eventList = $("#eventList").val();
var checkinBtn = $("#checkinBtn");
var userLogin = $("#userLogin");
var adminLogin = $("#adminLogin");
var logoutBtn = $("#logoutBtn");
var adminForm = $("#adminForm");
var checkinForm = $("#checkinForm");
var isAdmin = false

logoutBtn.hide();
userLogin.hide();
adminForm.hide();


adminLogin.click(function() {
	adminLogin.hide();
	checkinForm.hide();
	adminForm.show();
	userLogin.show();
});

userLogin.click(function() {
	userLogin.hide();
	adminForm.hide();
	adminLogin.show();
	checkinForm.show();
});


checkinBtn.click(function() {
	alert('Hey');
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert(errorMessage);
	});

	alert("Your presence has been logged in!");
});


adminLoginBtn.click(function() {
	if (username.toLowerCase() === "oare") {
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
    // User is signed in.
    if (isAdmin) {
    	main.hide();
    	adminDashBoard.show();
    }
  } else {
    // No user is signed in.
  }
});