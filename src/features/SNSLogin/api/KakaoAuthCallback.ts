export const getAuthorizationCode = (): string | null => {
  return new URL(document.location.toString()).searchParams.get('code');
};
