import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'theme';
import Routes from 'routes';
import Loading from 'pages/loading';
import ErrorHandler from 'error-handler';
import { GlobalProvider } from 'contexts/global';
import NotistackProvider from 'components/notistack-provider';
import GlobalStyles from 'theme/global-styles';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <GlobalProvider>
            <NotistackProvider>
              <ErrorHandler>
                <GlobalStyles />
                <Routes />
              </ErrorHandler>
            </NotistackProvider>
          </GlobalProvider>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
