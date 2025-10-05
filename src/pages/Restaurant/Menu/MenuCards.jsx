import React from "react";

const MenuCards = ({menu}) => {
    return (
    <>
    <div className="grid grid-cols-3 gap-4">
        {menu?.data?.map((item) => (
        <div key={item._id} className="border p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg">{item.item_name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-sm mt-2">Price: ${item.price}</p>
          <p className="text-sm">Spice Level: {item.spice_level}/5</p>
          <p className="text-sm">Prep Time: {item.preparation_time} mins</p>
          <p className="text-sm">
            {item.availability ? "✅ Available" : "❌ Not Available"}
          </p>
        </div>
      ))}
    </div>
    </>

    )
}

export default MenuCards;