import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../../../api/restaurants";
import { LocateIcon, Phone } from "lucide-react";
import { Input } from '../../../components/ui/input';
import { useState, useEffect, useMemo } from "react";

export default function FindRestaurants() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data, isLoading, isError, error } = useQuery({
    queryKey: ['restaurants', debouncedSearchTerm], // key includes search term
    queryFn: ({ queryKey, signal }) => {
        const [_key, term] = queryKey;
        return getRestaurants({ signal, searchTerm: term });
    },
    enabled: true
});


    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter client-side
    const filteredData = useMemo(() => {
        if (!data) return <p>No data of that searchoig</p>;

        if (!debouncedSearchTerm.trim()) {
            return data.slice(0, 15);
        }

        const search = debouncedSearchTerm.toLowerCase();

        return data.filter((r) =>
            (r.name && r.name.toLowerCase().includes(search)) ||
            (r.cuisine && r.cuisine.toLowerCase().includes(search)) ||
            (Array.isArray(r.categories) && r.categories.some(cat => cat && cat.toLowerCase().includes(search)))
        );
    }, [data, debouncedSearchTerm]);
    
    return (
        <>
            <Input
                value={searchTerm}
                onChange={handleChange}
                name="Search"
                placeholder="Search restaurants by Name, Cuisine, Location..."
                className="m-5 w-[50vw]"
            />

            {isLoading && (
                <div className="flex justify-center items-center h-48">
                    <p className="text-gray-600">Loading restaurants...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 ml-2"></div>
                </div>
            )}

            {isError && (
                <div className="flex justify-center items-center h-48">
                    <p className="text-red-600">Error: {error?.message || 'Failed to fetch restaurants list'}</p>
                </div>
            )}

           {!isLoading && !isError && filteredData.length === 0 && (
    <div className="flex justify-center items-center h-48">
        {debouncedSearchTerm.trim() ? (
            <p className="text-orange-600 font-medium text-sm">
                No restaurants match "<span className="font-semibold">{debouncedSearchTerm}</span>"
            </p>
        ) : (
            <p className="text-gray-600">No restaurants available.</p>
        )}
    </div>
)}

            {!isLoading && !isError && data?.length > 0 && (
                <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
                    {filteredData.slice(0, 10).map((restaurant) => (
                        <div key={restaurant._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt={restaurant.name}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                                <div className="meta-data p-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-800">{restaurant.name}</h2>
                                        <span className="text-yellow-500 text-sm font-bold">
                                            {"★".repeat(restaurant.stars)}
                                            <span className="text-gray-400">
                                                {"☆".repeat(5 - restaurant.stars)}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {restaurant.categories.map((cat, i) => (
                                            <span key={i} className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 text-sm text-gray-600">
                                        <p className="flex items-center gap-2"><Phone size={14} /> {restaurant.contact.phone}</p>
                                        <p className="flex items-center gap-2"><LocateIcon size={14} /> {restaurant.contact.location[1].toFixed(3)}, {restaurant.contact.location[0].toFixed(3)}</p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">{restaurant.cuisine}</span>
                                            <button className="bg-orange-400 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors">
                                                View Menu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
