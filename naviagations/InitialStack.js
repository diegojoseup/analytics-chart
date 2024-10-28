import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens

import DefaultScreen from '../src/screens/DefaultScreen';
import LineChartScreen from '../src/screens/LineChartScreen';
import ColumnChartScreen from '../src/screens/ColumnChartScreen';
import PieChartScreen from '../src/screens/PieChartScreen';
import BarChart from '../src/screens/BarChartScreen';
import BarLavelChartScreen from '../src/screens/BarLavelChartScreen';
import ProgressChartScreen from '../src/screens/ProgressChartScreen';

const Stack = createNativeStackNavigator();
function InitialStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#0f121c',
          },
        }}>
        <Stack.Screen name="Index" component={DefaultScreen} />
        <Stack.Screen
          name="LineChartScreen"
          options={{
            headerBackTitle: 'Go Back',
            title: 'Line Chart',
          }}
          component={LineChartScreen}
        />
        <Stack.Screen
          name="ColumnChartScreen"
          options={{headerBackTitle: 'Go Back', title: 'Column Chart'}}
          component={ColumnChartScreen}
        />
        <Stack.Screen
          name="PieChartScreen"
          options={{headerBackTitle: 'Go Back', title: 'Pie Chart'}}
          component={PieChartScreen}
        />
        <Stack.Screen
          name="BarChart"
          options={{headerBackTitle: 'Go Back', title: 'Bar Chart'}}
          component={BarChart}
        />
        <Stack.Screen
          name="BarLavelChartScreen"
          options={{headerBackTitle: 'Go Back', title: 'Bar Lavel Chart'}}
          component={BarLavelChartScreen}
        />
        <Stack.Screen
          name="ProgressChartScreen"
          options={{headerBackTitle: 'Go Back', title: 'Progress Chart'}}
          component={ProgressChartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default InitialStack;
