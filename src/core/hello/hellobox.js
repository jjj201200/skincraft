/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-10 14:52:11 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-10 16:27:36
 */
import './hello.css'
import React from 'react';
var HelloBox = React.createClass({

    render: function () {
        return (
            <div className="HelloBox">
                Hello world from ReactJS!
          </div>
        );
    }
});
export default HelloBox;