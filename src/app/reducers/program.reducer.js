/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 15:25:41 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-12 00:28:13
 */
import { LOAD_PROJECT, CLOSE_PROJECT } from '../actions';
export const ProgramReducer = (state, action) => {
    const type = action.type;
    switch (type) {
        case LOAD_PROJECT: {
            return Object.assign({},state,{state:'load project'});
        }
        case CLOSE_PROJECT: {
            return Object.assign({},state,{state:'close project'});
        }
        default: {
            return state;
        }
    }
};