import Player from "../../models/Player";
import { Text, View } from "native-base";
import React from "react";
import styles from "./ScoreBoard.style";

const ScoreBoard = (props: { currentPlayer: Player, player: Player }) => {
  const { currentPlayer, player } = props;
  return (
    <View
      key={player.id}
      style={{
        ...styles.scoreContainer,
        backgroundColor: currentPlayer?.id === player.id ? "#f0ad4e" : "white",
      }}>
      <Text style={styles.playerName}>
        {player.name}
      </Text>
      <Text style={styles.playerScore}>
        {player.score}
      </Text>
    </View>
  );
};

export default ScoreBoard;
