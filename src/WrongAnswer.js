import React, { useState } from 'react'

const WrongAnswerButton = ({ index, wrongAnswer }) => {



  return <> 
  {/* {console.log("Key: ", index)} */}
  <button onClick={() => wrongAnswer(index)}>☠️</button>
  </>
}


export default WrongAnswerButton