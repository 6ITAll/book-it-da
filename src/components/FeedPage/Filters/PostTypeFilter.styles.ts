import { Theme } from '@mui/material/styles';

const styles = {
  filterButton: (theme: Theme, isSelected: boolean) => ({
    fontSize: '12px',
    padding: '5px 10px',
    minWidth: '80px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    backgroundColor: isSelected
      ? theme.palette.primary.main // 선택된 버튼 배경색 (primary.main)
      : 'transparent', // 선택되지 않은 버튼은 배경 없음
    color: isSelected
      ? theme.palette.getContrastText(theme.palette.primary.main) // 선택된 버튼 텍스트 색상
      : theme.palette.text.primary, // 선택되지 않은 버튼 텍스트 색상
    borderColor: isSelected
      ? 'transparent' // 선택된 버튼은 테두리 없음
      : theme.palette.divider, // 선택되지 않은 버튼 테두리
    '&:hover': {
      backgroundColor: isSelected
        ? theme.palette.primary.dark // 선택된 버튼 호버 배경색 (primary.dark)
        : theme.palette.action.hover, // 선택되지 않은 버튼 호버 배경색
    },
  }),
};

export default styles;
