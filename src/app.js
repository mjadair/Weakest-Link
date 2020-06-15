import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Contestant from './models/contestant'




const App = () => {
  const [formValue, setFormValue] = useState('')
  const [contestants, setContestants] = useState([])




  function handleSubmit(event) {
    event.preventDefault()
    setFormValue('')
    const contestant = new Contestant(event.target[0].value)
    const allContestants = contestants
    allContestants.push(contestant)
    setContestants([...allContestants])


  }

  function handleChange(event) {
    setFormValue(event.target.value)
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
        <p >{contestant.name}</p>
        <p >{contestant.rightAnswers}</p>

      </div>
    })}</div>


  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)