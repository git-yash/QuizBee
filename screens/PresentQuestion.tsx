import {
  ActionSheet,
  Body,
  Button,
  Container,
  Content,
  Footer, Icon,
  ListItem,
  Radio,
  Text,
  Toast,
  View
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Player from "../models/Player";
import { decode } from "html-entities";

const PresentQuestion = ({ navigation, route }) => {
  const { question, players, categories, currentPlayerRef } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    question.attempted_answer
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(currentPlayerRef);

  useEffect(() => {
    setCurrentPlayer(currentPlayerRef);
  }, []);

  const showStealOptions = () => {
    const otherPlayers = players.filter((p: Player) => p.id != currentPlayer.id);
    ActionSheet.show(
      {
        options: otherPlayers.map((p: Player) => `Player ${p.id}`),
        title: "Who is stealing?"
      },
      (buttonIndex: number) => {
        if (buttonIndex === undefined) {
          return;
        }
        setCurrentPlayer(players[buttonIndex]);
      }
    );
  };

  React.useLayoutEffect(() => {
    if (question.attempted_answer) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (<Button onPress={() => showStealOptions()}><Icon name="shuffle" /></Button>)
    });
  }, [navigation]);

  const createPlayerItem = (player: Player) => {
    return (
      <View
        key={player.id}
        style={{
          backgroundColor:
            currentPlayer?.id === player.id ? "#f0ad4e" : "white",
          borderRightColor: "lightgray",
          borderRightWidth: 1,
          flex: 1,
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "lightgray",
          borderBottomWidth: 1,
          borderBottomColor: "lightgray"
        }}>
        <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
          {player.name}
        </Text>
        <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 22 }}>
          {player.score}
        </Text>
      </View>
    );
  };

  const createAnswerChoiceItem = (id: number, answerChoice: string) => {
    const getColor = () => {
      if (!question.attempted_answer) {
        return "black";
      } else if (question.correct_answer === answerChoice) {
        return "#89d469";
      } else if (selectedAnswer === answerChoice) {
        return "#f19191";
      } else {
        return "black";
      }
    };

    return (
      <ListItem key={id} onPress={() => !question.attempted_answer && setSelectedAnswer(answerChoice)}>
        {!question.attempted_answer && (
          <Radio
            selected={selectedAnswer === answerChoice}
            onPress={() => setSelectedAnswer(answerChoice)}
          />
        )}
        <Body>
          <Text style={{ color: getColor() }}>{decode(answerChoice)}</Text>
        </Body>
      </ListItem>
    );
  };

  return (
    <Container>
      <ScrollView>
        <Content>
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
            {players.map((p: Player) => createPlayerItem(p))}
          </View>
          <Text
            style={{
              fontSize: 22,
              padding: 10,
              marginBottom: 20,
              marginTop: 20
            }}>
            {decode(question.question)}
          </Text>
          {question
            .getOptions()
            .map((o: string, index: number) =>
              createAnswerChoiceItem(index, o)
            )}
        </Content>
      </ScrollView>
      {!question.attempted_answer && (
        <Footer>
          <Button
            style={{ alignSelf: "center", padding: 20 }}
            onPress={() => {
              if (!selectedAnswer) {
                Alert.alert("Invalid selection", "Please select an answer", undefined, { cancelable: true });
                return;
              }

              question.attempted_answer = selectedAnswer;
              currentPlayer.answerQuestion(question);
              Toast.show({
                text: question.isCorrectAnswer() ? "Correct" : "Incorrect! The correct answer was " + question.correct_answer + ".",
                type: question.isCorrectAnswer() ? "success" : "danger",
                duration: question.isCorrectAnswer() ? 1500 : 3000
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
        </Footer>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PresentQuestion;
