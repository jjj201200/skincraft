/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-15 13:14:58 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-15 16:56:32
 */
import {
	MeshBasicMaterial,
	MultiMaterial,
	BoxGeometry,
	FaceColors,
	DoubleSide,
	Object3D,
	Vector3,
	Color,
	Mesh,
} from 'three';
import $ from 'jquery';
import { Face } from './face';

export class Cube {
	constructor(cubeData) {
		this.init(cubeData);
	}
	init(cubeData) {
		$.extend(this, cubeData.data);
		this.part = cubeData.part;
		this.model = cubeData.model;
		this.name = cubeData.name;
		this.center = this.part.center;
		// console.log(this);
		this.typeIndex = this.model.typeIndex || 0;
		this.versionIndex = this.model.versionIndex || 0;

		this.boxSize = new Vector3(this.boxSize[0],this.boxSize[1],this.boxSize[2]);
		this.textureSize = new Vector3(this.textureSize[0],this.textureSize[1],this.textureSize[2]);
		this.initFACES();
		this.initMesh();
		// console.log(this);
	}
	initFACES() {
		
		let x = this.textureSize.x;
		let y = this.textureSize.y;
		let z = this.textureSize.z;
		let position = new Vector3(this.texturePosition[this.model.versionMap[this.versionInde]]);

		this.FACES = [
			new Face('left', z, y, x, position),
			new Face('right', z, y, x, position),
			new Face('top', x, z, y, position),
			new Face('bottom', x, z, y, position, true),
			new Face('front', x, y, z, position),
			new Face('back', x, y, z, position)
		];
	}
	initMesh() {
		this.geometry = new BoxGeometry(
			this.boxSize.x,
			this.boxSize.y,
			this.boxSize.z,
			this.textureSize.x,
			this.textureSize.y,
			this.textureSize.z
		);
		this.geometry.name = this.name + ' geometry';
		let a = new MeshBasicMaterial({
			color: 16777215,
			vertexColors: FaceColors,
			side: DoubleSide,
			overdraw: 1,
			fog: false,
			wireframe: false,
			transparent: true,
			opacity: 1
		});
		let b = new MeshBasicMaterial({
			visible: false,
			transparent: true,
			opacity: 0
		});
		this.material = [a, b];
		this.material[0].opacity = this.opacity;
		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.name = this.name + ' cube_in';
		this.mesh.cube = this;
		this.mesh.position.set(
			this.mesh.position.x - this.center.x,
			this.mesh.position.y - this.center.y,
			this.mesh.position.z - this.center.z
		);
		this.mesh = new Object3D().add(this.mesh);
		this.mesh.name = this.name + ' cube';
	}
	
	draw() {
		for (let faceIndex = 0; faceIndex < this.geometry.faces.length; faceIndex += 2) {
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
			let colorData = this.model.renderer.context2D.getImageData(colorCoordinate.x, colorCoordinate.y, 1, 1).data;
			color.setRGB(colorData[0] / 255, colorData[1] / 255, colorData[2] / 255);
			this.geometry.faces[faceIndex].color = color;
			this.geometry.faces[faceIndex].materialIndex = colorData[3] < 255 ? 1 : 0;
			this.geometry.faces[faceIndex + 1].color = color;
			this.geometry.faces[faceIndex + 1].materialIndex = colorData[3] < 255 ? 1 : 0;
		}
		this.geometry.elementsNeedUpdate = true;
	};
}
