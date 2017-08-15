/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-15 11:57:50 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-15 16:56:27
 */
import { THREE, Mesh, Vector3 } from 'three';
import $ from 'jquery';

import { Cube } from './cube';

export class Part {
	constructor(partData) {
		this.init(partData);
	}
	init(partData) {
		$.extend(this, partData.data);
		this.model = partData.model;
		this.name = partData.name;
		this.initMesh();
		// console.log(this);
		this.map = partData.data.map;
		this.cubes = {};
		this.typeIndex = this.model.typeIndex || 0;
		this.versionIndex = this.model.versionIndex || 0;
		this.defaultPosition = new Vector3(
			this.position[0] + this.center[0],
			this.position[1] + this.center[1],
			this.position[2] + this.center[2]
		);
		this.update(this.cubesData);
	}
	initMesh() {
		this.mesh = new Mesh();
		this.meshBox = new Mesh();
	}
	update() {
		let data = this.map[this.typeIndex] || this.map[0];
		let length = Object.keys(this.cubes).length;
		let _this = this;
		if (length == 0) {
			for (var name in data) {
				if (data[name].visible) {
					var cube = new Cube({
						name: name,
						part: _this,
						data: data[name],
						model: _this.model
					});

					cube.mesh.visible = data[name].visible;
					this.cubes[name] = cube;
					this.meshBox.add(cube.mesh);
				}
			}
			this.meshBox.position.set(
				this.defaultPosition.x,
				this.defaultPosition.y,
				this.defaultPosition.z
			);
			if (this.rotation) {
				this.meshBox.rotation.set(
					this.rotation.x,
					this.rotation.y,
					this.rotation.y
				);
			}
			this.mesh.add(this.meshBox);
		} else {
            for (var name in data) {
                // this.cubes[name].setSkinLayers(this.skinLayers);
                /* original ? this.cubes[name].reloadOriginalSkin() :  */this.cubes[name].draw();
            }
        }

		// return this;
	}
}
