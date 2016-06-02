$( document ).ready(function() {

    $('.js-mobile-nav-foldout').on('click', mobile_nav_foldout);
    $('.js-mobile-nav-toggle').on('click', mobile_nav_toggle);
    
    
    
	bagFoldedOut = false;
	$("#menuBag").click(function() {
		if(bagFoldedOut == false){
			$openFoldOut = TweenMax.to("#foldOut", 0.3, {right: 0});
			$menuBag = TweenMax.to("#menuBag", 0.1, {backgroundColor: '#eeeeee'});
			bagFoldedOut = true;
		} else {
			$closeFoldOut = TweenMax.to("#foldOut", 0.3, {right: -400});
			$menuBag = TweenMax.to("#menuBag", 0.1, {backgroundColor: '#ffffff'});
			bagFoldedOut = false;
		}
	});
	
	resizeLogo();
	adaptHeights();
	$( window ).resize(function() {
		resizeLogo();
		adaptHeights();
	});
	
	
	
	
});

function resizeLogo() {
	$logoHeight = $('#master-text').height();
	$('#slave-text').css('height', $logoHeight);
}

function adaptHeights() {
	var $heightMasters = document.querySelectorAll("*[id^='height-master-']");
	$.each($heightMasters, function(index, value) {
		var $num = value.id.slice('height-master-'.length);
		var $masterElem = $('#height-master-' + $num);
		if($('.height-slave-' + $num)) {
			$('.height-slave-' + $num).css('height', $masterElem.css('height'));
		}
	});
}


function mobile_nav_foldout() {
	var ww = $(window).width();
	if (ww < 600) {
		$(this).closest('li').toggleClass('is-open');
		return false;
	}
}
function mobile_nav_toggle() {
	var ww = $(window).width();
	if (ww < 600) {
		$('body').toggleClass('is-menu-open');
		return false;
	}
}