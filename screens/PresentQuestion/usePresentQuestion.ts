import { useState } from "react";
import Player from "../../models/Player";
import { ActionSheet, Toast } from "native-base";
import { Alert, Route } from "react-native";
import Category from "../../models/Category";
import Question from "../../models/Question";
import { decode } from "html-entities";

const usePresentQuestion = (navigation: any, route: Route) => {
  const { question, players, categories, currentPlayerRef } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    question.attempted_answer
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(currentPlayerRef);

  const onPlayerSwitch = (index: number, otherPlayers: Player[]) => {
    if (index === undefined) {
      return;
    }
    const player = otherPlayers[index];
    setCurrentPlayer(player);
  };

  const showStealOptions = () => {
    const otherPlayers = players.filter(
      (p: Player) => p.id != currentPlayer.id
    );
    ActionSheet.show(
      {
        options: otherPlayers.map((p: Player) => `Player ${p.id}`),
        title: "Who is stealing?"
      },
      (buttonIndex: number) => onPlayerSwitch(buttonIndex, otherPlayers)
    );
  };

  const getColor = (answerChoice: string) => {
    if (!question.attempted_answer) {
      return "black";
    } else if (question.correct_answer === answerChoice) {
      return "#66bf40";
    } else if (selectedAnswer === answerChoice) {
      return "#ca6060";
    } else {
      return "black";
    }
  };

  const getWinners = () => {
    let totalAnsweredQuestions = 0;
    let totalQuestions = 0;

    categories.forEach((c: Category) => {
      totalQuestions += c.questions.length;

      const answeredQuestions = c.questions.filter(
        (q: Question) => q.attempted_answer
      );
      totalAnsweredQuestions += answeredQuestions.length;
    });

    if (totalQuestions === totalAnsweredQuestions) {

      const sortPlayers = players.sort(
        (a: Player, b: Player) => b.score - a.score
      );

      const winner = sortPlayers[0];
      const isTie = players.every((p: Player) => p.score === winner.score);
      return isTie ? players : [winner];
    }

    return undefined;
  };

  const alertInvalidSelection = () => {
    Alert.alert(
      "Invalid selection",
      "Please select an answer",
      undefined,
      { cancelable: true }
    );
  };

  const showToast = () => {
    Toast.show({
      text: question.isCorrectAnswer()
        ? "Correct"
        : "Incorrect! The correct answer was " +
        decode(question.correct_answer) +
        ".",
      type: question.isCorrectAnswer() ? "success" : "danger",
      duration: question.isCorrectAnswer() ? 1500 : 3000
    });
  };

  const alertWinner = (winners: Player[]) => {
    if (!winners) {
      return;
    }

    const message = winners.length > 1 ? "It's a tie!" : `Winner is: ${winners[0].name}`
    Alert.alert("Game Over", message);
  };

  const onSubmit = () => {
    if (!selectedAnswer) {
      alertInvalidSelection();
      return;
    }

    question.attempted_answer = selectedAnswer;
    currentPlayer.answerQuestion(question);

    const winners = getWinners();
    showToast();
    alertWinner(winners);

    navigation.navigate("SelectQuestion", {
      name: "Select Question",
      players: players,
      categories: categories,
      answeredQuestion: question,
      winner: winners
    });
  };

  return {
    showStealOptions,
    currentPlayer,
    question,
    setSelectedAnswer,
    selectedAnswer,
    players,
    getColor,
    onSubmit
  };
};

export default usePresentQuestion;
