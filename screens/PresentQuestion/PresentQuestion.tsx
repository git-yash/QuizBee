import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  Icon,
  ListItem,
  Radio,
  Text,
  Toast,
  View
} from "native-base";
import React from "react";
import { Alert, Route } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Player from "../../models/Player";
import { decode } from "html-entities";
import styles from "./PresentQuestion.style";
import usePresentQuestion from "./usePresentQuestion";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";

const PresentQuestion = (props: { navigation: any; route: Route }) => {
  const { navigation, route } = props;
  const {
    showStealOptions,
    currentPlayer,
    question,
    selectedAnswer,
    setSelectedAnswer,
    players,
    getColor,
    onSubmit
  } = usePresentQuestion(navigation, route);

  const createAnswerChoiceItem = (id: number, answerChoice: string) => {
    return (
      <ListItem
        key={id}
        onPress={() =>
          !question.attempted_answer && setSelectedAnswer(answerChoice)
        }>
        {!question.attempted_answer && (
          <Radio
            selected={selectedAnswer === answerChoice}
            onPress={() => setSelectedAnswer(answerChoice)}
          />
        )}
        <Body>
          <Text style={{ color: getColor(answerChoice) }}>
            {decode(answerChoice)}
          </Text>
        </Body>
      </ListItem>
    );
  };

  React.useLayoutEffect(() => {
    if (question.attempted_answer) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (
        <Button style={styles.stealButton} onPress={() => showStealOptions()}>
          <Icon name="shuffle" />
        </Button>
      )
    });
  }, [currentPlayer]);

  return (
    <Container>
      <ScrollView>
        <Content>
          <View style={styles.playerScores}>
            {players.map((p: Player) => (
              <ScoreBoard key={p.id} currentPlayer={currentPlayer} player={p} />
            ))}
          </View>
          <Text style={styles.questionText}>{decode(question.question)}</Text>
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
            onPress={() => onSubmit()}>
            <Text>Submit</Text>
          </Button>
        </Footer>
      )}
    </Container>
  );
};

export default PresentQuestion;
