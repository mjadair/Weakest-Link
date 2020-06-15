class Contestant {
  constructor(name) {
    this.name = name,
    this.rightAnswers = 0
    this.wrongAnswers = 0
    this.totalRightAnswers = 0
    this.totalWrongAnswers = 0
  }

  newRound() {
    this.rightAnswers = 0
    this.wrongAnswers = 0
  }
}


export default Contestant