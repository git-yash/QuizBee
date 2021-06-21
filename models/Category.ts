import Question from './Question';

export default class Category {
  id = '';
  name = '';

  private questions: Question[] | undefined;

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }
}
