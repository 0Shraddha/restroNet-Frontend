
const RestaurantTopCard = ({heading, total, icon, color}) => {
    return(
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-600">{heading}</p>
                    <p className="text-2xl font-bold text-orange-600">{total}</p>
                    </div>
                    <div className={`bg-${color}-100 p-3 rounded-full`}>
                        {icon}
                    </div>
                </div>
            </div>
       
    )
}

export default RestaurantTopCard;