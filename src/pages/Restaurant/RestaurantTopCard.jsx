
const RestaurantTopCard = ({heading, total, icon, color, iconPosition="right", padding="p-6", menu=false}) => {
    return(
            <div className={`bg-white rounded-xl shadow-sm ${padding === 'p-6' ? 'p-6' : 'px-6 py-2'} hover:shadow-sm hover:-translate-y-1 transition-all duration-200`}>
                <div className={`flex items-center justify-between ${iconPosition === 'left' ? "flex-row-reverse" : ""} `}>
                    <div>
                        <p className={`${ menu ? "font-bold text-orange-600 text-xl" : "font-medium text-gray-600 text-sm " } `}>{heading}</p>
                        <p className={` ${ menu ? "font-medium text-gray-600 text-sm " : "font-bold text-orange-600 text-2xl" } `}>{total}</p>
                    </div>
                    <div className={`bg-${color}-100 p-3 rounded-full`}>
                        {icon}
                    </div>
                </div>
            </div>
       
    )
}

export default RestaurantTopCard;