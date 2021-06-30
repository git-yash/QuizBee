import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  playerName: {
    alignSelf: "center",
    fontWeight: "bold"
  },
  playerScore: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 22
  },
  playerScores: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  questionText: {
    fontSize: 22,
    padding: 10,
    marginBottom: 20,
    marginTop: 20
  },
  submitButton: {
    alignSelf: "center",
    padding: 20
  }
});

export default styles;
