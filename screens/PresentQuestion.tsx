import { Body, Button, Container, Content, Footer, ListItem, Radio, Text, Toast } from "native-base";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const PresentQuestion = ({ navigation, route }) => {
  const { question, players, categories } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState<string>(question.attempted_answer);

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
          <Text style={{color: selectedAnswer === answerChoice && question.getColor('black')}}>{answerChoice}</Text>
        </Body>
      </ListItem>
    );
  };

  return (
    <Container>
      <ScrollView>
        <Content>
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
