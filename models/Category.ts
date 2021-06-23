import Question from './Question';

export default class Category {
  id = '';
  name = '';
  selected = false;

  public questions: Question[] = [];

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }
}
