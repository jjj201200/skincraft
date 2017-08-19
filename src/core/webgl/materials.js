/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-17 12:50:40 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-19 17:59:39
 */
import { MeshBasicMaterial, FaceColors, DoubleSide } from 'three';
export let Materials = [
	new MeshBasicMaterial({
		color: 16777215,
		vertexColors: FaceColors,
		side: DoubleSide,
		overdraw: 1,
		fog: false,
		wireframe: false,
		transparent: true,
		opacity: 1,
		// visible: true,
	}),
	new MeshBasicMaterial({
		color: 16777215,
		vertexColors: FaceColors,
		fog: false,
		side: DoubleSide,
		wireframe: false,
		visible: false,
		transparent: true,
		opacity: 0,
		// visible: true,
	})
];
