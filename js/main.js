// splash

$( document ).ready(function() {
	if($(".splash").is(":visible"))
	{
		$(".wrapper").css({"opacity":"0"});
	}
	$(".splash-arrow").click(function()
	{
		$(".splash").slideUp("800", function() {
			  $(".wrapper").delay(100).animate({"opacity":"1.0"},800);
		 });
	});
});

$(window).scroll(function() {
  	  $(window).on("scroll");
	  $(".splash").slideUp("800", function() {
	  $("html, body").animate({"scrollTop":"0px"},100);
	  $(".wrapper").delay(100).animate({"opacity":"1.0"},800);
 });
 });

// end splash

// js hover splash
$(".cover").hide();
$(".vdvd").mouseover(function(){
  $(".cover").show().animate({"opacity":"1.0"}, 500);
});
$(".vdvd").mouseleave(function(){
  $(".cover").hide().animate({"opacity":"0.0"}, 500);
});
// end hover splash
