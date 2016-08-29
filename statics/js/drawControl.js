var c;
var ctx;
var c2;
var ctx2;
var oX,oY;
var brushSize;
var brushSize;
var bMouseDown;
var imgNum = 0;
$(function() {
	var myScroll;
	var canvas;
	loaded();
	setTimeout(function () {
		$("#drawNavBox").fadeIn();
	}, 300);
	// 初始化canvas
	setTimeout(function () {
		$($('.tool-box')[0]).find('.tool-setting').slideDown();
		createCanvas(canvasInit);
		setTimeout(function () {
			myScroll.refresh();
		}, 0)
	}, 800);
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
				setTimeout(function () {
					myScroll.refresh();
				}, 1000)
	});
	// 切换背景
	$(".bg-selector>div").on('click', function(event) {
		event.preventDefault();
		var left = $(this).offset().left;
		console.log(left);
		$(this).attr('data-isimg', 'true').siblings().attr('data-isimg', 'false');
		$("#bg-scroll-box").css({
			'left': left-2
		});
	});

	/**
	 * [description]铅笔工具
	 * @param  {[type]} event) {					}     [description]
	 * @return {[type]}        [description]
	 */
	$("#pencil").on('click', function(event) {
		ctx.lineWidth = getSize($(this).find('#btn'));
		ctx2.lineWidth = getSize($(this).find('#btn'));
		freeBrush();
	});

	$("#text").on('click', function(event) {
		ctx.lineWidth = getSize($(this).find('#btn4'));
		ctx2.lineWidth = getSize($(this).find('#btn4'));
		line();
	});

	$("#square").on('click', function(event) {
		ctx.lineWidth = getSize($(this).find('#btn5'));
		ctx2.lineWidth = getSize($(this).find('#btn5'));
		$("#myCanvas").unbind();
		event.preventDefault();
		graphingRectangle();
	});


	$("#brush").on('click', function(event) {
		$("#myCanvas").unbind();
		ctx.lineWidth = getSize($(this).find('#btn2'));
		ctx2.lineWidth = getSize($(this).find('#btn2'));
		var url = $(this).find('.bg-selector').children("div[data-isimg$='true']").find('img').attr('src');
		console.log(url);
		imgBrush(url);
	});

	$("#delete").on('click', function(event) {
		$("#myCanvas").unbind();
		event.preventDefault();
		clearCanvas();
	});

	$("#bezier").on('click', function(event) {
		// bezier();
	});

	$("#save").on('click', function(event) {
		event.preventDefault();
		var dt = c.toDataURL('image/png');
		$.ajax({
			url: '/img/upload',
			type: 'post',
			data: {
				name: 'pic'+imgNum,
				imgUrl: dt 
			},
			success: function  (data) {
				alert(data);
				imgNum+=1;
			}
		})
		
		$(this).attr('href', dt);
	});

	$("#eraser").on('click', function(event) {
		event.preventDefault();
		var size = $("#btn3").attr('data-size');
		console.log(size);
		eraser(size);
	});

	$("#circle").on('click', function(event) {
		$("#myCanvas").unbind();
		ctx.lineWidth = getSize($(this).find('#btn2'));
		ctx2.lineWidth = getSize($(this).find('#btn2'));
		event.preventDefault();
		graphingCircle();
	});

	function loaded () {
		myScroll = new IScroll('#scrollWrapper', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			fadeScrollbars: true
		});
	}

	function createCanvas(fn) {
		var wid = $(".main-box").width()-32;
		var canCon = $('<div class="canvas-container"></div>');
		var str = '<canvas class="rcanvas" id="myCanvas" width='+wid+' height="550"></canvas>';
		console.log(str);
		var myCanvas = $('<canvas class="rcanvas" id="myCanvas" width="'+wid+'" height="550"></canvas>') 
		var myCanvas2 = $('<canvas class="rcanvas" id="myCanvas2" width="'+wid+'" height="550"></canvas>') 
		canCon.css({
			width: $(".main-box").width()-32,
			height: 550,
			margin: '0 10px',
			background: '#fff'
		});

		canCon.appendTo('.main-box-in');
		myCanvas.appendTo('.canvas-container');
		myCanvas2.appendTo('.canvas-container');
		canCon.fadeIn('slow');
		$('.main-box-in').css('overflow-y', 'scroll');
		fn();
	}
	/**
	 * [canvasInit description]:初始化canvas
	 * @return {[type]} [description]
	 */
	function canvasInit() {
		c  = document.getElementById('myCanvas');
		ctx     = c.getContext("2d");
		c2  = document.getElementById('myCanvas2');
		ctx2     = c2.getContext("2d");
		ctx.lineJoin = 'round';
		ctx2.lineJoin = 'round';
		freeBrush();
		ctx.lineWidth = getSize($('#btn'));
		ctx2.lineWidth = getSize($('#btn'));
		myScroll.refresh();
	}

	// 清除画布
	function clearCanvas() {
		$("#myCanvas").unbind();
		ctx.clearRect(0, 0, $(c).width(), $(c).height()); // Clears the canvas
	}
	//橡皮
	function eraser(size) {
		c.onmousedown = function (event) {
			oX = event.offsetX;
			oY = event.offsetY;
			var flag_freeBrush = 1;
			c.onmousemove = function (event) {
				if(flag_freeBrush){
					ctx.clearRect(oX,oY,size,size);
					oX = event.offsetX;
					oY = event.offsetY;
				}		
		    }
		    c.onmouseup = function (event) {
		    	flag_freeBrush = 0;
		    	ctx.save();
		    }
		}	
	}

	function freeBrush() {	
		var flage       = false;//绘图开关
		// getSize();
		var tmpX , tmpY ; 

		ctx.lineJoin = "round" ;

		$('#myCanvas').on('mousedown touchstart', function(event) {
			event.preventDefault();
			var t = $(this);
			ctx.beginPath();
			var oX = event.offsetX;
			var oY = event.offsetY;
			ctx.moveTo(oX,oY);
			var flag_freeBrush = 1;
			t.on('mousemove touchmove', function(event) {
				event.preventDefault();
				if(flag_freeBrush){
					ctx.lineTo(event.offsetX,event.offsetY);
					ctx.stroke();
				}	
			});
			t.on('mouseup touchend', function(event) {
				event.preventDefault();
				flag_freeBrush = 0;
			});
			t.on('mouseout touchend', function(event) {
				event.preventDefault();
				flag_freeBrush = 0;
			});
		});
		// c.onmousedown = function (event) {

		// 	ctx.beginPath();
		// 	var oX = event.offsetX;
		// 	var oY = event.offsetY;
		// 	ctx.moveTo(oX,oY);
		// 	var flag_freeBrush = 1;
		// 	c.onmousemove = function (event) {
		// 		if(flag_freeBrush){
		// 			ctx.lineTo(event.offsetX,event.offsetY);
		// 			ctx.stroke();
		// 		}		
		// 	}
		// 	c.onmouseup = function (event) {
		// 		flag_freeBrush = 0;
		// 	}

		// 	c.onmouseout = function (event) {
		// 		flag_freeBrush = 0;
		// 	}
		// }     	
	}

// 绘制矩形
	function graphingRectangle () {
		 c.onmousedown = function (event) {
			oX = event.offsetX;
			oY = event.offsetY;
			c2.style.display = "block"; 
			c2.onmousemove = function(event) {
				ctx2.clearRect(0,0,$(".main-box").width()-32,550);
				var rectangle_width  = event.offsetX - oX;
				var rectangle_height = event.offsetY- oY;
				ctx2.strokeRect(oX,oY,rectangle_width,rectangle_height);
			}
			c2.onmouseup = function (event) {
				ctx.beginPath();
				var rectangle_width  = event.offsetX - oX;
				var rectangle_height = event.offsetY- oY;
				ctx.strokeRect(oX,oY,rectangle_width,rectangle_height);
				c2.style.display = "none";
			}
		}
	}
	//绘制圆形
	function graphingCircle () {
		c.onmousedown = function (event) {
			oX = event.offsetX;
			oY = event.offsetY;
			c2.style.display = "block";
			c2.onmousemove = function(event) {
				ctx2.clearRect(0,0,$(".main-box").width()-32,550);
				ctx2.beginPath();
				var circle_width  = event.offsetX - oX;
				var circle_height = event.offsetY- oY;
				var circle_r = Math.max(circle_width,circle_height);
				ctx2.arc(event.offsetX,event.offsetY,circle_r,0,2*Math.PI);
				ctx2.stroke();
			}
			c2.onmouseup = function (event) {
				ctx.beginPath();
				var circle_width  = event.offsetX - oX;
				var circle_height = event.offsetY- oY;
				var circle_r = Math.max(circle_width,circle_height);
				ctx.arc(event.offsetX,event.offsetY,circle_r,0,2*Math.PI);
				ctx.stroke();
				c2.style.display = "none";
			}
		}
	}
	//绘制bezier
	/*function bezier () {
		c.onmousedown = function (event) {
			oX = event.offsetX;
			oY = event.offsetY;
			c2.style.display = "block";
			bMouseDown = true;
			var canvasOffset = $(c).offset();
			var canvasX = Math.floor(event.pageX - canvasOffset.left);
			var canvasY = Math.floor(event.pageY - canvasOffset.top);
		    BezierCurveBrush.startCurve(canvasX, canvasY, false, false, false, false, false, false, canvasX, canvasY, 0, 0);
			c2.onmousemove = function(event) {
				if (bMouseDown) {
				    var canvasOffset = $(c).offset();
				    var canvasX = Math.floor(event.pageX - canvasOffset.left);
				    var canvasY = Math.floor(event.pageY - canvasOffset.top);
				    BezierCurveBrush.draw(canvasX, canvasY, false, false, false, false, false, false, canvasX, canvasY, 0, 0);
				}
			}
			c2.onmouseup = function (event) {
			    bMouseDown = false;
				ctx.beginPath();
				rectangle_width  = event.offsetX - oX;
				rectangle_height = event.offsetY- oY;
				if(rectangle_height > rectangle_width)
					rectangle_width = rectangle_height;
				ctx.strokeRect(oX,oY,rectangle_width,rectangle_width);
				c2.style.display = "none";
			}
		}
	}
	*/
	// 直线
	function line() {
		var oX,oY       = 0;//起始坐标
		var flage       = 0;//绘图开关
		var dx,dy;
		function drawLine(ox,oy,dx,dy) {
			ctx2.clearRect(0,0,$(".main-box").width()-32,550);
			ctx2.beginPath();
			ctx2.moveTo(oX,oY);
			ctx2.lineTo(dx,dy);
			ctx2.stroke(); 
		}
		c.onmousedown = function (event) {
			oX = event.offsetX;
			oY = event.offsetY;
			flage = 1;
			c2.style.display = "block"; 

			c2.onmousemove = function (event) {
				if (flage) {
					drawLine(oX, oY,event.offsetX,event.offsetY);
					dx = event.offsetX;
				    dy = event.offsetY;
				}
			}
			c2.onmouseup = function (event) {
				c2.style.display = "none";
				flage = 0;
				drawLowLine (oX,oY,dx,dy,ctx);
			}
			function drawLowLine (oX,oY,dx,dy,canvas) {
				ctx.beginPath();
				ctx.moveTo(oX,oY);
				ctx.lineTo(dx,dy);
				ctx.stroke();
			}
		}
	}

	// 笔刷
	function imgBrush(url) {
		var flage       = false;//绘图开关
		// getSize();
		var tmpX , tmpY ; 
		var base_image = new Image();
		base_image.src = url;
		base_image.onload = function(){

			c.onmousedown = function (event) {
				ctx.beginPath();
				var oX = event.offsetX;
				var oY = event.offsetY;
				ctx.moveTo(oX,oY);
				var flag_freeBrush = 1;
				c.onmousemove = function (event) {
					if(flag_freeBrush){
						ctx.drawImage(base_image, event.offsetX, event.offsetY);
						ctx.stroke();
					}		
				}
				c.onmouseup = function (event) {
					flag_freeBrush = 0;
				}
				c.onmouseout = function (event) {
					flag_freeBrush = 0;
				}
			}
		}
	}

	// 下载

	$("#colorpicker").spectrum({
	    color: "#000",
	    hide: function(color) {
	    	var color = color.toHexString();
	    	ctx.fillStyle = color;
	    	ctx2.fillStyle = color;
	    	ctx.strokeStyle = color;
	    	ctx2.strokeStyle = color;
	    },
	});

	// 获取线的宽度
	var getSize = function (obj) {
		var size = obj.attr('data-size');
		return size;
	}

	$(".color-content").on('click', function(event) {
		event.preventDefault();

	});	

	var BezierCurveBrush = {
	    // inner variables
	    iPrevX : 0,
	    iPrevY : 0,
	    points : null,

	    // initialization function
	    init: function () { },

	    startCurve: function (x, y) {
	        this.iPrevX = x;
	        this.iPrevY = y;
	        this.points = new Array();
	    },

	    getPoint: function (iLength, a) {
	        var index = a.length - iLength, i;
	        for (i=index; i< a.length; i++) {
	            if (a[i]) {
	                return a[i];
	            }
	        }
	    },

	    draw: function (x, y) {
	        if (Math.abs(this.iPrevX - x) > 5 || Math.abs(this.iPrevY - y) > 5) {
	            this.points.push([x, y]);

	            // draw main path stroke
	            ctx.beginPath();
	            ctx.moveTo(this.iPrevX, this.iPrevY);
	            ctx.lineTo(x, y);

	            ctx.lineWidth = 1;
	            ctx.strokeStyle = 'rgba(0,0,0.2)';
	            ctx.stroke();
	            ctx.closePath();

	            // draw extra strokes
	            ctx.strokeStyle = 'rgba(0,0,0.2)';
	            ctx.beginPath();
	            var iStartPoint = this.getPoint(25, this.points);
	            var iFirstPoint = this.getPoint(1, this.points);
	            var iSecondPoint = this.getPoint(5, this.points);
	            ctx.moveTo(iStartPoint[0],iStartPoint[1]);
	            ctx.bezierCurveTo(iFirstPoint[0], iFirstPoint[1], iSecondPoint[0], iSecondPoint[1], x, y);
	            ctx.stroke();
	            ctx.closePath();

	            this.iPrevX = x;
	            this.iPrevY = y;
	        }
	    }
	};

});