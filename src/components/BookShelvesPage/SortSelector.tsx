import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export type SortOption = 'recent' | 'title' | 'author';

interface SortSelectorProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortSelector = ({ sortOption, onSortChange }: SortSelectorProps) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>정렬</InputLabel>
      <Select
        value={sortOption}
        label="정렬"
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        <MenuItem value="recent">최근 저장순</MenuItem>
        <MenuItem value="title">제목순</MenuItem>
        <MenuItem value="author">저자순</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
