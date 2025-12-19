import { useState } from "react";
import TabsButton from "../../components/TabsButton";
import ListItem from "./ListItems";
import TopHeader from "../../layout/Topheader";

// import DataTable from "../../components/common/Datatable";
const AllCategories = () => {
	const tabs = [
		{ id: 'categories', label: 'Categories' },
    { id: 'cuisines', label: 'Cuisines' },
		{ id: 'tags', label: 'Tags' },
	];

  const [activeTab, setActiveTab] = useState('categories');
  const [cuisines, setCuisines] = useState([
    { id: 1, name: 'Italian', description: 'Italian cuisine' },
    { id: 2, name: 'Chinese', description: 'Chinese cuisine' }
  ]);
  const [tags, setTags] = useState([
    { id: 1, name: 'Vegetarian', color: '#10b981' },
    { id: 2, name: 'Spicy', color: '#ef4444' }
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Appetizers', order: 1 },
    { id: 2, name: 'Main Course', order: 2 }
  ]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

  }

  const getCurrentData = () => {
    switch(activeTab) {
      case 'cuisines': return cuisines;
      case 'tags': return tags;
      case 'categories': return categories;
      default: return [];
    }
  };
    return(
      <>
          <TopHeader title='Restaurant Metadata Manager' />
           
                <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow">
          {tabs.map(tab => (
            <TabsButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            />
          ))}
        </div>

        

         {/* List Section */}
          <ListItem
            type={activeTab}
          />
		</div>
		
		</div>
        </>
    )
}

export default AllCategories;