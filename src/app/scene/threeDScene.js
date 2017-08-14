/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-10 22:29:03 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-14 15:11:41
 */
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {
    Renderer,
    Steve
} from '../apis';

import './scene.scss';
export default class ThreeDScene extends React.Component{
    componentDidMount(){
        this.options = {
            modelName: 'steve',
            model: undefined,
            skinImg: undefined,
            domElement: undefined,
        };
        this.renderer = new Renderer($(this.refs.canvas));
        this.loadModel(this.options.modelName);
    }
    loadModel(modelName) {
        let _this = this;
        console.log(modelName);
           require([modelName],function(model){
                if (model!=undefined && model instanceof Model) {
                    // _this.queue = new Queue(model);
                    _this.model = model;
                    _this.renderer.addModel(_this.model);
                }else throw new Error('no model');
                return _this;
            });
        };
    render(){
        return (
            <canvas ref="canvas" className="threedscene" ref="threedscene"></canvas>
        );
    }
};