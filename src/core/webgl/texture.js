/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-18 15:21:17 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-19 21:33:55
 */
import $ from 'jquery';

/**
 * @param {string} textureName
 * @param {object} textureData
 * textureData:{
 *     name:textureName,
 *     type:'steve',
 *     version:'0',
 *     imgUrl:'',
 *     layers:{
 *   
 *     }
 * }
 */
export class Texture {
    constructor(textureName, textureData) {
        this.init(textureName, textureData);

    }
    init(textureName, textureData) {
        this.name = textureName;
        this.img = textureData;
        this.width = this.img.width;
        this.height = this.img.height;
    }
}