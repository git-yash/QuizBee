export default class Question {
  category: string | undefined;
  type: string | undefined;
  difficulty: string | undefined;
  question: string | undefined;
  correct_answer: string | undefined;
  incorrect_answers: string[] | undefined;

  private attempted_answer: string | undefined;

  getDifficultyWeightage(): number {
    switch (this.difficulty) {
      default:
      case 'easy':
        return 200;
      case 'medium':
        return 400;
      case 'hard':
        return 600;
    }
  }

  getScore(): number {
    const weightage = this.getDifficultyWeightage();
    const isCorrectAnswer = this.correct_answer === this.attempted_answer;
    return isCorrectAnswer ? weightage : -weightage;
  }

  setAnswer(answer: string) {
    this.attempted_answer = answer;
  }
}
