/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-15 13:24:04 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-15 16:20:27
 */
import {
	THREE,
	Vector2
} from 'three';
export class Face {
	constructor(name, width, height, z, texturePosition, mirror) {
		this.name = name;
		this.texturePosition = texturePosition;
		this.mirror = mirror;
		this.z = z;
		this.width = width;
		this.height = height;
		this.area = width * height;
	}

	getCoordinate(faceIndex) {
		let line = Math.floor(faceIndex / 2 / this.width);
		let column = Math.floor(faceIndex / 2 % this.width);
		let topLeftPointPosition = this.getFaceTopLeftPointPosition(this.name);
		if (this.mirror) {
			return topLeftPointPosition.add(
				new Vector2(column, this.height - line - 1)
			);
		} else return topLeftPointPosition.add(new Vector2(column, line));
	}
	getFaceTopLeftPointPosition(faceName) {
		let vector = new Vector2(0, 0);
		if (faceName == 'left') {
			vector.set(this.texturePosition.x + this.z, this.texturePosition.y);
		} else if (faceName == 'right') {
			vector.set(
				this.texturePosition.x - this.width,
				this.texturePosition.y
			);
		} else if (faceName == 'top') {
			vector.set(
				this.texturePosition.x,
				this.texturePosition.y - this.height
			);
		} else if (faceName == 'bottom') {
			vector.set(
				this.texturePosition.x + this.width,
				this.texturePosition.y - this.height
			);
		} else if (faceName == 'front') {
			vector.set(this.texturePosition.x, this.texturePosition.y);
		} else if (faceName == 'back') {
			vector.set(
				this.texturePosition.x + this.width + this.z,
				this.texturePosition.y
			);
		}

		return vector;
	}
}
