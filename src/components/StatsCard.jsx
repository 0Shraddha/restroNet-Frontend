import React from "react";
import RestaurantTopCard from "../pages/Restaurant/RestaurantTopCard";

const StatsCard = ({ cardsData, layout = "grid-cols-1 md:grid-cols-4 gap-6" }) => {
  return (
    <div className={`grid ${layout}`}>
      {cardsData.map((card, index) => (
        <RestaurantTopCard
          key={index}
          heading={card.heading}
          total={card.total}
          icon={card.icon}
          color={card.color}
          iconPosition={card.iconPosition}
          padding={card.padding}
          menu={card.menu}
        />
      ))}
    </div>
  );
};

export default StatsCard;
