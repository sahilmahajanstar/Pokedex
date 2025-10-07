import { Pokemon, useGetPokemons } from 'src/hooks/useGetPokemons';
import React, { useMemo, useState } from 'react';

import { PokemonList } from '../components';
import { SearchBox } from 'src/components/SearchBox';
import { appColors } from 'src/color';
import { createUseStyles } from 'react-jss';

export const ListPage = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchText, setSearchText] = useState('');

  // Filter Pokemon based on search text
  const filteredPokemons = useMemo(() => {
    if (!pokemons) return [];
    if (!searchText.trim()) return pokemons;
    return pokemons.filter((p: Pokemon) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [pokemons, searchText]);

  if (loading) {
    return <div className={classes.root}>Loading...</div>;
  }

  return (
    <div className={classes.root}>

      <div className={classes.searchContainer}>
        {/* Get Search query and use  */}
        <SearchBox value={searchText} onChange={setSearchText} placeholder='Search Pokemon...' />
      </div>

      {/* Pokémon List: Seperate Out presentational component. Passed only list to render */}
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      padding: '32px',
      backgroundColor: appColors.background,
    },
    searchContainer: {
      marginBottom: '16px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    searchBox: {
      width: '280px',
      padding: '10px 14px',
      borderRadius: '8px',
      border: `1px solid ${appColors.border}`,
      backgroundColor: appColors.background,
      color: appColors.primaryText,
      fontSize: '15px',
      outline: 'none',
      transition: 'border 0.2s ease, background 0.2s ease',
      '&:focus': {
        border: `1px solid ${appColors.border}`,
        backgroundColor: appColors.background,
      }
    },
    loadingText: {
      color: appColors.primaryText,
      fontSize: '16px',
      marginTop: '32px',
    },
  },
  { name: 'ListPage' }
);