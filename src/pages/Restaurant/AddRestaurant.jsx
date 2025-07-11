import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Form, useSubmit } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'

import './Restaurant.css'
import DropImageUpload from '../../components/DropImageUpload'
import { Button } from '../../components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { addRestaurants } from '../../api/restaurants'


const AddRestaurant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const submit = useSubmit();

  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (data) => {
    
    const formData = new FormData();
    for(const key in data){
      formData.append(key, data[key]);
    }

    submit(formData, {method: 'post'})
  }

  const {data, isLoading, isError, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: addRestaurants
  })

  if(isLoading){
    const loadingMsg = 'Submitting'
  }
  return (
    <Form
      className="max-w-6xl mx-auto flex flex-col gap-8 p-6 my-12 bg-white rounded-xl shadow-lg"
      method='POST'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Register New Restaurant</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Restaurant Details */}
        <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Restaurant Details</CardTitle>
            <CardDescription className="text-sm">Fill the form to register the restaurant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="restaurant_name" className="block text-sm mb-2 font-medium text-gray-700">Restaurant Name *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurant_name"
                type="text"
                placeholder="Enter Restaurant Name"
                {...register('restaurant_name', { required: 'Restaurant name is required' })}
              />
              {errors.restaurant_name && <p className="error">{errors.restaurant_name.message}</p>}
            </div>

            <div>
              <label htmlFor="restaurant_location" className="block text-sm mb-2 font-medium text-gray-700">Location *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurant_location"
                type="text"
                placeholder="Enter Restaurant Location"
                {...register('restaurant_location', { required: 'Location is required' })}
              />
              {errors.restaurant_location && <p className="error">{errors.restaurant_location.message}</p>}
            </div>

            <div>
              <label htmlFor="restaurant_contact" className="block text-sm mb-2 font-medium text-gray-700">Phone Number *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurant_contact"
                type="tel"
                placeholder="Enter Restaurant Phone Number"
                {...register('restaurant_contact', { required: 'Phone number is required' })}
              />
              {errors.restaurant_contact && <p className="error">{errors.restaurant_contact.message}</p>}
            </div>

            <div>
              <label htmlFor="restaurantEmail" className="block text-sm mb-2 font-medium text-gray-700">Email *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurantEmail"
                type="email"
                placeholder="Enter Restaurant Email"
                {...register('restaurantEmail', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format'
                  }
                })}
              />
              {errors.restaurantEmail && <p className="error">{errors.restaurantEmail.message}</p>}
            </div>

            <div>
              <label htmlFor="restaurant_Description" className="block text-sm mb-2 font-medium text-gray-700">Description</label>
              <Textarea
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurant_Description"
                placeholder="Tell something about the restaurant..."
                {...register('description')}
              />
            </div>
          </CardContent>
        </Card>

    <div>
        {/* Owner Details */}
       
        <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 mb-4 shadow-sm">
          <CardContent className="space-y-4">
          <CardTitle className="text-lg">Restaurant Logo</CardTitle>
            
            <DropImageUpload multiple={false}/>
          </CardContent>
        </Card>

        <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="cuisine" className="block text-sm mb-2 font-medium text-gray-700">Cusinie *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="cuisine"
                type="text"
                placeholder="Enter Cuisine (Nepali, Indian, Chinese)"
                {...register('cuisine', { required: 'Cuisine is required' })}
              />
              {errors.cuisine && <p className="error">{errors.cuisine.message}</p>}
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm mb-2 font-medium text-gray-700">Tags *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="tags"
                type="text"
                placeholder="Chefs special, Spicy, Vegan ..."
                {...register('tags', { required: 'Atleast one tag is required' })}
              />
              {errors.tags && <p className="error">{errors.tags.message}</p>}
            </div>

          </CardContent>
        </Card>
    </div>
      </div>
 {/* Owner Details */}
  <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Owner Details</CardTitle>
            <CardDescription className="text-sm">Fill in the restaurant owner's information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="ownerName" className="block text-sm mb-2 font-medium text-gray-700">Full Name *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="ownerName"
                type="text"
                placeholder="Enter Owner Fullname"
                {...register('ownerName', { required: 'Full name is required' })}
              />
              {errors.ownerName && <p className="error">{errors.ownerName.message}</p>}
            </div>

            <div>
              <label htmlFor="ownerLocation" className="block text-sm mb-2 font-medium text-gray-700">Location *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="ownerLocation"
                type="text"
                placeholder="Enter Owner Location"
                {...register('ownerLocation', { required: 'Owner location is required' })}
              />
              {errors.ownerLocation && <p className="error">{errors.ownerLocation.message}</p>}
            </div>

            <div>
              <label htmlFor="ownerPhone" className="block text-sm mb-2 font-medium text-gray-700">Phone Number *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="ownerPhone"
                type="tel"
                placeholder="Enter Owner Phone Number"
                {...register('ownerPhone', { required: 'Phone number is required' })}
              />
              {errors.ownerPhone && <p className="error">{errors.ownerPhone.message}</p>}
            </div>

            <div>
              <label htmlFor="ownerEmail" className="block text-sm mb-2 font-medium text-gray-700">Email *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="ownerEmail"
                type="email"
                placeholder="Enter Owner Email"
                {...register('ownerEmail', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format'
                  }
                })}
              />
              {errors.ownerEmail && <p className="error">{errors.ownerEmail.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Restaurant Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DropImageUpload multiple={true}/>
          </CardContent>
        </Card>



      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
        >
          
          { isLoading ? "Loading" : "Create" }
        </Button>
      </div>

      {submitted && (
        <p className="text-green-600 text-center font-medium">Restaurant added successfully!</p>
      )}
    </Form>
  )
}

export default AddRestaurant
