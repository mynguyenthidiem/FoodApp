import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackHeader from "../components/BackHeader";
import SearchBar from "../components/SearchBar";
import FilterChip from "../components/FilterChip";
import FeaturedCategoryCard from "../components/FeaturedCategoryCard";
import CollectionCard from "../components/CollectionCard";

import commonStyles from "../styles/common";
import homeStyles from "../styles/home";

import { getSystemCategories } from "../api/categoryApi";
import { getAllRestaurants } from "../api/restaurantApi";

export default function CategoryScreen({ navigation }) {

  const filters = ["All Categories", "Top Rated"];

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const categoryResponse = await getSystemCategories();
      const restaurantResponse = await getAllRestaurants();

      const categoryData = categoryResponse.data || [];
      const restaurantData = restaurantResponse.data.items || [];

      setCategories(categoryData);
      setAllCategories(categoryData);
      setRestaurants(restaurantData);

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const handleFilter = (filter) => {
    setSelectedFilter(filter);

    if (filter === "All Categories") {
      setCategories(allCategories);
      return;
    }

    if (filter === "Top Rated") {

      const topRatedRestaurants = restaurants.filter(
        restaurant => restaurant.rating >= 4.9
      );

      const topCategories = [];

      topRatedRestaurants.forEach(restaurant => {
        restaurant.categories?.forEach(category => {

          if (!topCategories.includes(category)) {
            topCategories.push(category);
          }

        });
      });


      const result = allCategories.filter(category =>
        topCategories.includes(category.name)
      );

      setCategories(result);

    }

  };


  const sections = [];

  for (let i = 0; i < categories.length; i += 3) {
    sections.push({
      featured: categories[i],
      smalls: categories.slice(i + 1, i + 3),
    });
  }


  return (
    <SafeAreaView style={commonStyles.screen} edges={["top", "bottom"]}>

      <BackHeader title="Categories" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={commonStyles.scrollContainer}>

        <SearchBar />

        <View style={homeStyles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {filters.map(filter => (

              <FilterChip
                key={filter}
                title={filter}
                selected={selectedFilter === filter}
                onPress={() => handleFilter(filter)}
              />

            ))}

          </ScrollView>
        </View>


        {loading ?
          <ActivityIndicator size="large" />
          :
          sections.map(section => (

            <View key={section.featured.id}>

              <FeaturedCategoryCard
                item={{
                  id: section.featured.id,
                  title: section.featured.name,
                  subtitle: section.featured.description || "Food Category",
                  image: section.featured.image,
                }}
                onPress={() => navigation.navigate("RestaurantList", {
                  category: section.featured,
                })}
              />


              {section.smalls.length > 0 && (
                <View style={homeStyles.collectionRow}>

                  {section.smalls.map(category => (

                    <CollectionCard
                      key={category.id}
                      item={{
                        id: category.id,
                        name: category.name,
                        subtitle: category.description || "Food Category",
                        image: category.image,
                      }}
                      onPress={() => navigation.navigate("RestaurantList", {
                        category: category,
                      })}
                    />

                  ))}

                </View>
              )}

            </View>

          ))

        }

      </ScrollView>

    </SafeAreaView>
  );

}