import { useState, KeyboardEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
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

  const handleLoginClick = () => {
    navigate('/login');
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
        {isLoggedIn ? (
          <IconWrapper>
            <Link
              to="/my-page"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <PersonIcon />
            </Link>
          </IconWrapper>
        ) : (
          <Button onClick={handleLoginClick} variant="outlined" color="primary">
            로그인
          </Button>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
