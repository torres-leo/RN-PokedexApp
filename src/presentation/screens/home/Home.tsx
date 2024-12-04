import {View} from 'react-native';
import React from 'react';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import CustomIcon from '../../components/ui/CustomIcon';
import {getPokemons} from '../../../actions/pokemons';
import {useQuery} from '@tanstack/react-query';

export default function Home() {
  // Queries
  const {data, isLoading, error} = useQuery({
    queryKey: ['getPokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View>
      <Text variant="displaySmall">Home</Text>

      {isLoading ? (
        <ActivityIndicator theme={{colors: {primary: 'blue'}}} />
      ) : (
        <Button
          icon={() => <CustomIcon name="rocket" color="#fff" size={20} />}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      )}
    </View>
  );
}
