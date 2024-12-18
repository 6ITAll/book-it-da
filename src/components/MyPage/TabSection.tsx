import { Stack, Tab, Tabs } from '@mui/material';

const TabSection = (): JSX.Element => {
  const tabs = [
    { id: 1, label: '내 서재' },
    { id: 2, label: '내 피드' },
    { id: 2, label: '북마크 피드' },
  ];

  return (
    <Stack>
      <Tabs>
        {tabs.map(({ id, label }) => (
          <Tab key={id} label={label} />
        ))}
      </Tabs>
    </Stack>
  );
};

export default TabSection;
