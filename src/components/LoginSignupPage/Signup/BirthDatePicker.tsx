import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

interface BirthDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  error?: boolean;
  helperText?: string;
}

const BirthDatePicker = ({
  value,
  onChange,
  error,
  helperText,
}: BirthDatePickerProps) => {
  const maxDate = dayjs().subtract(14, 'year');
  const minDate = dayjs().subtract(100, 'year');

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format('YYYY-MM-DD'));
    } else {
      onChange('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        label="생년월일"
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        format="YYYY-MM-DD"
        maxDate={maxDate}
        minDate={minDate}
        slotProps={{
          textField: {
            error,
            helperText,
            fullWidth: true,
            margin: 'normal',
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default BirthDatePicker;
