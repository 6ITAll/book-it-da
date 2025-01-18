import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { logoutSuccess } from '@features/user/userSlice';
import { supabase } from '@utils/supabaseClient';
import { StyledIconWrapper } from './Header.styles';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

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
      await supabase.auth.signOut();
      dispatch(logoutSuccess());
      localStorage.removeItem('token');
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <StyledIconWrapper onClick={handleProfileClick}>
        <PersonIcon />
      </StyledIconWrapper>
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
  );
};

export default UserMenu;
