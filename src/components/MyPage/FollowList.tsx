import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FollowList = () => {
  /* TODO API 연동 필요 */
  const users = [
    {
      id: 1,
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
      id: 3,
      name: '김독서',
      avartarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
  ];

  return (
    <List sx={{ gap: 2 }}>
      {users.map(({ id, name, avartarUrl }) => (
        <ListItem
          key={id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar src={avartarUrl} />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default FollowList;
