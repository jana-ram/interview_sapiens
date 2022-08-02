import { useState }  from "react";
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
  latestTheme
}) {
  const userInfo = getUserLS();
  const [theme, setTheme] = useState(latestTheme);
  const [loginPopUp, setLoginPopup] = useState(false);
  const [changed , setChanged ] = useState(false);
  const [isLogin , setIsLogin ] = useState(userInfo || false)

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
    if(isLogin){
      api({
        url : `http://3.88.57.44:3000/api/theme`,
        method:'PUT',
        data : {
          "userGuid" : userInfo ? userInfo['id'] : '',
          "theme" : event.target.value
        } 
      })
    } else {
      setLoginPopup(true);
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
          isThemeChanged = {changed}
          setTheme = {updateTheme}
        />
      }
    </Box>
  );
}
