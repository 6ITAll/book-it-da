import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface ViewOptionSelectorProps {
  viewMode: 4 | 8;
  onChange: (mode: 4 | 8) => void;
}

const ViewOptionSelector: React.FC<ViewOptionSelectorProps> = ({
  viewMode,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = parseInt(event.target.value, 10) as 4 | 8;
    onChange(newValue);
  };

  return (
    <Select
      value={viewMode.toString()}
      onChange={handleChange}
      variant="outlined"
      size="small"
      sx={{ minWidth: 120, height: 52, marginLeft: 3 }}
    >
      <MenuItem value="4">4개 보기</MenuItem>
      <MenuItem value="8">8개 보기</MenuItem>
    </Select>
  );
};

export default ViewOptionSelector;
