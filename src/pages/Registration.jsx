'use client'
import { Input } from '../components/ui/input'; // Assuming this path is correct
import { Label } from '../components/ui/label'; // Assuming this path is correct
import { Button } from '../components/ui/button'; // Assuming this path is correct
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useActionData, useNavigation, useSearchParams, Link, useSubmit } from 'react-router-dom';

export default function SignUpPage() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData(); // Data returned from the action
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isLoginMode = mode === 'login';

  const {
    register,
    handleSubmit, // We will still use handleSubmit for client-side validation
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(()=>{
    if(actionData){
      console.log(actionData.errors);
    }
  })

 const handleClientSideValidation = (data) => {
  
  const formData = new FormData();
  for (const key in data) {
    // console.log(key, "kkkkkkk")
        formData.append(key, data[key]);
    }

        submit(formData, { method: 'post' }); 
 }

  return (
    <div className="min-h-screen flex font-inter">
      <div className="w-full flex items-center justify-center p-8">
        <div className="max-w-lg w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
          {actionData && actionData.message && !actionData.errors && (
            <p className="text-red-600 text-center text-sm mb-4">{actionData.message}</p>
          )}
    
          <Form
            className="p-5 md:p-8"
            action={isLoginMode ? '?mode=login' : '?mode=signup'}
            method='POST'
            onSubmit={handleSubmit(handleClientSideValidation)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold text-orange-500"> {isLoginMode ? 'Welcome back' : 'Welcome' }</h1>
                <p className="text-muted-foreground text-balance text-gray-600 mt-2">
                  {isLoginMode ? 'Login to your RestroNet account' : 'Sign up for a new RestroNet account'}
                </p>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name='email'
                  placeholder="m@example.com"
                  className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && <small className='text-red-600 text-sm'>{errors.email.message}</small>}
              </div>

              {!isLoginMode && (
                <div className="grid gap-1">
                  <Label htmlFor="username" className="text-gray-700">Fullname</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="John Doe"
                    className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register('username', {
                      required: 'Fullname is required'
                    })}
                  />
                  {errors.username && <small className='text-red-600 text-sm'>{errors.username.message}</small>}
                </div>
              )}

              {!isLoginMode && (
                <div className="grid gap-1">
                  <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    type="number"
                    name='phone'
                    placeholder="Enter phone number"
                    className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register('phone')}
                  />
                  {errors.phone && <small className='text-red-600 text-sm'>{errors.phone.message}</small>}
                </div>
              )}

              <div className="grid gap-1">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name='password'
                  className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password should be at least 8 characters long'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                    }
                  })}
                />
                {errors.password && <small className='text-red-600 text-sm'>{errors.password.message}</small>}
              </div>

              {!isLoginMode && (
                <div className="grid gap-1">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: (value) =>
                        value === getValues('password') || 'Passwords do not match'
                    })}
                  />
                  {errors.confirmPassword && <small className='text-red-600 text-sm'>{errors.confirmPassword.message}</small>}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : (isLoginMode ? 'Login' : 'Sign Up')}
              </Button>

              <div className="text-center text-sm text-gray-600 mt-4 cursor-pointer">
                {isLoginMode ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <Link to="/auth?mode=signup" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link to="/auth?mode=login" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}