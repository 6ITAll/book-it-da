import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { logoutSuccess, UserInfo } from '@features/user/userSlice';
import { supabase } from '@utils/supabaseClient';
import { StyledIconWrapper } from './Header.styles';
import { RootState } from '@store/index';
import {
  navigateToMainPage,
  navigateToProfileEditPage,
  navigateToUserPage,
} from '@shared/utils/navigation';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const { avatarUrl, username } = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(logoutSuccess());
      localStorage.removeItem('token');
      handleClose();
      navigateToMainPage(navigate);
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <StyledIconWrapper onClick={handleProfileClick}>
        <Avatar
          src={avatarUrl}
          alt="User Avatar"
          sx={{ width: 30, height: 30 }}
          variant="rounded"
        >
          {!avatarUrl && <PersonIcon />}
        </Avatar>
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
        <MenuItem
          onClick={() => {
            navigateToUserPage(navigate, username);
            handleClose(); // 메뉴 닫기
          }}
        >
          마이페이지
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigateToProfileEditPage(navigate);
            handleClose();
          }}
        >
          개인정보수정
        </MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
