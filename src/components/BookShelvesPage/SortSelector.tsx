import {
  FormControl,
  // InputLabel,
  MenuItem,
  Select,
  // Typography,
} from '@mui/material';

export type SortOption = 'recent' | 'title' | 'author';

interface SortSelectorProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortSelector = ({ sortOption, onSortChange }: SortSelectorProps) => {
  return (
    <FormControl sx={{ minWidth: 100 }}>
      {/* <InputLabel>정렬</InputLabel> */}
      <Select
        value={sortOption}
        // label="정렬"
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        sx={{ fontSize: '12px', padding: '0px' }}
      >
        <MenuItem value="recent" sx={{ fontSize: '12px' }}>
          최신순
        </MenuItem>
        <MenuItem value="title" sx={{ fontSize: '12px' }}>
          제목순
        </MenuItem>
        <MenuItem value="author" sx={{ fontSize: '12px' }}>
          저자순
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
