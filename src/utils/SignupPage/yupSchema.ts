import { SignupData } from '@features/SignupPage/types';
import * as yup from 'yup';

export const schema = yup.object<SignupData>().shape({
  name: yup.string().required('이름을 입력해주세요'),
  userId: yup
    .string()
    .required('아이디를 입력해주세요')
    .min(4, '아이디는 최소 4자 이상이어야 합니다'),
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
  age: yup
    .number()
    .typeError('나이를 입력해주세요')
    .required('나이를 입력해주세요')
    .positive('나이는 양수여야 합니다')
    .integer('나이는 정수여야 합니다'),
});
