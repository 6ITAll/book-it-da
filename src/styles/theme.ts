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
    main: '#1976d2', // 기본 MUI 블루
    light: '#63a4ff',
    dark: '#004ba0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#d05ce3',
    dark: '#6a0080',
    contrastText: '#ffffff',
  },
  neutral: {
    main: '#64748B',
    light: '#94A3B8',
    dark: '#334155',
    contrastText: '#ffffff',
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
    default: '#f9f9f9',
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
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f9f9f9' : '#121212',
          },
        },
      },
      // 전체 버튼
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease',
            backgroundColor: mode === 'light' ? '#1976d2' : '#005cb2',
            color: '#fff',
            borderColor: mode === 'light' ? '#1976d2' : '#005cb2',
            borderRadius: 16,
            '&:hover': {
              backgroundColor: mode === 'light' ? '#115293' : '#1a76d2', // Adjusted hover color for contrast
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: mode === 'light' ? '#1976d2' : '#1a76d2', // Focus ring color
              outlineOffset: '2px',
            },
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
            borderRadius: 12,
            backgroundColor: mode === 'light' ? '#ffffff' : '#121212',
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
      MuiTextField: {
        styleOverrides: {
          root: {},
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
