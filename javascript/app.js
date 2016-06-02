$( document ).ready(function() {
	resizeLogo();
	adaptHeights();
	verticalCenterStickyProductDescription();
	bagFoldedOut = false;
	foldOriginalHeight1 = $('#foldIn1').height() +20;
	foldOriginalHeight2 = $('#foldIn2').height();
	foldHeight1 = $('#foldIn1');
	foldHeight2 = $('#foldIn2');
	topSpacing = $('#stickyProduct').position().top;

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
});
$( window ).resize(function() {
	resizeLogo();
	adaptHeights();
	verticalCenterStickyProductDescription();
});

$( window ).scroll(function(){
	stickyProductDescription();
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

function verticalCenterStickyProductDescription() {
	var container = $('#stickyProductWrapper');
	var content = $('#stickyProduct');
	content.css("top", (container.height()-content.height()) / 2 - 60);
}

function stickyProductDescription() {
	scrollAmount = $(window).scrollTop();
	$('#stickyProduct').css('top', (topSpacing - scrollAmount) + 'px');
	if($('#stickyProduct').position().top <= 0 ) {
		$('#stickyProduct').css('top', 0 + 'px');
		foldHeight1.height(foldOriginalHeight1 - (scrollAmount - topSpacing));
		if(foldHeight1.height() <= 0 ) {
			foldHeight2.height(foldOriginalHeight2 - (scrollAmount - foldOriginalHeight1 - topSpacing));
		}
		if(scrollAmount >= $('#stickyProductWrapper').height() - 240) {
			$('#stickyProduct').css('backgroundColor', '#ffffff');
		} else if (scrollAmount <= $('#stickyProductWrapper').height() - 240) {
			$('#stickyProduct').css('backgroundColor', 'transparent');
		}
	}
}