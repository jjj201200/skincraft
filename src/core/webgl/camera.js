/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-13 14:22:06 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-13 14:32:06
 */
import {
    THREE,
    WebGLRenderer,
    CanvasRenderer,
    PCFSoftShadowMap,
    Scene,
    PerspectiveCamera,
    Vector3,
} from 'three';
import { TWEEN } from '@tweenjs/tween.js';

export class Camera {
    constructor(canvasWidth, canvasHeight) {
        this.camera = new PerspectiveCamera(
            45,
            canvasWidth / canvasHeight,
            0.1,
            10000
        );
        this.camera.animation = {};
        this.camera.animation.speed = 300;
        this.camera.animation.moved = false;
        this.camera.animation.positionMoved = false;
        this.camera.animation.targetMoved = false;
        this.camera.animation.zoomMoved = false;
        this.camera.animation.target = new Vector3(0, 0, 0);
        return this.camera;
    }
}