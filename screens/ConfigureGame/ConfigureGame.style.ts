import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  playerText: { padding: 20 },
  playerButtonContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row"
  },
  playerButton: {
    margin: 10
  },
  startGameButton: {
    alignSelf: "center",
    padding: 20
  },
  sectionHeader: {
    margin: 10,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#dedede"
  },
  titleHeader: {
    backgroundColor: "white",
    paddingTop: 20,
    height: 90
  },
  quizWord: {
    color: "#3F51B5",
    fontWeight: "bold",
    fontSize: 36
  },
  beeWord: {
    color: "#f0ad4e",
    fontWeight: "bold",
    fontSize: 36
  }
});

export default styles;
