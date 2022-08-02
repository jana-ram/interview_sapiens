import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Theme = (theme) => {

    const BlueTheme = () => {
        return createTheme({
            palette: {
              background: {
                default: "#aed8e6"
              },
              primary: { // works
                main: '#000080',
                contrastText: '#fff',
              },
            }
          });
    }

    const WhiteTheme = () => {
        return createTheme({
            palette: {
              mode: "light",
                background: {
                  default: "hsl(0, 0%, 100%)"
                },
                primary: { // works
                  main: '#fff',
                  contrastText: '#000',
                }
            },
            
            
          });
    }

    const BlackTheme = () => {
        return createTheme({
            palette: {
              mode: "dark",
              background: {
                default: "hsl(230, 17%, 14%)"
              },
            }
          });
    }

    switch (theme) {
        case "blue":
            return BlueTheme()
        case "dark":
            return BlackTheme()
        default:
            return WhiteTheme();
    }
}

export default Theme