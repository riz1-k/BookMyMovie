import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import { AuthProvider } from './GlobalState';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
