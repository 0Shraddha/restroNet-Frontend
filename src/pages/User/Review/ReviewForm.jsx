import React from 'react'
import { Card, CardContent, CardHeader } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { useForm } from 'react-hook-form'
import { Textarea } from '../../../components/ui/textarea'

const AddReview = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        rsest,
    } = useForm();
    return(
        <form 
            method="POST" 
            className='max-w-6xl mx-auto flex flex-col gap-8 p-6 my-12 bg-white rounded-xl shadow-lg'
            encType="mutlipart/form-data">

            
            <Card>
                <CardHeader>Add Review</CardHeader>
                <CardContent>
                    <div>
                        <label htmlFor="title" className="block text-sm mb-2 font-medium text-gray-700">Title *</label>
                        <Input 
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            {...register('title', { required: 'Title is required' })}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm mb-2 font-medium text-gray-700">Description *</label>
                        <Textarea
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                            id="description"
                            placeholder="Tell something about the restaurant..."
                            {...register('description')}
                        />
                    </div>
                </CardContent>
            </Card>

            </form>
    )
}

export default AddReview;;