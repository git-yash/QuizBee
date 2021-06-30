import { Body, Button, CheckBox, Container, Content, Footer, Header, ListItem, Radio, Text } from "native-base";
import { Image, ScrollView, View } from "react-native";
import React from "react";
import Category from "../../models/Category";
import styles from "./ConfigureGame.style";
import useConfigureGame from "./useConfigureGame";

const ConfigureGame = ({ navigation }) => {
  const {
    startGame,
    isNumberOfPlayersSelected,
    setNumberOfPlayers,
    setCategories,
    setNumberOfQuestions,
    categories,
    numberOfQuestions
  } = useConfigureGame(navigation);

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
          <Image source={require("../../assets/images/wasp.png")} />
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
          onPress={async () => await startGame()}>
          <Text>Start Game</Text>
        </Button>
      </Footer>
    </Container>
  );
};

export default ConfigureGame;
