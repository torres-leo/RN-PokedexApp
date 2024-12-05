import {FlatList, Platform, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {globalTheme} from '@/config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Loader from '@/presentation/components/ui/Loader';
import PokemonCard from '@/presentation/components/pokemons/PokemonCard';
import {useQuery} from '@tanstack/react-query';
import {getPokemonsByIds, getPokemonsNamesId} from '@/actions/pokemons';
import useDebounce from '@/presentation/hooks/useDebounce';

export default function SearchScreen() {
  const [term, setTerm] = useState('');
  const {top} = useSafeAreaInsets();

  const debounceValue = useDebounce(term);

  const topSpace = Platform.OS === 'android' ? (top === 0 ? top + 20 : 10) : 20;

  const {data: pokemonList = [], isLoading} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonsNamesId(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (debounceValue.length === 0) {
      return [];
    }

    if (!isNaN(Number(debounceValue))) {
      const pokemon = pokemonList.find(
        item => item.id === Number(debounceValue),
      );
      return pokemon ? [pokemon] : [];
    }

    if (debounceValue.length < 3) {
      return [];
    }

    return pokemonList.filter(pokemon =>
      pokemon.name.includes(debounceValue.toLocaleLowerCase()),
    );
  }, [debounceValue, pokemonList]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(element => element.id)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loader color="#4682B4" style={{paddingTop: 80}} />;
  }

  return (
    <View
      style={[
        globalTheme.globalMargin,
        {
          paddingTop: topSpace,
        },
      ]}>
      <TextInput
        placeholder="Look for a pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />

      {isLoadingPokemons && <Loader color="#4682B4" style={{paddingTop: 80}} />}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 120}} />}
      />
    </View>
  );
}
