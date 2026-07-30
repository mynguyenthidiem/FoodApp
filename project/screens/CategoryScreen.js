import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackHeader from "../components/BackHeader";
import SearchBar from "../components/SearchBar";
import FilterChip from "../components/FilterChip";
import FeaturedCategoryCard from "../components/FeaturedCategoryCard";
import CollectionCard from "../components/CollectionCard";

import commonStyles from "../styles/common";
import homeStyles from "../styles/home";

import featuredCategories from "../data/featuredCategories";
import collectionCategories from "../data/collectionCategories";

export default function CategoryScreen({ navigation }) {
  const filters = [
    "All Categories",
    "Near Me",
    "Top Rated",
  ];

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  return (
    <SafeAreaView
      style={commonStyles.screen}
      edges={["top", "bottom"]}
    >
      <BackHeader title="Categories" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.scrollContainer}
      >
        <SearchBar />

        <View style={homeStyles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                title={filter}
                selected={selectedFilter === filter}
                onPress={() => setSelectedFilter(filter)}
              />
            ))}
          </ScrollView>
        </View>

        {featuredCategories.map((featured, index) => {
          const first = collectionCategories[index * 2];
          const second = collectionCategories[index * 2 + 1];

          return (
            <View key={featured.id}>
              <FeaturedCategoryCard
                item={featured}
                onPress={() =>
                  navigation.navigate("RestaurantList", {
                    type: "featured",
                    value: featured.slug,
                    title: featured.title,
                  })
                }
              />

              <View style={homeStyles.collectionRow}>
                {first && (
                  <CollectionCard
                    item={first}
                    onPress={() =>
                      navigation.navigate("RestaurantList", {
                        type: "cuisine",
                        value: first.slug,
                        title: first.name,
                      })
                    }
                  />
                )}

                {second && (
                  <CollectionCard
                    item={second}
                    onPress={() =>
                      navigation.navigate("RestaurantList", {
                        type: "cuisine",
                        value: second.slug,
                        title: second.name,
                      })
                    }
                  />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}