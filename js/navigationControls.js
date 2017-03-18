$(document).ready(function(e) {
    var nextBtn = $("#navControlsRight");
	var prevBtn = $("#navControlsLeft");
	initialize();	// initialize and load default slide
	
	/** Control Slides using Arrow Keys **/
	$(window).keydown(function(e){
		switch(e.keyCode){
			case 37: //left
				e.preventDefault();
				loadPrevSlide();
			break;
			case 39:	//right
    			e.preventDefault();
				loadNextSlide();
			break;
			default:
				//leave it
		}
	});
	
	function initialize(){
		$("#preloader").hide("slide",{direction:'up'});
		$(".slide.active").fadeIn();
		updateSlideNumbers();
		if(!checkFirstSlide()){
			checkLastSlide();
		}
	}
	
	/** Control Buttons Handlers **/
	nextBtn.click(function(e){
		e.preventDefault();
		loadNextSlide();	
	});
	prevBtn.click(function(e){
		e.preventDefault();
		loadPrevSlide();	
	});
	/** Load Slides Function **/
	function loadNextSlide(){
		if(!checkLastSlide()){
			var currSlide = $(".slide.active");
			var nextSlide = currSlide.next(".slide");
 			changeSlide(currSlide,nextSlide,1);
		}
	}
	function loadPrevSlide(){
		if(!checkFirstSlide()){
			var currSlide = $(".slide.active");
			var prevSlide = currSlide.prev(".slide");
 			changeSlide(currSlide,prevSlide,-1);
		}
	}
	function changeSlide(currSlide,nextSlide,direction){
		if((direction<0 && !checkFirstSlide()) || (direction>0 && !checkLastSlide())){	
			currSlide.fadeOut();
			nextSlide.fadeIn();
			currSlide.removeClass("active");
			nextSlide.addClass("active");	
		}
		updateSlideNumbers();
		checkLastSlide();
		checkFirstSlide();
	}
	
	/**Checking if Last and First Slides 
		returns true or false
	**/
	function checkLastSlide(){
		var currSlide = $(".slide.active");
		if(currSlide.is(".slide:last")){
			$("#navControlsRight").addClass("buttonPassive");
			return true;
		}
		$("#navControlsRight").removeClass("buttonPassive");
		return false;
	}
	function checkFirstSlide(){
		var currSlide = $(".slide.active");
		if(currSlide.is(".slide:first")){
			$("#navControlsLeft").addClass("buttonPassive");
			return true;
		}
		$("#navControlsLeft").removeClass("buttonPassive");
		return false;
	}
	
	/** Update Slide NUmber in slide Indicators **/
	function updateSlideNumbers(){
		$("#currentSlide").html($(".slide.active").index(".slide")+1);
		$("#totalSlide").html($(".slide:last").index(".slide")+1);
	}
});






/**


xPageOneSet=1;
xPageLastSet=2;
yPageOneSet=0;
yPageLastSet=0;
x=2;
y=0;
refreshOnClick();
function buttonClickRight() {
	if(xPageLastSet>x){
		++x;
		refreshOnClick();
	}
}
function buttonClickLeft() {
	if(xPageOneSet<x){
	   --x;
	   refreshOnClick();
	}
}
function buttonClickUp() {
	if(yPageLastSet>y){
		++y;
		refreshOnClick();
	}
}
function buttonClickDown() {
	if(yPageLastSet<y){
	   --y;
	   refreshOnClick();
	}
}
function refreshOnClick() {
/**************************
* X-Axis Updation Section
**************************
	if(x==1){
		$("#secondPage").removeClass("active");
		$("#homePage").addClass("active");
	}
	if(x==2){
		$("#homePage").removeClass("active");
		$("#secondPage").addClass("active");
	}
/**************************
* Y-Axis Updation Section
**************************

/**************************
* Button Updattion Handle
**************************
	if(xPageLastSet==x){
		$("#navControlsRight").addClass("buttonPassive");
		$("#navControlsRight").removeClass("buttonActive");
	}
	if(xPageLastSet!=x){
		$("#navControlsRight").removeClass("buttonPassive");
		$("#navControlsRight").addClass("buttonActive");	
	}
	if(xPageOneSet==x){
		$("#navControlsLeft").addClass("buttonPassive");
		$("#navControlsLeft").removeClass("buttonActive");
	}
	if(xPageOneSet!=x){
		$("#navControlsLeft").removeClass("buttonPassive");
		$("#navControlsLeft").addClass("buttonActive");	
	}
	if(yPageLastSet==y){
		$("#navControlsDown").addClass("buttonPassive");
		$("#navControlsDown").removeClass("buttonActive");
	}
	if(yPageLastSet!=y){
		$("#navControlsDown").removeClass("buttonPassive");
		$("#navControlsDown").addClass("buttonActive");	
	}
	if(yPageOneSet==y){
		$("#navControlsUp").addClass("buttonPassive");
		$("#navControlsUp").removeClass("buttonActive");
	}
	if(yPageOneSet!=y){
		$("#navControlsUp").removeClass("buttonPassive");
		$("#navControlsUp").addClass("buttonActive");	
	}
}
**/