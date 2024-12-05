import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getPokemons} from '@/actions/pokemons';
import {globalTheme} from '@/config/theme/global-theme';
import Pokeballbg from '@/presentation/components/ui/Pokeballbg';
import PokemonCard from '@/presentation/components/pokemons/PokemonCard';
import Loader from '@/presentation/components/ui/Loader';

export default function Home() {
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
