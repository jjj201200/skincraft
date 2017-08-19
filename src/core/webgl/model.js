/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-15 11:14:12 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-20 02:33:08
 */
import {
    Mesh,
    Vector3,
    MeshBasicMaterial,
    BoxGeometry,
    Group
} from 'three';
import $ from 'jquery';

import { Part } from './part';

/**
 * Model
 * return a THREE.Mesh
 */
export class Model {
	constructor(modelData) {
        this.init(modelData);
        
        // this.update();
        // if (callback instanceof Function) callback(this);
    }
	init(modelData) {
        this.name = modelData.name;
        this.version = modelData.version;
        this.textureSize = modelData.textureSize;
        
        this.parts = modelData.parts;
        this.skin = modelData.skin;

        this.create();
    }
    create(){
        let modelMesh = new Group();
        let partObjects = {};
        /* load parts */
        for(let partName in this.parts){
            let partData = this.parts[partName];
            let part = new Part(partName, partData);
            partObjects[partName] = part;
            modelMesh.add(part.mesh);
        }
        this.partObjects = partObjects;
        this.mesh = modelMesh;
    }
}
