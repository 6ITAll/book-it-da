import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination = ({
  count,
  page,
  onChange,
}: PaginationProps): JSX.Element => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onChange}
      shape="rounded"
      sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
    />
  );
};

export default Pagination;
