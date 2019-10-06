console.log('Playplaying')

let currentLog = '';


let page = {
	gold: 0,
	wins: 0,
	scene: null,

}

let player = {
	health: 10,
	power: 8
}



let opponent = {
	health: 10,
	power: 2
}

let action1;

const setButton1 = (text, method) => {
	document.getElementById('button1').innerText= text;
	action1 = method;
}
let action2;

const setButton2 = (text, method) => {
	document.getElementById('button2').innerText= text;
	action2 = method;
}



// Classes class list class selection

const fighter = () => {

	player.strength = page.playerStats[0];
	player.strMod = Math.floor((player.strength - 10) / 2);
	player.atkMod = player.strMod;
	player.dexterity = page.playerStats[2];
	player.dexMod = Math.floor((player.dexterity - 10) / 2);
	player.dmgDie = 8;
	player.hpMax = Math.floor((page.playerStats[1] - 10)) + 20;
	player.health = player.hpMax;
	player.ac = 14 + player.dexMod
	currentLog += '\n' + 'You are a beefy fighter: +' + player.strMod + ' is your attack modifier, and you have ' + player.hpMax + ' health. \n Your AC is: '+ player.ac +' \n You are good at killing; in fact, you were just trying to kill this ' + opponent.name;
	setButton1('Run, Coward', run);
	setButton2('Fight! Kill!', fight);
	printToScreen()

}	

const rogue = () => {

	player.dexterity = page.playerStats[0];
	player.dexMod = Math.floor((player.dexterity - 10) / 2);
	player.atkMod = player.dexMod;
	player.dmgDie = 6;
	player.hpMax = Math.floor((page.playerStats[1] - 10)) + 16;
	player.health = player.hpMax;
	player.ac = 12 + player.dexMod
	currentLog += '\n' + 'You are a sneaky roge : +' + player.dexMod + ' is your attack modifier, and you have ' + player.hpMax + ' health. \n Your AC is: '+ player.ac +' \n You are good escaping; in fact, you were just trying to escape this ' + opponent.name;
	setButton1('Disappear', run);
	setButton2('fight exposed!', fight);
	printToScreen()
}
//monster library bestiary

/*let determineEnemy = [
	{
		name: 'bat',
		health: 3,
		dmgDie: 4,
		atkMod: 1,
		ac: 13,
		boss: false

	},
	{
		name: 'bandit',
		health: 18,
		dmgDie: 6,
		atkMod: 3,
		ac: 12,
		boss: false
	},
	{
		name: 'wolf',
		health: 12,
		dmgDie: 8,
		atkMod: 2,
		ac: 10,
		boss: false
	},
	{
		name: 'Giant Spider',
		health: 8,
		dmgDie: 12,
		atkMod: 1,
		ac: 9,
		boss: false
	},
	
];
*/
//Determining Monster Goes here

/*const selectMonster = () => {
	n = Math.floor(Math.random() * determineEnemy.length);
	opponent.health = determineEnemy[n].health;
	opponent.atkMod = determineEnemy[n].atkMod;
	opponent.dmgDie = determineEnemy[n].dmgDie;
	opponent.ac = determineEnemy[n].ac;
	opponent.boss = determineEnemy[n].boss;
	opponent.name = determineEnemy[n].name;
}
*/

//Rolls rolling attack traits rolls

const roll = () => {
	player.rollResult = Math.floor(Math.random() * 20) + 1;

	opponent.rollResult = Math.floor(Math.random() * 20) + 1;
	console.log(player.rollResult + ' and ' + opponent.rollResult);
}

const rollD = (d) => {
	return Math.floor(Math.random() * d + 1);
	}

const rollStats = () => {
	page.playerStats = [];
	for (i=0; i < 6; i++) {
		page.playerStats.push(rollD(6) + rollD(6) + 6);
	}
	console.log(page.playerStats);
	page.playerStats.sort((a, b) => b - a);
	document.getElementById('game-message').innerText = "What class do you choose?";
	setButton1('Fighter',fighter);
	setButton2('Rogue', rogue);
	currentLog += "Your stats are " + page.playerStats;
	printToScreen()
};

const determineAttack = (power) => {
	return rollD(power.dmgDie) + power.atkMod;
}



//actions

const giveUp = () => {
	document.getElementById('button2').disabled = true;
	document.getElementById('button1').disabled = true;
	setButton1('YOU',0);
	setButton2('QUIT!?',0);
	return;
	}



const fight = () => {
	roll();
	//   document.getElementById('right-div').innerText += "\n You attack, rolling a " + (player.rollResult + player.atkMod);
	let gameMessage = document.getElementById('game-message');
	let playerAttack = determineAttack(player);
	if (player.rollResult + player.atkMod >= opponent.ac ) {
		opponent.health -= playerAttack;
		currentLog += "\n You hit with a " + (player.rollResult + player.atkMod) + ' for ' + playerAttack + ' damage.';
		console.log('hit for' + playerAttack)
	} else {
		
	currentLog += "\n Your " + (player.rollResult + player.atkMod) + ' did not hit against AC.';
	}
	document.getElementById('button2').disabled = true;
	document.getElementById('button1').disabled = true;
	if (isGameOver(opponent.health)){
		printToScreen();
		gameMessage.innerText = "Player won!";
		win();
		setButton1('Go Rest', home);
		setButton2('Find More!', fightAgain)
		document.getElementById('button1').disabled = false;
		document.getElementById('button2').disabled = false;
		printToScreen();
		return;
		
		
	} else {
	setButton1('RUN?',run);
	setButton2('Keep Fighting!', fight);


	gameMessage.innerText = "The opponent lunges!"
	}
	printToScreen();

	setTimeout(() => {
		let opponentAttack = determineAttack(opponent);
		if ( opponent.rollResult +  opponent.atkMod >= player.ac ) {
			gameMessage.innerText = "You got hit!";	
			player.health -= opponentAttack;
			console.log('hit  u for' + opponentAttack)
		} else {
			gameMessage.innerText = "They Missed you!";	
			console.log('missed u')
		}
		
		printToScreen();

		if (isGameOver(player.health)){
		gameMessage.innerText = "Opponent won!";
		document.getElementById('button2').disabled = true;
		document.getElementById('button1').disabled = true;
		setButton1('YOU',0);
		setButton2('DIED',0);
		return;
		}
		document.getElementById('button1').disabled = false;
		document.getElementById('button2').disabled = false;
		printToScreen();
		
	}, 720);

	printToScreen();

}

const isGameOver = (health) => {
	return health <= 0;
}

const reset = () => {
	window.alert('Resetting');
	setTimeout(()=>{
		player.health = 10;
		opponent.health = 10;
		printToScreen();
	},1000);
}

const run = () => {
	roll();
	console.log(player.rollResult + player.dexMod +' vs '+ opponent.rollResult)
	if (opponent.rollResult >= player.rollResult + player.dexMod) {
//		This is what I had. waste of space lol!?	player.health -= Math.floor(Math.random() * opponent.dmgDie + 1);
	player.health -= rollD(opponent.dmgDie);
	printToScreen();
	} else {
	home();
	}
}
let n = 0;

const fightAgain = () => {
	selectMonster();
	if (page.scene === 'forest') {
		forest();
	} else if (page.scene === 'cave') {
		cave();
	} else {
		setButton1("You're", home);
		setButton2("Lost!", home);
		currentLog += " \n You need to go back home, you've lost your way";
		printToScreen();
	}
}

const home = () => {
	page.gold -= 1;
	document.getElementById('gold-page').innerText = page.gold;
	currentLog += '\nYou make it back to the Slippery Corkscrew, the local inn and tavern. \n Micah passes you a beer from behind the bar. \n He says he\'ll have a plate out soon.'
	player.health = player.hpMax;
	currentLog += '\nYour health is ' +  player.health + ' and you\'re ready to  go out and fight again!';
	//determine MONTSHTER //
	selectMonster();

	document.getElementById('button2').disabled = false;
	
	setButton1('Forest', forest)
	setButton2('Cave', cave)
	printToScreen();
}

//This prints and updates screen, so it should be called ALL THE TIME//

const printToScreen = () => {
	document.getElementById('top-message').innerText = "Your opponent has " + opponent.health + " health";
	document.getElementById('bottom-message').innerText = "You have " + player.health + " health";
	document.getElementById('player-roll-sub').innerText = player.rollResult;
	page.opponentName = opponent.name;
	document.getElementById('right-div').innerText += currentLog;
	currentLog = '';
	document.getElementById('top-label').innerText = 'You face a ' + page.opponentName + ' :';
	
}

//initialize buttons here

selectMonster();
setButton1('RollStats',rollStats);
setButton2('End Game?',giveUp);



//printToScreen();




//This might be a good demarkation for a module for fighting


const win = () => {
	if (opponent.boss) {
		page.gold += Math.floor(Math.random() * 88) + 55;
	}
	page.gold += Math.floor(Math.random() * 5) + 2;
	document.getElementById('gold-page').innerText = page.gold;
	console.log(page.wins);
	page.wins += page.xpPrize;
	console.log(page.wins + 'y');
	document.getElementById('wins-page').innerText = page.wins;
	/*if (page.wins === 5) {      //better way for this?
		determineEnemy.push({
		name: 'Leshen',
		health: 35,
		dmgDie: 8,
		atkMod: 7,
		ac: 15,
		boss: true
	});
	}*/
}


// where we keep scene

const forest= () => {
	page.scene = 'forest';
	setButton1('Run away through the forest', run);
	setButton2('Fight under the starlight', fight);

	printToScreen();
}

const cave = () => {
	/* not sure why this doesn't work */
	document.body.style.backgroundImage = "url('../../css/img/cave.jpg')";

	/*
	*/	page.scene = 'cave';
	setButton1('Run back to the light of day', run);
	setButton2('Fight in the claustrophobic cavern', fight);
	
	printToScreen();

}