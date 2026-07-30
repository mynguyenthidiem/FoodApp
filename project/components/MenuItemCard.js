import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import restaurantStyles from "../styles/restaurant";

export default function MenuItemCard({
  item,
  onPress,
  onAddPress,
}) {
  return (
    <TouchableOpacity
      style={restaurantStyles.menuItemCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image
        source={item.image}
        style={restaurantStyles.menuItemImage}
        resizeMode="cover"
      />

      <View style={restaurantStyles.menuItemContent}>

        <View style={restaurantStyles.menuItemTitleRow}>
          <Text
            numberOfLines={1}
            style={restaurantStyles.menuItemName}
          >
            {item.name}
          </Text>

          <Text style={restaurantStyles.menuItemPrice}>
            ${item.price.toFixed(2)}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={restaurantStyles.menuItemDescription}
        >
          {item.description}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={restaurantStyles.addOrderButton}
          onPress={onAddPress}
        >
          <Text style={restaurantStyles.addOrderButtonText}>
            ＋ Add to Order
          </Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}