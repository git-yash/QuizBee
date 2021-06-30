import { useEffect, useState } from "react";
import Category from "../../models/Category";
import Question from "../../models/Question";
import Player from "../../models/Player";
import Util from "../../util/Util";

const useSelectQuestion = (route) => {
  const { categories, players, answeredQuestion } = route.params;
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(Util.getRandomPlayerId(players));

  useEffect(() => {
    // guard clause
    if (!answeredQuestion || !currentPlayer) {
      return;
    }

    if (currentPlayer.id === players.length) {
      setCurrentPlayer(players[0]);
    } else {
      setCurrentPlayer(players[currentPlayer?.id]);
    }

    const category = categories.find((c: Category) => c.name === answeredQuestion.category);
    if (category) {
      category.questions.forEach((q: Question) => {
        if (q.question === answeredQuestion.question) {
          q.attempted_answer = answeredQuestion.attempted_answer;
        }
      });
    }

  }, [answeredQuestion]);

  return {
    categories,
    currentPlayer,
    players
  };
};

export default useSelectQuestion;
