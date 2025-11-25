export default function TabsButton({ id, label, isActive, onClick}){
    return (
        <button 
        onClick={onClick}
        id={`tab-${id}`}
        className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
          isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'
        }`}
        >{label}</button>
    )
}