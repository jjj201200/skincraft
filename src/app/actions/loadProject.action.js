import { LOAD_PROJECT } from '../apis';
export let loadProject = () => {
	return {
        type: LOAD_PROJECT,
        projectData:{
            module:''
        }
	};
};
