
//网页背景图片统一按16:9处理;
var defaultRatio = 16/9;

$(window).ready(function(){
	initWebSize();
});

$(window).resize(function(){
	initWebSize();
});

var currentBodyWidth = 0;// body的宽（当做标准来使用）
var currentBodyHeight = 0;// body的高（当做标准来使用）

function initWebSize(){

	var width = window.innerWidth;
	var height = window.innerHeight >= width/defaultRatio?window.innerHeight:width/defaultRatio;
	
	if(width <= 1200){
		width = 1200;
	}
	
	if(height <= 675){
		height = 675;
	}
	
	//保存页面是以哪个值为标准计算的；
	var standard;
	//若页面拉的过长,则以长为基准；
	if(height <= width/defaultRatio){
		height = width/defaultRatio;
		standard = "width";
	}
	//若页面拉得过高,则以宽为基准;
	else {
		width = height*defaultRatio;
		standard = "height";
	}

//	$("body").css("width",width);
//	$("body").css("height",height);

	currentBodyWidth = parseInt(width);
	currentBodyHeight = parseInt(height);
	
	//隐藏滚动条;
//	if(standard == "width"){
//		$("body").css("overflow-x","hidden");
//		$("body").css("overflow-y","scroll");
//
//	}else{
//		$("body").css("overflow-y","hidden");
//		$("body").css("overflow-x","scroll");
//
//	}

}