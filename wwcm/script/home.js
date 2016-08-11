/**
 * 
 */

// 页面大小改变时，更新其他元素大小;
$(window).resize(function() {
	backgroundDivResize("resize");
});

init();
svgInit();

// 创建一个数组保存正文页面的各个需要设置的参数;每次left比width少0.03*序号个点数;
var contentParamArray = new Object();
//每个cotent相隔3%view_block长度的距离;
var ratio = 3;
var defaultLeft = 25;
var defaultTop = 5;
//一共三个content板块;
var maxNumber = 2;
contentParamArray["content_charactor"] = {
	"number" : 0,
	"background-color" : "#fff",
};
contentParamArray["content_store"] = {
	"number":1,
	"background-color" : "#fff",
};
contentParamArray["content_pv"] = {
	"number":2,
	"background-color" : "#fff",
};

$(function() {
	
	backgroundDivResize("onload");

	
	$(".view_block").hide();
	
	$("#rightbar").css({
		left:"100%",
	})
	
	$(".project-carousel").hide();

	$("#topbar").animate({
		top : "-2%",
	}, 1500, "easeOutQuad");
	

	// 先开始画背景;
	setTimeout(function() {
		drawBackgroundSvg();
	}, 2000);

	// 再开始画人物;
	setTimeout(function() {
		drawCharactorSvg();
	}, 4000);

	// 弹出菜单;
	setTimeout(function() {
		showBars();
	}, 14000);
});

function drawBackgroundSvg() {
	$("#cg_b").show();
	var svgDrawsvg_b = $("#cg_b").drawsvg({
		duration : 1000,
		easing : "easeInQuad"
	});
	svgDrawsvg_b.drawsvg('animate');
}

function drawCharactorSvg() {

	$("#cg_c").show();
	var svgDrawsvg_c = $("#cg_c").drawsvg({
		duration : 6000,
		easing : "easeInQuad",
		callback : function() {
			/*
			 * 线稿完成后的callback函数;
			 */
			$("#topbar p").text("少女上色中...")
			$("#content_div").height(currentBodyHeight);
			$("#content_div").animate({
				opacity : 1
			}, 4000, "easeInQuad", function() {
				/*
				 * 上色完成后的callback函数;
				 */

			});

			$("#cg_b").animate({
				opacity : 0
			}, 4000);

			$("#cg_c").animate({
				opacity : 0
			}, 4000);

		}
	});
	svgDrawsvg_c.drawsvg('animate');
}

function showBars() {
	/*
	 * content_div
	 */
	$(".view_block").show();
	$("#view_1").animate({
			opacity : 1
		}, 2000, "easeOutQuad"
	);
	
	$("#content_div").css({
		"background-attachment":"fixed",
		"width":currentBodyWidth,
		"height":currentBodyHeight * 2.2,
		"min-height":"1485px",
	});
	
	/*
	 * top:
	 */
	$("#topbar p").text("少女休息中...");
	$("#topbar").animate({
		width : "60%"
	}, 2000, "easeOutQuad", function() {
		bindFunction();
	});

	/**
	 * slick;
	 */
	$(".project-carousel").show();

	/*
	 * 图片轮播
	 */
	// 前景
	$(".project-detail").slick({
		slidesToShow : 1,
		initialSlide : 2,
		fade : true,
		arrows : false,
		asNavFor : '.project-strip',
		autoplay : true,
		autoplaySpeed : 4000
	});
	// 后景
	$(".project-strip").slick({
		slidesToShow : 3,
		slidesToScroll : 1,
		initialSlide : 2,
		arrows : false,
		asNavFor : '.project-detail',
		dots : false,
		infinite : true,
		centerMode : true,
		centerPadding : "0",
		focusOnSelect : true,
		easing : "easeOutQuad"
	});

	$(".project-carousel").animate({
		opacity : 1
	}, 2000, "easeOutQuad");

	/*
	 * leftbar_content:
	 */
	$("#leftbar").show();
	$("#leftbar .content").animate({
		opacity : 1
	}, 2000, "easeOutQuad")

	/*
	 * bottom:
	 */
	$("#bottombar").show();
	
	/*
	 * right
	 */
	$("#rightbar").show();

	$("#rightbar").animate({
		left : "95%"
	}, 2000, "easeOutQuad",function(){
		$("#rightbar").css({
			"left" : "95%",
		});
	});
}

// 为元素绑定事件;在showbars结束后进行;
function bindFunction() {
	$("#leftbar .content").click(function() {
		if(!$("#leftbar .content").is("animated")){
			contentDivShowHideAnimate($(this).attr("id"));
		}
	});

	$("#rightbar").hover(function() {
		$("#rightbar").stop().animate({
			"left" : "90%",
		}, 500, "easeOutQuad");
		$("#rightbar .content").animate({
				"background-color":"#e5e5e5"
		});
	}, function() {
		$("#rightbar").stop().animate({
			"left" : "95%",
		}, 500, "easeOutQuad");
	});
}

//开关，动画进行中时点击不再起效；
function contentDivShowHideAnimate(id) {
	
	
	// 先停止当前动画，避免动画积累;
//	$("#leftbar .content").stop();
	
	if (!id) {
		id = "content_pv";
	}
	
	var clickItemNumber = contentParamArray[id]["number"];
	//点击第一个面板时不进行操作;
	if(clickItemNumber == 0){
		return;
	}
		
	var moveBackItemNum = 0;
	var moveBackItemIds = [];
	var moveBeforeItemNum = 0;
	var moveBeforeItemIds = [];
	
	$.each(contentParamArray,function(key,value){
		if(value["number"] >= clickItemNumber){
			moveBeforeItemNum += 1;
			moveBeforeItemIds.push(key);
		}else{
			moveBackItemNum += 1;
			moveBackItemIds.push(key);
		}
	});
	
	/**
	 * 将靠前的板子移动到最后；
	 */
	function doMoveBack(){
		for (var i = 0; i < moveBackItemIds.length; i++) {
			var itemId = moveBackItemIds[i];
			var itemNumber = contentParamArray[itemId]["number"] + moveBeforeItemNum;

			$("#leftbar #" + itemId).animate({
				left : defaultLeft + (maxNumber - itemNumber - 1)* ratio + "%",
				top : defaultTop + (maxNumber - itemNumber - 1)* ratio + "%",
				opacity : 0
			}, 1000, "easeOutQuad");
		}
	}
	
	/*
	 * 将后面的板子移动到前面;
	 */
	function doMoveBefore(){
		for (var i = 0; i < moveBeforeItemIds.length; i++) {
			var itemId = moveBeforeItemIds[i];
			var itemNumber = contentParamArray[itemId]["number"] - moveBackItemNum;

			$("#leftbar #" + itemId).animate({
				left : defaultLeft + (maxNumber - itemNumber) * ratio + "%",
				top : defaultTop + (maxNumber - itemNumber) * ratio + "%",
			}, 500, "easeOutQuad");
		}
	}
	
	/*
	 * 移动完成后设置一些属性;
	 */
	function doAfterMoveBack(){
		for (var i = 0; i < moveBackItemIds.length; i++) {
			var itemId = moveBackItemIds[i];
			contentParamArray[itemId]["number"] += moveBeforeItemNum;
			$("#leftbar #" + itemId).css({
				"z-index":10 + maxNumber - contentParamArray[itemId]["number"],
			});
		};
		
		for (var i = 0; i < moveBeforeItemIds.length; i++) {
			var itemId = moveBeforeItemIds[i];
			contentParamArray[itemId]["number"] -= moveBackItemNum;
			$("#leftbar #" + itemId).css({
				"z-index":10 + maxNumber - contentParamArray[itemId]["number"],
			});
		};
	}
	
	function doAfterMoveBefore(){
		for (var i = 0; i < moveBackItemIds.length; i++) {
			var itemId = moveBackItemIds[i];
			var itemNumber = contentParamArray[itemId]["number"];

			$("#leftbar #" + itemId).animate({
				left :defaultLeft + (maxNumber - itemNumber )* ratio + "%",
				top : defaultTop + (maxNumber - itemNumber )* ratio + "%",
				opacity : 1
			}, 1000, "easeOutQuad");
		}
		
	}
	
	doMoveBack();
	
	window.setTimeout(function(){
		doMoveBefore();
	},300);
	
	window.setTimeout(function(){
		doAfterMoveBack();
	},500);
	
	window.setTimeout(function(){
		doAfterMoveBefore();
	},900);
	
}

// 当窗口大小调整时,调整全部元素尺寸;time表示调整的时机:"onload"或"resize"



function backgroundDivResize(time) {

	var width = currentBodyWidth?currentBodyWidth:1200;
	var height = currentBodyHeight?currentBodyHeight:675;
	/*
	 * content_div
	 */
	if(time == "resize"){
		$("#content_div").width(width).height(currentBodyHeight * 2.2);
	}

	/*
	 * svg
	 */
	$("#svg_div").width(width).height(height);
	$("#cg_b").width(width).height(height);
	$("#cg_c").width(width).height(height);
	$("#cg_b").css("left", -width * 0.0).css("top", -height * 0);
	$("#cg_c").css("left", width * 0.052).css("top", -height * 0);

	/*
	 * top
	 */
	$("#topbar").width("30%").height("7%");
//	$("#topbar p").css({
//		"font-size" : "3%",
//		"text-indent" : "10%",
//		"letter-spacing" : "0.5%",
//	});
	/*
	 * left:
	 * 
	 */
	
	// 设置页面参数;

	$.each(contentParamArray,function(key,value){
		itemNumber = value["number"];
		$("#leftbar #" + key).css({
			left : defaultLeft + (maxNumber - itemNumber )* ratio + "%",
			top : defaultTop + (maxNumber - itemNumber )* ratio + "%",
		});
		$("#leftbar #" + key).css({
			"background-color" : value["background-color"],
		});
	});

	/*
	 * bottom
	 */
	$("#bottombar").css({
		bottom:"0"
	});
	
	/*
	 * right
	 */

	if (time === "resize") {
		
	} else if (time === "onload") {

	}

	$("#rightbar .area").not(":first").css({
		"margin-top" : "10%",
		"margin-bottom" : "10%"
	});

	$("#rightbar .area:first").css({
		"margin-top" : currentBodyHeight * 0.2,
		"margin-bottom" : "10%"
	})

}

function init() {
	$("#bottombar").hide();
	$("#leftbar").hide();
	$("#rightbar").hide();
}

function svgInit() {
	$("svg").hide();

}