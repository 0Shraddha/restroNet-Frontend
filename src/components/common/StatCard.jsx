  const StatCard = ({ icon: Icon, title, value, subtitle, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color} ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`${color.replace('border-', 'bg-').replace('-500', '-100')} p-3 rounded-full`}>
          <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  export default StatCard;