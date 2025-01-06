import { useState, KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { logoutSuccess } from '@features/user/userSlice';

const HeaderContainer = styled('header')(({ theme }) => ({
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery('');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchBar(false);
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

  return (
    <HeaderContainer>
      <Logo to="/">잇다</Logo>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchContainer>
          {showSearchBar && (
            <SearchInput
              type="text"
              placeholder="책 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
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
              <MenuItem onClick={() => handleNavigation('/edit-profile')}>
                프로필 편집
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
