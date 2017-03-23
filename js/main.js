
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
var adminLogin = $("#adminLogin");
var logoutBtn = $("#logoutBtn");
var adminForm = $("#adminForm");

$("#logoutBtn").hide();
$("#adminForm").hide(;)

checkinBtn.click(function() {
	alert('Hey');
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
});


adminLogin.click(function() {
	adminForm.show();

});


