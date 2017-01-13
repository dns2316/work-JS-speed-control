
// Fireup the plugins
// $(document).ready(function(){

	// initialise  slideshow !!! Uncaught TypeError: $(...).flexslider is not a function
	//  $('.flexslider').flexslider({
  //       animation: "slide",
  //       start: function(slider){
  //         $('body').removeClass('loading');
  //       }
  //     });

// });
/**
 * Handles toggling the navigation menu for small screens.
 */
// ( function() { // !!! Uncaught TypeError: Cannot read property 'getElementsByTagName' of null
	// var button = document.getElementById( 'topnav' ).getElementsByTagName( 'div' )[0],
	//     menu   = document.getElementById( 'topnav' ).getElementsByTagName( 'ul' )[0];
	//
	// if ( undefined === button )
	// 	return false;
	//
	// // Hide button if menu is missing or empty.
	// if ( undefined === menu || ! menu.childNodes.length ) {
	// 	button.style.display = 'none';
	// 	return false;
	// }
	//
	// button.onclick = function() {
	// 	if ( -1 == menu.className.indexOf( 'srt-menu' ) )
	// 		menu.className = 'srt-menu';
	//
	// 	if ( -1 != button.className.indexOf( 'toggled-on' ) ) {
	// 		button.className = button.className.replace( ' toggled-on', '' );
	// 		menu.className = menu.className.replace( ' toggled-on', '' );
	// 	} else {
	// 		button.className += ' toggled-on';
	// 		menu.className += ' toggled-on';
	// 	}
	// };
// } )();

// Get the modal
var modal = document.getElementById('myModal');
var about = document.getElementById('aboutModal');
var theRoute = document.getElementById('routeModal');
// var thanks = document.getElementById('thanks');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btnAbout = document.getElementById("aboutBtn");
var btnTheRoute = document.getElementById("theRouteBtn");
// var btnMail = document.getElementById('btnMail');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanAbout = document.getElementsByClassName("close")[1];
var spanRoute = document.getElementsByClassName("close")[2];

var displayTurnBtn = true;
var displayTurnbtnAbout = true;
var displayTurnbtnRoute = true;

// functions
closeContact = function() {
  modal.style.display = "none";
  displayTurnBtn = !displayTurnBtn
}

closeAbout = function() {
  about.style.display = "none";
  displayTurnbtnAbout = !displayTurnbtnAbout
}

closeTheRoute = function() {
  theRoute.style.display = "none";
  displayTurnbtnRoute = !displayTurnbtnRoute
}

openContact = function() {
  modal.style.display = "block";
  displayTurnBtn = !displayTurnBtn
}

openAbout = function() {
  about.style.display = "block";
  displayTurnbtnAbout = !displayTurnbtnAbout
}

openTheRoute = function() {
  theRoute.style.display = "block";
  displayTurnbtnRoute = !displayTurnbtnRoute
}
// -------

// When the user clicks the button, open the modal Contact
btn.onclick = function() {
  if (displayTurnBtn) {
    openContact();
    // theRoute.style.display = "none";
  } else {
    closeContact();
  }
}

// When the user clicks the button, open the modal About
btnAbout.onclick = function() {
  if (displayTurnbtnAbout) {
    openAbout();
    // theRoute.style.display = "none";
  } else {
    closeAbout();
  }
}

// When the user clicks the button, open the modal The Route
btnTheRoute.onclick = function() {
  if (displayTurnbtnRoute) {
    openTheRoute();
    // modal.style.display = "none";
    // about.style.display = "none";
  } else {
    closeTheRoute();
  }
}

// When the user clicks on <span> (x), close the modal Contact
span.onclick = function() {
    closeContact();
}

// When the user clicks on <span> (x), close the modal About
spanAbout.onclick = function() {
    closeAbout();
}

// When the user clicks on <span> (x), close the modal The Route
spanRoute.onclick = function() {
    closeTheRoute();
}

// If the Route is open -> do not open the "About" or "Contact"!
// if(displayTurnbtnRoute) {
//   closeContact();
//   closeAbout();
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
//
// window.onclick = function(event) {
//     if (event.target == about) {
//         about.style.display = "none";
//     }
// }

// btnMail.onclick = function() {
//   thanks.style.display = "block"
//   setTimeout(modal.style.display = "none", 5000);
// }
