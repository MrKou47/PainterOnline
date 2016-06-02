var myScroll;
$(function() {
	/**
	 * [setMainBoxWidth description]：修改main的宽度
	 */
	function setMainBoxWidth() {
		var mainWid = null;
		var sWid = $(".sidebar").width();
		var hHei = $(".header").height();
		var bodyWid = $("body").width();
		$(".main-box").css({
			'width': bodyWid-sWid,
			'paddingLeft': sWid,
			'marginTop': hHei
		});
		$(".main-box-in").css({
			height: $(window).height()-hHei-20
		});
		return $(".main-box").width();
	}

	setMainBoxWidth();
	$(window).resize(function(){
		setMainBoxWidth();
	})

	$(".nav>li").on('click', function(event) {
		event.preventDefault();
		// event.stopPropagation();
		console.log(event.target)
		$(this).siblings()
				.removeClass('nav-on')
				.children('ul')
				.slideUp();
		$(this).addClass('nav-on')
			   .children('ul')
			   .slideDown();
	});

	$(".nav-child-list>li").on('click', function(event) {
		console.log(1)
		console.log(event.target);
		event.stopPropagation();
		var iColor = $(this).children('i').css('background-color');
		$(this).siblings('li')
				.removeClass('child-list-on')
				.children('i')
				.css('boxShadow', 'none');
		$(this).addClass('child-list-on')
				.children('i').css({
					'boxShadow': '0px 0px 10px'+iColor
				});
		event.preventDefault();
	});


	// 点击按钮开始 绘画
	$("#drawBtn").on('click', function(event) {
		event.preventDefault();
		$(".control-box").hide();
		$(".draw-nav-box").show();
		$("#myCanvas").fadeIn();
		loaded();
		// 生成canvas标签
		var canCon = $('<div class="canvas-container"></div>');
		var myCanvas = $('<canvas class="rcanvas" id="myCanvas"></canvas>') 
		canCon.css({
			width: $(".main-box").width()-32,
			height: 1600,
			margin: '0 10px',
			background: '#fff'
		});
		myCanvas.css({
			width: $(".main-box").width()-32,
			height: 1600,
		});
		canCon.appendTo('.main-box-in');
		myCanvas.appendTo('.canvas-container');
		canCon.fadeIn('slow');
		$('.main-box-in').css('overflow-y', 'scroll');
		setTimeout(function () {
			$($('.tool-box')[0]).find('.tool-setting').slideDown();
		}, 500);
	});

	function loaded () {
		myScroll = new IScroll('#scrollWrapper', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			fadeScrollbars: true
		});
	}
	document.addEventListener('touchmove', function (e) {
		e.preventDefault();
	}, false);

	// 初始化swiper 
	var mySwiper = new Swiper ('.swiper-container', {
	  direction: 'horizontal',
	  loop: true,
	  // 如果需要分页器
	  pagination: '.swiper-pagination',
	})

	new scale('btn','bar','title');
});