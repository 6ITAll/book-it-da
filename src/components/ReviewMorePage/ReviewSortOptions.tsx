import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

interface ReviewSortOptionsProps {
  value: string;
  onChange: (value: string) => void;
}

const ReviewSortOptions = ({
  value,
  onChange,
}: ReviewSortOptionsProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <Select labelId="sort-label" value={value} onChange={handleChange}>
        <MenuItem value="likes">좋아요 순</MenuItem>
        <MenuItem value="ratingHigh">별점 높은 순</MenuItem>
        <MenuItem value="ratingLow">별점 낮은 순</MenuItem>
        <MenuItem value="latest">최신 순</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ReviewSortOptions;
