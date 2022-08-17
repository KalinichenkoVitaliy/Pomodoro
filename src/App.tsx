import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Favicon from 'react-favicon';
import { ToastProvider } from 'react-toast-notifications';

import './main.global.css';
import { TRootState } from './types/types';

import urlFavicon from './assets/favicon/favicon.ico';

import store, { persistor } from './store/store';

import { AppReset } from './shared/AppReset';
import { HeaderContainer } from './components/HeaderContainer';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { PageHome } from './components/pages/PageHome';
import { PageStatistics } from './components/pages/PageStatistics';
import { PageSettings } from './components/pages/PageSettings';
import { PageLogin } from './components/pages/PageLogin';
import { PageNotFound } from './components/pages/PageNotFound';

function AppComponent() {
  const [isMounted, setIsMounted] = React.useState(false);
  const isDarkTheme = useSelector<TRootState, boolean>((state) => state.usersState.currentSettings.isDarkTheme);

  const nameTheme = isDarkTheme ? 'dark' : 'light';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  React.useEffect(() => {
    document.body.className = `body_${nameTheme}`;
  }, [isDarkTheme]);

  return isMounted ? (
    <BrowserRouter>
      <HeaderContainer>
        <Layout>
          <Header />
        </Layout>
      </HeaderContainer>
      <Layout>
        <Content>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/statistics' element={<PageStatistics />} />
            <Route path='/settings' element={<PageSettings />} />
            <Route path='/logout' element={<Navigate to={'/'} replace />} />
            <Route path='/login' element={<PageLogin />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  ) : null;
}

export const App = hot(() => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Favicon url={urlFavicon} />
        <ToastProvider>
          <AppReset />
          <AppComponent />
        </ToastProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
));
