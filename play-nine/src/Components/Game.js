import React, { Component } from 'react';
import _ from 'lodash';


const Stars = (props) => {
	const stars = _.range(props.numberOfStars).map( (num,i) =>
		<i key={i} className="fa fa-star"></i>
	)

	return (
		<div className="col-5">
			{stars}
		</div>
	)
}

const Button = (props) => {

	 let result;

		switch (props.answerIsCorrect) {
			case true:
					result = <button className="btn btn-lg btn-success"
													 onClick={ ()=> props.confirmAnswer() }>
									<i className="fa fa-check"></i>
								</button>
								break;
			case false:
					result = <button className="btn btn-lg btn-danger"
													 onClick={ ()=> props.checkAnswer() }>
										  <i className="fa fa-times"></i>
										</button>
								break;
			default:
					result = <button className="btn btn-lg btn-info"
													disabled={props.selectedNumbers.length === 0}
													onClick={ ()=> props.checkAnswer() } >=
								</button>
		}

	return (
		<div className="col-2">
			{result}
			<button className="btn btn-warning btn-lg"
							onClick={ ()=> props.hitRefresh() }
							disabled={props.refresh === 0}>
				<i className="fa fa-refresh"></i> {props.refresh}
			</button>
		</div>
	)
}

const Answer = (props) => {
	const selectedNumbers = props.selectedNumbers.map( (x,i)=>
		<span key={i}
					onClick={ ()=> props.unselectNumber(x) }
					>{x}</span>
	)
	return (
		<div className="col-5">
			{selectedNumbers}
		</div>
	)
}

const Numbers = (props) => {

	const numberClassName = (num) => {
		if(props.usedNumbers.indexOf(num) >= 0){
			return 'used'
		}
		if(props.selectedNumbers.indexOf(num) >= 0){
			return 'selected'
		}
	}


	const numbers = _.range(1,10).map( (num,i)=>
		<span key={i}
					className={numberClassName(num)}
					onClick={ ()=> props.selectNumber(num)}
					>{num}</span>
	)

	return (
		<div>
			{numbers}
		</div>
	)
}


class Game extends Component {
	static randomNumber = () => Math.floor(Math.random()*9) + 1;
	state = {
		randomNumberOfStars: Game.randomNumber(),
		selectedNumbers: [],
		usedNumbers: [],
		answerIsCorrect: null,
		refresh: 5
	};

	selectNumber(num) {
		if(this.state.selectedNumbers.indexOf(num) >= 0){ return ;}
		if(this.state.usedNumbers.indexOf(num) >=0){return ;}
		this.setState( prevState => ({
			answerIsCorrect: null,
			selectedNumbers: prevState.selectedNumbers.concat(num)
		}))
	};

	unselectNumber(num) {
		this.setState( prevState => ({
			selectedNumbers: prevState.selectedNumbers.filter( x => x !== num)
		}))
	}

	checkAnswer = () => {
		this.setState( prevState => ({
			answerIsCorrect: prevState.randomNumberOfStars ===
					prevState.selectedNumbers.reduce( (sum, num) => sum + num, 0),
		}))
	}

	confirmAnswer = (num) => {
		this.setState( prevState => ({
			randomNumberOfStars: Game.randomNumber(),
			selectedNumbers: [],
			usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
			answerIsCorrect: null
		}))
	}

	hitRefresh(){
		if(this.state.refresh === 0) {return ;}
		this.setState(prevState => ({
			randomNumberOfStars: Game.randomNumber(),
			selectedNumbers: [],
			refresh: prevState.refresh - 1,
			answerIsCorrect: null
		}))
	}

	render() {
		const {
			randomNumberOfStars,
			selectedNumbers,
			answerIsCorrect,
			usedNumbers,
			refresh } = this.state;
		return (
			<div className="container">
				<h1>Play Nine</h1>
				<hr />
				<div className="row">
					<Stars numberOfStars={randomNumberOfStars} />
					<Button selectedNumbers={selectedNumbers}
									checkAnswer={this.checkAnswer.bind(this)}
									answerIsCorrect={answerIsCorrect}
									confirmAnswer={this.confirmAnswer.bind(this)}
									refresh={refresh}
									hitRefresh={this.hitRefresh.bind(this)}
									/>
					<Answer unselectNumber={this.unselectNumber.bind(this)}
									selectedNumbers={selectedNumbers}
									/>
				</div>
				<br />
				<div className="card text-center">
					<Numbers selectNumber={this.selectNumber.bind(this)}
										selectedNumbers={selectedNumbers}
										usedNumbers={usedNumbers}/>
				</div>
			</div>
		)
	}
}

export default Game;
