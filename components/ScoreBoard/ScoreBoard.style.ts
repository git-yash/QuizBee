import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scoreContainer: {
    borderRightColor: "lightgray",
    borderRightWidth: 1,
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
  playerName: {
    alignSelf: "center",
    fontWeight: "bold"
  },
  playerScore: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 22
  }
});

export default styles;
