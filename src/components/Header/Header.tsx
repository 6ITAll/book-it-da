import { useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { Box, Button, InputBase } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import DarkModeButton from '@components/Header/DarkModeButton';
import { setSearchQuery } from '@features/BookSearchPage/Slice/bookSearchSlice';
import {
  StyledHeaderContainer,
  StyledLogo,
  StyledSearchContainer,
  StyledIconWrapper,
} from './Header.styles';
import UserMenu from './userMenu';
import {
  navigateToLoginPage,
  navigateToSearchPage,
} from '@shared/utils/navigation';

const Header = (): JSX.Element => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchParams] = useSearchParams();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (searchParams.get('query')) {
      dispatch(setSearchQuery(searchParams.get('query') || ''));
    }
  }, [searchParams, dispatch]);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setLocalSearchQuery('');
    }
  };

  // 검색 실행 함수
  const handleSearch = () => {
    const trimmedQuery = localSearchQuery.trim();
    navigateToSearchPage(navigate, trimmedQuery);
    if (trimmedQuery) {
      dispatch(setSearchQuery(trimmedQuery));
    }
    setLocalSearchQuery(''); // 검색창 입력값 초기화
    setShowSearchBar(false); // 검색바 닫기
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <StyledHeaderContainer>
      <StyledLogo to="/">잇다</StyledLogo>
      <Box display="flex" alignItems="center">
        <StyledSearchContainer>
          {showSearchBar && (
            <InputBase
              placeholder="책 검색..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                marginRight: '10px',
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            />
          )}
          <StyledIconWrapper
            onClick={showSearchBar ? handleSearch : toggleSearchBar}
          >
            <SearchIcon />
          </StyledIconWrapper>
        </StyledSearchContainer>
        {user.isLoggedIn ? (
          <UserMenu />
        ) : (
          <Button
            onClick={() => navigateToLoginPage(navigate)}
            variant="outlined"
            color="primary"
          >
            로그인
          </Button>
        )}
        <DarkModeButton /> {/* 다크 모드 토글 버튼 추가 */}
      </Box>
    </StyledHeaderContainer>
  );
};

export default Header;
