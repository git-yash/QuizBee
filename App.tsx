import React from "react";
import { Root } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ConfigureGame from "./screens/ConfigureGame/ConfigureGame";
import PresentQuestion from "./screens/PresentQuestion";
import SelectQuestion from "./screens/SelectQuestion";

const App = () => {
  const Stack = createStackNavigator();
  const GameStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ConfigureScreen"
            component={ConfigureGame}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PresentQuestion" component={PresentQuestion}
                        options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen name="SelectQuestion" component={SelectQuestion}
                        options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return <Root>{GameStack()}</Root>;
};

export default App;
