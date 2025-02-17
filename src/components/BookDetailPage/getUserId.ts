export const getUserId = (): string => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
  if (Array.isArray(userInfo) && userInfo.length > 0) {
    return userInfo[0].userId || ''; // userId가 존재하지 않을 경우 빈 문자열 반환
  }
  throw new Error('userId를 찾을 수 없습니다. 사용자 정보를 확인하세요.');
};
