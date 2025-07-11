import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../../api/fetchUsers"; // Assuming this path is correct

export default function UserList() {
    // FIX 1: Correctly destructure the object returned by useQuery
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    // FIX 2: Handle loading, error, and no data states
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <p className="text-gray-600">Loading users...</p>
                
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-48">
                <p className="text-red-600">Error: {error?.message || 'Failed to fetch users'}</p>
            </div>
        );
    }

    // FIX 3: Check if data is available and render a proper list
    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center h-48">
                <p className="text-gray-600">No users found.</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white shadow rounded-lg overflow-x-auto"> {/* Added overflow-x-auto for responsiveness */}
            <h2 className="text-xl font-semibold mb-4">User List</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map(user => (
                        <tr key={user._id}> {/* Assuming user._id is the unique key */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.name} {/* Changed from user.username to user.name as per your code */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Role
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
