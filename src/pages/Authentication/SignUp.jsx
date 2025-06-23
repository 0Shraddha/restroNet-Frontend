'use client'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'


export default function SignUpPage() {

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm();


    const [submitted, setSubmitted] = useState(false)
   
     const onSubmit = (data) => {
        console.log({data})
       setSubmitted(true)
     }

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src="/assets/login-image.jpg" // Replace with your image path
          alt="Login Illustration"
          width={500}
          height={500}
          className="object-cover rounded-lg"
        />
      </div> */}

      {/* Right Side Form */}
      {submitted && (
        <p className="text-green-600 text-sm">
            Form submitted successfully!
        </p>
        )}
      <div className="w-full flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your RestroNet account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                {...register('email', { 
                    required: 'Email is required'
                })}

                />
                {errors.email && <small className='text-red-800'>{errors.email.message}</small>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  id="fullname"
                  type="fullname"
                  placeholder="m@example.com"
                {...register('fullname', { 
                    required: 'Fullname is required'
                })}

                />
                {errors.fullname && <small className='text-red-800'>{errors.fullname.message}</small>}
              </div>
              <div className="grid gap-3">
                <Input id="password" type="password"                 
                {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                        value : 8,
                        message : 'Password should be atleast 8 characters long'
                    },
                    pattern : {
                         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                    }
                })}
                />
                {errors.password && <small className='text-red-800'>{errors.password.message}</small>}

                <div className="grid gap-3">
                <Input id="confirmPassword" type="confirmPassword"                 
                {...register('confirmPassword', { 
                    required: 'Password is required',
                    minLength: {
                        value : 8,
                        message : 'Password should be atleast 8 characters long'
                    },
                    pattern : {
                         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                    }
                })}
                />
                {errors.confirmPassword && <small className='text-red-800'>{errors.confirmPassword.message}</small>}

              </div>
              <Button type="submit" className="w-auto bg-black text-white">
                Login
              </Button>
        
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
