import Question from './Question';

export default class Player {
  id = 0;
  name = '';
  score = 0;

  constructor(id: number) {
    this.id = id;
    this.name = 'Player ' + String(this.id);
  }

  private answered_questions: Question[] = [];

  answerQuestion(question: Question) {
    this.score += question.getScore();
    this.answered_questions.push(question);
  }
}
