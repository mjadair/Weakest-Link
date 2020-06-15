import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { EventEmitter } from 'events'



const App = () => {
  const [contestants, setContestants] = useState()




  function handleSubmit(event, name) {
    event.preventDefault()
    console.log(event)
  }









  return <>
    <form onSubmit={() => handleSubmit(event)}>
      <label>
    <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)