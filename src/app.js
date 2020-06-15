import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Contestant from './models/contestant'
import RightAnswerButton from './rightAnswerButton'
import BankButton from './Bank'

import './style.scss'



const App = () => {
  const [formValue, setFormValue] = useState('')
  const [contestants, setContestants] = useState([])
  const [moneyChain, setMoneyChain] = useState([0, 20, 50, 100, 200, 300, 450, 600, 800, 1000])
  const [pot, setPot] = useState(0)
 




  function handleSubmit(event) {
    event.preventDefault()
    if (formValue != '') {
      setFormValue('')
      const contestant = new Contestant(event.target[0].value)
      const allContestants = contestants
      allContestants.push(contestant)
      setContestants([...allContestants])
      console.log(contestants)
    }
    return

  }

  function handleChange(event) {
    setFormValue(event.target.value)
  }


  function increaseContestantScore(key) {
    console.log(key)
    const allContestants = contestants
    allContestants[key].rightAnswers += 1
    allContestants[key].totalRightAnswers += 1
    setContestants([...allContestants])
  }


  function bank() {

  }


  return <>
    <form onSubmit={() => handleSubmit(event)}>
      <label>
        <input type="text" name="name" value={formValue} onChange={() => handleChange(event)} />
      </label>
      <input type="submit" value="Submit" />
    </form>

    <div>{contestants.map((contestant, key) => {
      return <div key={key}>
        <p >Name: {contestant.name}</p>
        <p >Right Answers: {contestant.rightAnswers}</p>
        <p >Incorrect Answers: {contestant.wrongAnswers}</p>
        <RightAnswerButton index={key} increaseContestantScore={increaseContestantScore} />
      </div>
    })}</div>

    <div className="money-chain">{moneyChain.map((amount, key) => {
      return <div key={key}>{amount}</div>
    })}</div>

    <BankButton bank={bank} />


  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)