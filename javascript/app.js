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
	$('.foldout-button').hover(function() {
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
	$foldOutButtonWidth = $('.foldout-button').outerWidth();
	$('.foldout').css('width', $foldOutButtonWidth);
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
		stickyInfo.separator = $('#sectionSeparator-' + i);
		stickyInfo.foldIn1 = {};
		stickyInfo.foldIn1.object = $('#stickyProduct-' + i + ' .foldIn1');
		stickyInfo.foldIn1.height = $('#stickyProduct-' + i + ' .foldIn1').height();
		stickyInfo.foldIn2 = {};
		stickyInfo.foldIn2.object = $('#stickyProduct-' + i + ' .foldIn2');
		stickyInfo.foldIn2.height = $('#stickyProduct-' + i + ' .foldIn2').height();
		stickyInfos.push(stickyInfo);
		i++;
	}
}

function stickyProductDescription() {
	for (var i = 0, len = stickyInfos.length; i < len; i++) {
		stickyProductBehaviour(stickyInfos[i], scrollAmount);
	}
}

function stickyProductBehaviour(stickyBlock, scrollAmount) {
	if (scrollAmount >= stickyBlock.separator.offset().top && scrollAmount <= (stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height() )) {
		blockScroll = scrollAmount - stickyBlock.topSect.offset().top;
		distance = (parseFloat(stickyBlock.stickyProduct.css('marginTop')) - blockScroll - stickyInfo.stickyProductWrapper.scrollTop());
		blockRange = (stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height()) - stickyBlock.separator.offset().top;
		distanceTop = stickyBlock.stickyProduct.css('marginTop');
		if (blockScroll <= 0) {
			stickyBlock.stickyProductWrapper.css('position', 'absolute');
			stickyBlock.stickyProductWrapper.css('top', stickyBlock.topSect.offset().top);
		} else if (distance >= 0 && (blockScroll < (blockRange - stickyBlock.stickyProduct.outerHeight()))) {
			stickyBlock.stickyProduct.css('top', -blockScroll);
			stickyBlock.stickyProductWrapper.css('position', 'fixed');
			stickyBlock.stickyProductWrapper.css('top', 0);
			stickyBlock.foldIn1.object.height(stickyBlock.foldIn1.height);
		} else if (distance < 0 && blockScroll < (blockRange - stickyBlock.stickyProduct.outerHeight())) {
			stickyBlock.stickyProductWrapper.css('position', 'fixed');
			stickyBlock.stickyProductWrapper.css('top', 0);
			stickyBlock.stickyProduct.css('top', - parseFloat(stickyBlock.stickyProduct.css('marginTop')));
			stickyBlock.stickyProduct.css('position', 'absolute');
			stickyBlock.foldIn1.object.height(stickyBlock.foldIn1.height - (blockScroll - parseFloat(distanceTop)));
			stickyBlock.foldIn2.object.height(stickyBlock.foldIn2.height);
			if (stickyBlock.foldIn1.object.height() <= 0) {
				stickyBlock.foldIn2.object.height(stickyBlock.foldIn2.height - (blockScroll - stickyBlock.foldIn1.height - parseFloat(distanceTop)));
			}
			if (blockScroll >= stickyBlock.stickyProductWrapper.height() - 240) {
				stickyBlock.stickyProduct.css('backgroundColor', '#ffffff');
			} else if (blockScroll <= stickyBlock.stickyProductWrapper.height() - 240) {
				stickyBlock.stickyProduct.css('backgroundColor', 'transparent');
			}
		} else if (distance < 0 && blockScroll >= (blockRange - stickyBlock.stickyProduct.outerHeight())) {
			stickyBlock.stickyProductWrapper.css('position', 'absolute');
			stickyBlock.stickyProductWrapper.css('top', (stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height()) - stickyBlock.stickyProduct.outerHeight());
			distance = 0;
			blockScroll = 0;
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

function toggleFoldoutSizes() {
	$('.foldout-button').toggleClass('open');
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