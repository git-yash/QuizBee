import { Alert } from "react-native";
import Player from "../../models/Player";
import { useEffect, useState } from "react";
import Category from "../../models/Category";
import Question from "../../models/Question";
import ConfigureGameService from "./ConfigureGame.service";

const useConfigureGame = (navigation) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const configureGameService = new ConfigureGameService();

  const setQuestions = async (selectedCategories: Category[]) => {
    for (const c of selectedCategories) {
      const questions: Question[] = await configureGameService.getQuestionsForCategory(c, numberOfQuestions);
      const sortedQuestions = questions.sort((a, b) => a.getDifficultyWeightage() - b.getDifficultyWeightage());
      c.setQuestions(sortedQuestions);
    }
  };

  const isNumberOfPlayersSelected = (selectedNumberOfPlayers: number) => {
    return numberOfPlayers === selectedNumberOfPlayers;
  };

  const startGame = async () => {
    let selectedCategories = categories.filter(c => c.selected);
    if (selectedCategories.length === 0) {
      Alert.alert("Invalid category selection", "Please select at least one category");
      return;
    } else if (selectedCategories.length > 8) {
      Alert.alert("Invalid category selection", "Select less than 8 categories");
      return;
    }

    const players: Player[] = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      players.push(new Player(i));
    }

    await setQuestions(selectedCategories);

    navigation.navigate("SelectQuestion", {
      name: "Questions",
      players: players,
      categories: selectedCategories
    });
  };

  useEffect(() => {
    configureGameService.getCategories().then(trivia_categories => setCategories(trivia_categories));
  }, []);

  return {
    startGame,
    isNumberOfPlayersSelected,
    setNumberOfPlayers,
    setNumberOfQuestions,
    setCategories,
    numberOfQuestions,
    categories
  };
};

export default useConfigureGame;
