import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormLabel from '../../../components/ui/formLabel/FormLabel';
import FormInput from '../../../components/ui/formInput/FormInput';
import { Button } from '@mui/material';
import FormDatePicker from '../../../components/ui/formDatePicker/FormDatePicker';
import Input from '../../../components/form/input/InputField';

const DummyForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log('Form Data:', data);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <FormLabel htmlFor="email" text="Email" required />
      <FormInput
        name="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
      />

      <FormLabel htmlFor="password" text="Password" required />
      <FormInput
        name="password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        className="w-1/2"
      />
        <FormLabel htmlFor="start Date" text="start date" required/>
        <FormDatePicker  name="start Date"
          control={control}
          error={errors.birthDate}
          required
        className='w-full h-full'
          />
          <Input />
      <Button
        type="submit"
        variant="contained"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
      >
        Submit
      </Button>
    </form>
    </LocalizationProvider>
  );
};

export default DummyForm;
