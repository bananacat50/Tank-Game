//import {Point} from 'Point.js'

class TankHelper {
	constructor(mapSize, gameSize, margin, mapWidth, hexWidth, hexHeight, scene) {
		this.mapSize = mapSize
		this.gameSize = gameSize
		this.margin = margin
		this.mapWidth = mapWidth
		this.hexWidth = hexWidth
		this.hexHeight = hexHeight
		this.scene = scene
		this.map = null
	}
	
	convertGameToGraphics(p) {
		return new Point((p.x-Math.trunc(p.y/2)) * this.hexWidth + this.margin - this.hexWidth/2*(p.y%2), p.y * this.hexHeight + this.margin)
	}
	
	directionToDelta(direction) {
		if (direction == 0) {
			return new Point(1, 0)
		} else if (direction == 1) {
			return new Point(0, -1)
		} else if (direction == 2) {
			return new Point (-1, -1)
		} else if (direction == 3) {
			return new Point(-1, 0)
		} else if (direction == 4) {
			return new Point(0, 1)
		} else if (direction == 5) {
			return new Point(1, 1)
		} else {
			throw new RuntimeException("bad direction!")
		}
	}
	
	onBoard(p) {
		var testx = p.x-Math.trunc((p.y+1)/2)
		if (testx<0 || testx>=mapSize || p.y<0 || p.y>=mapSize) {
			return false
		}
		return true
	}
	
	interpret() {
		var data = this.scene.cache.text.get('program1')
		console.log(data)
		var commands = data.split('\r\n')
		console.log(commands)
		return commands
	}
}