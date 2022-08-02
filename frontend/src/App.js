import { useState } from 'react';
import TopBar from './components/TopBar';
import { ThemeProvider } from "@mui/material/styles";
import Theme from './theme';
import { Container, CssBaseline } from '@mui/material';
import welcomeImage from "./images/welcome.jpg"
import { getThemeLS } from './api/index';

function App() {
  const getTheme = getThemeLS();
  const [selectedTheme,setSelectedTheme] = useState(getTheme || 'dark');
  const ThemeChange = (color) => {
    setSelectedTheme(color)
  }
  return (
      <ThemeProvider theme={Theme(selectedTheme)}>
        <CssBaseline />
        <TopBar themechange={ThemeChange}  latestTheme={selectedTheme}/>
        <Container maxWidth="lg" style={{backgroundImage:`url(${welcomeImage})`}}>
        </Container>
      </ThemeProvider>
  );
}

export default App;
