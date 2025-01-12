import { useState, KeyboardEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { styled, useTheme } from '@mui/material/styles';
import { Button, Menu, MenuItem, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { toggleTheme } from '@features/DarkMode/darkModeSlice';
import { logoutSuccess } from '@features/user/userSlice';

const HeaderContainer = styled('header')(({ theme }) => ({
  backgroundColor: theme.palette.background.default, // MUI 테마의 배경색
  color: theme.palette.text.primary, // MUI 테마의 텍스트 색상
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  fontSize: '24px',
  fontWeight: 'bold',
}));

const SearchContainer = styled('div')({
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center',
});

const SearchInput = styled('input')(({ theme }) => ({
  marginRight: '10px',
  padding: '10px',
  width: '250px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.divider}`,
  outline: 'none',
}));

const IconWrapper = styled('div')({
  cursor: 'pointer',
});

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
      // 검색어가 있을 경우 query 파라미터 추가 후 이동
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery(''); // 검색어 초기화
      setShowSearchBar(false); // 검색창 닫기
    } else {
      // 검색어가 없을 경우 검색 페이지로 이동
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
    <HeaderContainer>
      <Logo to="/">잇다</Logo>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          checked={themeMode === 'dark'} // 다크모드인지 확인
          onChange={handleThemeToggle} // 토글 액션 호출
          inputProps={{ 'aria-label': 'dark mode toggle' }}
        />
        <SearchContainer>
          {showSearchBar && (
            <SearchInput
              type="text"
              placeholder="책 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            />
          )}
          <IconWrapper onClick={showSearchBar ? handleSearch : toggleSearchBar}>
            <SearchIcon />
          </IconWrapper>
        </SearchContainer>
        {user.isLoggedIn ? (
          <div>
            <IconWrapper onClick={handleProfileClick}>
              <PersonIcon />
            </IconWrapper>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
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
      </div>
    </HeaderContainer>
  );
};

export default Header;
