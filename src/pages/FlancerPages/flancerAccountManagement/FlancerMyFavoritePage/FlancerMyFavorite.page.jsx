import React from "react";
import FlancerFavoriteListCardComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerFavorite/FlancerFavoriteListCard/FlancerFavoriteListCard.component";
import FlancerFavoritePayComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerFavorite/FlancerFavoritePay/FlancerFavoritePay.component";

const FlancerMyFavoritePage = () => {
  return (
    <div>
      <FlancerFavoritePayComponent />
      <FlancerFavoriteListCardComponent />
    </div>
  );
};

export default FlancerMyFavoritePage;
