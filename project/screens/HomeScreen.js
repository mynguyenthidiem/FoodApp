import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import HomeHeader from '../components/HomeHeader';
import BannerCard from '../components/BannerCard';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import CategoryCard from '../components/CategoryCard';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';

import commonStyles from '../styles/common';
import homeStyles from '../styles/home';
import { COLORS } from '../styles/theme';

import { banner } from '../data/homeData';
import { resolveImage } from '../utils/imageUrl';

import { getFoods } from '../services/foodService';
import { getSystemCategories } from '../services/categoryService';
import { getAllRestaurants } from '../services/restaurantService';
import { fetchCurrentUser } from '../store/userSlice';

import { toggleFavorite } from '../store/favoriteSlice';

const CATEGORY_ICON_MAP = {
  mains: 'silverware-fork-knife',
  burger: 'hamburger',
  sides: 'food',
  drinks: 'cup',
  desserts: 'ice-cream',
  appetizers: 'food',
  bakery: 'bread-slice',
  cakes: 'cake-variant',
  coffee: 'coffee',
  salads: 'leaf',
  smoothies: 'fruit-cherries',
};

function getCategoryIcon(name = '') {
  const key = name.trim().toLowerCase();

  return CATEGORY_ICON_MAP[key] || 'silverware-fork-knife';
}

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [restaurantLoading, setRestaurantLoading] = useState(false);
  const [foodLoading, setFoodLoading] = useState(false);
  const favoriteIds = useSelector(state => state.favorite.items);

  // FAVORITE

  const handleFavorite = item => {
    dispatch(toggleFavorite(item.id));
  };

  // LOAD FOODS

  const loadFoods = async () => {
    try {
      setFoodLoading(true);

      const response = await getFoods();

      setFoods(response.items ?? []);
    } catch (error) {
      console.log('Load foods failed:', error);
    } finally {
      setFoodLoading(false);
    }
  };

  // LOAD CATEGORIES

  const loadCategories = async () => {
    try {
      setCategoryLoading(true);

      const response = await getSystemCategories();

      setCategories(response ?? []);
    } catch (error) {
      console.log('Load categories failed:', error);
    } finally {
      setCategoryLoading(false);
    }
  };

  // LOAD RESTAURANTS

  const loadRestaurants = async () => {
    try {
      setRestaurantLoading(true);

      const response = await getAllRestaurants();

      setRestaurants(response.items ?? response ?? []);
    } catch (error) {
      console.log('Load restaurants failed:', error);
    } finally {
      setRestaurantLoading(false);
    }
  };

  // LOAD DATA

  useEffect(() => {
    loadCategories();
    loadRestaurants();
    loadFoods();
  }, []);

  const authUser = useSelector(state => state.auth.user);
  const { currentUser, status, error } = useSelector(state => state.user);
  console.log('CURRENT USER:', JSON.stringify(currentUser), 'STATUS:', status, 'ERROR:', error);
  useFocusEffect(
    useCallback(() => {
      if (authUser?.id) {
        dispatch(fetchCurrentUser(authUser.id));
      }
    }, [dispatch, authUser?.id]),
  );

  return (
    <SafeAreaView style={commonStyles.screen} edges={['top', 'left', 'right']}>
      <HomeHeader
        appName="EatLocal"
        location="Binh Duong"
        avatar={resolveImage(currentUser?.avatar)}
        onNotificationPress={() => navigation.navigate("Notifications")}
        onProfilePress={() => navigation.navigate("Profile")}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={commonStyles.container}>

        <SearchBar
          editable={false}
          onPress={() => navigation.navigate('Search')}
        />

        <BannerCard {...banner} />

        <SectionHeader
          title="Categories"
          buttonText="See All"
          onPress={() => navigation.navigate('Category')}
        />

        <View style={homeStyles.categoryList}>
          {categoryLoading && <ActivityIndicator color={COLORS.primary} />}

          {!categoryLoading && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(item => (
                <CategoryCard
                  key={item.id}
                  item={{
                    ...item,
                    icon: getCategoryIcon(item.name),
                  }}
                  onPress={() =>
                    navigation.navigate('RestaurantList', {
                      categoryId: item.id,
                      categoryName: item.name,
                    })
                  }
                />
              ))}
            </ScrollView>
          )}
        </View>

        <SectionHeader
          title="Popular Restaurants"
          buttonText="See All"
          onPress={() =>
            navigation.navigate('RestaurantList', {
              type: 'all',
              title: 'Popular Restaurants',
            })
          }
        />

        {restaurantLoading && <ActivityIndicator color={COLORS.primary} />}

        {!restaurantLoading &&
          restaurants.map(item => (
            <RestaurantCard
              key={item.id}
              image={resolveImage(item.imageUrl)}
              name={item.name}
              address={item.address}
              rating={item.rating}
              totalReviews={item.totalReviews}
              deliveryFee={item.deliveryFee}
              isActive={item.isActive}
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  restaurantId: item.id,
                })
              }
            />
          ))}

        <SectionHeader title="Recommended for you" buttonText="See All" />

        {foodLoading && <ActivityIndicator color={COLORS.primary} />}

        {!foodLoading && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {foods.map(item => (
              <FoodCard
                key={item.id}
                item={{
                  ...item,
                  favorite: favoriteIds.includes(item.id),
                }}
                onFavoritePress={handleFavorite}
                onPress={() =>
                  navigation.navigate('FoodDetail', {
                    foodId: item.id,
                  })
                }
              />
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
