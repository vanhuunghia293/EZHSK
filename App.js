import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LessonListScreen from './src/screens/LessonListScreen';
import LessonDetailScreen from './src/screens/LessonDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LessonList" component={LessonListScreen} />
        <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
