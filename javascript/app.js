$( document ).ready(function() {
	getScrollTop();
	stickyProductInit();
	resizeFoldOutSizes();
	verticalCenterStickyProductDescription();
	adaptHeights();

	bagFoldedOut = false;

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
	$('#foldOutButton').hover(function() {
		toggleFoldoutSizes();
	});
	$('#menuSearch').click(function() {
		$('#searchWrapper').css('display', 'block');
	});
	$('#closeSearch').click(function() {
		$('#searchWrapper').css('display', 'none');
	});
});

function getScrollTop() {
	window.scrollAmount = $(window).scrollTop();
}

$( window ).resize(function() {
	getScrollTop();
	adaptHeights();
	resizeFoldOutSizes();
	verticalCenterStickyProductDescription();
});

$( window ).scroll(function(){
	getScrollTop();
	stickyProductDescription();
});

function resizeFoldOutSizes() {
	$foldOutButtonWidth = $('#foldOutButton').outerWidth();
	$('#foldOutSizes').css('width', $foldOutButtonWidth);
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

/*
function stickyProductDescription() {
	scrollAmount = $(window).scrollTop();
	$('#stickyProduct-0').css('top', (topSpacing - scrollAmount) + 'px');
	if($('#stickyProduct-0').position().top <= 0 ) {
		$('#stickyProduct-0').css('top', 0 + 'px');
		foldHeight1.height(foldOriginalHeight1 - (scrollAmount - topSpacing));
		if(foldHeight1.height() <= 0 ) {
			foldHeight2.height(foldOriginalHeight2 - (scrollAmount - foldOriginalHeight1 - topSpacing));
		}
		if(scrollAmount >= $('#stickyProductWrapper-0').height() - 240) {
			$('#stickyProduct-0').css('backgroundColor', '#ffffff');
		} else if (scrollAmount <= $('#stickyProductWrapper-0').height() - 240) {
			$('#stickyProduct-0').css('backgroundColor', 'transparent');
		}
	}
}*/

function stickyProductInit() {
	var n = 1;
	var i = 0;
	stickyInfos = new Array();

	while(i <= n) {
		stickyInfo = {};
		stickyInfo.stickyProduct = $('#stickyProduct-' + i);
		stickyInfo.stickyProductWrapper = $('#stickyProductWrapper-' + i);
		stickyInfo.bottomSect = $('#bottomSect-' + i);
		stickyInfo.topSect = $('#topSect-' + i);
		stickyInfo.foldIn1 = {};
		stickyInfo.foldIn1.object = $('#stickyProduct-' + i + ' .foldIn1');
		stickyInfo.foldIn1.height = $('#stickyProduct-' + i + ' .foldIn1').height();
		stickyInfo.foldIn2 = {};
		stickyInfo.foldIn2.object = $('#stickyProduct-' + i + ' .foldIn2');
		stickyInfo.foldIn2.height = $('#stickyProduct-' + i + ' .foldIn2').height();
		stickyInfos.push(stickyInfo);
		console.log(stickyInfos);
		i++;
	}
}

function stickyProductDescription() {
	for (var i = 0, len = stickyInfos.length; i < len; i++) {
		stickyProductBehaviour(stickyInfos[i], scrollAmount);
	}
}


function stickyProductBehaviour(stickyBlock, scrollAmount) {
	if(scrollAmount >= stickyBlock.topSect.offset().top && scrollAmount <= (stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height() )) {

		distance = (parseFloat(stickyBlock.stickyProduct.css('marginTop')) - scrollAmount - stickyInfo.stickyProductWrapper.scrollTop());
		blockScroll = scrollAmount - stickyBlock.topSect.offset().top;
		distanceTop = stickyBlock.stickyProduct.css('marginTop');
			console.log(blockScroll);
			console.log((stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height()) - (stickyBlock.topSect.offset().top * 2));
		if(distance >= 0 && (blockScroll < ((stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height()) - (stickyBlock.topSect.offset().top + stickyBlock.bottomSect.height())))) {
			stickyBlock.stickyProduct.css('top', -blockScroll);
			stickyBlock.stickyProductWrapper.css('position', 'fixed');
			stickyBlock.foldIn1.object.height(stickyBlock.foldIn1.height);
		} else if(blockScroll >= (stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height()) - stickyBlock.topSect.offset().top * 2) {
			stickyBlock.stickyProduct.css('top', (stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height()) - (stickyBlock.stickyProduct.height() * 4));
			stickyBlock.stickyProductWrapper.css('position', 'fixed');
		} else {
			stickyBlock.stickyProduct.css('top', - parseFloat(stickyBlock.stickyProduct.css('marginTop')));
			stickyBlock.stickyProduct.css('position', 'absolute');
			stickyBlock.foldIn1.object.height(stickyBlock.foldIn1.height - (scrollAmount - parseFloat(distanceTop)));
			stickyBlock.foldIn2.object.height(stickyBlock.foldIn2.height);
			if(stickyBlock.foldIn1.object.height() <= 0) {
				stickyBlock.foldIn2.object.height(stickyBlock.foldIn2.height - (scrollAmount - stickyBlock.foldIn1.height - parseFloat(distanceTop)));
			}
			if(scrollAmount >= stickyBlock.stickyProductWrapper.height() - 240) {
				stickyBlock.stickyProduct.css('backgroundColor', '#ffffff');
			} else if (scrollAmount <= stickyBlock.stickyProductWrapper.height() - 240) {
				stickyBlock.stickyProduct.css('backgroundColor', 'transparent');
			}
		}
	}
}

function verticalCenterStickyProductDescription() {
	for (var i = 0, len = stickyInfos.length; i < len; i++) {
		var container = stickyInfos[i].stickyProductWrapper;
		var content = stickyInfos[i].stickyProduct;
		var newTop = stickyInfos[i].stickyProductWrapper.height() - stickyInfos[i].stickyProduct.height() / 2 - 60;
		stickyInfos[i].stickyProduct.css('marginTop', newTop);
	}
}

// get scrollAmount
// for each section
	//X if scrollAmount >= topSect.top && scrollAmount <= bottomSect.top
		// stickyProduct.top == add class with top: 0 position: fixed;
	// else if scrollAmount <= topSect.top
		// stickyProduct.top == topSect.top
	// else if scrollAmount >= bottomSect.top
		// stickyProduct.top == bottomSect.top

// collect all stickyProducts by ID
// collect all stickyProductWrappers by ID
// collect all bottomSects by ID
// collect all topSects by ID

// create new arrays for each stickyProduct ID
// for each by ID number
	// create data object containing every required element
	// apply these 

function toggleFoldoutSizes() {
	$('#foldOutSizes').toggleClass('open');
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