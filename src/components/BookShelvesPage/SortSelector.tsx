import { FormControl, MenuItem, Select } from '@mui/material';
import { bookShelvesStyles } from './BookShelves.styles';
import { SortOption } from './types';

interface SortSelectorProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortSelector = ({ sortOption, onSortChange }: SortSelectorProps) => {
  return (
    <FormControl sx={{ minWidth: 100 }}>
      <Select
        value={sortOption}
        size="small"
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        sx={bookShelvesStyles.sortSelector}
      >
        <MenuItem value="recent" sx={bookShelvesStyles.sortMenus}>
          최신순
        </MenuItem>
        <MenuItem value="title" sx={bookShelvesStyles.sortMenus}>
          제목순
        </MenuItem>
        <MenuItem value="author" sx={bookShelvesStyles.sortMenus}>
          저자순
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
