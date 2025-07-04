'use client'
import { Input } from '../components/ui/input'; // Assuming this path is correct
import { Label } from '../components/ui/label'; // Assuming this path is correct
import { Button } from '../components/ui/button'; // Assuming this path is correct
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useActionData, useNavigation, useSearchParams, Link } from 'react-router-dom';

export default function SignUpPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData(); // Data returned from the action
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isLoginMode = mode === 'login';

  const {
    register,
    handleSubmit, // We will still use handleSubmit for client-side validation
    formState: { errors },
    setError,
    getValues,
    trigger, // Import trigger to manually trigger validation
  } = useForm();

  // Use useEffect to process errors returned from the action function
  useEffect(() => {
    if (actionData && actionData.errors) {
      for (const key in actionData.errors) {
        setError(key, { type: 'server', message: actionData.errors[key] });
      }
    }
    // Also, if actionData.message exists and there are no specific field errors,
    // it could be a general server error message.
    if (actionData && actionData.message && !actionData.errors) {
        // You might want to set a general form error or display it differently
        // For example, setError('root', { type: 'server', message: actionData.message });
        // Or handle it in your JSX directly as you currently do.
    }
  }, [actionData, setError]);

  // This function will be called by react-hook-form's handleSubmit
  // It's typically used for client-side validation.
  // For React Router actions, you don't actually need to "submit" here.
  // The <Form> component will handle the submission to the action.
  // You might use this `onSubmit` if you had client-side-only logic or
  // if you were manually fetching.
  // For now, we can keep it as a placeholder or remove it if not needed.
  const onSubmitClientValidation = async (data) => {
    // This function runs if client-side validation passes.
    // If you were NOT using React Router's action, you would perform your fetch here.
    // Since you ARE using React Router's action, this function is actually redundant
    // for triggering the submission to the action.
    // The <Form> component will trigger the action directly when submitted.
    console.log("Client-side validation passed. Data:", data);
    // No need to manually submit the form here; <Form> does it.
  };


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
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
                <p className="text-muted-foreground text-balance text-gray-600 mt-2">
                  {isLoginMode ? 'Login to your RestroNet account' : 'Sign up for a new RestroNet account'}
                </p>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
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
                <div className="grid gap-4">
                  <Label htmlFor="fullname" className="text-gray-700">Fullname</Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="John Doe"
                    className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register('fullname', {
                      required: 'Fullname is required'
                    })}
                  />
                  {errors.fullname && <small className='text-red-600 text-sm'>{errors.fullname.message}</small>}
                </div>
              )}

              <div className="grid gap-4">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
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
                <div className="grid gap-4">
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
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : (isLoginMode ? 'Login' : 'Sign Up')}
              </Button>

              <div className="text-center text-sm text-gray-600 mt-4">
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