import './App.css';
import MainRoutes from './routes/MainRoutes.js/MainRoutes';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MainRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
