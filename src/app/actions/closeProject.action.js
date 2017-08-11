/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 23:37:26 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-12 00:26:09
 */
export const CLOSE_PROJECT = 1;
export let closeProjectAction = (moduleName) => {
	return {
        type: CLOSE_PROJECT,
	};
};
