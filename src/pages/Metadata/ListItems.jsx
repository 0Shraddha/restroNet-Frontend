import { Edit2, Trash2 } from "lucide-react";
import AddCategory from "./AddCategory";
import AddCuisine from "./AddCuisine";
import AddTags from "./AddTags";



export default function ListItem({ type }) {
  return (
    <>
          {type === 'categories' && <AddCategory /> }
          {type === 'cuisines' && <AddCuisine /> }
          {type === 'tags' && <AddTags /> }


     <h2 className="text-xl font-semibold text-gray-800 my-5">List of items</h2>

    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        {/* <div className="flex items-center space-x-2">
          {type === 'tags' && (
            <span
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
          )}
          <h3 className="font-medium text-gray-800">{item.name}</h3>
        </div>
        {type === 'cuisines' && item.description && (
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        )}
        {type === 'categories' && (
          <p className="text-sm text-gray-600 mt-1">Order: {item.order}</p>
        )} */}
        

         {type === 'categories' && 
         <p>Category1344</p>
         }
         {type === 'cuisines' && <p>Cuisines</p> }
         {type === 'tags' && <p>Tags</p> }

      </div>
      
      <div className="flex space-x-2">
        <button
        //   onClick={() => onEdit(item)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
        
          <Edit2 size={16} />
        </button>
        <button
        //   onClick={() => onDelete(item.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    </>
  );
}