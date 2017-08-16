/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-15 11:14:12 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-16 14:34:29
 */
import {
    THREE,
    Mesh,
    Vector3,
    MeshBasicMaterial,
    BoxGeometry
} from 'three';
import $ from 'jquery';

import { Part } from './part';

export class Model {
	constructor(modelData,callback) {
        this.init(modelData);
        this.initMesh();
        this.update();
        if (callback instanceof Function) callback(this);
    }
	init(modelData) {
        $.extend(this, modelData);
        this.parts = {};
		this.typeIndex = this.default.typeIndex;
        this.versionIndex = this.default.versionIndex;
        this.focuseTarget = new Vector3(0, 0, 0);
        // console.log(this.data);
		// this.canvas;
		// this.context;
		// this.parts = {};
		// this.mesh = new THREE.Mesh();
		// this.partsData = {};
		// this.name = '';
		// this.texture;
		// this.parent;
		// this.typeMap = {}; //object
		// this.defaultType;
		// this.versionMap = []; //array
		// this.version;
		// this.poses = {}; //defination data
		// this.POSES = {};
		// this.animations = {}; //defination data
		// this.ANIMATIONS = {};
		// this.callback = callback;

		// this.focuseTarget = new THREE.Vector3(0, 0, 0);
		// this.animating = false;

		// Object.assign(this, options);
        // this.init();
    }
    initMesh() {
        this.mesh = new Mesh();
		// this.meshBox = new Mesh();
	}
    update(/* original */) {
        let _this = this;
        let length = Object.keys(this.parts).length;
        if (length == 0) {
            for (let partName in this.partsData) {
                let part = new Part({
                    name: partName,
                    // skin: _this.skin,
                    data: _this.partsData[partName],
                    model: _this
                });
                this.mesh.add(part.mesh);
                this.parts[partName] = part;
            }
            this.mesh.position.set(0, 0, 0);
        } else {
            for (let partName in this.partsData) {
                // this.parts[partName].setSkinLayers(this.skinLayers);
                /* original ? this.parts[partName].reloadOriginalSkin() : */ this.parts[partName].update();
            }
        }
    };
}
