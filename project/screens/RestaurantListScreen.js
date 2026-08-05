import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import commonStyles from "../styles/common";
import homeStyles from "../styles/home";

import BackHeader from "../components/BackHeader";
import FilterChip from "../components/FilterChip";
import RestaurantListCard from "../components/RestaurantListCard";

import { getAllRestaurants } from "../api/restaurantApi";

export default function RestaurantListScreen({ navigation, route }) {
  const { categoryName, filter } = route.params ?? {};
  const filters = ["All", "Top Rated"];

  const [selectedFilter, setSelectedFilter] = useState(filter || "All");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const response = await getAllRestaurants();
      setRestaurants(response.data.items || []);
    } catch (error) {
      console.log("Load restaurants failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  let filteredRestaurants = [...restaurants];

  if (categoryName) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.categories?.some(category =>
        category.toLowerCase() === categoryName.toLowerCase()
      )
    );
  }

  if (selectedFilter === "Top Rated") {
    filteredRestaurants = filteredRestaurants.filter(
      restaurant => restaurant.rating >= 4.9
    );
  }

  return (
    <SafeAreaView style={commonStyles.screen} edges={["top", "bottom"]}>
      <BackHeader title={categoryName || "Restaurants"} subtitle={`${filteredRestaurants.length} restaurants`} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={commonStyles.scrollContainer}>
        <View style={homeStyles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map(filter => (
              <FilterChip
                key={filter}
                title={filter}
                selected={selectedFilter === filter}
                onPress={() => setSelectedFilter(filter)}
              />
            ))}
          </ScrollView>
        </View>

        {loading ?
          <ActivityIndicator size="large" />
          :
          filteredRestaurants.length === 0 ?
            <View style={{ paddingVertical: 40, alignItems: "center" }}>
              <Text>No restaurants found.</Text>
            </View>
            :
            filteredRestaurants.map(restaurant => (
              <RestaurantListCard
                key={restaurant.id}
                item={restaurant}
                onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: restaurant.id })}
              />
            ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}