import { grey } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#9CA3AF'
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
    h2: {
      fontSize: 36,
      fontWeight: 800
    },
    h3: {
      fontSize: 24, 
      fontWeight: 800
    },
    h4: {
      fontSize: 16
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 800
    }
  },
  overrides: {
    MuiButton: {
      text: {
        fontWeight: 800
      }
    },
    MuiSelect: {
      root: {
        paddingTop: 0
      }
    },
    MuiInputLabel: {
      root: {
        fontWeight: 900,
        textTransform: 'uppercase',
        color: grey[900]
      }
    }
  }
})

export default theme
