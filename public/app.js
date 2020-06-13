let socket;
socket = io.connect('https://codenamesfumi.herokuapp.com/'	);
console.log(socket);
const words = [
	{"name" : "Atlantis", "status" : "blue"},
	{"name" : "Beanstalk", "status" : "neutral"},
	{"name" : "Blimp", "status" : "neutral"},
	{"name" : "Bonnet", "status" : "neutral"},
	{"name" : "Coaster", "status" : "red"},
	{"name" : "Corduroy", "status" : "blue"},
	{"name" : "Cuticle", "status": "red"},
	{"name" : "Drip", "status" : "blue"},
	{"name" : "Elm", "status" : "red"},
	{"name" : "Fizz", "status" : "blue"},
	{"name" : "Flotsam", "status" : "bomb"},
	{"name" : "Hopscotch", "status" : "blue"},
	{"name" : "Ivy", "status": "red"},
	{"name" : "Loiterer", "status" : "neutral"},
	{"name" : "Moth", "status" : "blue"},
	{"name" : "Oar", "status" : "red"},
	{"name" : "Pendulum", "status" : "neutral"},
	{"name" : "Platypus", "status" : "blue"},
	{"name" : "Runt", "status" : "neutral"},
	{"name" : "Scoundrel", "status" : "red"},
	{"name" : "Sequins", "status" : "neutral"},
	{"name" : "Slump", "status" : "red"},
	{"name" : "Tachometer", "status" : "blue"},
	{"name" : "Twang", "status" : "red"},
	{"name" : "Twitterpated", "status" : "blue"}
]

const cellsContainer = document.getElementById('game');

words.forEach((word) => {
	cellsContainer.insertAdjacentHTML("beforeend", `<div class='cell active' data-word="${word.name}" onclick='triggerClickCell()'>${word.name}</div>`);
})
// const divcells = document.querySelectorAll('.cell');
// console.log(divcells);
// divcells.forEach((cell,index)=>{
// 	console.log(words[index]);
// 	cell.innerHTML = `${words[index]["name"]}`
// })

const button = document.getElementById('spymaster')

button.addEventListener("click", () => {
	console.log("spymastaaa!");
	const cells = document.querySelectorAll(".cell");
	console.log(cells)
	cells.forEach((cell,index) => {
		console.log(index);
		cell.classList.toggle("spy"+ words[index]["status"])
	});
})

let redPoints = 8;
let bluePoints = 9;

function showColour(data){
	console.log(data);
	const clickedWord = data.word;

	let clickedCell = document.querySelector(
		`[data-word="${clickedWord}"]`);

	const findName = words.find(element => element.name == clickedCell.innerHTML);

	clickedCell.classList.add(findName.status);
	
	


	if(clickedCell.classList.contains('active')) {
		if(findName.status == 'red') {
			redOut = document.getElementById('reds');
			redPoints --;
			console.log('red' + redPoints);
			redOut.innerHTML = redPoints;
			console.log(redPoints);
		};
		if(findName.status == 'blue') {
			blueOut = document.getElementById('blues');
			bluePoints --;
			console.log('blue' + bluePoints);
			blueOut.innerHTML = bluePoints;
			console.log(bluePoints)
		};

		clickedCell.classList.remove('active');
	};

	if(findName.status == 'bomb') {
		const gam = document.getElementById('game');
		game.style.display = 'none'
	}
}

const triggerClickCell = () => {
	const clickedWord = event.target.innerText;
	console.log(clickedWord);

	let data = {
	word : clickedWord
	} 

	socket.emit('trigger-click-cell', data);
}

socket.on('click-cell', showColour);