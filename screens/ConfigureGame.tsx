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
  Text
} from "native-base";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { create } from "apisauce";
import Category from "../models/Category";
import Question from "../models/Question";
import Player from "../models/Player";

const api = create({
  baseURL: "https://opentdb.com",
  headers: { Accept: "application/json" }
});

const ConfigureGame = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

  type CategoryResult = { trivia_categories: Category[] };

  useEffect(() => {
    api
      .get("/api_category.php")
      .then(response => response.data as CategoryResult)
      .then(result => {
        setCategories(result.trivia_categories as Category[]);
      });
  }, []);

  type QuestionResult = {
    response_code: number;
    results: Question[];
  };

  const getQuestionsForCategory = async (category: Category) => {
    return api
      .get(`/api.php?amount=${numberOfQuestions}&category=${category.id}`)
      .then(response => response.data as QuestionResult)
      .then(result => {
        return Promise.resolve(result.results as Question[]);
      });
  };

  const getQuestions = async (selectedCategories: Category[]) => {
    for (const c of selectedCategories) {
      const questions: Question[] = await getQuestionsForCategory(c);
      c.setQuestions(questions);
    }
  };

  const startGame = async () => {
    const players: Player[] = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      players.push(new Player(i));
    }

    let selectedCategories: Category[] = [];
    categories.forEach(c => {
      if (c.selected) {
        const category = new Category();
        Object.assign(category, c);
        selectedCategories.push(category);
      }
    });

    await getQuestions(selectedCategories);

    navigation.navigate("SelectQuestion", {
      name: "Questions",
      players: players,
      categories: selectedCategories
    });
  };

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

  const createCategoryItem = (category: Category) => {
    return (
      <ListItem
        key={category.id}
        onPress={() => {
          category.selected = !category.selected;
          setCategories([...categories]);
        }}>
        <CheckBox checked={category.selected} />
        <Body>
          <Text>{category.name}</Text>
        </Body>
      </ListItem>
    );
  };

  const createNumberOfQuestionItem = (numberOfQuestion: number) => {
    return (
      <ListItem
        key={numberOfQuestion}
        onPress={() => setNumberOfQuestions(numberOfQuestion)}>
        <Radio
          selected={numberOfQuestions === numberOfQuestion}
          onPress={() => setNumberOfQuestions(numberOfQuestion)}
        />
        <Body>
          <Text>{numberOfQuestion}</Text>
        </Body>
      </ListItem>
    );
  };

  return (
    <Container>
      <ScrollView>
        <Header style={{ backgroundColor: "white", paddingTop: 20, height: 90 }}>
          <Text style={{ color: "#3F51B5", fontWeight: "bold", fontSize: 36 }}>
            Quiz
          </Text>
          <Text style={{ color: "#f0ad4e", fontWeight: "bold", fontSize: 36 }}>
            Bee
          </Text>
          <Image source={require("../assets/images/wasp.png")} />
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
            {categories.map(c => createCategoryItem(c))}
          </View>
        </Content>
      </ScrollView>
      <Footer>
        <Button
          style={styles.startGameButton}
          onPress={() => startGame()}>
          <Text>Start Game</Text>
        </Button>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  playerText: { padding: 20 },
  playerButtonContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row"
  },
  playerButton: {
    margin: 10
  },
  startGameButton: {
    alignSelf: "center",
    padding: 20
  },
  sectionHeader: {
    margin: 10,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#dedede"
  }
});

export default ConfigureGame;
