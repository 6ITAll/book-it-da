import PostAddIcon from '@mui/icons-material/PostAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const FEED_TYPE_TABS = [
  { label: '추천', value: '추천' },
  { label: '팔로워', value: '팔로워' },
  { label: '팔로잉', value: '팔로잉' },
] as const;

export const POST_TYPE_OPTIONS = [
  {
    type: '포스팅' as const,
    label: '포스팅 작성',
    icon: PostAddIcon,
  },
  {
    type: '한줄평' as const,
    label: '한줄평 작성',
    icon: BorderColorIcon,
  },
] as const;
