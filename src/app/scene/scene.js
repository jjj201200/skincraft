/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-10 21:23:38 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-10 22:49:41
 */
import React from 'react';
import ReactDom from 'react-dom';

import './scene.scss';
export default class Scene extends React.Component{
    render(){
        return (
            <canvas className="scene"></canvas>
        );
    }
};