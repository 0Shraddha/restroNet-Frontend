import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
import { useAddRestaurantMutation, useGetRestaurantByIdQuery } from '../../state/restaurants/restuarantApiSlice';
import { toast } from 'react-toastify';
import geocodeAddress from '../../util/searchAddress';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const AddRestaurant = () => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [addRestaurant, { isLoading, isSuccess, isError, error }] = useAddRestaurantMutation();
  const { data : singleRestaurant } = useGetRestaurantByIdQuery(id);

  useEffect(() => {
      if (id && singleRestaurant?.data){
          setValue("restaurant_name", singleRestaurant.data.restaurant_name);
          setValue("restaurant_location", singleRestaurant.data.restaurant_location);
          setValue("restaurant_contact", singleRestaurant.data.restaurant_contact);
          setValue("description", singleRestaurant.data.description);
          setValue("cuisine", singleRestaurant.data.cuisine);

      } else if (!id) {
          reset();
      }
  }, [singleRestaurant, id, setValue, reset]);
  console.log({singleRestaurant});
  

  const [latLng, setLatLng] = useState(null);
   const address = useWatch({
    control,
    name: "restaurant_location",
    defaultValue: "",
   })

const handleSearch = async () => {
  console.log("Address:", address);

  const result = await geocodeAddress({address});

  if (result) {
    setLatLng({
      lat: result.lat,
      lon: result.lon,
    });

    console.log({result});
  } else {
    alert("Address not found");
  }
};

function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.flyTo([lat, lon], 16, { duration: 1.5 });
    }
  }, [lat, lon]);

  return null;
}

  useEffect(() => {
    if(isSuccess){
      toast.success("Restaurant added successfully!");
      reset();
    }
    

    if(isError){
      const errorMessages = error.data?.errors;
      if (errorMessages) {
        Object.values(errorMessages).forEach((msg) => {
          toast.error(msg);
        });
      }
      // toast.error("Failed to add restaurant details : " , error.data?.errors);
    }
    },[isSuccess, isError, error, reset]);

  const [submitted, setSubmitted] = useState(false);
  const [logoFile, setLogoFile] = useState(null); // State to hold the single logo file
  const [imageFiles, setImageFiles] = useState([]); // State to hold multiple restaurant images

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all form data from react-hook-form
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

   // Append logo (single file)
  if (logoFile) {
    formData.append("logo", logoFile);
  }

  formData.append('lat', latLng.lat);
  formData.append('lng', latLng.lon);


  if (imageFiles.length > 0) {
    imageFiles.forEach(file => {
      formData.append('images', file); // Backend should expect `req.files` with field name "images"
    });
  }

  

  try {
    await addRestaurant(formData).unwrap();
    setSubmitted(true);
    reset();
    setLogoFile(null);
    setImageFiles([]);
  } catch (err) {
    console.error('Failed to submit restaurant:', err.data?.errors?.restaurant_contact);
  }
   
  };

  useEffect(() => {
  console.log("Updated logoFile:", logoFile);
}, [logoFile]);


  return (
   
    <form
      className="mx-auto p-6 space-y-10"
      method='POST'
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data" // Ensure this is set for file uploads
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Register New Restaurant</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Restaurant Details */}
        <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
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
             <div className="flex">
               <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurant_location"
                type="text"
                placeholder="Enter Restaurant Location"
                {...register('restaurant_location', { required: 'Location is required' })}
              />

                <button
                type='button'
                onClick={handleSearch}
                className="bg-orange-500 text-white px-4 rounded"
              >
                <Search />
              </button>
             </div>
              {errors.restaurant_location && <p className="error">{errors.restaurant_location.message}</p>}

              <MapContainer
                center={latLng ? [latLng.lat, latLng.lon] : [27.7172, 85.3240]} // default Kathmandu
                zoom={13}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {latLng && (
                  <Marker position={[latLng.lat, latLng.lon]}>
                    <Popup>{address}</Popup>
                  <RecenterMap lat={latLng.lat} lon={latLng.lon} />
                  </Marker>
                )}
              </MapContainer>


            </div>

            <div>
              <label htmlFor="restaurant_contact" className="block text-sm mb-2 font-medium text-gray-700">Phone Number *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurant_contact"
                type="tel"
                placeholder="Enter Restaurant Phone Number"
                {...register('restaurant_contact', 
                  { required: 'Phone number is required',     
                    //  pattern: {
                    //   value: /^(?:\+977)?0?(9[78]\d{8}|1\d{7}|[2-9]\d{6,7})$/,
                    //   message: 'Invalid phone number'
                    // }
                  })}
              />
              {errors.restaurant_contact && <p className="error">{errors.restaurant_contact.message}</p>}
            </div>

            <div>
              <label htmlFor="restaurant_email" className="block text-sm mb-2 font-medium text-gray-700">Email *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="restaurant_email"
                type="email"
                placeholder="Enter Restaurant Email"
                {...register('restaurant_email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format'
                  }
                })}
              />
              {errors.restaurant_email && <p className="error">{errors.restaurant_email.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm mb-2 font-medium text-gray-700">Description</label>
              <Textarea
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="description"
                placeholder="Tell something about the restaurant..."
                {...register('description')}
              />
            </div>
          </CardContent>
        </Card>

        <div>
          {/* Restaurant Logo */}
          <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 mb-4 shadow-sm">
            <CardContent className="space-y-4">
              <CardTitle className="text-lg">Restaurant Logo</CardTitle>
              <DropImageUpload multiple={false} onFileSelect={(file) => setLogoFile(file)} /> 
              {logoFile && <p className="text-sm text-gray-600">Selected logo: {logoFile.name}</p>}
            </CardContent>
          </Card>

          <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
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

      {/* Restaurant Images */}
      <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Restaurant Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pass setImageFiles to update the state in parent */}
          <DropImageUpload multiple={true} onFileSelect={setImageFiles} /> 
          {imageFiles.length > 0 && (
            <p className="text-sm text-gray-600">Selected images: {imageFiles.map(file => file.name).join(', ')}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
        >
        {isLoading ? "Submitting..." : "Submit" }

        </Button>
      </div>

    {isSuccess && <p className="text-green-600 text-center font-medium">Restaurant added successfully!</p>}
    {isError && <p className="text-red-600 text-center font-medium">Error: {error?.data?.message || "Something went wrong"}</p>}
    </form>
  )
}

export default AddRestaurant;