import React, { useState } from 'react'

const RightAnswerButton = ({ index, increaseContestantScore }) => {



  return <> 
  {/* {console.log("Key: ", index)} */}
  <button onClick={() => increaseContestantScore(index)}>Correct</button>
  </>
}


export default RightAnswerButton