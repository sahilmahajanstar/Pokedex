import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, ListPage, PokemonDetailsDialog } from '../screens';

import { ApolloProvider } from '@apollo/client/react';
import { LayoutProvider } from '../contexts';
import { Nav } from '../components';
import React from 'react';
import { appColors } from 'src/color';
import { client } from './client';
import { createUseStyles } from 'react-jss';

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className={classes.root}>
          <BrowserRouter>
            <Nav />
            <div className={classes.content}>
              <div className={classes.scrollableArea}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemon" element={<ListPage />} />
                  <Route path="/pokemon/:id" element={<PokemonDetailsDialog />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles(
  {
    root: {
      background: appColors.background,
      minHeight: '100vh',
      minWidth: '100vw',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    content: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
    },
    scrollableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
    },
  },
  { name: 'App' }
);

export default App;
