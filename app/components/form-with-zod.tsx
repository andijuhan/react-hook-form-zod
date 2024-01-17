'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TSignUpSchema, signUpSchema } from '@/lib/types';

const FormZod = () => {
   //destrukturing dari useForm
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      setError,
   } = useForm<TSignUpSchema>({
      resolver: zodResolver(signUpSchema),
   });

   //fungsi untuk menghandel submit
   const onSubmit = async (data: TSignUpSchema) => {
      //mengirimkan data form ke API
      const response = await fetch('/api/signup', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
         },
      });

      const responseData = await response.json();

      if (!response.ok) {
         alert('Submitting form failed!');
         return;
      }
      //bagian untuk menampilkan pesan error
      if (responseData.errors) {
         const errors = responseData.errors;

         //mengatur error secara manual menggunakan setError dari useForm
         //parameter berisi string nama elemen form, type server (karena error dari API)
         //dan message dengan respon error dari API
         if (errors.email) {
            setError('email', {
               type: 'server',
               message: errors.email,
            });
         } else if (errors.password) {
            setError('password', {
               type: 'server',
               message: errors.password,
            });
         } else if (errors.confirmPassword) {
            setError('confirmPassword', {
               type: 'server',
               message: errors.confirmPassword,
            });
         } else {
            alert('Something went wrong!');
         }
      }
      //mengkosongkan form
      reset();
   };

   return (
      <form
         // handleSubmit akan memicu validasi dan callbak onSubmit
         onSubmit={handleSubmit(onSubmit)}
         className='w-full max-w-xl'
         noValidate
      >
         <div className='flex flex-col gap-y-4'>
            <input
               //mendaftarkan elemen form ke state useForm
               //isi parameter sesuai nama elemen form
               {...register('email')}
               type='email'
               placeholder='Email'
               className='px-4 py-2 rounded-md border'
            />
            {errors.email && (
               <p className='text-red-500'>{`${errors.email.message}`}</p>
            )}
            <input
               {...register('password')}
               type='password'
               placeholder='Password'
               className='px-4 py-2 rounded-md border'
            />
            {errors.password && (
               <p className='text-red-500'>{`${errors.password.message}`}</p>
            )}
            <input
               {...register('confirmPassword')}
               type='password'
               placeholder='Confirm password'
               className='px-4 py-2 rounded-md border'
            />
            {errors.confirmPassword && (
               <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
            )}
            <button
               //status disabled sesuai nilai dari isSubmitting useForm
               disabled={isSubmitting}
               type='submit'
               className='bg-gray-800 disabled:bg-gray-600 text-gray-50 rounded-md py-2'
            >
               Submit
            </button>
         </div>
      </form>
   );
};

export default FormZod;
