import { Body, Button, Container, Content, Footer, ListItem, Radio, Text, Toast, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Player from "../models/Player";

const PresentQuestion = ({ navigation, route }) => {
  const { question, players, categories, currentPlayerRef } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState<string>(question.attempted_answer);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(currentPlayerRef);

  useEffect(() => {
    setCurrentPlayer(currentPlayerRef);
  }, []);

  const createPlayerItem = (player: Player) => {
    const stealQuestion = (player: Player) => {
      setCurrentPlayer(player);
    };

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
        {!question.attempted_answer && currentPlayer?.id !== player.id && <Button onPress={() => stealQuestion(player)}><Text>Steal</Text></Button>}
      </View>
    );
  };

  const createAnswerChoiceItem = (id: number, answerChoice: string) => {
    return (
      <ListItem
        key={id}
        onPress={() => setSelectedAnswer(answerChoice)}>
        {!question.attempted_answer && <Radio
          selected={selectedAnswer === answerChoice}
          onPress={() => setSelectedAnswer(answerChoice)}
        />}
        <Body>
          <Text style={{ color: selectedAnswer === answerChoice && question.getColor("black") }}>{answerChoice}</Text>
        </Body>
      </ListItem>
    );
  };

  return (
    <Container>
      <ScrollView>
        <Content>
          <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
            {players.map((p: Player) => createPlayerItem(p))}
          </View>
          <Text style={{ fontSize: 22, padding: 10, marginBottom: 20, marginTop: 20 }}>{question.question}</Text>
          {question.getOptions().map((o: string, index: number) => createAnswerChoiceItem(index, o))}
        </Content>
      </ScrollView>
      {!question.attempted_answer && <Footer>
        <Button style={{ alignSelf: "center", padding: 20 }} onPress={() => {
          if (!selectedAnswer) {
            Alert.alert("Invalid selection", "Please select an answer");
            return;
          }

          question.attempted_answer = selectedAnswer;
          currentPlayer.answerQuestion(question);
          Toast.show({
            text: question.isCorrectAnswer() ? "Correct" : "Incorrect",
            type: question.isCorrectAnswer() ? "success" : "danger"
          });

          navigation.navigate("SelectQuestion", {
            name: "Select Question",
            players: players,
            categories: categories,
            answeredQuestion: question
          });
        }}>
          <Text>Submit</Text>
        </Button>
      </Footer>}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PresentQuestion;
