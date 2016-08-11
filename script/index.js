/**
 * 
 */

	   //页面大小改变时，更新其他元素大小;
	   $(window).resize(function(){
 		   backgroundDivResize("resize");
		   });

		coverInit();
		svgInit();
		logoInit();

		$(function(){

			    backgroundDivResize("onload");
			   
				$("#cover").animate({top:"17%"}
				,2000,"easeOutBack",function(){
				    $("#cover img").bind("click",function(){imgOnclick(this)}).addClass("zoom");
					});
				var i = 10.5;
				var transformAni = self.setInterval(function(){
					if(i < 0){
						window.clearInterval(transformAni);
						return;
						}
					i -= 0.1;
					$("#cover").css("transform","rotate("+ i +"deg)");
					},20);
			});
			
		function backgroundDivResize(time){
			   $("#content_div").width(currentBodyWidth).height(currentBodyHeight);
			   $("#content_div").find("#cover").css("width","80%").css("height","57%");
		}

		function coverInit(){
			}

		function imgOnclick(obj){
				var itmeName = obj.id;
				$("#content_div").animate({
						opacity:0
				},1000,"easeOutQuad",function(){
					window.location.href = "/huiyi/"+itmeName.split("_")[0]+"/home.php";
				}) 
			}

		function logoInit(){
			$("#cover").css("top","-75%");
			}
		

		function svgInit(){
			 $("svg").hide();
			}