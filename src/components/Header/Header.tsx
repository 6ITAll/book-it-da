import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { Box, Button, InputBase } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import DarkModeButton from '@components/DarkModeButton/DarkModeButton';

import {
  StyledHeaderContainer,
  StyledLogo,
  StyledSearchContainer,
  StyledIconWrapper,
} from './Header.styles';
import UserMenu from './userMenu';

const Header = (): JSX.Element => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const theme = useTheme();

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery('');
    }
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery('');
      setShowSearchBar(false);
    } else {
      navigate('/search');
      setShowSearchBar(false);
    }
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            onClick={() => navigate('/login')}
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
