import Question from './Question';

export default class Category {
  id: number | undefined;
  name: string | undefined;

  private questions: Question[] | undefined;

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }
}
