
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

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
