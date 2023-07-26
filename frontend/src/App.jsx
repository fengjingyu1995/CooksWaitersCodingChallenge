import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Router from './router';
import { AppContextProvider } from './contexts/AppContext';

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Nav />
        <Router />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
