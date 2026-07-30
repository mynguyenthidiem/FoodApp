import React from "react";
import { View } from "react-native";

import RestaurantSectionTitle from "./RestaurantSectionTitle";
import RestaurantInfoRow from "./RestaurantInfoRow";

import restaurantStyles from "../styles/restaurant";

export default function RestaurantInfoSection({
  restaurant, 
}) {

  const { info } = restaurant;

  return (
    <View style={restaurantStyles.infoSection}>

      <RestaurantSectionTitle
        title="Restaurant Information"
      />

      <View style={restaurantStyles.infoSectionCard}>

        <RestaurantInfoRow
          icon="map-marker-outline"
          title="Address"
          value={info.address}
        />

        <RestaurantInfoRow
          icon="phone-outline"
          title="Phone"
          value={info.phone}
        />

        <RestaurantInfoRow
          icon="email"
          title="Email"
          value={info.email}
        />

        <RestaurantInfoRow
          icon="web"
          title="Website"
          value={info.website}
        />

        <RestaurantInfoRow
          icon="clock-outline"
          title="Opening Hours"
          value={info.openingHours}
        />

        <RestaurantInfoRow
          icon="credit-card-outline"
          title="Payment"
          value={info.paymentMethods.join(", ")}
        />

        <RestaurantInfoRow
          icon="room-service-outline"
          title="Services"
          value={info.services.join(", ")}
        />

        <RestaurantInfoRow
          icon="car-outline"
          title="Parking"
          value={info.parking ? "Available" : "Unavailable"}
        />

        <RestaurantInfoRow
          icon="wifi"
          title="WiFi"
          value={info.wifi ? "Available" : "Unavailable"}
        />

      </View>

    </View>
  );
}