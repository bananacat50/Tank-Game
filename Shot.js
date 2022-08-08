class Shot {
	constructor(p, sprite, tankHelper, direction) {
		this.p = p
		this.sprite = sprite;
		this.tankHelper = tankHelper
		this.direction = direction
		var p2 = this.tankHelper.convertGameToGraphics(this.p)
		this.sprite.setX(p2.x)
		this.sprite.setY(p2.y)
		this.sprite.setRotation(-this.direction*Math.PI/3+Math.PI/2)
	}
	
	move() {
		this.p.add(this.tankHelper.directionToDelta(this.direction))
		if (!this.tankHelper.onBoard(this.p)) {
			this.sprite.destroy()
			return false
		}
		if (this.tankHelper.map[this.p.y][this.p.x] instanceof Object) {
			this.tankHelper.map[this.p.y][this.p.x].die()
		}
		this.updateSprite()
		return true
	}
	
	updateSprite() {
		var p2 = this.tankHelper.convertGameToGraphics(this.p)
		this.sprite.setX(p2.x)
		this.sprite.setY(p2.y)
		this.sprite.setRotation(-this.direction*Math.PI/3+Math.PI/2)
	}
}