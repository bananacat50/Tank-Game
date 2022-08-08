//import {TankHelper} from 'TankHelper.js'
//import {Point} from 'Point.js'

class Tank {
	static shots = Array()
	
	constructor(p, sprite, tankHelper, direction) {
		this.p = p
		this.sprite = sprite;
		this.tankHelper = tankHelper
		this.direction = direction
		var p2 = this.tankHelper.convertGameToGraphics(this.p)
		this.sprite.setX(p2.x)
		this.sprite.setY(p2.y)
		this.tankHelper.map[this.p.y][this.p.x] = this
		this.commands = this.tankHelper.interpret()
		this.commandNum = 0
	}
	
	move() {
		this.tankHelper.map[this.p.y][this.p.x] = 'open space'
		var delta = this.tankHelper.directionToDelta(this.direction)
		this.p.add(delta)
		if (!this.tankHelper.onBoard(this.p)) {
			this.p.add(new Point(-delta.x, -delta.y))
			this.turn(3)
		}
		this.updateSprite()
		this.tankHelper.map[this.p.y][this.p.x] = this
	}
	
	turn(amount) {
		this.direction += amount + 6
		this.direction %= 6
		this.updateSprite()
	}
	
	turnLeft() {
		this.turn(1)
	}
	
	turnRight() {
		this.turn(-1)
	}
	
	updateSprite() {
		var p2 = this.tankHelper.convertGameToGraphics(this.p)
		this.sprite.setX(p2.x)
		this.sprite.setY(p2.y)
		this.sprite.setRotation(-this.direction*Math.PI/3-Math.PI/2)
	}
	
	shoot() {
		Tank.shots.push(new Shot(new Point(this.p.x, this.p.y), this.tankHelper.scene.add.image(0, 0, 'shot').setScale(1/4), this.tankHelper, this.direction))
	}
	
	static updateShots() {
		for (var i = Tank.shots.length-1; i >= 0; i--) {
			if (!Tank.shots[i].move()) {
				Tank.shots.splice(i, 1)
			}
		}
	}
	
	die() {
		alert('died')
	}
	
	run() {
		var currentCommand = this.commands[this.commandNum]
		console.log(currentCommand)
		this.commandNum = (this.commandNum + 1) % this.commands.length
		if (currentCommand === 'move') {
			this.move()
		} else if (currentCommand === 'shoot') {
			this.shoot()
		} else if (currentCommand === 'rotate right') {
			this.turnRight()
		} else if (currentCommand === 'rotate left') {
			this.turnLeft()
		} else {
			console.log('unimplemented command: ' + currentCommand)
		}
	}
}