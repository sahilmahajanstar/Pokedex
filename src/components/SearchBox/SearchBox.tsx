import React from 'react';
import { appColors } from 'src/color';
import { createUseStyles } from 'react-jss';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// set styling if used in multiple places
export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  input: {
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
    },

    '&::placeholder': {
      color: appColors.secondaryText,
    },
  },
});
