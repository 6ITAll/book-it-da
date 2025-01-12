import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDeleteFollowMutation } from '@features/MyPage/api/followApi';

interface User {
  userId: string;
  name: string;
  avatarUrl: string;
}

interface FollowListProps {
  setOpen: (open: boolean) => void;
}

const FollowList = ({ setOpen }: FollowListProps) => {
  const [deleteFollow] = useDeleteFollowMutation();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchFollows = async () => {
      const response = await fetch('/api/follows');
      const data: User[] = await response.json();
      setUsers(data);
    };

    fetchFollows();
  }, []);

  const handleUserClick = (userId: string) => {
    navigate(`/${userId}`);
    setOpen(false);
  };

  const handleDeleteIconClick = async (userId: string) => {
    try {
      await deleteFollow(userId).unwrap();
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error('Failed to delete follow:', error);
    }
  };

  return (
    <List sx={{ gap: 2 }}>
      {users.map(({ userId, name, avatarUrl }) => (
        <ListItem
          key={userId}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteIconClick(userId);
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
          onClick={() => handleUserClick(userId)}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemAvatar>
            <Avatar src={avatarUrl} />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default FollowList;
