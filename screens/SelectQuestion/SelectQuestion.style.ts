import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  playerInfo: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  categoryView: {
    backgroundColor: '#ececec',
    padding: 10,
    marginBottom: 5,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  categoryText: {
    fontSize: 22,
    marginBottom: 10,
    marginLeft: 5,
  },
  categoryQuestions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playerItemView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  questionButton: {
    margin: 5,
  },
});

export default styles;
