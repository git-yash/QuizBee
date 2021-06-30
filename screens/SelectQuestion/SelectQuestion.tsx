import { Button, Container, Text, View } from "native-base";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Category from "../../models/Category";
import Question from "../../models/Question";
import Player from "../../models/Player";
import useSelectQuestion from "./useSelectQuestion";

const SelectQuestion = ({ route, navigation }) => {
  const {
    categories,
    currentPlayer,
    players
  } = useSelectQuestion(route);

  const createQuestionButton = (question: Question, id: number, navigation) => {
    return (
      <Button key={id} rounded light
              onPress={() => {
                navigation.navigate("PresentQuestion", {
                  name: question.category,
                  question: question,
                  players: players,
                  categories: categories,
                  currentPlayerRef: currentPlayer
                });
              }}
              style={{
                margin: 5,
                backgroundColor: question.getColor()
              }}>
        <Text>{question.getDifficultyWeightage()}</Text>
      </Button>
    );
  };
  const createPlayerItem = (player: Player) => {
    return (
      <View key={player.id}
            style={{
              backgroundColor: currentPlayer?.id === player.id ? "#f0ad4e" : "white",
              borderRightColor: "lightgray",
              borderRightWidth: 1,
              flex: 1,
              padding: 10,
              borderTopWidth: 1,
              borderTopColor: "lightgray",
              borderBottomWidth: 1,
              borderBottomColor: "lightgray"
            }}>
        <Text style={{ alignSelf: "center", fontWeight: "bold" }}>{player.name}</Text>
        <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 22 }}>{player.score}</Text>
      </View>
    );
  };

  const createCategoryItem = (category: Category, navigation) => {
    return (
      <View key={category.id}
            style={{
              backgroundColor: "#ececec",
              padding: 10,
              marginBottom: 5,
              borderBottomColor: "lightgray",
              borderBottomWidth: 1
            }}>
        <View>
          <Text style={{ fontSize: 22, marginBottom: 10, marginLeft: 5 }}>{category.name}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {category.questions.map((q: Question, index: number) => createQuestionButton(Object.assign(new Question(), q), index + 1, navigation))}
        </View>
      </View>
    );
  };

  return (
    <Container>
      <ScrollView>
        <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
          {players.map((p: Player) => createPlayerItem(p))}
        </View>
        {categories.map((c: Category) => createCategoryItem(c, navigation))}
      </ScrollView>
    </Container>
  );
};

export default SelectQuestion;