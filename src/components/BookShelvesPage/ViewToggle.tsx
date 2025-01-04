import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ViewModule, ViewList } from '@mui/icons-material';

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const ViewToggle = ({ viewMode, onViewChange }: ViewToggleProps) => {
  return (
    <ToggleButtonGroup
      value={viewMode}
      exclusive
      onChange={(_, value) => value && onViewChange(value)}
    >
      <ToggleButton value="grid">
        <ViewModule />
      </ToggleButton>
      <ToggleButton value="list">
        <ViewList />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
