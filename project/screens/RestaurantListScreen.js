import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import commonStyles from "../styles/common";
import homeStyles from "../styles/home";

import BackHeader from "../components/BackHeader";
import FilterChip from "../components/FilterChip";
import RestaurantListCard from "../components/RestaurantListCard";

import restaurants from "../data/restaurants";

export default function RestaurantListScreen({
  navigation,
  route,
}) {
  const {
    type = "all",
    value = "",
    title = "Restaurants",
  } = route.params || {};

  const filters = [
    "All",
    "Top Rated",
    "Fast Delivery",
    "Price: Low",
  ];

  const [selectedFilter, setSelectedFilter] =
    useState(filters[0]);

  // Sau khi tích hợp backend chỉ cần thay bằng dữ liệu API
  const getRestaurants = () => {
    switch (type) {
      case "category":
        return restaurants.filter((restaurant) =>
          restaurant.categories.includes(value)
        );

      case "featured":
        return restaurants.filter((restaurant) =>
          restaurant.featured.includes(value)
        );

      case "cuisine":
        return restaurants.filter(
          (restaurant) =>
            restaurant.cuisine === value
        );

      case "all":
      default:
        return restaurants;
    }
  };

  let filteredRestaurants = getRestaurants();

  // Demo filter ở Front-end
  switch (selectedFilter) {
    case "Top Rated":
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.rating >= 4.7
      );
      break;

    case "Fast Delivery":
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => {
          const maxTime = parseInt(
            restaurant.deliveryTime.split("-")[1]
          );
          return maxTime <= 25;
        }
      );
      break;

    case "Price: Low":
      // Chưa có dữ liệu giá nhà hàng
      break;

    default:
      break;
  }

  return (
    <SafeAreaView
      style={commonStyles.screen}
      edges={["top", "bottom"]}
    >
      <BackHeader
        title={title}
        subtitle={`${filteredRestaurants.length} restaurants`}
        rightIcon="tune"
        onRightPress={() => {}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          commonStyles.scrollContainer
        }
      >
        <View style={homeStyles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                title={filter}
                selected={
                  selectedFilter === filter
                }
                onPress={() =>
                  setSelectedFilter(filter)
                }
              />
            ))}
          </ScrollView>
        </View>

        {filteredRestaurants.length === 0 ? (
          <View
            style={{
              paddingVertical: 40,
              alignItems: "center",
            }}
          >
            <Text>
              No restaurants found.
            </Text>
          </View>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantListCard
              key={restaurant.id}
              item={restaurant}
              onPress={() =>
               navigation.navigate(
                  "RestaurantDetail",
                  {
                    slug: restaurant.slug,
                  }
                )
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}