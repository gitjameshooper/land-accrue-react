import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './index.scss';
import App from './App';

const theme = createMuiTheme({
    typography: {
        fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
        fontSize: 25,
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    fontSize: `62.5%`
                },
                body: {
                    fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: `1.6rem`,
                    backgroundColor: `#fff`
                }
            },
        }
    },
});


ReactDOM.render(
    <React.StrictMode>
   		<ThemeProvider theme={theme}>
    		<CssBaseline />
    		<App />
        </ThemeProvider>
   </React.StrictMode>,
    document.getElementById('root')
);