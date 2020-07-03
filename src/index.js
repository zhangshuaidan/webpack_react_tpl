import React,{ Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ReactDom from 'react-dom'
import List from './list'
import './index.less'

function MyAPP(){
    return (
        <div>this is a react framework </div>
    )
}

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route path='/' exact component={MyAPP}/>
					<Route path='/list' component={List}/>
				</div>
			</BrowserRouter>
		)
	}
}

ReactDom.render( <App/>, document.querySelector('#app'))