import React from 'react'

const BankButton = ({ index, bank }) => {
  return <>

<button onClick={() => bank(index)}>BANK!</button>

  </>
}

export default BankButton