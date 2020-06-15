import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Contestant from './models/contestant'
import RightAnswerButton from './rightAnswerButton'
import BankButton from './Bank'
import WrongAnswerButton from './WrongAnswer'

import './style.scss'



const App = () => {
  const [formValue, setFormValue] = useState('')
  const [contestants, setContestants] = useState([])
  const [moneyChain, setMoneyChain] = useState([0, 20, 50, 100, 200, 300, 450, 600, 800, 1000])
  const [answerChain, setAnswerChain] = useState(0)
  const [strongestLink, setStrongestLink] = useState('')
  const [weakestLink, setWeakestLink] = useState('')
  const [pot, setPot] = useState(0)


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
      // console.log(contestants)
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


  function bank() {
    let kitty = pot
    kitty += moneyChain[answerChain]
    setPot(kitty)
    setAnswerChain(0)

  }


  return <>
    <h1>{pot ? `You have £${pot} in the pot!` : ''}</h1>
    <form onSubmit={() => handleSubmit(event)}>
      <label>
        <input type="text" name="name" value={formValue} onChange={() => handleChange(event)} />
      </label>
      <input type="submit" value="Submit" />
    </form>

    <div >{contestants.map((contestant, key) => {
      return <div className="contestants " key={key}>
        <p >Name: {contestant.name}</p>
        <p>{strongestLink.name === contestant.name ? 'STRONGEST LINK' : console.log(contestant.name, 'is not the strongest link')}</p>
       <p>{weakestLink.name === contestant.name ? 'WEAKEST LINK' : console.log(contestant.name, 'is not the weakest link')}</p>
        <p >Right Answers: {contestant.rightAnswers}</p>
        <p >Incorrect Answers: {contestant.wrongAnswers}</p>
        <span> <RightAnswerButton index={key} increaseContestantScore={increaseContestantScore} />
          <WrongAnswerButton index={key} wrongAnswer={wrongAnswer} /> </span>
       
      </div>
    })}</div>

    <div className="money-chain">{moneyChain.map((amount, key) => {
      return <div className={answerChain === key ? 'current-value' : ''} key={key}>{amount}</div>
    })}</div>

    <BankButton bank={bank} />


  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)