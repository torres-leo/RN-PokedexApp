import React from 'react';
import {Text} from 'react-native-paper';
import {FlatList, Platform, Pressable, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getPokemons} from '@/actions/pokemons';
import {globalTheme} from '@/config/theme/global-theme';
import {RootStackParams} from '@/presentation/navigator/StackNavigator';
import CustomIcon from '@/presentation/components/ui/CustomIcon';
import Loader from '@/presentation/components/ui/Loader';
import Pokeballbg from '@/presentation/components/ui/Pokeballbg';
import PokemonCard from '@/presentation/components/pokemons/PokemonCard';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export default function Home({navigation}: Props) {
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const {data, isLoading, fetchNextPage} = useInfiniteQuery({
    queryKey: ['getPokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 60 min
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  if (isLoading) {
    return <Loader size={100} color="#4682B4" />;
  }

  const title = (
    <Text variant="displayMedium" style={{marginBottom: 20}}>
      PokeApp
    </Text>
  );

  const buttonSearchPosition = () => {
    if (Platform.OS === 'android') {
      return {bottom: 10, right: 10};
    } else if (Platform.OS === 'ios') {
      return {bottom: 0, right: 20};
    } else {
      return {bottom: 0, right: 20};
    }
  };

  const renderSearchIcon = () => (
    <CustomIcon name="search-circle-outline" color={'white'} size={40} />
  );

  return (
    <View style={[globalTheme.globalMargin]}>
      <Pokeballbg style={style.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        ListHeaderComponent={title}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.7}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

      <View style={[globalTheme.searchButton, buttonSearchPosition()]}>
        <Pressable
          onPress={() => navigation.push('SearchScreen')}
          style={({pressed}) => [
            globalTheme.searchButtonIcon,
            {
              backgroundColor: '#6A5ACD',
              transform: [{scale: pressed ? 1.1 : 1}],
            },
          ]}>
          {renderSearchIcon()}
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -80,
    right: -60,
  },
});
