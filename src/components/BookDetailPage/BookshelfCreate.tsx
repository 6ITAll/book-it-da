import React, { useState, ChangeEvent } from 'react';
import { Stack, TextField, Button } from '@mui/material';

interface BookshelfCreateProps {
  onAdd: (newBookshelfName: string) => Promise<void>;
}

const BookshelfCreate: React.FC<BookshelfCreateProps> = React.memo(
  ({ onAdd }: BookshelfCreateProps): JSX.Element => {
    const [newBookshelfName, setNewBookshelfName] = useState<string>('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setNewBookshelfName(e.target.value);
    };

    const handleAdd = async (): Promise<void> => {
      if (newBookshelfName.trim()) {
        await onAdd(newBookshelfName);
        setNewBookshelfName('');
      }
    };

    return (
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="새 책장 이름 입력"
          value={newBookshelfName}
          onChange={handleNameChange}
          sx={{ '& .MuiOutlinedInput-root': { height: 48 } }}
        />
        <Button variant="contained" onClick={handleAdd} sx={{ height: '48px' }}>
          추가
        </Button>
      </Stack>
    );
  },
);

export default BookshelfCreate;
