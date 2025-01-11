export const bookDetailStyles = {
  container: {
    border: '1px solid #e7e8e9', // 모든 테두리에 스타일 지정
    borderTop: 'none',
    height: '100%',
  },
  bookDetailSectionBox: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    Height: '100%',
    padding: '1rem 1rem',
    gap: 3,
    boxSizing: 'border-box',
  },
  leftBox: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    height: '100%',
    padding: '1rem',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(145deg, #f0f0f0, #c8c8c8)',
  },
  imageStyle: {
    width: '80%',
    height: '100%',
    borderRadius: '8px',
    objectFit: 'contain',
  },
  rightBox: {
    flex: 2,
    display: 'flex',
    alignContent: 'space-between',
    border: '1px solid #e7e8e9',
    width: '100%',
    flexDirection: 'column',
    alignSelf: 'stretch',
    borderRadius: '8px',
    justifyContent: 'space-between',
  },
  rightBoxInfoBox: {
    height: '80%',
    display: 'flex',
    padding: '2rem',
    width: '100%',
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  scoreAndReviewStack: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconAndReviewerBox: {
    display: 'flex',
    alignItems: 'center', // 세로 가운데 정렬
    justifyContent: 'flex-start', // 텍스트와 아이콘 정렬
    color: 'grey.500',
  },
  rightBoxBottom: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #e7e8e9',
    padding: '1rem 0 1rem 0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postingButton: {
    borderRadius: '50%',
    minWidth: 0,
    width: 36,
    height: 36,
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': { backgroundColor: '#e0e0e0' },
  },
  shareButton: {
    borderRadius: '50%',
    minWidth: 0,
    width: 36,
    height: 36,
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': { backgroundColor: '#e0e0e0' },
  },
  goToBuyButton: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '0 0 0 8px',
    '&:hover': { backgroundColor: '#444' },
  },
  addBookShelfButton: {
    width: '100%',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #e6e7e8',
    borderRadius: 1,
    fontVariant: 'h6',
    color: 'text.secondary',
    padding: '1rem',
  },
  bookDetailContentBox: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    boxSizing: 'border-box',
    height: '100%',
  },
  bookDetailsNavbarBox: {
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  bookIntroduceTabBox: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: '1rem',
    padding: '1rem 1rem',
  },
  bookIntroduceBox: {
    marginBottom: '1.5rem',
    padding: '1rem 1rem',
    borderTop: '4px solid #e6e7e8',
  },
};

export const chartStyles = {
  GenderAgeChartBox: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '1rem 1rem',
    gap: '1rem',
  },
  progressMale: {
    height: 8,
    borderRadius: '4px',
    backgroundColor: '#d1e4f6',
    flex: 1,
    '& .MuiLinearProgress-bar': { backgroundColor: '#4285f4' },
  },
  progressFemale: {
    height: 8,
    borderRadius: '4px',
    backgroundColor: '#fbdcdc',
    flex: 1,
    '& .MuiLinearProgress-bar': { backgroundColor: '#e53935' },
  },
  percentageText: {
    width: '10%',
    textAlign: 'center',
  },
  legendText: {
    color: 'text.secondary',
  },
  maleLegendDot: {
    color: '#4285f4',
  },
  femaleLegendDot: {
    color: '#e53935',
  },
};

export const summaryStyles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    borderRadius: '8px',
    padding: '0 1rem',
    gap: '1rem',
  },
  emptyStack: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topInfoText: {
    variant: 'body2',
    fontWeight: 'bold',
  },
};

export const bookReviewTabStyles = {
  container: {
    padding: '1rem 1rem',
  },
  reviewSection: {
    marginBottom: '2rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  reviewBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    border: '1px solid #e7e8e9',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  moreButton: {
    color: '#333',
    fontWeight: 'bold',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
};
