import './index.css';

const getXY = (source) => {
	const y = source.findIndex(arr => arr.includes(null));
	const x = source[y].findIndex(x => x === null);
	return { y, x };
};

const shuffleState = (state) => {
	const suffleArr = (inputArr) => {
		const arr = [...inputArr];
		for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr;
	};
	const flattenArr = state.reduce((acc, val) => {
		return [...acc, ...val];
	}, []);
	const shuffledArr = suffleArr(flattenArr);
	return [
		shuffledArr.slice(0,4),
		shuffledArr.slice(4,8),
		shuffledArr.slice(8,12),
		shuffledArr.slice(12,16),
	];
};

const renderRow = (arr) =>  
	`<div class='square'>${arr.join('</div><div class=\'square\'>')}</div>`;
    
const renderRows = (arr) => {
	return arr.reduce((acc, current) => {
		return acc + renderRow(current);
	}, '');
};

const renderGame = (shuffledArray, domNode = document.getElementById('app')) => {
	const rows = renderRows(shuffledArray).replace(
		'<div class=\'square\'></div>',
		'<div class=\'square empty\'></div>'
	);
	domNode.innerHTML = rows;
	endOfGame(shuffledArray);
};

const end = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 10, 11, 12],
	[13, 14, 15, null]
];

const endOfGame = (state) =>{
	if(JSON.stringify(state) === JSON.stringify(end)){
		alert('You won!!!');
		document.location.reload();
	}
};



const fifteen = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 10, 11, 12],
	[13, 14, null, 15]
];



const stateOfGame =  shuffleState(fifteen); 
renderGame(stateOfGame);



document.addEventListener('keydown', e => {
	const xyOfEmptyCell = getXY(stateOfGame);
	if (e.keyCode === 38) {
		// up arrow
		if (xyOfEmptyCell.y === 3) return; // don`t fall out the board
		const nextY = xyOfEmptyCell.y + 1;
		const nextX = xyOfEmptyCell.x;
		stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
		stateOfGame[nextY][nextX] = null;
		renderGame(stateOfGame);
	}
	else if(e.keyCode === 40){
		//down arrow
		if (xyOfEmptyCell.y === 0) return;
		const nextY = xyOfEmptyCell.y - 1;
		const nextX = xyOfEmptyCell.x;
		stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
		stateOfGame[nextY][nextX] = null;
		renderGame(stateOfGame);
	}
	else if(e.keyCode === 37){
		//left arrow
		if (xyOfEmptyCell.x === 3) return;
		const nextY = xyOfEmptyCell.y;
		const nextX = xyOfEmptyCell.x + 1;
		stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
		stateOfGame[nextY][nextX] = null;
		renderGame(stateOfGame);
	}
	else if(e.keyCode === 39){
		//right arrow
		if (xyOfEmptyCell.x === 0) return;
		const nextY = xyOfEmptyCell.y;
		const nextX = xyOfEmptyCell.x - 1;
		stateOfGame[xyOfEmptyCell.y][xyOfEmptyCell.x] = stateOfGame[nextY][nextX];
		stateOfGame[nextY][nextX] = null;
		renderGame(stateOfGame);
	}
});

