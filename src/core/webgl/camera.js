/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-13 14:22:06 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-18 13:06:28
 */
import {
    WebGLRenderer,
    CanvasRenderer,
    PCFSoftShadowMap,
    Scene,
    PerspectiveCamera,
    Vector3,
} from 'three';

export class Camera {
    constructor(aspectRatio) {
        this.camera = new PerspectiveCamera(
            45,
            aspectRatio,
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