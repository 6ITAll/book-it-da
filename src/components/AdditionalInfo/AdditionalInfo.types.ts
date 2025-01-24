import { Control, FieldErrors } from 'react-hook-form';

export interface AdditionalInfoData {
  userId: string;
  gender: string;
  age: number;
}

export interface AdditionalInfoProps {
  control: Control<AdditionalInfoData>;
  errors: FieldErrors<AdditionalInfoData>;
  onSubmit: (data: AdditionalInfoData) => void;
}
