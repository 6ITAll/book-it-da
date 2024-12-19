import Signup from '@components/LoginSignup/Signup';

const SignupPage = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Signup />
    </div>
  );
};

export default SignupPage;
