import { useState } from "react";
import Player from "../../models/Player";
import { ActionSheet } from "native-base";
import { Route } from "react-native";
import Category from "../../models/Category";
import Question from "../../models/Question";

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
    const otherPlayers = players.filter((p: Player) => p.id != currentPlayer.id);
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

  const getWinner = () => {
    let totalAnsweredQuestions = 0;
    let totalQuestions = 0;

    categories.forEach((c: Category) => {
      totalQuestions += c.questions.length;

      const answeredQuestions = c.questions.filter((q: Question) => q.attempted_answer);
      totalAnsweredQuestions += answeredQuestions.length;
    });

    if (totalQuestions === totalAnsweredQuestions) {
      const sortPlayers = players.sort((a: Player, b: Player) => a.score - b.score);
      return sortPlayers[0];
    }

    return undefined;
  };

  return {
    showStealOptions,
    currentPlayer,
    question,
    setSelectedAnswer,
    selectedAnswer,
    players,
    categories,
    getColor,
    getWinner
  };
};

export default usePresentQuestion;
