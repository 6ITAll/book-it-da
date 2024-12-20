import { Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
interface SortSelectorProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
}
const SortSelector = ({
  value,
  onChange,
  options,
}: SortSelectorProps): JSX.Element => (
  <Select value={value} onChange={onChange}>
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

export default SortSelector;
