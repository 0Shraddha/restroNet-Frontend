import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useAddMenuMutation } from '../../../state/restaurants/menuApiSlice';
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
import { Plus } from 'lucide-react';
import PreviewMenuItems from './PreviewMenuItems';


const AddMenu = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        getValues,
    } = useForm();

    const [menuList, setMenuList] = useState([]);
    const [imageFiles, setImageFiles] = useState([]); // State to hold multiple menu images


    const handleAddItem = () => {
        const name = getValues('name');
        const price = getValues('price');
        const tags = getValues('tags');

        if(!name || !price || !tags){
            toast.warning('Please fill in both item and price');
            return;
        }

        const newItem = {
            name,
            price,
            tags
        }

        setMenuList([...menuList, newItem])
        setValue('name','');
        setValue('price','');
        setValue('tags','');

    }

    const [addMenu, {isLoading, isSuccess, isError, error}] = useAddMenuMutation();

     if(isSuccess){
        toast.success("Menu added successfully!");
      }
    
      if(isError){
        toast.error("Failed to add menu details : " , error);
      }
      
      const saveToLocalStorage= (data) => {
        try{
            const existingMenus = JSON.parse(localStorage.getItem('menus')) || [];
            const updatedMenus = [...existingMenus, data];
            localStorage.setItem('menus', JSON.stringify(updatedMenus))
            toast.success('Menu added successfully!');
        }catch (err) {
            toast.error('Failed to save menu');
            console.error('LocalStorage error:', err);
        }
      }

    const onSubmit = async (data) => {
        if (menuList.length === 0) {
            toast.warning('No items to save');
            return;
        }

            saveToLocalStorage(menuList);
            setMenuList([]);
            reset();
    };

    const getExistingMenu = JSON.parse(localStorage.getItem('menus')) || [];
    const menuItems = getExistingMenu[0] || [];

      return(
      <form
        className="mx-auto p-6 space-y-10"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Menu</h2>

      <Card className="border-gray-100 bg-white text-card-foreground p-6 mb-4 ">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Menu items- name and price */}
             <div className="border-gray-100 text-card-foreground">
                  <label htmlFor="category" className="block text-sm mb-2 font-medium text-gray-700">
                    Category
                  </label>
                  <Input
                    id="category"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                    type="text"
                    placeholder="Enter category"
                    {...register('category')}
                  />
                  {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                  <label htmlFor="menuItem" className="block text-sm my-2 font-medium text-gray-700">
                    Item Name
                  </label>
                  <Input
                    id="menuItem"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                    type="text"
                    placeholder="Enter menu item"
                    {...register('name')}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <label htmlFor="menuPrice" className="block text-sm my-2 font-medium text-gray-700">
                Price
              </label>
              <Input
                id="menuPrice"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                type="number"
                placeholder="Enter price"
                {...register('price', {
                  valueAsNumber: true,
                  min: { value: 1, message: 'Price must be at least 1' },
                })}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

                <label htmlFor="tags" className="block text-sm my-2 font-medium text-gray-700">Tags *</label>
                <Input
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                  id="tags"
                  type="text"
                  placeholder="Chefs special, Spicy, Vegan ..."
                  {...register('tags', { required: 'Atleast one tag is required' })}
                />

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
          onClick={handleAddItem}>
          Add item
        </Button>
      </Card>

      {menuList.length > 0 && (
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
      )}

        <Button
          type="submit"
          className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
          >
          Save all items
        </Button>


<PreviewMenuItems />

{menuItems.map((item, index) => (
    <li key={index} className="flex justify-between items-center p-2">
        <span>{item.name}</span>
        <span className="mx-2 flex-1 border-b border-dotted border-gray-400"></span>
        <span>Rs. {item.price}</span>
    </li>
))}

    </form>
  );
};

export default AddMenu;