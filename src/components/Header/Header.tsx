import React, { useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Menu, MenuItem, InputBase, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { toggleTheme } from '@features/DarkMode/darkModeSlice';
import { logoutSuccess } from '@features/user/userSlice';

import {
  StyledHeaderContainer,
  StyledLogo,
  StyledSearchContainer,
  StyledIconWrapper,
} from './Header.styles';

const Header = (): JSX.Element => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.user);
  const themeMode = useSelector((state: RootState) => state.darkMode.mode); // 다크모드 상태 가져오기
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery('');
    }
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim(); // 공백 제거

    if (trimmedQuery) {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery(''); // 검색어 초기화
      setShowSearchBar(false); // 검색창 닫기
    } else {
      navigate('/search');
      setShowSearchBar(false); // 검색창 닫기
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    handleClose();
    navigate('/');
  };

  const handleThemeToggle = () => {
    console.log('theme모드:', themeMode);
    dispatch(toggleTheme()); // 다크모드 토글 액션 호출
  };

  useEffect(() => {
    console.log('theme모드 변경후:', themeMode);
  }, [themeMode]);
  return (
    <StyledHeaderContainer>
      <StyledLogo to="/">잇다</StyledLogo>
      <Box display="flex" alignItems="center">
        <Switch
          checked={themeMode === 'dark'} // 다크모드인지 확인
          onChange={handleThemeToggle} // 토글 액션 호출
          inputProps={{ 'aria-label': 'dark mode toggle' }}
        />
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
          <div>
            <StyledIconWrapper onClick={handleProfileClick}>
              <PersonIcon />
            </StyledIconWrapper>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              aria-hidden="false"
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleNavigation('/my-page')}>
                마이페이지
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/edit-account')}>
                개인정보수정
              </MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            onClick={() => handleNavigation('/login')}
            variant="outlined"
            color="primary"
          >
            로그인
          </Button>
        )}
      </Box>
    </StyledHeaderContainer>
  );
};

export default Header;
