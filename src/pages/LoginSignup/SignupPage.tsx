import Signup from '@components/LoginSignup/Signup';
import { Stack } from '@mui/material';

const SignupPage = (): JSX.Element => {
  return (
    <Stack
      sx={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Signup />
    </Stack>
  );
};

export default SignupPage;
