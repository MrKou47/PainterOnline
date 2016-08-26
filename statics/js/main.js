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

	// 主要侧边栏绑定事件
	$(".nav>li").on('click', function(event) {
		// event.stopPropagation();
		console.log(event.target);
		$(this).siblings()
				.removeClass('nav-on')
				.children('ul')
				.slideUp();
		$(this).addClass('nav-on')
			   .children('ul')
			   .slideDown();
	});
	// 侧边栏子元素绑定事件
	$(".nav-child-list>li").on('click', function(event) {
		event.stopPropagation();
		var iColor = $(this).children('i').css('background-color');
		var tShadow = '0px 0px 10px ' + iColor;
		$(this).siblings('li')
				.removeClass('child-list-on')
				.children('i')
				.css('boxShadow', 'none');
		$(this).addClass('child-list-on')
				.children('i')
				.css({
					'boxShadow': tShadow
				});
	});

	setTimeout(function () {
		$($(".nav li")[1]).find('ul').slideDown('slow');
	},1000)
	// 点击按钮开始 绘画
	$("#drawBtn").on('click', function(event) {
		// event.preventDefault();
		$(".control-box").hide();
		$(".draw-nav-box").show();
		$("#myCanvas").fadeIn();
		loaded();
		// 生成canvas标签
		setTimeout(function () {
			$($('.tool-box')[0]).find('.tool-setting').slideDown();
		}, 500);
	});


	document.addEventListener('touchmove', function (e) {
		e.preventDefault();
	}, false);

	// 初始化swiper 
	var mySwiper = new Swiper ('.swiper-container', {
	  direction: 'horizontal',
	  loop: true,
	  autoplay: 2000,
	  speed: 2000, 
	  // 如果需要分页器
	  pagination: '.swiper-pagination',
	})

	new scale('btn','bar','title');
	new scale('btn2','bar2');
	new scale('btn3','bar3');
	new scale('btn4','bar4');
	new scale('btn5','bar5');
	new scale('btn6','bar6');
});