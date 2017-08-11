/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-10 14:07:39 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-11 16:40:20
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Skincraft from './app/skincraft';

ReactDOM.render(
	<Provider store={store}>
		<Skincraft />
	</Provider>,
	document.getElementById('skincraft')
);
