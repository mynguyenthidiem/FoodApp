import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import homeStyles from "../styles/home";
import { COLORS } from "../styles/theme";

export default function RestaurantCard({
  image,
  name,
  address,
  rating,
  totalReviews,
  deliveryFee,
  isActive,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={homeStyles.restaurantCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={image}
        style={homeStyles.restaurantImage}
        resizeMode="cover"
      />

      <View style={homeStyles.restaurantContent}>
        <Text style={homeStyles.restaurantName} numberOfLines={1}>
          {name}
        </Text>

        <Text style={homeStyles.restaurantAddress} numberOfLines={1}>
          {address}
          {isActive === false ? " • Đóng cửa" : ""}
        </Text>

        <View style={homeStyles.restaurantInfo}>
          <MaterialCommunityIcons name="star" size={14} color={COLORS.primary} />
          <Text style={homeStyles.infoText}>
            {Number(rating ?? 0).toFixed(1)} ({totalReviews ?? 0})
          </Text>

          <MaterialCommunityIcons
            name="moped-outline"
            size={14}
            color={COLORS.neutral}
          />
          <Text style={homeStyles.infoText}>
            {deliveryFee != null ? `$${Number(deliveryFee).toFixed(2)}` : "—"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
