import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import restaurantStyles from "../styles/restaurant";
import { COLORS } from "../styles/theme";

import RestaurantBadge from "./RestaurantBadge";
import RatingBadge from "./RatingBadge";
import RestaurantTag from "./RestaurantTag";
import FavoriteButton from "./FavoriteButton";

export default function RestaurantListCard({
  item,
  onPress,
  onFavoritePress,
}) {
  return (
    <TouchableOpacity
      style={restaurantStyles.restaurantCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* Image */}

      <View style={restaurantStyles.imageContainer}>
        <Image
          source={item.image}
          style={restaurantStyles.restaurantImage}
        />

        <View style={restaurantStyles.badgeContainer}>
          <RestaurantBadge title={item.badge} />
        </View>

        <FavoriteButton
          favorite={item.favorite}
          onPress={onFavoritePress}
        />
      </View>

      {/* Content */}

      <View style={restaurantStyles.content}>

        <View style={restaurantStyles.titleRow}>
          <Text
            numberOfLines={1}
            style={restaurantStyles.restaurantName}
          >
            {item.name}
          </Text>

          <RatingBadge rating={item.rating} />
        </View>

        <View style={restaurantStyles.infoRow}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={15}
            color={COLORS.brown}
          />

          <Text style={restaurantStyles.infoText}>
            {item.deliveryTime}
          </Text>

          <MaterialCommunityIcons
            name="map-marker-outline"
            size={15}
            color={COLORS.brown}
          />

          <Text style={restaurantStyles.infoText}>
            {item.distance}
          </Text>
        </View>

        <View style={restaurantStyles.tagRow}>
          {item.tags.map((tag) => (
            <RestaurantTag
              key={tag}
              title={tag}
            />
          ))}
        </View>

      </View>
    </TouchableOpacity>
  );
}
