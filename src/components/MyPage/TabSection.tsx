import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import LibraryTabPanel from './Library/LibraryTabPanel';
import UserFeedTabPanel from './Feed/UserFeedTabPanel';
import LikedFeedTabPanel from './Feed/LikedFeedTabPanel';

interface TabSectionProps {
  userId: string;
  username: string;
}

const TabSection = ({ userId, username }: TabSectionProps): JSX.Element => {
  const tabs = [
    {
      id: 1,
      label: '내 서재',
      component: <LibraryTabPanel userId={userId} username={username} />,
    },
    {
      id: 2,
      label: '내 피드',
      component: (
        <UserFeedTabPanel userId={userId} username={username} type="내 피드" />
      ),
    },
    {
      id: 3,
      label: '좋아요한 피드',
      component: (
        <LikedFeedTabPanel
          userId={userId}
          username={username}
          type="좋아요한 피드"
        />
      ),
    },
  ];

  const [tab, setTab] = useState(0);

  return (
    <Stack>
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
        {tabs.map(({ id, label }) => (
          <Tab key={id} label={label} />
        ))}
      </Tabs>
      {tabs.map(
        ({ id, component }, index) =>
          tab === index && (
            <Box paddingY={4} key={id}>
              {component}
            </Box>
          ),
      )}
    </Stack>
  );
};

export default TabSection;
