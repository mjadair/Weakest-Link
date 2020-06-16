import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Contestant from './models/contestant'
import RightAnswerButton from './rightAnswerButton'
import BankButton from './Bank'
import WrongAnswerButton from './WrongAnswer'

// import { bank, wrongAnswer, increaseContestantScore, handleChange, handleSubmit, isWeakestLink, isStrongestLink } from './functions/Functions'

import './style.scss'



const App = () => {
  const [formValue, setFormValue] = useState('')
  const [contestants, setContestants] = useState([])
  const [moneyChain, setMoneyChain] = useState([0, 20, 50, 100, 200, 300, 450, 600, 800, 1000])
  const [answerChain, setAnswerChain] = useState(0)
  const [strongestLink, setStrongestLink] = useState('')
  const [weakestLink, setWeakestLink] = useState('')
  const [pot, setPot] = useState(0)
  const [clock, setClock] = useState(false)


  function isStrongestLink() {
    const strongestLink = contestants.reduce((max, contestant) => max.rightAnswers > contestant.rightAnswers ? max : contestant)
    setStrongestLink(strongestLink)
  }

  function isWeakestLink() {
    const weakestLink = contestants.reduce((max, contestant) => max.wrongAnswers > contestant.wrongAnswers ? max : contestant)
    setWeakestLink(weakestLink)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (formValue != '') {
      setFormValue('')
      const contestant = new Contestant(event.target[0].value, contestants.length)
      const allContestants = contestants
      allContestants.push(contestant)
      setContestants([...allContestants])
    }
    return
  }

  function handleChange(event) {
    setFormValue(event.target.value)
  }

  function increaseContestantScore(key) {
    const allContestants = contestants
    allContestants[key].rightAnswers += 1
    allContestants[key].totalRightAnswers += 1
    setContestants([...allContestants])
    answerChain < 9 ? setAnswerChain(answerChain + 1) : null
    isStrongestLink()
    isWeakestLink()
  }

  function wrongAnswer(key) {
    setAnswerChain(0)
    const allContestants = contestants
    allContestants[key].wrongAnswers += 1
    allContestants[key].totalWrongAnswers += 1
    setContestants([...allContestants])
    isStrongestLink()
    isWeakestLink()
  }
  function bank(index) {
    let kitty = pot
    kitty += moneyChain[answerChain]
    const allContestants = contestants
    allContestants[index].moneyBanked += moneyChain[answerChain]
    setContestants([...allContestants])
    setPot(kitty)
    setAnswerChain(0)
  }
  function startTheClock(time) {
    let countdown = clock
    if (!countdown) {
      countdown = time
      setClock(countdown)
      const timerInterval = setInterval(() => {
        console.log("clock", clock)
        countdown -= 1
        setClock(countdown)
        if (!countdown) {
          
          clearInterval(timerInterval)
        }

      }, 1000)
    }
    return
  }


  return <>
    <button onClick={() => startTheClock(10)}>Start the Clock</button>
    <h1>{clock}</h1>
    <h1>{pot ? `You have £${pot} in the pot!` : ''}</h1>
    <form onSubmit={() => handleSubmit(event)}>
      <label>
        <input type="text" name="name" value={formValue} onChange={() => handleChange(event)} />
      </label>
      <input type="submit" value="Submit" />
    </form>

    <div className="columns">
      <div className="contestant-column">
        <div >{contestants.map((contestant, key) => {
          return <div className="contestants " key={key}>
            <p >Name: {contestant.name}</p>
            <p>{strongestLink.name === contestant.name ? 'STRONGEST LINK' : null}</p>
            <p>{weakestLink.name === contestant.name ? 'WEAKEST LINK' : null}</p>
            <p >Right Answers: {contestant.rightAnswers}</p>
            <p >Incorrect Answers: {contestant.wrongAnswers}</p>
            <span> <RightAnswerButton index={key} increaseContestantScore={increaseContestantScore} />
              <WrongAnswerButton index={key} wrongAnswer={wrongAnswer} /> </span>
            <BankButton index={key} bank={bank} />
          </div>
        })}</div>
      </div>

      <div className="money-column">
        <div className="money-chain">
          <div className="value-disc pot-amount">{pot}</div>
          {moneyChain.map((amount, key) => {
            return <div className={`value-disc ${answerChain >= key ? 'banked-value' : 'not-banked-value'} ${answerChain === key ? 'current-value' : ''}`} key={key}>{amount}</div>
          })}
        </div>
      </div>
    </div>
  </>
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
)