import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import restaurantStyles from "../styles/restaurant";

import RatingBadge from "./RatingBadge";
import RestaurantActionBar from "./RestaurantActionBar";
import { resolveImage } from "../utils/imageUrl";
export default function RestaurantHeroCard({
  restaurant,
  onBackPress,
}) {
  return (
    <View style={restaurantStyles.heroCard}>
      <Image
        source={resolveImage(restaurant.imageUrl)}
        style={restaurantStyles.heroImage}
      />
      <RestaurantActionBar
        favorite={restaurant.favorite}
        onBackPress={onBackPress}
        onSharePress={() => { }}
        onFavoritePress={() => { }}
      />

      <View style={restaurantStyles.heroContent}>

        <View style={restaurantStyles.titleRow}>
          <Text
            style={restaurantStyles.heroTitle}
            numberOfLines={1}
          >
            {restaurant.name}
          </Text>

          <RatingBadge rating={restaurant.rating} />
        </View>

        <Text style={restaurantStyles.heroCuisine}>
          {restaurant.cuisine}
        </Text>

        <View style={restaurantStyles.heroInfoRow}>

          <View style={restaurantStyles.heroInfo}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={16}
            />
            <Text style={restaurantStyles.heroInfoText}>
              {restaurant.delivery?.time}
            </Text>
          </View>

          <View style={restaurantStyles.heroInfo}>
            <MaterialCommunityIcons
              name="bike-fast"
              size={16}
            />
            <Text style={restaurantStyles.heroInfoText}>
              {restaurant.delivery?.fee}
            </Text>
          </View>

          <View style={restaurantStyles.heroInfo}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={16}
            />
            <Text style={restaurantStyles.heroInfoText}>
              {restaurant.delivery?.distance}
            </Text>
          </View>

        </View>

      </View>

    </View>
  );
}
