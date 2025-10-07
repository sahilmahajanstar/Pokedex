import React, { useMemo } from 'react';

import { appColors } from 'src/color';
import { createUseStyles, } from 'react-jss';

export const Tiles = ({ types, color }: { types: string[], color: string }) => {
  const classes = useStyles({color});

  const tiles = useMemo(() => {
    return types.map((type) => (
      <div key={type} className={classes.tile}>
        {type}
      </div>
    ));
  }, [types]);

  return <div className={classes.container}>{tiles}</div>;
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tile: {
    backgroundColor: appColors.background,
    color: (props: {color: string}) => props.color || '#7C89A3',
    borderRadius: '6px',
    padding: '8px 8px',
    fontSize: '13px',
    letterSpacing: '0.3px',
    textTransform: 'capitalize',
    transition: 'background 0.2s ease, color 0.2s ease',
    '&:hover': {
      backgroundColor: appColors.cardHoverBackground,
      color: appColors.primaryText,
    },
  },
});
