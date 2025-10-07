import React, { useCallback, useMemo } from 'react';
import { appColors, pokemonColorOptions } from 'src/color';

import { Pokemon } from '../../hooks/useGetPokemons';
import { Tiles } from '../Tiles';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

export const PokemonRowInfo = ({ pokemon }: { pokemon: Pokemon }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const onClick = useCallback(() => navigate(`/pokemon/${pokemon.id}`), [navigate, pokemon.id]);
  return (
    <div
      className={classes.rowInfo}
      key={pokemon.id}
      onClick={onClick}
    >
      <div className={classes.number}>{pokemon.number}</div>
      <div className={classes.name}>{pokemon.name}</div>
      <img className={classes.image} src={pokemon.image} alt={pokemon.name} />
      <div className={classes.types}>
        <Tiles types={pokemon.types} color={pokemonColorOptions.types} />
      </div>
    </div>
  );
};

export const PokemonList = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const classes = useStyles();
  const pokemonRowInfo = useMemo(
    () =>
      pokemons.map((pkmn) => <PokemonRowInfo key={pkmn.id} pokemon={pkmn} />),
    [pokemons]
  );

  return (
    <div className={classes.root}>
      <div className={classes.listContainer}>
        <div className={classes.headerRow}>
          <div className={classes.colNumber}>#</div>
          <div className={classes.colName}>Name</div>
          <div className={classes.colImage}>Image</div>
          <div className={classes.colTypes}>Types</div>
        </div>

        {pokemonRowInfo}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      height: '100vh',
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      flex: 1,
    },
    rowInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: appColors.cardBackground,
      borderRadius: '10px',
      padding: '10px 16px',
      marginBottom: '8px',
      transition: 'background 0.2s ease, transform 0.1s ease',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: appColors.cardHoverBackground,
        transform: 'translateY(-2px)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
      },
    },
    number: {
      width: '40px',
      textAlign: 'center',
      fontWeight: 500,
      flex: 1,
      color: appColors.primaryText,
    },
    name: {
      flex: 1,
      fontWeight: 600,
      color: appColors.primaryText,
    },
    image: {
      width: '100px',
      height: '100px',
      flex: 1,
      margin: '0 12px',
      objectFit: 'contain',
      filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))',
    },
    types: {
      flex: 1,
      color: appColors.primaryText,
      fontSize: '14px',
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: appColors.background,
      borderRadius: '10px',
      padding: '12px 16px',
      marginBottom: '10px',
      fontWeight: 600,
      color: appColors.primaryText,
      fontSize: '15px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      border: `1px solid ${appColors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    colNumber: {
      flex: 1,
      textAlign: 'center',
      color: appColors.primaryText,
    },
    colName: {
      flex: 1,
      textAlign: 'center',
      color: appColors.primaryText,
    },
    colImage: {
      flex: 1,
      textAlign: 'center',
      color: appColors.primaryText,
    },
    colTypes: {
      flex: 1,
      textAlign: 'left',
      color: appColors.primaryText,
    },
  },
  { name: 'PokemonList' }
);
