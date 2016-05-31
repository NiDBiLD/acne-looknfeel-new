$( document ).ready(function() {
	resizeLogo();
	adaptHeights();
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
	$( window ).resize(function() {
		resizeLogo();
		adaptHeights();
	});
	
	
	/* Sticky elements */
	
	/*$('.sticky').fixer({
        gap: '100px'
    });*/
    $(".sticky").stick_in_parent({offset_top: 32});
	
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