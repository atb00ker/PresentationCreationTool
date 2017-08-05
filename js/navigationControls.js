var slides = [[0,0],[1,0],[2,0],[2,1],[2,2],[2,3]];
var progressLenght=0;
for(x=0;x<slides.length;x++){
	if(slides[x][1]==0) progressLenght++;
}
var userPosition=0;
var currentPositionY=0;
document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides	[userPosition][1]).classList.add("slideActive");
slideExistence();
/*This Section is to check the existence of current slide in all the directions*/
function slideExistence() {
/*Slide Right Check*/
	for(x=userPosition;x<slides.length;x++){
		if(slides[userPosition][1]!=0){
			slideExistenceRight = false;
			document.getElementById("navControlsRight").classList.add("buttonPassive");
			break;
		}		
		else if(slides[userPosition][0]<slides[x][0]){
			slideExistenceRight = true;
			document.getElementById("navControlsRight").classList.remove("buttonPassive");
			break;
		}
		else {
			slideExistenceRight = false;
			document.getElementById("navControlsRight").classList.add("buttonPassive");
		}
	}
/*Slide Left Check*/
	for(x=userPosition;x>=0;x--){
		if(slides[userPosition][1]!=0){
			slideExistenceLeft = false;
			document.getElementById("navControlsLeft").classList.add("buttonPassive");
			break;
		}		
		else if(slides[userPosition][0]>slides[x][0]){
			slideExistenceLeft = true;
			document.getElementById("navControlsLeft").classList.remove("buttonPassive");
			break;
		}
		else {
			slideExistenceLeft = false;
			document.getElementById("navControlsLeft").classList.add("buttonPassive");
		}
	}
/*Slide Up Check*/
	for(x=userPosition;x<slides.length;x++){
		if(slides[userPosition][0]==slides[x][0]){
			if(slides[userPosition][1]<slides[x][1]){
				slideExistenceUp = true;
				document.getElementById("navControlsUp").classList.remove("buttonPassive");
				break;
			}
			else {
			slideExistenceUp = false;
			document.getElementById("navControlsUp").classList.add("buttonPassive");
			}
		}
		else {
			slideExistenceUp = false;
			document.getElementById("navControlsUp").classList.add("buttonPassive");
		}
	}
/*Slide Down Check*/
	for(x=userPosition;x>=0;x--){
		if(slides[userPosition][0]==slides[x][0]){
			if(slides[userPosition][1]>slides[x][1]){
				slideExistenceDown = true;
				document.getElementById("navControlsDown").classList.remove("buttonPassive");
				break;
			}
			else {
			slideExistenceDown = false;
			document.getElementById("navControlsDown").classList.add("buttonPassive");
			}
		}
		else {
			slideExistenceDown = false;
			document.getElementById("navControlsDown").classList.add("buttonPassive");
		}
	}
/*Progress Bar update*/
	progressTrack();
}
/*Pressing Button Actions
These functions need Slide existence in all direction in work.*/
function buttonClickRight() {
	if(slideExistenceRight == true) {
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.remove("slideActive");
			do{
			userPosition++;
			}while(slides[userPosition][1]!=0);//Forwards the slide until next slide in X-axis is found.
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.add("slideActive");
		slideExistence();
	}
}
function buttonClickLeft() {
	if(slideExistenceLeft == true) {
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.remove("slideActive");
			do{
			userPosition--;
			}while(slides[userPosition][1]!=0);//Forwards the slide until next slide in X-axis is found.
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.add("slideActive");
		slideExistence();
	}
}
function buttonClickUp() {
	if(slideExistenceUp == true){
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.remove("slideActive");
		currentPositionY=slides[userPosition][1];
			do{
			userPosition++;
			}while(currentPositionY>=slides[userPosition][1]);//Works till it finds a next slide in Y-axis.
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.add("slideActive");
		slideExistence();
	}
}
function buttonClickDown() {
	if(slideExistenceDown == true){
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.remove("slideActive");
		currentPositionY=slides[userPosition][1];
		do{
		userPosition--;
		}while(slides[userPosition][1]>=currentPositionY);//Works till it finds a next slide in Y-axis.
		document.getElementById("slideX"+slides[userPosition][0]+"Y"+slides[userPosition][1]).classList.add("slideActive");
		slideExistence();
	}
}
/*Progress Bar*/
function progressTrack() {
if(slides[userPosition][1]==0) {
	document.getElementById("progressBar").style.display = "block";
	var progress = document.getElementById("progressBar");
	var percent = (100/(progressLenght))*(userPosition+1);
		progress.style.width = percent + '%';
	}
else
	document.getElementById("progressBar").style.display = "none";
}
/*Call the button action function from input via keyboard*/
window.onkeyup = function(e) {
   var key = e.keyCode;
   if (key == 38) {buttonClickUp();}
   else if (key == 40) {buttonClickDown(); }
   else if (key == 39) {buttonClickRight();}
   else if (key == 37) {buttonClickLeft();}
}