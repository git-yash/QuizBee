export default class Question {
  category = "";
  type = "";
  difficulty = "";
  question = "";
  correct_answer = "";
  incorrect_answers: string[] = [];

  attempted_answer = "";

  getDifficultyWeightage(): number {
    switch (this.difficulty) {
      default:
      case "easy":
        return 200;
      case "medium":
        return 400;
      case "hard":
        return 600;
    }
  }

  isCorrectAnswer(): boolean {
    return this.correct_answer === this.attempted_answer;
  }

  getScore(): number {
    const weightage = this.getDifficultyWeightage();
    return this.isCorrectAnswer() ? weightage : -weightage;
  }

  getOptions(): string[] {
    // guard clause - already exist
    if (this.incorrect_answers.find(a => a === this.correct_answer)) {
      return this.incorrect_answers;
    }

    let options = this.incorrect_answers;
    const randomSpot = Math.floor(Math.random() * this.incorrect_answers.length);
    options.splice(randomSpot, 0, this.correct_answer);
    return options;
  }

  getColor(defaultColor = "white") {
    const isCorrect = this.attempted_answer === this.correct_answer;
    const isIncorrect = this.attempted_answer;
    if (isCorrect) {
      return "#89d469";
    } else if (isIncorrect) {
      return "#f19191";
    } else {
      return defaultColor;
    }
  };
}
