/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-13 14:21:02 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-16 14:52:42
 */

import {
    THREE,
    WebGLRenderer,
    CanvasRenderer,
    PCFSoftShadowMap,
    Scene,
    PerspectiveCamera,
    Vector3,
    Raycaster
} from 'three';
import  $  from 'jquery';
let OrbitControls = require('three-orbitcontrols');
import { Tween } from 'es6-tween';

export class Controller {
    constructor(renderer, camera, scene) {
        let _this = this;
        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;
        this.domElement = $(renderer.domElement);
        this.controller = new OrbitControls(this.camera, this.domElement[0]);
        this.controller.target = new Vector3(0, 0, 0);
        this.controller.zoomSpeed = Math.sqrt(renderer.state.scale);
        this.controller.userPanSpeed = 0;
        this.controller.enablePan = false;
        this.controller.maxDistance = renderer.state.editorSize * renderer.state.scale * renderer.state.scale;
        this.controller.minDistance = 15;
        this.controller.minZoom = 0.8;
        this.controller.maxZoom = 1.5;
        this.controller.mouseButtons.PAN = 1;
        this.controller.mouseButtons.ZOOM = 2;
        this.controller.mouseButtons.ORBIT = 2;
        this.controller.addEventListener('change', function () {
            _this.renderer.renderer.render(_this.scene, _this.camera);
        });
        renderer.raycaster = new Raycaster();
        renderer.objects = [];
        this.initEvent();
        return this.controller;
    }
    initEvent() {
        let _this = this;
        this.clickTime = new Date().getTime();
        this.clickTimeout = undefined;
        this.dblclickDeltaTime = 300; //ms
        let target;
        this.domElement.on('mousemove', function (e) {
            e.preventDefault();
            console.log(_this.renderer.state)
            _this.renderer.state.mouse.x = (e.clientX / _this.domElement.innerWidth()) * 2 - 1;
            _this.renderer.state.mouse.y = -(e.clientY / _this.domElement.innerHeight()) * 2 + 1;

        }).on('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.button === 0) {
                renderer.raycaster.setFromCamera(renderer.state.mouse, _this.camera);
                let intersects = renderer.raycaster.intersectObjects(_this.editor.objects);
                let nowClickTime = new Date().getTime();
                if (intersects.length > 0) {
                    target = intersects[0].object.cube.findPart();
                }
                if (_this.clickTimeout === undefined) {
                    //focuse to part
                    _this.clickTimeout = setTimeout(function () { //click
                        clearTimeout(_this.clickTimeout);
                        if (intersects.length > 0) {
                            _this.clickTimeout = undefined;
                            // _this.renderer.sortObjects = false;
                            _this.model.focusePart(target.name);
                            _this.cameraAnimation({
                                target: target.position,
                                zoom: _this.controls.maxZoom,
                                controls: true
                            });
                        }

                    }, _this.dblclickDeltaTime);
                }
                if (nowClickTime - _this.clickTime < _this.dblclickDeltaTime) { //double click
                    clearTimeout(_this.clickTimeout);
                    _this.clickTimeout = undefined;
                    if (e.button === 0) {
                        // console.log('dblclick');

                        //reset focuse
                        _this.model.resetFocuse();
                        // _this.renderer.sortObjects = false;
                        _this.cameraAnimation({
                            target: new THREE.Vector3(0, 0, 0),
                            zoom: 1,
                            controls: true
                        })
                    }

                } else _this.clickTime = new Date().getTime();
            }
        });
    }
}