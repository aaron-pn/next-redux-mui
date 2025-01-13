import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { OptionsSelectInput } from '@/app/types';

interface CustomSelectProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  options: OptionsSelectInput[];
  label: string;
  error?: string;
}

const CustomSelect = <T extends FieldValues>({
  field,
  options,
  label,
  error,
}: CustomSelectProps<T>) => {
  
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel id={`select-${field.name}`}>{label}</InputLabel>
      <Select
        labelId={`select-${field.name}`}
        id={`select-${field.name}`}
        {...field}
        label={label}
      >
        {(options || [])?.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ marginTop: 0.5, marginLeft: 2 }}
        >
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export default CustomSelect;
