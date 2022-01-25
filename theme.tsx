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
    h1: {
      fontSize: 48,
      fontWeight: 400
    },
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
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 800,
      textTransform: 'uppercase'
    }
  },
  props: {
    MuiButton: {
      disableElevation: true
    }
  },
  overrides: {
    MuiButton: {
      root: {
        padding: '16px 32px',
        fontWeight: 800,
        borderRadius: 16
      },
      outlined: {
        padding: '16px 32px',
        fontWeight: 800,
        borderRadius: 16
      },
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
    },
    MuiBreadcrumbs: {
      separator: {
        display: 'none'
      }
    }
  }
})

export default theme
