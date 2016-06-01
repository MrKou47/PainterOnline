$(function() {
	$(".tool-box h2").on('click', function(event) {
		$(this).parents('.tool-box')
				.siblings('.tool-box')
				.removeClass('tool-on')
				.find('.tool-setting')
				.slideUp();
		$(this).parents('.tool-box')
				.addClass('tool-on')
				.children('.tool-setting')
				.slideToggle();
		myScroll.refresh();
	});

	// 切换背景
	$(".bg-selector>div").on('click', function(event) {
		event.preventDefault();
		var left = $(this).offset().left;
		console.log(left);
		$("#bg-scroll-box").css({
			'left': left-2
		});
	});
});