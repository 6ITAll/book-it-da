import React from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import HybridDialog from '@components/commons/HybridDialog/HybridDialog';
import { postingWriteStyles } from './PostingWrite.styles';
import { SavedPosting } from '@shared/types/type';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';
import { stripHtml } from 'string-strip-html';

interface SavedPostingsDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  savedPostings: SavedPosting[] | undefined;
  onLoadPosting: (posting: SavedPosting) => void;
}

const SavedPostingItem: React.FC<{
  posting: SavedPosting;
  onClick: (posting: SavedPosting) => void;
}> = ({ posting, onClick }) => {
  const { data: bookData } = useSearchBookByIsbnQuery(
    { isbn: posting.isbn || '' },
    { skip: !posting.isbn },
  );

  const plainContent = React.useMemo(
    () => stripHtml(posting.content || '내용 없음').result,
    [posting.content],
  );

  return (
    <Box
      onClick={() => onClick(posting)}
      sx={postingWriteStyles.savedPostingBox}
    >
      <Stack direction="row" spacing={2} alignItems="center" width="100%">
        <Stack flex={1} minWidth={0}>
          <Typography
            variant="h6"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {posting.title || '제목 없음'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {plainContent}
          </Typography>
        </Stack>
        {bookData?.cover && (
          <Box
            component="img"
            src={bookData.cover}
            alt="Book cover"
            sx={{ width: 60, height: 80, objectFit: 'cover', flexShrink: 0 }}
          />
        )}
      </Stack>
    </Box>
  );
};

const SavedPostingsDialog: React.FC<SavedPostingsDialogProps> = ({
  open,
  setOpen,
  savedPostings,
  onLoadPosting,
}) => {
  const content = (
    <Stack spacing={2} divider={<Divider flexItem />}>
      {savedPostings?.map((posting) => (
        <SavedPostingItem
          key={posting.id}
          posting={posting}
          onClick={(posting) => {
            onLoadPosting(posting);
            setOpen(false);
          }}
        />
      ))}
    </Stack>
  );

  return (
    <HybridDialog
      open={open}
      setOpen={setOpen}
      title="저장된 글 목록"
      contentNode={content}
    />
  );
};

export default SavedPostingsDialog;
