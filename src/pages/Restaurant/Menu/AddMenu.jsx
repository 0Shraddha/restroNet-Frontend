import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Checkbox } from '../../../components/ui/checkbox';
import { Textarea } from '../../../components/ui/textarea';
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import DropImageUpload from '../../../components/DropImageUpload';
import { Button } from '../../../components/ui/button';
import PreviewMenuItems from './PreviewMenuItems';
import { useAddMenuMutation } from '../../../state/restaurants/menuApiSlice';

const AddMenu = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();

  const [addMenu, { isLoading, isSuccess, isError, error }] = useAddMenuMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Restaurant added successfully!");
    }
  }, [isSuccess])


  useEffect(() => {
    if (isError) {
      toast.error("Failed to add restaurant details", { autoClose: 3000 });
    }
  }, [isError, error])


  const [imageFiles, setImageFiles] = useState([]); // State to hold multiple menu images
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();

    data.ingredients = data.ingredients.split(',').map((i) => i.trim());
    data.category = data.category.split(",").map((c) => c.trim());

    console.log({ data });
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}`, `[${v}]`));
      } else {
        formData.append(key, value?.toString()); // ensure string
      }
    });

    imageFiles.forEach((file) => {
      formData.append('images[]', file);
    });


    try {
      await addMenu(formData).unwrap();
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error('Failed to add menu items: ', err.data.errors);

    }
  };



  return (
    <form
      className="mx-auto p-6 space-y-10"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Menu</h2>

      <Card className="border-gray-100 bg-white text-card-foreground p-6 mb-4 ">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="item_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  id="item_name"
                  type="text"
                  placeholder="e.g., Margherita Pizza"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                  {...register('item_name', { required: 'Item name is required' })}
                />
                {errors.item_name && <p className="text-red-500 text-sm mt-1">{errors.item_name.message}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  placeholder="Brief description of the item..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                  {...register('description')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 0.01, message: 'Price must be greater than 0' },
                      valueAsNumber: true
                    })}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <label htmlFor="preparation_time" className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (minutes)
                  </label>
                  <input
                    id="preparation_time"
                    type="number"
                    min="1"
                    placeholder="20"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                    {...register('preparation_time', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>

                    {/* Ingredients and Specifications */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Ingredients & Specifications</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients *
                </label>
                <input
                  id="ingredients"
                  type="text"
                  placeholder="Flour, Tomato, Mozzarella, Basil (comma separated)"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                  {...register('ingredients', { required: 'Ingredients are required' })}
                />
                {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients.message}</p>}
                <p className="text-xs text-gray-500 mt-1">Separate ingredients with commas</p>
              </div>

              <div>
                <label htmlFor="spice_level" className="block text-sm font-medium text-gray-700 mb-1">
                  Spice Level (0-5)
                </label>
                <select
                  id="spice_level"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                  {...register('spice_level', { valueAsNumber: true })}
                >
                  <option value={0}>0 - No Spice</option>
                  <option value={1}>1 - Mild</option>
                  <option value={2}>2 - Medium</option>
                  <option value={3}>3 - Spicy</option>
                  <option value={4}>4 - Very Spicy</option>
                  <option value={5}>5 - Extremely Spicy</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="availability"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  {...register('availability')}
                />
                <label htmlFor="availability" className="ml-2 block text-sm text-gray-700">
                  Available for order
                </label>
              </div>
            </div>
          </div>

          {/* Categories and Tags */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Categories & Tags</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  id="category"
                  type="text"
                  placeholder="Pizza, Vegetarian (comma separated)"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                  {...register('category', { required: 'Category is required' })}
                />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                <p className="text-xs text-gray-500 mt-1">Separate multiple categories with commas</p>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  placeholder="Chef's Special, Spicy, Popular (comma separated)"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                  {...register('tags')}
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
              </div>
            </div>
          </div>



          {/* Menu Images */}
          <Card className="text-card-foreground bg-gray-100 border-0">
            <CardContent className="space-y-4">
              {/* Pass setImageFiles to update the state in parent */}
              <DropImageUpload multiple={true} onFileChange={setImageFiles} />
              {imageFiles.length > 0 && (
                <p className="text-sm text-gray-600">Selected images: {imageFiles.map(file => file.name).join(', ')}</p>
              )}
            </CardContent>
          </Card>

        </div>


        <Button
          className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
        >
          Add item
        </Button>
      </Card>

      {/* {menuList.length > 0 && (
        <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 mb-4 shadow-sm">
          <CardContent>
            <CardTitle className="text-lg mb-4">Preview Menu Items</CardTitle>
            <ul className="space-y-2">
              {menuList.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b pb-2 text-gray-700"
                >
                  <span>{item.name}</span>
                  <span>Rs. {item.price}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )} */}

      <Button
        type="submit"
        className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
      >
        Save all items
      </Button>


      <PreviewMenuItems />

      {/* {menuItems.map((item, index) => (
    <li key={index} className="flex justify-between items-center p-2">
        <span>{item.name}</span>
        <span className="mx-2 flex-1 border-b border-dotted border-gray-400"></span>
        <span>Rs. {item.price}</span>
    </li>
))} */}

    </form>
  );
};

export default AddMenu;