'use client';

import {
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useGetCountriesForSelectQuery } from '@/app/store/services/api';
import CustomSelect from '@/components/inputs/CustomSelect';
import LoadingComponent from '@/app/components/common/LoadingComponent';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { FormValuesUserInformation } from '@/types/index';

const defaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  dateOfBirth: '',
  age: 0,
};

const Home = () => {
  const breakpoint = useMediaQuery('(max-width:700px)');

  const { data: countries, error, isLoading } = useGetCountriesForSelectQuery();

  const { control, handleSubmit } = useForm<FormValuesUserInformation>({
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = (data: FormValuesUserInformation) => {
    alert(JSON.stringify(data, null, 2));
    console.log(data);
  };

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={'Error fetching countries'} />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        color="#000"
        sx={{ marginBottom: 4 }}
      >
        User Information
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: breakpoint ? '100%' : '50%' }}
      >
        <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '0 auto' }}>
          <Grid size={12}>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: 'First Name is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="First Name"
                  helperText={error ? error.message : ''}
                  error={!!error}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="middleName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Middle Name (optional)"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="lastName"
              rules={{ required: 'Last Name is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  error={!!error}
                  helperText={error ? error.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="addressLine1"
              rules={{ required: 'Address Line 1 is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Address Line 1"
                  error={!!error}
                  helperText={error ? error.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="addressLine2"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 2 (optional)"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="city"
              rules={{ required: 'City is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="City"
                  error={!!error}
                  helperText={error ? error.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="state"
              rules={{ required: 'State is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="State"
                  error={!!error}
                  helperText={error ? error.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="country"
              rules={{ required: 'Country is required' }}
              render={({ field, fieldState: { error } }) => (
                <CustomSelect
                  field={field}
                  error={error ? error.message : ''}
                  options={countries || []}
                  label="Country"
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="zipCode"
              rules={{
                required: 'Zip Code is required',
                pattern: {
                  value: /^\d{5}(-\d{4})?$/,
                  message: 'Zip code must be 5 digits',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Zip Code"
                  error={!!error}
                  helperText={error ? error.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                required: 'Date of Birth is required',
                validate: (value) => {
                  if (!value) return 'Date of Birth is required';
                  if (!dayjs(value).isValid()) return 'Invalid date format';
                  if (dayjs().diff(dayjs(value), 'year') < 18)
                    return 'You must be at least 18 years old';
                  return true;
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={value ? dayjs(value) : null}
                    onChange={(newValue) => {
                      onChange(newValue);
                    }}
                    slotProps={{
                      textField: {
                        type: 'text',
                        fullWidth: true,
                        error: !!error,
                        helperText: error ? error.message : '',
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="age"
              rules={{
                required: 'Age is required',
                min: { value: 18, message: 'Age must be greater than 18' },
                max: { value: 100, message: 'Age must be less than 100' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Age"
                  type="number"
                  error={!!error}
                  helperText={error ? error.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Home;
