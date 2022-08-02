import { useState }  from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from "@mui/material";
import { api } from '../../../api';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function LoginPopup(props) {
  const {
    setLoginPopup , 
    selectTheme , 
    setTheme , 
    isThemeChanged 
  } = props;
  const [state,setState] = useState({
    username:"",
    password:""
  })
  const [error,setError] = useState({
    username:false,
    password:false
  })

  const handleChange = (event) =>{
    const {name,value} = event.target;
    setState({
      ...state,
      [name]:value
    })
  }

  const handleClose = () => {
    setLoginPopup(false);
  };

  const handleSubmit = () => {
    let errorCheck = 0;
    
    let errorObj = {
        username:false,
        password:false
    }

    if(!state.username){
        errorCheck = 1;
        errorObj.username =  true
    }
    if(!state.password){
        errorCheck = 1;
        errorObj.password =  true
    }
    setError(errorObj)

    if(errorCheck == 0){
        let postData= {
          username:state.username,
          password:state.password
        }
        api({
          url : `http://3.88.57.44:3000/api/auth/signin`,
          method:'POST',
          data : postData
        }).then(res=>{
          const {
            data,
            success,
            message
          } = res;          
          localStorage.setItem('theme',isThemeChanged ? selectTheme : (data && data['theme']) ?  data['theme'] : selectTheme);
          if(success && success === 1 && data && data['id'] && data['accessToken']) {
            localStorage.setItem('userData',JSON.stringify({
              id : data['id'] || '',
              token : data['accessToken'] || ''
            }));
            setLoginPopup(false);
            if(isThemeChanged){
              api({
                url : `http://3.88.57.44:3000/api/theme`,
                method:'PUT',
                data : {
                  "userGuid" : data['id'],
                  "theme" : selectTheme
                } 
              });      
            } else {
              setTheme(data.theme);            
            }
          } else {
            alert(message)
          }
        })
    }
    
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{textAlign:"center"}}>
          Login
        </BootstrapDialogTitle>
        <DialogContent dividers>           
            <TextField
                size="small"
                error={error.username}
                id="outlined-error-helper-text"
                label="username"
                name="username"
                value={state.username}
                helperText={error.username && "This field is required"}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                style={{marginTop:20}}
            />  
            
            <TextField
                size="small"
                error={error.password}
                id="outlined-error-helper-text"
                type="password"
                label="password"
                name="password"
                value={state.password}
                helperText={error.password && !state.password ? "This field is required" :""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                style={{marginTop:20}}
            />                       
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} style={{marginTop:20}}>
                Login
            </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

