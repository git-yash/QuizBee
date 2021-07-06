import {create} from 'apisauce';
import Category from '../../models/Category';
import Question from '../../models/Question';

const api = create({
  baseURL: 'https://opentdb.com',
  headers: {Accept: 'application/json'},
});

type CategoryResult = {trivia_categories: Category[]};
type QuestionResult = {
  response_code: number;
  results: Question[];
};

export default class ConfigureGameService {
  async getCategories() {
    return api
      .get('/api_category.php')
      .then(response => response.data as CategoryResult)
      .then(result => {
        return Promise.resolve(
          result.trivia_categories.map(c => Object.assign(new Category(), c)),
        );
      });
  }

  async getQuestionsForCategory(category: Category, numberOfQuestions: number) {
    return api
      .get(`/api.php?amount=${numberOfQuestions}&category=${category.id}`)
      .then(response => response.data as QuestionResult)
      .then(result => {
        return Promise.resolve(
          result.results.map(q => Object.assign(new Question(), q)),
        );
      });
  }
}
