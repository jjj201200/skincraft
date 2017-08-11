/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 23:37:22 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-12 00:29:07
 */
export const LOAD_PROJECT = 0;
export let loadProjectAction = (moduleName) => {
	return {
        type: LOAD_PROJECT,
        projectData:{
            module:moduleName
        }
	};
};
