/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 15:25:54 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-15 17:25:02
 */
import $ from 'jquery';
import {
	THREE,
	WebGLRenderer,
	CanvasRenderer,
	PCFSoftShadowMap,
	Scene,
	PerspectiveCamera,
	Vector3,
	Vector2
} from 'three';
import { Tween } from 'es6-tween';

import { Camera } from './camera';
import { Controller } from './controller';

export class Renderer {
	// set renderer(n){
	// 	this.renderer  = n;
	// }
	constructor({ canvasD2DOM, canvasD3DOM }) {
		// this.canvasD2DOM = canvasD2DOM;
		this.canvasD3DOM = canvasD3DOM;
		this.canvasD3Width = $(this.canvasD3DOM).innerWidth();
		this.canvasD3Height = $(this.canvasD3DOM).innerHeight();
		
		this.state = {
			editorSize: 100,
			inited: false,
			scale: 1,
			mouse: new Vector2(0, 0), //z=-1 important!
			able: false
		};
	}
	webglAvailable() {
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
		};
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
	loadModel(model,dom) {
		this.model = model;
		this.model.renderer = this;
		this.initRenderer();
		this.init2DCanvas(this.model);
		this.addModel(this.model);
		this.renderer.setSize(this.model.skin.width, this.model.skin.height);
		$(dom).append(this.renderer.domElement);
		this.drawSkin();
	}
	init2DCanvas(model) {
		// console.log(this.canvasD2DOM)
		this.canvasD2DOM = this.renderer.domElement;
		this.canvasD2DOM.width = this.model.mapSize[this.model.versionIndex][0];
		this.canvasD2DOM.height = this.model.mapSize[
			this.model.versionIndex
		][1];
		this.context2D = this.canvasD2DOM.getContext('2d');
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
		this.backgroundColor = '#252525';
		this.renderer.setClearColor(this.backgroundColor, 1);
		this.camera = new Camera(this.canvasD3Width, this.canvasD3Height);

/* 		this.camera = new PerspectiveCamera(45, this.canvasD3Width / this.canvasD3Height, 0.1, 10000);
		this.camera.animation = {};
		this.camera.animation.speed = 300;
		this.camera.animation.moved = false;
		this.camera.animation.positionMoved = false;
		this.camera.animation.targetMoved = false;
		this.camera.animation.zoomMoved = false;
		this.camera.animation.target = new Vector3(0, 0, 0); */

		this.scene = new Scene();
		/* this.Controller = new Controller(
			this.renderer,
			this.camera,
			this.scene
		); */
		let renderLoop = () => {
			requestAnimationFrame(renderLoop);
			// TWEEN.update();
			this.render();
		};
		// renderLoop();
		this.renderer.render(this.scene, this.camera);
		this.initEvent();
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
		let [width, height] = [this.canvasD3DOM.innerWidth(), this.canvasD3DOM.innerHeight()];
		this.renderer.setSize(width, height);
		this.camera.updateProjectionMatrix();
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}
	addModel(model) {
		this.model = model;
		this.scene.add(this.model.mesh);
		// console.log(this.model.mesh.children, this.model.mesh.children.length)
		this.camera.lookAt(this.model.focuseTarget);
		// this.addChild(this.model.mesh.children);
	}
	cameraAnimation({ position, target, zoom, controls = false }) {
		if (this.camera.animation.moved === false) {
			//position
			let _this = this;
			if (position !== undefined) {
				let originalPosition = {
					x: _this.camera.position.x,
					y: _this.camera.position.y,
					z: _this.camera.position.z
				};
				new Tween(originalPosition)
					.to(
						{
							x: position.x,
							y: position.y,
							z: position.z
						},
						_this.camera.animation.speed
					)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.onStart(function() {
						_this.camera.animation.moved = true;
						_this.camera.animation.positionMoved = true;
					})
					.onUpdate(function() {
						_this.camera.position = new Vector3(
							this.x,
							this.y,
							this.z
						);
					})
					.onComplete(function() {
						if (
							_this.camera.animation.targetMoved === false &&
							_this.camera.animation.zoomMoved === false
						)
							_this.camera.animation.moved = false;
						_this.camera.animation.positionMoved = false;
					})
					.start();
			}
			//target
			if (target !== undefined) {
				let originalTarget = {
					x: _this.model.focuseTarget.x,
					y: _this.model.focuseTarget.y,
					z: _this.model.focuseTarget.z
				};
				new TWEEN.Tween(originalTarget)
					.to(
						{
							x: target.x,
							y: target.y,
							z: target.z
						},
						_this.camera.animation.speed
					)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.onStart(function() {
						_this.camera.animation.moved = true;
						_this.camera.animation.targetMoved = true;
					})
					.onUpdate(function() {
						_this.camera.animation.target = new THREE.Vector3(
							this.x,
							this.y,
							this.z
						);
						_this.model.focuseTarget = new THREE.Vector3(
							this.x,
							this.y,
							this.z
						);
						_this.camera.lookAt(_this.camera.animation.target);
						if (controls)
							_this.controls.target =
								_this.camera.animation.target;
					})
					.onComplete(function() {
						if (
							_this.camera.animation.positionMoved === false &&
							_this.camera.animation.zoomMoved === false
						)
							_this.camera.animation.moved = false;
						_this.camera.animation.targetMoved = false;
					})
					.start();
			}
			//zoom
			if (zoom !== undefined) {
				let originalZoom = {
					zoom: _this.camera.zoom
				};
				new TWEEN.Tween(originalZoom)
					.to(
						{
							zoom: zoom
						},
						_this.camera.animation.speed
					)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.onStart(function() {
						_this.camera.animation.moved = true;
						_this.camera.animation.zoomMoved = true;
					})
					.onUpdate(function() {
						_this.camera.animation.zoom = this.zoom;
						_this.controls.object.zoom =
							_this.camera.animation.zoom;
						_this.controls.object.updateProjectionMatrix();
						_this.controls.update();
					})
					.onComplete(function() {
						if (
							_this.camera.animation.positionMoved === false &&
							_this.camera.animation.targetMoved === false
						)
							_this.camera.animation.moved = false;
						_this.camera.animation.zoomMoved = false;
					})
					.start();
			}
		}
	}
}
