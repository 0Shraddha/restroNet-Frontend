import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import './Restaurant.css'

const AddRestaurant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log("Form Data:", data)
    // You can now send `data` to your API
  }

  return (
    <form className='flex flex-col gap-10 p-8' onSubmit={handleSubmit(onSubmit)}>
      {/* Restaurant Details */}
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="w-full lg:w-1/2">
            <CardHeader>
            <CardTitle>Restaurant Details</CardTitle>
            <CardDescription>Fill up the form to register the Restaurant</CardDescription>
            </CardHeader>
            <CardContent>
            <label>Restaurant Name</label>
            <Input
                type='text'
                placeholder='Enter Restaurant Name'
                {...register('restaurantName', { required: 'Restaurant name is required' })}
            />
            {errors.restaurantName && <p className="error">{errors.restaurantName.message}</p>}

            <label>Location</label>
            <Input
                type='text'
                placeholder='Enter Restaurant Location'
                {...register('restaurantLocation', { required: 'Location is required' })}
            />
            {errors.restaurantLocation && <p className="error">{errors.restaurantLocation.message}</p>}

            <label>Phone Number</label>
            <Input
                type='number'
                placeholder='Enter Restaurant Phone Number'
                {...register('restaurantPhone', { required: 'Phone number is required' })}
            />
            {errors.restaurantPhone && <p className="error">{errors.restaurantPhone.message}</p>}

            <label>Email</label>
            <Input
                type='email'
                placeholder='Enter Restaurant Email'
                {...register('restaurantEmail', { required: 'Email is required' })}
            />
            {errors.restaurantEmail && <p className="error">{errors.restaurantEmail.message}</p>}

            <label>Description</label>
            <Textarea
                placeholder='Tell something about the restaurant...'
                {...register('restaurantDescription')}
            />
            </CardContent>
        </Card>

      {/* Owner Details */}
     
        <Card className="w-full lg:w-1/2">
            <CardHeader>
            <CardTitle>Restaurant Owner Details</CardTitle>
            <CardDescription>Fill up the Restaurant Owner Details</CardDescription>
            </CardHeader>
            <CardContent>
            <label>Fullname</label>
            <Input
                type='text'
                placeholder='Enter Owner Fullname'
                {...register('ownerName', { required: 'Full name is required' })}
            />
            {errors.ownerName && <p className="error">{errors.ownerName.message}</p>}

            <label>Location</label>
            <Input
                type='text'
                placeholder='Enter Owner Location'
                {...register('ownerLocation', { required: 'Owner location is required' })}
            />
            {errors.ownerLocation && <p className="error">{errors.ownerLocation.message}</p>}

            <label>Phone Number</label>
            <Input
                type='number'
                placeholder='Enter Owner Phone Number'
                {...register('ownerPhone', { required: 'Phone number is required' })}
            />
            {errors.ownerPhone && <p className="error">{errors.ownerPhone.message}</p>}

            <label>Email</label>
            <Input
                type='email'
                placeholder='Enter Owner Email'
                {...register('ownerEmail', { required: 'Email is required' })}
            />
            {errors.ownerEmail && <p className="error">{errors.ownerEmail.message}</p>}
            </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  )
}

export default AddRestaurant
