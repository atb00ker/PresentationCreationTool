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
**************************/
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
**************************/	

/**************************
* Button Updattion Handle
**************************/	
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