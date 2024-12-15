import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier'; // Prettier 설정 추가
import prettierPlugin from 'eslint-plugin-prettier'; // Prettier 플러그인 추가

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 문법 지원
      globals: globals.browser, // 브라우저 환경 전역 변수를 허용
      parserOptions: {
        ecmaVersion: 'latest', // 최신 ECMAScript 문법 지원
        ecmaFeatures: { jsx: true }, // JSX 문법을 허용 (React에서 사용)
        sourceType: 'module', // ECMAScript 모듈(ESM) 사용
      },
    },
    settings: { react: { version: '18.3.1' } }, // React 버전을 자동 감지하고 설정 (React 18.3.1)
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin, // Prettier 플러그인 추가
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint 기본 권장 규칙 적용
      ...react.configs.recommended.rules, // React 권장 규칙 적용
      ...react.configs['jsx-runtime'].rules, // JSX 런타임 관련 규칙 적용 (React 17+에서 JSX 필요 없음)
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙 적용
      'react/jsx-no-target-blank': 'off', // target="_blank" 보안 경고를 비활성화 (필요 시 사용)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // React Fast Refresh 관련: 컴포넌트만 export하도록 경고
      ],
      'prettier/prettier': 'error', // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
    },
  },
);
