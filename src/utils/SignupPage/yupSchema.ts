import { SignupData } from '@features/SignupPage/types';
import * as yup from 'yup';

export const signupSchema = yup.object<SignupData>().shape({
  name: yup.string().required('이름을 입력해주세요'),
  userId: yup
    .string()
    .required('아이디를 입력해주세요')
    .min(4, '아이디는 최소 4자 이상이어야 합니다')
    .max(20, '아이디는 최대 20자까지 가능합니다')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      '아이디는 영문, 숫자, 언더스코어(_)만 사용 가능합니다',
    ),
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .email('유효한 이메일 형식이 아닙니다'),
  phone: yup
    .string()
    .required('전화번호를 입력해주세요')
    .matches(/^[0-9]{10,11}$/, '올바른 전화번호 형식이 아닙니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  confirmPassword: yup
    .string()
    .required('비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
  gender: yup.string().required('성별을 선택해주세요'),
  birthDate: yup
    .string()
    .required('생년월일을 선택해주세요')
    .matches(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      '올바른 날짜 형식이 아닙니다',
    )
    .test('is-valid-age', '유효하지 않은 생년월일입니다', function (value) {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 14 && age <= 120;
    }),
});

export const additionalInfoSchema = yup.object().shape({
  userId: yup
    .string()
    .required('아이디는 필수입니다')
    .min(4, '아이디는 최소 4자 이상이어야 합니다')
    .max(20, '아이디는 최대 20자까지 가능합니다')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      '아이디는 영문, 숫자, 언더스코어(_)만 사용 가능합니다',
    ),
  gender: yup.string().required('성별을 선택해주세요'),
  birthDate: yup
    .string()
    .required('생년월일을 선택해주세요')
    .matches(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      '올바른 날짜 형식이 아닙니다',
    )
    .test('is-valid-age', '유효하지 않은 생년월일입니다', function (value) {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 14 && age <= 120;
    }),
});
