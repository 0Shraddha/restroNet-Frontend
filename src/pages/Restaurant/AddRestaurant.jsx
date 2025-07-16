import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

import './Restaurant.css';
import DropImageUpload from '../../components/DropImageUpload';
import { Button } from '../../components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { addRestaurants } from '../../api/restaurants';
import { toast } from 'react-toastify';

const AddRestaurant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [logoFile, setLogoFile] = useState(null); // State to hold the single logo file
  const [imageFiles, setImageFiles] = useState([]); // State to hold multiple restaurant images

  const { mutate, isPending } = useMutation({
    mutationFn: addRestaurants,
    onSuccess: () => {
      toast.success('Restaurant created successfully!');
      setSubmitted(true);
      reset(); // Resets form fields
      setLogoFile(null); // Clear logo file state
      setImageFiles([]); // Clear image files state
    },
    onError: (error) => {
      console.error("Error creating restaurant:", error);
      toast.error('Failed to create restaurant!');
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append all form data from react-hook-form
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append the logo file if it exists
    if (logoFile) {
      // 'logo' should be the field name your backend expects for the restaurant logo
      formData.append('logo', logoFile); 
    }

    // Append all general restaurant image files if they exist
    imageFiles.forEach((file, index) => {
      // 'images' should be the field name your backend expects for multiple images
      // The backend might expect 'images[]' or just 'images' for an array of files.
      // Using 'images' is common and many backends handle multiple files with the same key.
      formData.append('images', file); 
    });

    // --- For debugging: Log FormData contents ---
    console.log("--- FormData Contents ---");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("-------------------------");
    // --- End debugging ---

    mutate(formData);
  };

  return (
    <form
      className="max-w-6xl mx-auto flex flex-col gap-8 p-6 my-12 bg-white rounded-xl shadow-lg"
      method='POST'
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data" // Ensure this is set for file uploads
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
          {/* Restaurant Logo */}
          <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 mb-4 shadow-sm">
            <CardContent className="space-y-4">
              <CardTitle className="text-lg">Restaurant Logo</CardTitle>
              {/* Pass setLogoFile to update the state in parent */}
              <DropImageUpload multiple={false} onFileChange={setLogoFile} /> 
              {logoFile && <p className="text-sm text-gray-600">Selected logo: {logoFile.name}</p>}
            </CardContent>
          </Card>

          <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 shadow-sm">
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="cuisine" className="block text-sm mb-2 font-medium text-gray-700">Cuisine *</label>
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

      {/* Restaurant Images */}
      <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Restaurant Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pass setImageFiles to update the state in parent */}
          <DropImageUpload multiple={true} onFileChange={setImageFiles} /> 
          {imageFiles.length > 0 && (
            <p className="text-sm text-gray-600">Selected images: {imageFiles.map(file => file.name).join(', ')}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
          disabled={isPending} // Disable button while submitting
        >
          {isPending ? "Submitting..." : "Create"}
        </Button>
      </div>

      {submitted && (
        <p className="text-green-600 text-center font-medium">Restaurant added successfully!</p>
      )}
    </form>
  )
}

export default AddRestaurant;