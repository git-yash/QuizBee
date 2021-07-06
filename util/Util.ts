import Player from '../models/Player';

export default class Util {
  public static getRandomPlayerId = (players: Player[]): Player => {
    const playerID = Math.floor(Math.random() * (players.length - 2) + 1);
    return players[playerID - 1];
  };
}
