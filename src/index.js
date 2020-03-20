import './index.less'
import React from 'react';
import ReactDom from 'react-dom'

function MyAPP(){
    return (
        <div>hi this is react</div>
    )
}

ReactDom.render( <MyAPP/>, document.querySelector('#app'))