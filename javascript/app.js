$( document ).ready(function() {
	getScrollTop();
	stickyProductInit();
	slideShowInit();
	resizeFoldOutSizes();
	verticalCenterStickyProductDescription();
	adaptHeights();
	displayStores();

	bagFoldedOut = false;

	$('.js-mobile-nav-foldout').on('click', mobile_nav_foldout);
	$('.js-mobile-nav-toggle').on('click', mobile_nav_toggle);
	$('.js-wishlist-save-toggle').on('click', wishlist_save_toggle);

	bagFoldedOut = false;
	$("#menuBag").click(function() {
		if(bagFoldedOut == false){
			//$openFoldOut = TweenMax.to("#foldOut", 0.3, {right: 0});
			//$menuBag = TweenMax.to("#menuBag", 0.1, {backgroundColor: '#eeeeee'});
			$('body').removeClass('bag-is-not-active').addClass('bag-is-active');
			$('#menuBag').addClass('is-active');
			bagFoldedOut = true;
		} else {
			//$closeFoldOut = TweenMax.to("#foldOut", 0.3, {right: -400});
			//$menuBag = TweenMax.to("#menuBag", 0.1, {backgroundColor: '#ffffff'});
			$('body').removeClass('bag-is-active').addClass('bag-is-not-active');
			$('#menuBag').removeClass('is-active');
			bagFoldedOut = false;
		}
	});
	$('.foldout-button').hover(function() {
		toggleFoldoutSizes();
		menuBGColor();
	});
	
	$('#menuSearch').click(function() {
		$('#searchWrapper').css('display', 'block');
	});
	$('#closeSearch').click(function() {
		$('#searchWrapper').css('display', 'none');
	});
	$('.size').click(function() {
		$('.size').removeClass('active');
		$(this).addClass('active');
	});
	$('.color').click(function() {
		$('.color').removeClass('active');
		$(this).addClass('active');
	});
	$('#storeSelector').change(function() {
		displayStores();
	});
	$('.star').click(function() {
		$(this).toggleClass('activated');
		if($(this).parent().find('.star-hover-text').text() == 'Save for later'){
			$(this).parent().find('.star-hover-text').text('Remove from favourites');
		} else {
			$(this).parent().find('.star-hover-text').text('Save for later');
		}
	});
	$('.star').hover(function() {
		$(this).parent().find('.button-text').addClass('invisible');
		$(this).parent().find('.star-hover-text').addClass('visible');
	}, function() {
		$(this).parent().find('.button-text').removeClass('invisible');
		$(this).parent().find('.star-hover-text').removeClass('visible');
	});

	$('#storeSlider').find('.icon').click(function(){
		if($(this).hasClass('left')) {
			$('#dateSwitchHeader').css('left', '+=100%');
			$('#dateSwitch').css('left', '+=100%');
		} else {
			$('#dateSwitchHeader').css('left', '-=100%');
			$('#dateSwitch').css('left', '-=100%');
		}
		console.log($('#dateSwitchHeader').css('left'));
		console.log($('#dateSwitch').css('left'));
		if(parseInt($('#dateSwitchHeader').css('left')) > 0) {
			console.log('ping');
			$('#dateSwitchHeader').css('left', 0);
			$('#dateSwitch').css('left', 0);
		}
	});

	slideShow.forEach(function(slide) {
		slide.trigger.mouseover(function() {
			slideShow.forEach(function(hideSlide) {
				hideSlide.image.css('display', 'none');
			});
			slide.image.css('display', 'block');
		});
		slide.trigger.click(function() {
			console.log('ping');
			goToByScroll(slide.target);
		});
	});
});

function menuBGColor() {
	$('.menu-background').each(function(index, el) {
		if(collision(el, $('#topMenu'))) {
			$('body').addClass('menu-backgrounded');
		} else {
			$('body').removeClass('menu-backgrounded');
		}
	});
}

function collision(div1, div2) {
	var x1 = div1.offset().left;
	var y1 = div1.offset().top;
	var h1 = div1.outerHeight(true);
	var w1 = div1.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = div2.offset().left;
	var y2 = div2.offset().top;
	var h2 = div2.outerHeight(true);
	var w2 = div2.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;
	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}

function goToByScroll(id) {
	id = id.replace("link", "");
	$('html,body').animate({
		scrollTop: $("#"+id).offset().top}, 'slow');
}

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

function slideShowInit() {
	var n = 2;
	var i = 0;
	slideShow = new Array();
	while(i <= n) {
		slide = {};
		slide.image = $('#slideShow-' + i);
		slide.trigger = $('#slideTrigger-' + i);
		slide.target = 'slideTarget-' + i;
		i++;
		slideShow.push(slide);
	}
	console.log(slideShow);
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
		stickyInfo.button = $('#stickyProductButton-' + i);
		stickyInfo.foldIn1 = {};
		stickyInfo.foldIn1.object = $('#stickyProduct-' + i + ' .foldIn1');
		stickyInfo.foldIn1.height = $('#stickyProduct-' + i + ' .foldIn1').outerHeight();
		stickyInfo.foldIn2 = {};
		stickyInfo.foldIn2.object = $('#stickyProduct-' + i + ' .foldIn2');
		stickyInfo.foldIn2.height = $('#stickyProduct-' + i + ' .foldIn2').outerHeight();
		stickyInfos.push(stickyInfo);
		i++;
	}
	console.log(stickyInfos);
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
		//console.log(blockScroll);
		if (blockScroll <= 0) {
			stickyBlock.stickyProductWrapper.css({top: stickyBlock.topSect.offset().top, position: 'absolute'});
		} else if (distance > 0 && (blockScroll < (blockRange - stickyBlock.stickyProduct.outerHeight()))) {
			//console.log('stickyBlock fold1 height = ' + stickyBlock.foldIn1.object.height());
			//console.log('stickyBlock fold1 original height = ' + stickyBlock.foldIn1.height);
			stickyBlock.stickyProduct.css('top', -blockScroll);
			//console.log('stickyProduct Top' + stickyBlock.stickyProduct.css('top'));
			stickyBlock.stickyProductWrapper.css({position: 'fixed', top: 0});
			stickyBlock.foldIn1.object.height(stickyBlock.foldIn1.height);
		} else if (distance < 0 && blockScroll < (blockRange - stickyBlock.stickyProduct.outerHeight())) {
			stickyBlock.stickyProductWrapper.css({position: 'fixed', top: 0});
			stickyBlock.stickyProduct.css({top: - parseFloat(stickyBlock.stickyProduct.css('marginTop')), position: 'absolute'});
			stickyBlock.foldIn1.object.height(stickyBlock.foldIn1.height - (blockScroll - parseFloat(distanceTop)));
			stickyBlock.foldIn2.object.height(stickyBlock.foldIn2.height);
			stickyBlock.button.removeClass('attached');
			if (stickyBlock.foldIn1.object.height() <= 0) {
				stickyBlock.foldIn2.object.height(stickyBlock.foldIn2.height - (blockScroll - stickyBlock.foldIn1.height - parseFloat(distanceTop)));
				stickyBlock.button.addClass('attached');
			}
			if (blockScroll >= stickyBlock.stickyProductWrapper.height() - 240) {
				stickyBlock.stickyProduct.css('backgroundColor', '#ffffff');
			} else if (blockScroll <= stickyBlock.stickyProductWrapper.height() - 240) {
				stickyBlock.stickyProduct.css('backgroundColor', 'transparent');
			}
		} else if (distance < 0 && blockScroll >= (blockRange - stickyBlock.stickyProduct.outerHeight())) {
			stickyBlock.stickyProductWrapper.css({position: 'absolute', top: (stickyBlock.bottomSect.offset().top + stickyBlock.bottomSect.height()) - stickyBlock.stickyProduct.outerHeight()});
			distance = 0;
			blockScroll = 0;
		}
	}
}

function verticalCenterStickyProductDescription() {
	for (var i = 0, len = stickyInfos.length; i < len; i++) {
		var container = stickyInfos[0].stickyProductWrapper;
		var content = stickyInfos[0].stickyProduct;
		var newTop = stickyInfos[0].stickyProductWrapper.height() - stickyInfos[0].stickyProduct.height() / 2 - 120;
		stickyInfos[0].stickyProduct.css('marginTop', newTop);
	}
}

function displayStores() {
	$("#storeSelector").removeClass('visible-block');
	selectedStores = $("#storeSelector").children('option').filter(':selected').text().toUpperCase();
	var index = 1
	if(selectedStores == 'SELECT COUNTRY') {
		$('.store-block').each(function(i, elem) {
			$(elem).removeClass('line-top line-right visible-block');
			$(elem).addClass('visible-block');
				$(elem).addClass('line-bottom');
			if(index == 1) {
				$(elem).addClass('line-top line-right');
			} else if(index == 2) {
				$(elem).addClass('line-top');
			} else if(index % 4 != 0) {
				$(elem).addClass('line-right');
			}
			index++;
		});
		$('#numberOfStores').text('TOTAL: 42 STORES');
	} else {
		$('.store-block').each(function(i, elem) {
			$(elem).removeClass('line-top line-right visible-block');
			if($(elem).html().indexOf(selectedStores) > -1) {
				$(elem).addClass('visible-block');
					$(elem).addClass('line-bottom');
				if(index == 1) {
					$(elem).addClass('line-top line-right');
				} else if(index == 2) {
					$(elem).addClass('line-top');
				} else if(index % 4 != 0) {
					$(elem).addClass('line-right');
				}
				index++;
			}
		});
		$('#numberOfStores').text(index + ' OF 42 STORES');
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
function wishlist_save_toggle(e) {
	$(this).toggleClass('is-active');
	e.preventDefault();
}



