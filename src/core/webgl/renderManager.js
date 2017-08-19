/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 15:25:54 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-20 01:28:26
 */
import $ from 'jquery';
import {
	WebGLRenderer,
	CanvasRenderer,
	PCFSoftShadowMap,
	Scene,
	PerspectiveCamera,
	Vector3,
	Vector2,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	ModelManager,
} from 'three';
import { Tween } from 'es6-tween';

import { Camera } from './camera';
import { Controller } from './controller';

export class RenderManager {
	// set renderer(n){
	// 	this.renderer  = n;
	// }
	constructor(sceneDOM) {
		this.sceneDOM = sceneDOM;
		// this.dom = DOM;
		// this.canvasD2DOM = canvasD2DOM;
		// // this.canvasD3DOM = canvasD3DOM;
		// this.canvasD2Width = $(this.canvasD2DOM).innerWidth();
		// this.canvasD2Height = $(this.canvasD2DOM).innerHeight();
		// this.canvasD3Width = 1000;
		// this.canvasD3Height = 600;

		// this.canvasD2DOM.

		// this.state = {
		// 	editorSize: 100,
		// 	inited: false,
		// 	scale: 1,
		// 	mouse: new Vector2(0, 0), //z=-1 important!
		// 	able: false,
		// 	canRender: false
		// };
		this.init();
	}
	init() {
		/* create renderer */
		this.renderer3D = this.checkWebglAvailable()
			? new WebGLRenderer({
					alpha: true,
					antialias: true,
					shadowMap: PCFSoftShadowMap,
					precision: 'lowp'
				})
			: new CanvasRenderer();
		
		/* create camera */
		let aspectRatio = $(this.sceneDOM).width() / $(this.sceneDOM).height();
		this.camera = new Camera(aspectRatio);
		
		/* create scene */
		this.scene = new Scene();
		this.controller = new Controller(this.renderer,this.camera,this.scene);
	}
	initRenderer() {
		this.renderer = this.webglAvailable()
			? new WebGLRenderer({
					alpha: true,
					antialias: true,
					shadowMap: PCFSoftShadowMap,
					precision: 'lowp'
				})
			: new CanvasRenderer();
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(this.canvasD3Width, this.canvasD3Height);
		this.backgroundColor = '#eeeeee';
		this.renderer.setClearColor(this.backgroundColor, 1);
		this.camera = new Camera(this.canvasD3Width, this.canvasD3Height);
		this.camera.position.z = 20;
		$(this.dom).append(this.renderer.domElement);
		this.scene = new Scene();
		this.Controller = new Controller(this, this.camera, this.scene);
		this.renderLoop()();
	}
	renderLoop() {
		let loop = () => {
			requestAnimationFrame(this.renderLoop());
			// TWEEN.update();
			if (this.state.canRender) this.render();
		};
		return loop;
	}
	checkWebglAvailable() {
		return (window.requestAnimFrame = (function() {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		})());
	}
	clearCanvas() {
		this.context2D.clearRect(
			0,
			0,
			this.model.skin.width,
			this.model.skin.height
		);
		return this;
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	}
	initEvent() {
		let _this = this;
		$(window).off('resize').on('resize', function() {
			_this.resizeCanvas();
		});
	}
	resetCamera() {
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = this.editor.editorSize / 2;
		this.camera.lookAt(this.camera.animation.target);
		if (this.controls) this.controls.target = this.camera.animation.target;
		return this;
	}
	resizeCanvas() {
		let [width, height] = [this.canvasD3Width, this.canvasD3Height];
		this.renderer.setSize(width, height);
		this.camera.updateProjectionMatrix();
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}
	init2DCanvas(model) {
		// console.log(this.canvasD2DOM)
		this.canvasD2DOM.width = this.model.mapSize[this.model.versionIndex][0];
		this.canvasD2DOM.height = this.model.mapSize[
			this.model.versionIndex
		][1];
		this.context2D = this.canvasD2DOM.getContext('2d');
	}
	loadModel(model) {
		// this.dom = dom;
		// this.state.canRender = true;
		this.model = model;
		this.model.renderer = this;
		this.init2DCanvas(this.model);
		this.scene.add(this.model.mesh);
		this.camera.lookAt(this.model.focuseTarget);
		this.drawSkin();

		// this.renderer.setSize(this.model.skin.width, this.model.skin.height);
		// $(dom).append(this.renderer.domElement);

		// this.scene.add( cube );
	}
	drawSkin(/* original */) {
		this.model.skin.onload = () => {
			this.clearCanvas();
			// this.showOriginalSkin = original;
			this.context2D.drawImage(this.model.skin, 0, 0);
			// if (!this.showOriginalSkin) {
			// 	for (let skinIndex in this.skinLayers) {
			// 		this.context.drawImage(this.skinLayers[skinIndex], 0, 0);
			// 	}
			// }
			this.model.update();
			// this.renderLoop()();
		};
	}
	addModel(model) {
		// console.log(this.model.mesh.children, this.model.mesh.children.length)
		// this.addChild(this.model.mesh.children);
	}
}
