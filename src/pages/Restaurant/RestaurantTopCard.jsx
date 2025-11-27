const RestaurantTopCard = ({heading, total, icon, color, iconPosition="right", padding="p-6", menu=false}) => {
    return(
        <div className={`bg-white rounded-xl shadow-sm ${padding === 'p-6' ? 'p-6' : 'px-6 py-2'} hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-100`}>
            <div className={`flex items-center justify-between ${iconPosition === 'left' ? "flex-row-reverse" : ""}`}>
                <div className="flex-1">
                    <p className={`${menu ? "font-bold text-orange-600 text-xl mb-1" : "font-medium text-gray-500 text-sm mb-2"}`}>
                        {heading}
                    </p>
                    <p className={`${menu ? "font-medium text-gray-600 text-sm" : "font-bold text-gray-900 text-3xl"}`}>
                        {total}
                    </p>
                </div>
                <div 
                    className={`${
                        color === 'orange' ? 'bg-orange-100' :
                        color === 'blue' ? 'bg-blue-100' :
                        color === 'green' ? 'bg-green-100' :
                        color === 'purple' ? 'bg-purple-100' :
                        color === 'red' ? 'bg-red-100' :
                        'bg-gray-100'
                    } p-4 rounded-lg flex items-center justify-center`}
                >
                    <img 
                        src={icon} 
                        alt="icon" 
                        className="w-6 h-6 object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default RestaurantTopCard;