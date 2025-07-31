import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useAddMenuMutation } from '../../../state/restaurants/menuApiSlice';
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardTitle,
} from '../../../components/ui/card';
import { Plus } from 'lucide-react';


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

    const handleAddItem = () => {
        const name = getValues('name');
        const price = getValues('price');

        if(!name || !price){
            toast.warning('Please fill in both item and price');
            return;
        }

        const newItem = {
            name,
            price,
        }

        setMenuList([...menuList, newItem])
        setValue('name','');
        setValue('price','');
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
        className="max-w-6xl mx-auto flex flex-col gap-8 p-6 my-12 bg-white rounded-xl shadow-lg"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Menu</h2>

      <Card className="border-gray-100 bg-card text-card-foreground rounded-xl border py-6 mb-4 shadow-sm">
        <CardContent className="space-y-4">
          <CardTitle className="text-lg">Add Menu Item</CardTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="menuItem" className="block text-sm mb-2 font-medium text-gray-700">
                Item Name
              </label>
              <Input
                id="menuItem"
                type="text"
                placeholder="Enter menu item"
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="menuPrice" className="block text-sm mb-2 font-medium text-gray-700">
                Price
              </label>
              <Input
                id="menuPrice"
                type="number"
                placeholder="Enter price"
                {...register('price', {
                  valueAsNumber: true,
                  min: { value: 1, message: 'Price must be at least 1' },
                })}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            <Plus size={20} /> Add Item
          </button>
        </CardContent>
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

      <button
        type="submit"
        className="self-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
      >
        Save Menu
      </button>


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