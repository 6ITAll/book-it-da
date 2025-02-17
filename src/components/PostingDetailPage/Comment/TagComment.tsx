import { Fragment } from 'react';
import { Box } from '@mui/material';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

export interface TagCommentProps {
  content: string;
}

const TagComment = ({ content }: TagCommentProps) => {
  const navigate = useNavigate();
  // @로 시작하는 단어를 찾는 정규식
  const tagRegex = /@[\w]+/g;

  // 컨텐츠를 태그와 일반 텍스트로 분리
  const parts = content.split(tagRegex);
  const tags = content.match(tagRegex) || [];

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {part}
          {tags[index] && (
            <Box
              component="span"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() =>
                navigateToUserPage(navigate, tags[index].substring(1))
              }
            >
              {tags[index]}
            </Box>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default TagComment;
