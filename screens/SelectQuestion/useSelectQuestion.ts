import { useEffect, useState } from "react";
import Category from "../../models/Category";
import Question from "../../models/Question";
import Player from "../../models/Player";
import Util from "../../util/Util";
import { Route } from "react-native";

const useSelectQuestion = (navigation: any, route: Route) => {
  const { categories, players, answeredQuestion, winner } = route.params;
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    Util.getRandomPlayerId(players)
  );

  const setNextPlayer = () => {
    if (winner) {
      return;
    }

    if (currentPlayer.id === players.length) {
      setCurrentPlayer(players[0]);
    } else {
      setCurrentPlayer(players[currentPlayer?.id]);
    }
  };

  const getCategory = () => {
    return categories.find(
      (c: Category) => c.name === answeredQuestion.category
    );
  };

  const setAnswer = () => {
    const category = getCategory();
    if (!category) {
      return;
    }

    category.questions.forEach((q: Question) => {
      if (q.question === answeredQuestion.question) {
        q.attempted_answer = answeredQuestion.attempted_answer;
      }
    });
  };

  const onSelectQuestion = (question: Question) => {
    navigation.navigate("PresentQuestion", {
      name: question.category,
      question: question,
      players: players,
      categories: categories,
      currentPlayerRef: currentPlayer
    });
  };

  useEffect(() => {
    // guard clause
    if (!answeredQuestion || !currentPlayer) {
      return;
    }

    setNextPlayer();
    setAnswer();
  }, [answeredQuestion]);

  return {
    categories,
    currentPlayer,
    players,
    onSelectQuestion
  };
};

export default useSelectQuestion;
