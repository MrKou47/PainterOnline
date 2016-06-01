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
			'paddingTop': hHei
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

	$("#drawBtn").on('click', function(event) {
		event.preventDefault();
		$(".control-box").hide();
		$(".draw-nav-box").show();
		$("#myCanvas").fadeIn();
		loaded();
		var myCanvas = $('<canvas class="rcanvas" id="myCanvas"></canvas>') 
		myCanvas.css({
			width: $(".main-box").width()-32,
			height: 600,
			margin: '26px auto',
			background: '#fff',
			boxShadow: '0px 0px 10px rbga(0,0,0,.5)'
		});
		myCanvas.appendTo('.main-box-in');
		myCanvas.fadeIn('slow');
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

});