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

const FollowList = () => {
  /* TODO API 연동 필요 */
  const users = [
    {
      id: 1,
      userId: 'kim',
      name: '김독서',
      avartarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
    {
      id: 2,
      userId: 'lee',
      name: '이독서',
      avartarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
    {
      id: 3,
      userId: 'jung',
      name: '정독서',
      avartarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
  ];

  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(userId);
  };

  const handleDeleteIconClick = () => {
    /* TODO 삭제 API 연동 필요 */
  };

  return (
    <List sx={{ gap: 2 }}>
      {users.map(({ id, userId, name, avartarUrl }) => (
        <ListItem
          key={id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDeleteIconClick}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar
            onClick={() => handleUserClick(userId)}
            sx={{ cursor: 'pointer' }}
          >
            <Avatar src={avartarUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            onClick={() => handleUserClick(userId)}
            sx={{ cursor: 'pointer' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FollowList;
