import {Button, Container, Text, View} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Category from '../../models/Category';
import Question from '../../models/Question';
import Player from '../../models/Player';
import useSelectQuestion from './useSelectQuestion';
import styles from './SelectQuestion.style';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import {Route} from 'react-native';

const SelectQuestion = (props: {navigation: any; route: Route}) => {
  const {navigation, route} = props;
  const {categories, currentPlayer, players, onSelectQuestion} = useSelectQuestion(navigation, route);

  const createQuestionButton = (question: Question, id: number) => {
    return (
      <Button
        key={id}
        rounded
        light
        onPress={() => onSelectQuestion(question)}
        style={{
          ...styles.questionButton,
          backgroundColor: question.getColor(),
        }}>
        <Text>{question.getDifficultyWeightage()}</Text>
      </Button>
    );
  };

  const createCategoryItem = (category: Category) => {
    return (
      <View key={category.id} style={styles.categoryView}>
        <View>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
        <View style={styles.categoryQuestions}>
          {category.questions.map((q: Question, index: number) =>
            createQuestionButton(q, index + 1),
          )}
        </View>
      </View>
    );
  };

  return (
    <Container>
      <ScrollView>
        <View style={styles.playerItemView}>
          {players.map((p: Player) => (
            <ScoreBoard key={p.id} currentPlayer={currentPlayer} player={p} />
          ))}
        </View>
        {categories.map((c: Category) => createCategoryItem(c))}
      </ScrollView>
    </Container>
  );
};

export default SelectQuestion;
