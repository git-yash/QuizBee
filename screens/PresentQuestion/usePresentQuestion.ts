import { useState } from "react";
import Player from "../../models/Player";
import { ActionSheet } from "native-base";
import { Route } from "react-native";

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
      return "#89d469";
    } else if (selectedAnswer === answerChoice) {
      return "#f19191";
    } else {
      return "black";
    }
  };

  return {
    showStealOptions,
    currentPlayer,
    question,
    setSelectedAnswer,
    selectedAnswer,
    players,
    categories,
    getColor
  };
};

export default usePresentQuestion;
