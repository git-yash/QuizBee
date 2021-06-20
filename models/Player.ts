import Question from './Question';

export default class Player {
  id = 0;
  name = '';
  score = 0;

  private answered_questions: Question[] = [];

  answerQuestion(question: Question, answer: string) {
    this.score += question.getScore();
    question.setAnswer(answer);
    this.answered_questions.push(question);
  }
}
