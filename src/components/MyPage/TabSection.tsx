import { Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

const TabSection = (): JSX.Element => {
  const tabs = [
    { id: 1, label: '내 서재', component: <></> },
    { id: 2, label: '내 피드', component: <></> },
    { id: 2, label: '북마크 피드', component: <></> },
  ];

  const [tab, setTab] = useState(0);

  return (
    <Stack>
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
        {tabs.map(({ id, label }) => (
          <Tab key={id} label={label} />
        ))}
      </Tabs>
      {tabs.map(({ component }, index) => tab === index && component)}
    </Stack>
  );
};

export default TabSection;
