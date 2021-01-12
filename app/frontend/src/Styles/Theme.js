import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    typography: {
        fontFamily: 'Arial',
      },
  palette: {
    primary: {
      main: '#05386B',
    },
    secondary: {
      main: '#baddff',
    },
    error: {
      main: '#ffe203',
    },
    background: {
      default: '#05386B',
    },
    text: {
        primary: '#ffffff',
        secondary: '#05386B',
    },
  },
});

export default theme;