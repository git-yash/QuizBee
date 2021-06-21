import {
  Body,
  Button,
  CheckBox,
  Container,
  Content,
  Footer,
  Header,
  ListItem,
  Radio,
  Text,
} from 'native-base';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Question from '../models/Question';
import {create} from 'apisauce';
import Category from '../models/Category';

const ConfigureGame = ({navigation}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

  type QuestionResult = {
    response_code: number;
    results: Question[];
  };

  type CategoryResult = {trivia_categories: Category[]};

  const api = create({
    baseURL: 'https://opentdb.com',
    headers: {Accept: 'application/json'},
  });

  useEffect(() => {
    api
      .get('/api_category.php')
      .then(response => response.data as CategoryResult)
      .then(result => {
        setCategories(result.trivia_categories);
      });

    // api
    //   .get('/api.php?amount=10&category=9&difficulty=easy')
    //   .then(response => response.data as QuestionResult)
    //   .then(result => {
    //     if (result.response_code === 0 && result.results) {
    //       console.log(result.results.length);
    //     }
    //   });
  }, [api]);

  const isNumberOfPlayersSelected = (selectedNumberOfPlayers: number) => {
    return numberOfPlayers === selectedNumberOfPlayers;
  };

  const getPlayerButton = (player: number) => {
    return (
      <Button
        rounded
        light={!isNumberOfPlayersSelected(player)}
        warning={isNumberOfPlayersSelected(player)}
        onPress={() => {
          setNumberOfPlayers(player);
        }}
        style={styles.playerButton}>
        <Text>{player}</Text>
      </Button>
    );
  };

  const createMultiSelectListItem = (label: string, isChecked = false) => {
    return (
      <ListItem key={label}>
        <CheckBox checked={isChecked} />
        <Body>
          <Text>{label}</Text>
        </Body>
      </ListItem>
    );
  };

  const createNumberOfQuestionItem = (numberOfQuestion: number) => {
    return (
      <ListItem
        key={numberOfQuestion}
        onPress={() => setNumberOfQuestions(numberOfQuestion)}>
        <Radio selected={numberOfQuestions === numberOfQuestion} />
        <Body>
          <Text>{numberOfQuestion}</Text>
        </Body>
      </ListItem>
    );
  };

  return (
    <Container>
      <ScrollView>
        <Header style={{backgroundColor: 'white', paddingTop: 20, height: 100}}>
          <Text style={{color: '#3F51B5', fontWeight: 'bold', fontSize: 36}}>
            Quiz
          </Text>
          <Text style={{color: '#f0ad4e', fontWeight: 'bold', fontSize: 36}}>
            Bee
          </Text>
          <Image source={require('../assets/images/wasp.png')} />
        </Header>
        <Content>
          <View style={styles.playerButtonContainer}>
            <Text style={styles.playerText}>Teams:</Text>
            {getPlayerButton(1)}
            {getPlayerButton(2)}
            {getPlayerButton(3)}
            {getPlayerButton(4)}
          </View>
          <View>
            <Text style={styles.sectionHeader}>Questions per category</Text>
            {createNumberOfQuestionItem(5)}
            {createNumberOfQuestionItem(7)}
            {createNumberOfQuestionItem(10)}
          </View>
          <View>
            <Text style={styles.sectionHeader}>Select categories</Text>
            {categories.map(c => createMultiSelectListItem(c.name))}
          </View>
        </Content>
      </ScrollView>
      <Footer>
        <Button
          style={styles.startGameButton}
          full
          onPress={() => navigation.navigate('SelectQuestion')}>
          <Text>Start Game</Text>
        </Button>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  playerText: {padding: 20},
  playerButtonContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  playerButton: {
    margin: 10,
  },
  startGameButton: {
    alignSelf: 'center',
    padding: 20,
  },
  sectionHeader: {
    margin: 10,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#dedede',
  },
});

export default ConfigureGame;
