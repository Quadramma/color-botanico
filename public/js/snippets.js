//SNIPPET// Disable mouse wheel.
document.onmousewheel = function() {
	stopWheel();
}
if (document.addEventListener) {
	document.addEventListener('DOMMouseScroll', stopWheel, false);
}

function stopWheel(e) {
	if (!e) {
		e = window.event;
	}
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.returnValue = false;
}



//SNIPPET//smooth scrolling to anchor. (uses location.hash)-------------------
app.anchorScroll = function() {
	//$anchorScroll();
	if ($location.hash().toString().length > 0) {
		console.log($location.hash());
		$('html, body').animate({
			scrollTop: $($location.hash()).offset().top
		}, 1000);
	}

};