import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Router from './router';
import { AppContextProvider } from './contexts/AppContext';

function App() {
  return (
    <main className='h-screen overflow-auto bg-gray-100'>
      <BrowserRouter>
        <AppContextProvider>
          <Nav />
          <Router />
        </AppContextProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
