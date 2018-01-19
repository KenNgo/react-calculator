import React from 'react';

class ScreenCalculator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app__screen-view">
				{this.props.value}
			</div>
		);
	}
}

class NumberButton extends React.Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
	}

	click() {
		this.props.inputChange(this.props.value);
	}

	render() {
		return (
			<div>
            	<button onClick={this.click}>{this.props.value}</button>
        	</div>
		);
	}
}

class App extends React.Component {
   	constructor(props) {
      	super(props);
      	this.state = {numClicks1: '', numClicks2: '', display: '', operator: '', flag: false};
      	this.click = this.click.bind(this);
   	}

   	click(value) {
   		console.log(this.state);
   		if (isNaN(parseInt(value))) {
   			// operator
   			this.setState({display: '', operator: value, flag: true});
   			if (this.state.numClicks1.length < 1) {
   				return;
   			} else {
   				if (this.state.operator === '=') {
   					if (this.state.numClicks1.length) {
   						if (this.state.numClicks2.length) {
   							switch(this.state.operator) {
   								case '+':
   									this.setState({display: parseInt(this.state.numClicks1) + parseInt(this.state.numClicks2)});
   									break;
   								case '-':
   									this.setState({display: parseInt(this.state.numClicks1) - parseInt(this.state.numClicks2)});
   									break;
   								case '*':
   									this.setState({display: parseInt(this.state.numClicks1) * parseInt(this.state.numClicks2)});
   									break;
   								case '/':
   									this.setState({display: parseInt(this.state.numClicks1) / parseInt(this.state.numClicks2)});
   									break;
   								case '%':
   									this.setState({display: parseInt(this.state.numClicks1) % parseInt(this.state.numClicks2)});
   									break;
   							}
   						} else {
   							return;
   						}
   					} else {
   						return;
   					}
   					this.setState({operator: '',flag: false});
   				}
   			}
   		} else {
   			// number
   			if (this.state.flag === false) {
   				this.setState({numClicks1: this.state.numClicks1 + value});
   				this.setState({display: this.state.display + value});
   			} else {
   				this.setState({numClicks2: this.state.numClicks2 + value});
   				this.setState({display: this.state.display + value});
   			}
   		}
   	}

	render() {
		let arrNums = [], arrOperators = [], i = 0, length = 0, operator = [];
		for (i=0; i<10; i++) {
			arrNums.push(<NumberButton value={i} key={i} inputChange={this.click} />);
		}
		operator = ['+', '-', '*', '/', '%', '=', 'AC', 'CE'];
		length = operator.length;
		for (i=0; i< length; i++) {
			arrOperators.push(<NumberButton value={operator[i]} key={operator[i]} inputChange={this.click} />);
		}
	   	return (
	   		<div className="app">
	   			<ScreenCalculator value={this.state.display} />
	   			{arrNums}
	   			{arrOperators}
	     	</div>
	   	);
	}
}
export default App;