import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

interface DetailsNavbarProps {
  onTabChange: (tabIndex: number) => void;
}

const BookDetailsNavbar = ({
  onTabChange,
}: DetailsNavbarProps): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    onTabChange(newValue); // 부모 컴포넌트로 탭 상태 전달
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff',
      }}
    >
      <Tabs
        variant="fullWidth"
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="책 소개" sx={{ width: '100%' }} />
        <Tab label="리뷰 (8)" sx={{ width: '100%' }} />
      </Tabs>
    </Box>
  );
};

export default BookDetailsNavbar;
