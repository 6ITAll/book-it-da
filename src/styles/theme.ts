import { createTheme, PaletteOptions } from '@mui/material/styles';

// 커스텀 팔레트 타입 정의
declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    border: {
      light: string;
      main: string;
      dark: string;
      hover: string;
    };
  }
  interface PaletteOptions {
    neutral: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    border: {
      light: string;
      main: string;
      dark: string;
      hover: string;
    };
  }
  interface Shape {
    buttonRadius: number;
    boxRadius: number;
    iconRadius: string;
  }
}

// 공통 팔레트
const commonPalette = {
  primary: {
    main: '#333333',
    light: '#666666',
    dark: '#1a1a1a',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
  },
  neutral: {
    main: '#64748B',
    light: '#94A3B8',
    dark: '#334155',
    contrastText: '#fff',
  },
  border: {
    light: '#E5E7EB',
    main: '#D1D5DB',
    dark: '#9CA3AF',
    hover: '#6B7280',
  },
};

// 라이트 모드 팔레트
const lightModePalette: PaletteOptions = {
  mode: 'light',
  ...commonPalette,
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
  },
};

// 다크 모드 팔레트
const darkModePalette: PaletteOptions = {
  mode: 'dark',
  ...commonPalette,
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b3b3b3',
  },
  border: {
    light: '#2D3748',
    main: '#4A5568',
    dark: '#718096',
    hover: '#A0AEC0',
  },
};

// 테마 생성 함수
export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: mode === 'light' ? lightModePalette : darkModePalette,
    typography: {
      fontFamily: [
        'Noto Sans KR',
        'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
            color: mode === 'light' ? '#000' : '#fff',
          },
        },
      },
      // 버튼 BorderRadius
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
            color: mode === 'light' ? '#000' : '#fff',
            textTransform: 'none',
            borderRadius: 16,
          },
        },
      },
      // 아이콘 버튼 BorderRadius
      MuiIconButton: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
            color: mode === 'light' ? '#000' : '#fff',
            borderRadius: '50%',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === 'light'
                ? '0 1px 3px rgba(0,0,0,0.12)'
                : '0 1px 3px rgba(255,255,255,0.12)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
            color: mode === 'light' ? '#000' : '#fff',
            borderRadius: 8,
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
};

// 기본 테마 (라이트 모드)
export const muiTheme = createAppTheme('light');
