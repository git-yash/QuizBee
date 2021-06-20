import {Button, Content, Picker, Text} from 'native-base';
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Question from '../models/Question';
import {create} from 'apisauce';
import Category from '../models/Category';

const ConfigureGame = () => {
  type QuestionResult = {
    response_code: number;
    results: Question[];
  };

  type CategoryResult = {trivia_categories: Category[]};

  let numberOfPlayers = 2;
  let categories: Category[] = [];

  const api = create({
    baseURL: 'https://opentdb.com',
    headers: {Accept: 'application/json'},
  });

  useEffect(() => {
    api
      .get('/api_category.php')
      .then(response => response.data as CategoryResult)
      .then(result => {
        categories = result.trivia_categories;
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
          numberOfPlayers = player;
          console.log(numberOfPlayers);
        }}
        style={styles.playerButton}>
        <Text>{player}</Text>
      </Button>
    );
  };

  const createPickerItem = (key: string, value: string) => {
    return <Picker.Item label={key} value={value} />;
  };

  return (
    <View>
      <ScrollView>
        <Content>
          <View style={styles.playerButtonContainer}>
            <Text style={styles.playerText}>Teams:</Text>
            {getPlayerButton(1)}
            {getPlayerButton(2)}
            {getPlayerButton(3)}
            {getPlayerButton(4)}
          </View>
          <Picker note mode="dropdown">
            <Picker.Item label="Wallet" value="key0" />
            <Picker.Item label="ATM Card" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
          </Picker>
        </Content>
      </ScrollView>
    </View>
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
});

export default ConfigureGame;
