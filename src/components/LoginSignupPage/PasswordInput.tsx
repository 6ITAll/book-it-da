/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { css } from '@emotion/react';

interface PasswordInputProps {
  label: string;
  value: string; // value 추가
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange 추가
}

const PasswordInput = ({
  label,
  value,
  onChange,
}: PasswordInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value} // value prop 사용
      onChange={onChange} // onChange prop 사용
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleTogglePasswordVisibility}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
      css={css`
        margin-bottom: 16px;
      `}
    />
  );
};

export default PasswordInput;
