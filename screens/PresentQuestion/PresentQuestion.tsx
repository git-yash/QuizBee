import { Body, Button, Container, Content, Footer, Icon, ListItem, Radio, Text, Toast, View } from "native-base";
import React from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Player from "../../models/Player";
import { decode } from "html-entities";
import styles from "./PresentQuestion.style";
import usePresentQuestion from "./usePresentQuestion";

const PresentQuestion = ({ navigation, route }) => {
  const {
    showStealOptions,
    currentPlayer,
    question,
    selectedAnswer,
    setSelectedAnswer,
    players,
    categories,
    getColor
  } = usePresentQuestion(navigation, route);

  const createPlayerItem = (player: Player) => {
    return (
      <View
        key={player.id}
        style={{
          backgroundColor: currentPlayer?.id === player.id ? "#f0ad4e" : "white",
          borderRightColor: "lightgray",
          borderRightWidth: 1,
          flex: 1,
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "lightgray",
          borderBottomWidth: 1
        }}>
        <Text style={styles.playerName}>
          {player.name}
        </Text>
        <Text style={styles.playerScore}>
          {player.score}
        </Text>
      </View>
    );
  };

  const createAnswerChoiceItem = (id: number, answerChoice: string) => {
    return (
      <ListItem key={id} onPress={() => !question.attempted_answer && setSelectedAnswer(answerChoice)}>
        {!question.attempted_answer && (
          <Radio
            selected={selectedAnswer === answerChoice}
            onPress={() => setSelectedAnswer(answerChoice)}
          />
        )}
        <Body>
          <Text style={{ color: getColor(answerChoice) }}>{decode(answerChoice)}</Text>
        </Body>
      </ListItem>
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

  return (
    <Container>
      <ScrollView>
        <Content>
          <View
            style={styles.playerScores}>
            {players.map((p: Player) => createPlayerItem(p))}
          </View>
          <Text
            style={styles.questionText}>
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
            style={styles.submitButton}
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

export default PresentQuestion;
