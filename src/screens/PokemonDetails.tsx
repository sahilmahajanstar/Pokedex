import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { useCallback } from 'react';
import { appColors, pokemonColorOptions } from 'src/color';
import { useNavigate, useParams } from 'react-router-dom';

import { Tiles } from 'src/components/Tiles';
import { createUseStyles } from 'react-jss';
import { usePokemonDetails } from '../hooks/usePokemonDetails';

export const PokemonDetailsDialog: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { pokemon, loading, error } = usePokemonDetails(id);

  const handleClose = useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/pokemon', { replace: true });
    }
  }, [navigate]);

  return (
    <Dialog
      open={!!id}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      classes={{ paper: classes.dialogPaper }}
    >
      {loading && (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}

      {error && (
        <div className={classes.errorText}>Failed to load Pokémon details.</div>
      )}

      {pokemon && (
        <>
          <DialogTitle className={classes.title}>
            {pokemon.name} #{pokemon.number}
          </DialogTitle>

          <DialogContent>
            <div className={classes.content}>
              {/* Pokémon Image */}
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className={classes.image}
              />

              {/* Stats */}
              <div className={classes.statsRow}>
                <div className={classes.statBox}>
                  <div className={classes.statLabel}>Height</div>
                  <div className={classes.statValue}>
                    {pokemon.height.minimum} - {pokemon.height.maximum}
                  </div>
                </div>

                <div className={classes.statBox}>
                  <div className={classes.statLabel}>Weight</div>
                  <div className={classes.statValue}>
                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </div>
                </div>
              </div>

              <div className={classes.statsRow}>
                <div className={classes.statBox}>
                  <div className={classes.statLabel}>Max CP</div>
                  <div className={classes.statValue}>{pokemon.maxCP}</div>
                </div>

                <div className={classes.statBox}>
                  <div className={classes.statLabel}>Max HP</div>
                  <div className={classes.statValue}>{pokemon.maxHP}</div>
                </div>
              </div>

              <div className={classes.statBoxSingle}>
                <div className={classes.statLabel}>Flee Rate</div>
                <div className={classes.statValue}>{pokemon.fleeRate}</div>
              </div>
              {/* Types */}
              <div className={classes.sectionLabel}>Types</div>
              <div className={classes.tileContainer}>
                <Tiles
                  types={pokemon.types}
                  color={pokemonColorOptions.types}
                />
              </div>

              {/* Resistant */}
              <div className={classes.sectionLabel}>Resistant</div>
              <div className={classes.tileContainer}>
                <Tiles
                  types={pokemon.resistant}
                  color={pokemonColorOptions.resistant}
                />
              </div>

              {/* Weaknesses */}
              <div className={classes.sectionLabel}>Weaknesses</div>
              <div className={classes.tileContainer}>
                <Tiles
                  types={pokemon.weaknesses}
                  color={pokemonColorOptions.weaknesses}
                />
              </div>
            </div>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

const useStyles = createUseStyles({
  dialogPaper: {
    backgroundColor: `${appColors.background} !important`,
    color: `${appColors.primaryText} !important`,
    padding: '16px',
  },
  title: {
    borderBottom: `1px solid ${appColors.border}`,
    fontWeight: 600,
    fontSize: '18px',
    paddingBottom: '8px',
    marginBottom: '16px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  image: {
    width: '150px',
    height: '150px',
    marginTop: '16px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    fontWeight: 600,
    marginTop: '12px',
    marginBottom: '8px',
    color: '#7C89A3',
    fontSize: '14px',
  },
  tileContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    width: '100%',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '300px',
    gap: '16px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '32px',
  },
  errorText: {
    color: 'red',
    padding: '32px',
    textAlign: 'center',
  },
  statBox: {
    flex: 1,
    backgroundColor: appColors.cardBackground,
    padding: '8px 12px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    color: appColors.primaryText,
    fontWeight: 500,
  },

  statBoxSingle: {
    width: '150px',
    backgroundColor: appColors.cardBackground,
    padding: '8px 12px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    color: appColors.primaryText,
    fontWeight: 500,
  },
  statLabel: {
    fontSize: '12px',
    color: appColors.secondaryText,
    fontWeight: 600,
  },
  statValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: appColors.primaryText,
  },
});
