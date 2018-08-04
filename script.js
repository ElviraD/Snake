// 贪吃蛇_ByElviraD 

// 设置常量表示方向
const DIR = {
	DIR_LEFT:1,
	DIR_UP:2,
	DIR_RIGHT:3,
	DIR_DOWN:4
};

// 全局变量
var map = {width:900,height:500};
var box = {width:50,height:50};
var nums = {
	hNum:map.width/box.width,
	wNum:map.height/box.height
};
// 蛇
var snake = [];
// 空白
var other = [];
// 蛇默认移动方向
var dir = DIR.DIR_RIGHT;

window.onload = function(){
	initMap();
	showFood();
	setInterval(snakeMove,400);
	document.onkeyup = function(e){
		switch(e.keyCode){
			case 37:{if(dir == DIR.DIR_RIGHT) break;else{dir = DIR.DIR_LEFT;break;}}
			case 38:{if(dir == DIR.DIR_DOWN) break;else{dir = DIR.DIR_UP;break;}}
			case 39:{if(dir == DIR.DIR_LEFT) break;else{dir = DIR.DIR_RIGHT;break;}}
			case 40:{if(dir == DIR.DIR_UP) break;else{dir = DIR.DIR_DOWN;break;}}
			default:break;
		}
	}
}

function initMap(){
	var map_target = document.getElementById('map');
	map_target.style.width = map.width + 'px';
	map_target.style.height = map.height + 'px';
	var newSpan = null;
	for(var i = 1;i <= nums.hNum*nums.wNum;i++){
		newSpan = document.createElement('span');
		newSpan.style.width = box.width + 'px';
		newSpan.style.height = box.height + 'px';
		newSpan.id = i;
		map_target.appendChild(newSpan)
		if(i<=5) {
			newSpan.className = 'snake';
			snake.push(newSpan);
		} else {
			other.push(newSpan);
		}
	}
}
// 随机产生一个食物位置
function showFood(){
	var index = Math.floor(Math.random()*other.length);
	other[index].className = 'food';
}
// 蛇移动
function snakeMove(){
	var headId; 	// 设置蛇头
	// 控制蛇头方向
	switch(dir){
		case DIR.DIR_LEFT:
			headId = parseInt(snake[snake.length-1].id)-1;
			if(headId%nums.hNum==0) gameOver(headId);
			break;
		case DIR.DIR_UP:
			headId = parseInt(snake[snake.length-1].id)-nums.hNum;
			if(headId<1) gameOver(headId);
			break;
		case DIR.DIR_RIGHT:
			headId = parseInt(snake[snake.length-1].id)+1;
			if(headId%nums.hNum==1) gameOver(headId);
			break;
		case DIR.DIR_DOWN:
			headId = parseInt(snake[snake.length-1].id)+nums.hNum;
			if(headId>nums.hNum*nums.wNum) gameOver(headId);
			break;
		default:break;
	}
	// 获取蛇头位置
	var head = document.getElementById(headId);
	// 当蛇头碰到蛇身体部位，游戏结束
	for(var i=1;i<snake.length;i++) {
		if(headId == snake[i].id){
			gameOver(headId);
		}
	}
	
	var index;
	for(var i=1;i<other.length;i++){
		if(headId == other[i].id){
			index = i;
			break;
		}
	}
	other.splice(index,1);
	snake.push(head);
	// 当蛇头碰到食物的时候，蛇长度加一，空白减一
	if(head.className == 'food'){
		showFood();
	} else {
		snake[0].className = '';
		other.push(snake.shift())
	}
	head.className = 'snake';
}
// 游戏结束
function gameOver(id){
	console.log(id);
	alert("Game Over!");
	
	window.location.href=window.location.href;
}