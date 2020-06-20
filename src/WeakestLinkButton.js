import React from 'react'

const WeakestLinkButton = ({ index, youAreTheWeakestLink }) => {
  return <>

<button onClick={() => youAreTheWeakestLink(index)}>❌</button>

  </>
}

export default WeakestLinkButton