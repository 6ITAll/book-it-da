import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Menu, MenuItem, InputBase } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { logoutSuccess } from '@features/user/userSlice';
import DarkModeButton from '@components/DarkModeButton/DarkModeButton';

import {
  StyledHeaderContainer,
  StyledLogo,
  StyledSearchContainer,
  StyledIconWrapper,
} from './Header.styles';
import { supabase } from '@utils/supabaseClient';

const Header = (): JSX.Element => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.user);

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

  const handleLogout = async () => {
    try {
      // 로그아웃 처리
      dispatch(logoutSuccess());

      // Supabase에서 현재 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 서버에 자동 로그인 설정 해제 요청
        await supabase
          .from('user_settings')
          .update({ auto_login: false })
          .eq('user_id', user.id);
      }

      // 로컬 스토리지에서 자동 로그인 정보 제거
      localStorage.removeItem('autoLogin');

      handleClose();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      // 오류 처리 (예: 사용자에게 알림)
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
        <DarkModeButton /> {/* 다크 모드 토글 버튼 추가 */}
      </Box>
    </StyledHeaderContainer>
  );
};

export default Header;
