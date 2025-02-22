import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
});

const PasswordInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
}: PasswordInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <StyledTextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleTogglePasswordVisibility}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordInput;
