import React from 'react';
import {Root} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ConfigureGame from './screens/ConfigureGame';
import PresentQuestion from './screens/PresentQuestion';
import SelectQuestion from './screens/SelectQuestion';

const App = () => {
  const Stack = createStackNavigator();
  const GameStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="QuizBee" component={ConfigureGame} />
          <Stack.Screen name="Question" component={PresentQuestion} />
          <Stack.Screen name="Select Question" component={SelectQuestion} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return <Root>{GameStack()}</Root>;
};

export default App;
