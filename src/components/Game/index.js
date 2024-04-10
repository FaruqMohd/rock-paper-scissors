import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      yourChoice: null,
      opponentChoice: null,
      result: '',
    }
  }

  playGame = choice => {
    const opponentChoice =
      choicesList[Math.floor(Math.random() * choicesList.length)]
    this.setState({yourChoice: choice, opponentChoice})

    let result = ''
    if (choice === opponentChoice.id) {
      result = 'IT IS DRAW'
    } else if (
      (choice === 'rock' && opponentChoice.id === 'scissors') ||
      (choice === 'paper' && opponentChoice.id === 'rock') ||
      (choice === 'scissors' && opponentChoice.id === 'paper')
    ) {
      result = 'YOU WON'
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      result = 'YOU LOSE'
      this.setState(prevState => ({score: prevState.score - 1}))
    }

    this.setState({result})
  }

  playAgain = () => {
    this.setState({yourChoice: null, opponentChoice: null, result: ''})
  }

  render() {
    const {score, yourChoice, opponentChoice, result} = this.state
    return (
      <div>
        <h1>Rock Paper Scissors</h1>
        <p>0</p>
        <p>Score: {score}</p>
        {choicesList.map(choice => (
          <img className="image" alt={choice.id} src={choice.imageUrl} />
        ))}

        {!yourChoice && (
          <div>
            <button
              data-testid="rockButton"
              onClick={() => this.playGame('rock')}
            >
              Rock
            </button>
            <button
              data-testid="paperButton"
              onClick={() => this.playGame('paper')}
            >
              Paper
            </button>
            <button
              data-testid="scissorsButton"
              onClick={() => this.playGame('scissors')}
            >
              Scissors
            </button>
          </div>
        )}
        {yourChoice && (
          <div className="GameResultView">
            <img src={yourChoice.imageUrl} alt="Your choice" />
            <img src={opponentChoice.imageUrl} alt="Opponent Choice" />
            <p>{result}</p>
            <button onClick={this.playAgain}>PLAY AGAIN</button>
          </div>
        )}
        <Popup trigger={<button>Rules</button>} modal>
          {close => (
            <div>
              <button onClick={close}>Close</button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="Rules"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default Game
