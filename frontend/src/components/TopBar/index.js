import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MenuItem, TextField } from '@mui/material';
import LoginPopup from './LoginPopup';
import { api , getUserLS , updateThemeLS , removeLS } from '../../api';
const themes = [
  {
    value: 'dark',
    label: 'Black',
  },
  {
    value: 'light',
    label: 'White',
  },
  {
    value: 'blue',
    label: 'Blue',
  },
];

export default function TopBar({
  themechange, 
  prevTheme
}) {
  const getTheme = getUserLS();
  const [theme, setTheme] = React.useState(prevTheme);
  const [loginPopUp, setLoginPopup] = React.useState(false);
  const [changed , setChanged ] = React.useState(false);
  const [isLogin , setIsLogin ] = React.useState(getTheme || false)

  const updateTheme = (val) =>{
    themechange(val);
    setTheme(val);    
    setChanged(true);
  }
  const logOut = () =>{
    setIsLogin(false);
    removeLS();
  }
  const closeEvent = () =>{
    setLoginPopup(false);
    setIsLogin(true)
  }
  const handleChange = (event) => {
    updateTheme(event.target.value);
    updateThemeLS(event.target.value);
    if(!getTheme){
      setLoginPopup(true);
    } else {   
      api({
        url : `http://3.88.57.44:3000/api/theme`,
        method:'PUT',
        data : {
          "userGuid" : getTheme ? getTheme['id'] : '',
          "theme" : event.target.value
        } 
      })
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <TextField
              id="outlined-select-them"
              select
              label="Select Theme"
              size='small'
              value={theme}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            >
              {themes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Typography>
          {
            !isLogin  ? <Button color="inherit" onClick={()=>setLoginPopup(true)}>Login</Button> : <Button color="inherit" onClick={()=>logOut(true)}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
      {loginPopUp && 
        <LoginPopup 
          setLoginPopup={closeEvent} 
          selectTheme={theme} 
          prevTheme={updateTheme}
          isThemeChanged = {changed}
        />
      }
    </Box>
  );
}
