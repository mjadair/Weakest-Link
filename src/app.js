import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Contestant from './models/contestant'
import RightAnswerButton from './rightAnswerButton'
import BankButton from './Bank'
import WeakestLinkButton from './WeakestLinkButton'
import WrongAnswerButton from './WrongAnswer'
import Timer from 'react-compound-timer'

const quizAudio = new Audio('./audio/quiz_audio.mp3')
const loser = new Audio('/audio/loser_theme.mp3')

import './style.scss'

const App = () => {
  const [formValue, setFormValue] = useState('')
  const [contestants, setContestants] = useState([])
  const [moneyChain, setMoneyChain] = useState([0, 20, 50, 100, 200, 300, 450, 600, 800, 1000])
  const [answerChain, setAnswerChain] = useState(0)
  const [strongestLink, setStrongestLink] = useState('')
  const [weakestLink, setWeakestLink] = useState('')
  const [pot, setPot] = useState(0)
  const [music, setMusic] = useState(quizAudio)
  const [loserAudio, setLoserAudio] = useState(loser)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentContestant, setCurrentContestant] = useState('')


  //Functions to set Strongest and Weakest Links ========================================
  function isStrongestLink(remainingContestants = contestants) {
    const strongestLink = remainingContestants.reduce((max, contestant) => max.rightAnswers > contestant.rightAnswers ? max : contestant)
    setStrongestLink(strongestLink)
  }

  function isWeakestLink() {
    const weakestLink = contestants.reduce((max, contestant) => max.wrongAnswers > contestant.wrongAnswers ? max : contestant)
    setWeakestLink(weakestLink)
  }


  //Form Change and Submit functions to add contestants ======================================
  function handleSubmit(event) {
    event.preventDefault()
    if (formValue !== '') {
      setFormValue('')
      const contestant = new Contestant(event.target[0].value, contestants.length + 1)
      const allContestants = contestants
      allContestants.push(contestant)
      setContestants([...allContestants])
    }
    return
  }

  function handleChange(event) {
    setFormValue(event.target.value)
  }



  // Increases contestant Score on right answers ==================================================
  function increaseContestantScore(key) {
    const allContestants = contestants
    allContestants[key].rightAnswers += 1
    allContestants[key].totalRightAnswers += 1
    setContestants([...allContestants])
    setCurrentContestant(currentContestant.id === contestants.length ? contestants[0] : contestants[currentContestant.id])
    answerChain < 9 ? setAnswerChain(answerChain + 1) : null
    isStrongestLink()
    isWeakestLink()
  }

  // Decreases contestant score on wrong answers ===================================================
  function wrongAnswer(key) {
    setAnswerChain(0)
    const allContestants = contestants
    allContestants[key].wrongAnswers += 1
    allContestants[key].totalWrongAnswers += 1
    setContestants([...allContestants])
    setCurrentContestant(currentContestant.id === contestants.length ? contestants[0] : contestants[currentContestant.id])
    isStrongestLink()
    isWeakestLink()
  }

  // Bank logic ================================================================================
  function bank(index) {
    let kitty = pot
    kitty += moneyChain[answerChain]
    const allContestants = contestants
    allContestants[index].moneyBanked += moneyChain[answerChain]
    setContestants([...allContestants])
    setPot(kitty)
    setAnswerChain(0)
  }


  // Starts the round =======================================================================
  function startTheClock() {
    loserAudio.pause()
    loserAudio.currentTime = 0
    setIsPlaying(true)
    music.play()
    setCurrentContestant(strongestLink ? strongestLink : contestants[0])
    const resetScores = contestants.map((contestant) => {
      contestant.rightAnswers = 0
      contestant.wrongAnswers = 0
      return contestant
    })
    setContestants([...resetScores])
    setAnswerChain(0)
  }

  // Ends the round =========================================================================
  function stopTheClock() {
    music.pause()


  }

  //Resets the music when clock resets =====================================================
  function resetClock() {
    setIsPlaying(false)
    loserAudio.pause()
    loserAudio.currentTime = 0
    music.pause()
    music.currentTime = 0

  }


  //Removes a contestant ===================================================================
  function youAreTheWeakestLink(contestantIndex) {
    loserAudio.play()
    const remainingContestants = contestants.filter((contestant, index) => {
      return index !== contestantIndex
    })

    remainingContestants.forEach((contestant, index) => {
      remainingContestants[index].id = index + 1
    })

    console.log(remainingContestants)
    // console.log(remainingContestants)
    isStrongestLink(remainingContestants)
    setContestants([...remainingContestants])
    // .then(console.log("new contestants: ", contestants))

    // console.log(strongestLink)
  }




  return <>
    <div className="top">
      <div>
        <Timer
          initialTime={83000}
          startImmediately={false}
          direction="backward"
          onStart={() => startTheClock()}
          onStop={() => stopTheClock()}
          onReset={() => resetClock()}
        >
          {({ start, stop, reset, getTimerState }) => (
            <React.Fragment>
              <div className="timer">
                0<Timer.Minutes />:<Timer.Seconds />
              </div>
              <br />
              <div>
                {getTimerState() === 'STOPPED' ? reset() : null}
                <button onClick={start}>Start the Clock</button>
                <button onClick={stop}>Stop</button>
              </div>
            </React.Fragment>
          )}
        </Timer>


        {/* {console.log(<Timer.Seconds />)} */}

        <form onSubmit={() => handleSubmit(event)}>
          <label>
            <input type="text" name="name" value={formValue} onChange={() => handleChange(event)} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
      <img className="logo" src="./Images/Logo.png" />

    </div>

    <div className="columns">
      <div className="contestant-column">

        {isPlaying ?

          <div className="contestants " key={currentContestant.id - 1}>
            <p className="name">{currentContestant.name}</p>
            {/* <p>{strongestLink.name === currentContestant.name ? 'STRONGEST LINK' : null}</p>
            <p>{weakestLink.name === currentContestant.name ? 'WEAKEST LINK' : null}</p> */}
            {/* <p >Right Answers: {currentContestant.rightAnswers}</p>
            <p >Incorrect Answers: {currentContestant.wrongAnswers}</p> */}
            <span> <RightAnswerButton index={currentContestant.id - 1} increaseContestantScore={increaseContestantScore} />
              <WrongAnswerButton index={currentContestant.id - 1} wrongAnswer={wrongAnswer} /> </span>
            <BankButton index={currentContestant.id - 1} bank={bank} />
          </div>


          :




          <div >{contestants.map((contestant, key) => {
            return <div className="contestants " key={key}>
              <p className="name">{contestant.name}</p>
              {/* <p className="strongest-link">{strongestLink.name === contestant.name ? 'STRONGEST LINK' : null}</p>
              <p className="weakest-link">{weakestLink.name === contestant.name ? 'WEAKEST LINK' : null}</p> */}
              <p >Right Answers: {contestant.rightAnswers}</p>
              <p >Incorrect Answers: {contestant.wrongAnswers}</p>
              <WeakestLinkButton index={key} youAreTheWeakestLink={youAreTheWeakestLink} />
            </div>
          })}</div>}
      </div>

      <div className="money-column">


        {isPlaying ?
          <div className="money-chain">
            <div className="value-disc pot-amount">{pot}</div>
            {moneyChain.map((amount, key) => {
              return <div className={`value-disc ${answerChain >= key ? 'banked-value' : 'not-banked-value'} ${answerChain === key ? 'current-value' : ''}`} key={key}>{amount}</div>
            })}
          </div>
          :
          null
        }

      </div>

      {!isPlaying && strongestLink ? <p className="summary"> At the end of the round {strongestLink.name} is the strongest link, they answered {strongestLink.rightAnswers} questions correctly. With {weakestLink.wrongAnswers} incorrect answers, {weakestLink.name} is the Weakest Link. But who will the contestants decide is the Weakest Link?</p> : null}
    </div>
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)