import { Stack, Chip } from '@mui/material';

interface TagListProps {
  tags: string[];
}
const TagList = ({ tags }: TagListProps): JSX.Element => (
  <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
    {tags.map((tag, index) => (
      <Chip key={index} label={tag} />
    ))}
  </Stack>
);

export default TagList;
