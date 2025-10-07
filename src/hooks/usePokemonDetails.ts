import { Pokemon } from './useGetPokemons';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client/react';

export type PokemonDetails  = Pokemon & {
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const usePokemonDetails = (id?: string, name?: string) => {
  const { data, loading, error } = useQuery<{pokemon: PokemonDetails}>(GET_POKEMON_DETAILS, {
    variables: { id, name },
    skip: !id && !name, // skip if neither id nor name provided
  });

  return {
    pokemon: data?.pokemon,
    loading,
    error,
  };
};
