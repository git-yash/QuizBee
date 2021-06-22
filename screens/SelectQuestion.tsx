import {
  Button,
  Container,
  Content,
  Footer,
  Header, ListItem,
  Text,
  View
} from "native-base";
import { create } from "apisauce";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Category from "../models/Category";
import Question from "../models/Question";
import Player from "../models/Player";

const api = create({
  baseURL: "https://opentdb.com",
  headers: { Accept: "application/json" }
});

const createQuestionButton = (question: Question, id: number, navigation) => {
  return (
    <Button rounded light onPress={() => navigation.navigate("PresentQuestion", { question: question })}
            style={{ margin: 5 }}>
      <Text>{id}</Text>
    </Button>
  );
};

const createPlayerItem = (player: Player) => {
  return (
    <View
      style={{ borderRightColor: "lightgray", borderRightWidth: 1, backgroundColor: "#f0ad4e", flex: 1, padding: 10 }}>
      <Text style={{ fontWeight: "bold" }}>{player.name}</Text>
      <Text>{player.score}</Text>
    </View>
  );
};

const createCategoryItem = (category: Category, navigation) => {
  return (
    <View key={category.id}
          style={{ backgroundColor: "#ececec", padding: 10, borderBottomColor: "lightgray", borderBottomWidth: 1 }}>
      <View>
        <Text style={{ fontSize: 22, marginBottom: 10 }}>{category.name}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {category.questions?.map((q: Question, index: number) => createQuestionButton(q, index + 1, navigation))}
      </View>
    </View>
  );
};

const SelectQuestion = ({ route, navigation }) => {
  const { categories, players } = route.params;
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

const styles = StyleSheet.create({});

export default SelectQuestion;
