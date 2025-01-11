// 날짜 관련 공통 함수
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear().toString().slice(-2)}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};
