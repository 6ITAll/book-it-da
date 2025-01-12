import Login from '@components/LoginSignupPage/Login/Login';

const LoginPage = (): JSX.Element => {
  const handleLogin = (userId: string) => {
    console.log(`User logged in: ${userId}`);
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
