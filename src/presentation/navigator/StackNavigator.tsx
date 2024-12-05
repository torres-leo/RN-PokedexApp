import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import PokemonScreen from '../screens/pokemon/PokemonScreen';
import SearchScreen from '../screens/search/Search';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {pokemonId: number; color: string; name: string};
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen
        name="PokemonScreen"
        component={PokemonScreen}
        options={({route}) => ({
          headerShown: true,
          // title:
          //   route.params.name.charAt(0).toUpperCase() +
          //   route.params.name.toLowerCase().slice(1),
          title: 'Go Back',
          headerTitleStyle: {
            fontWeight: 600,
          },
        })}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: true,
          title: 'Go Back',
          headerTitleStyle: {
            fontWeight: 600,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
