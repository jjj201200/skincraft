/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-15 13:14:58 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-19 21:09:25
 */
import {
	THREE,
	MeshBasicMaterial,
	MultiMaterial,
	BoxGeometry,
	FaceColors,
	DoubleSide,
	Object3D,
	Vector3,
	Color,
	Mesh
} from 'three';
import $ from 'jquery';

import { Materials } from './materials';
import { Face } from './face';

export class Cube {
	constructor(cubeName, cubeData) {
		this.init(cubeName, cubeData);
	}
	init(cubeName, cubeData) {
		this.name = cubeName;
		this.boxSize = cubeData.boxSize;
		this.textureSize = cubeData.textureSize;
		this.texturePosition = cubeData.texturePosition;
		this.position = cubeData.position;
		this.center = cubeData.center;
		this.visible = cubeData.visible;

		this.initFACES();
		this.create();
		// this.initMesh();
	}
	create() {
		let geometry = new BoxGeometry(
			this.size.x,
			this.size.y,
			this.size.z,
			this.textureSize.x,
			this.textureSize.y,
			this.textureSize.z
		);
		let cubeMesh = new Mesh(geometry, Materials);
		this.mesh = cubeMesh;
	}
	initFACES() {
		let x = this.textureSize.x;
		let y = this.textureSize.y;
		let z = this.textureSize.z;
		let position = this.texturePosition;

		this.FACES = [
			new Face('left', z, y, x, position),
			new Face('right', z, y, x, position),
			new Face('top', x, z, y, position),
			new Face('bottom', x, z, y, position, true),
			new Face('front', x, y, z, position),
			new Face('back', x, y, z, position)
		];
	}

	draw() {
		for (
			let faceIndex = 0;
			faceIndex < this.geometry.faces.length;
			faceIndex += 2
		) {
			//left right top bottom front back
			let restFaceIndex = faceIndex;

			let faceNumber;
			for (faceNumber in this.FACES) {
				let area = this.FACES[faceNumber].area * 2;
				if (restFaceIndex < area) break;
				restFaceIndex -= area;
			}
			let FACE = this.FACES[faceNumber];
			let colorCoordinate = FACE.getCoordinate(restFaceIndex);
			let color = new Color(0);
			let colorData = this.model.renderer.context2D.getImageData(
				colorCoordinate.x,
				colorCoordinate.y,
				1,
				1
			).data;
			color.setRGB(
				colorData[0] / 255,
				colorData[1] / 255,
				colorData[2] / 255
			);
			this.geometry.faces[faceIndex].color = color;
			this.geometry.faces[faceIndex].materialIndex =
				colorData[3] < 255 ? 1 : 0;
			this.geometry.faces[faceIndex + 1].color = color;
			this.geometry.faces[faceIndex + 1].materialIndex =
				colorData[3] < 255 ? 1 : 0;
		}
		this.geometry.elementsNeedUpdate = true;
	}
}
