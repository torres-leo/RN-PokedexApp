import {pokeApi} from '../../config/api/pokeApi';
import type {Pokemon} from '../../domain/entities/pokemon';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const sleep = async () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
};

export const getPokemons = async (
  page: number,
  limit = 20,
): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon';
    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url, {
      params: {
        offset: page * 20,
        limit,
      },
    });

    const pokemonPromises = data.results.map(pokemon => {
      return pokeApi.get<PokeAPIPokemon>(pokemon.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    throw new Error('Error getting Pokemons');
  }
};
