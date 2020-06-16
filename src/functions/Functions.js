// import React, { useState } from 'react'

// export const isStrongestLink = () => {
//   const strongestLink = contestants.reduce((max, contestant) => max.rightAnswers > contestant.rightAnswers ? max : contestant)
//   setStrongestLink(strongestLink)
// }


// export const isWeakestLink = () => {
//   const weakestLink = contestants.reduce((max, contestant) => max.wrongAnswers > contestant.wrongAnswers ? max : contestant)

//   setWeakestLink(weakestLink)
// }


// export const handleSubmit = (event) => {
//   event.preventDefault()
//   if (formValue != '') {
//     setFormValue('')
//     const contestant = new Contestant(event.target[0].value, contestants.length)
//     const allContestants = contestants
//     allContestants.push(contestant)
//     setContestants([...allContestants])
//     // console.log(contestants)
//   }
//   return

// }

// export const handleChange = (event) => {
//   setFormValue(event.target.value)
// }


// export const increaseContestantScore = (key) => {
//   const allContestants = contestants
//   allContestants[key].rightAnswers += 1
//   allContestants[key].totalRightAnswers += 1
//   setContestants([...allContestants])
//   answerChain < 9 ? setAnswerChain(answerChain + 1) : null
//   isStrongestLink()
//   isWeakestLink()
// }

// export const wrongAnswer = (key) => {
//   setAnswerChain(0)
//   const allContestants = contestants
//   allContestants[key].wrongAnswers += 1
//   allContestants[key].totalWrongAnswers += 1
//   setContestants([...allContestants])
//   isStrongestLink()
//   isWeakestLink()

// }


// export const bank = (index) => {
//   let kitty = pot
//   kitty += moneyChain[answerChain]
//   const allContestants = contestants
//   allContestants[index].moneyBanked += moneyChain[answerChain]
//   setContestants([...allContestants])
//   setPot(kitty)
//   setAnswerChain(0)
//   console.log(contestants[index])

// }