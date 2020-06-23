var textBlock = document.createElement("INPUT");
	textBlock.setAttribute("type", "text");

	function calculate (){

	console.log(document.getElementById('throttleValue').value)
	var throttle = document.getElementById('throttleValue').value;
	if(throttle > 100){
		alert("Throttle value too high!");
	} else{
		var speed = 0;
		var speed =(throttle*120);

		var fuel = throttle/2.0;

		document.getElementById("speedValue").value= speed;
		document.getElementById("fuelValue").value= fuel;

		console.log(speed);
		console.log(fuel);
	}
	}
//bar food
var i = 0;
	function move() {
		if (i == 0) {
			i = 1;
		var element = document.getElementById("barOne");
		var width = 10;
		var id = setInterval(frame, 20);
		function frame (){
			if (width >= 100) {
				clearInterval(id);
				i = 0;
			} else {
				width++;
				element.style.width = width + "%";
				element.innerHTML = width + "%";
			}
		}
	}
}

