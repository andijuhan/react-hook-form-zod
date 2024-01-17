'use client';

import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

const Form = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      getValues,
   } = useForm();

   const onSubmit = async (data: FieldValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);

      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
         <input
            {...register('email', {
               required: 'Email is required',
            })}
            type='email'
            placeholder='Email'
            className='px-4 py-2 rounded'
         />
         {errors.email && (
            <p className='text-red-500'>{`${errors.email.message}`}</p>
         )}
         <input
            {...register('password', {
               required: 'Password is required',
               maxLength: {
                  value: 10,
                  message: 'Password must be at least 10 characters',
               },
            })}
            type='password'
            placeholder='Password'
            className='px-4 py-2 rounded'
         />
         {errors.password && (
            <p className='text-red-500'>{`${errors.password.message}`}</p>
         )}
         <input
            {...register('confirmPassword', {
               required: 'Confirm password is required',
               validate: (value) => {
                  return (
                     value === getValues('password') || 'Password must match'
                  );
               },
            })}
            type='password'
            placeholder='Confirm password'
            className='px-4 py-2 rounded'
         />
         {errors.confirmPassword && (
            <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
         )}
         <button
            disabled={isSubmitting}
            type='submit'
            className='bg-blue-500 disabled:bg-gray-500 rounded py-2'
         >
            Submit
         </button>
      </form>
   );
};

export default Form;
