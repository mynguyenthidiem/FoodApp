import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import homeStyles from "../styles/home";
import commonStyles from "../styles/common";
import foodDetailStyles from "../styles/food";

import RestaurantActionBar from "../components/RestaurantActionBar";
import RestaurantBadge from "../components/RestaurantBadge";
import RatingBadge from "../components/RatingBadge";
import RestaurantSectionTitle from "../components/RestaurantSectionTitle";
import CustomButton from "../components/CustomButton";

import { COLORS } from "../styles/theme";
import { resolveImage } from "../utils/imageUrl";
import {
  fetchFoodById,
  fetchFoodsByCategory,
} from "../redux/foodSlice";

export default function FoodDetailScreen({
  navigation,
  route,
}) {  
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {
    food,
    relatedFoods,
    status,
    } = useSelector((state) => state.food);

  const { foodId } = route.params || {};

  const [favorite, setFavorite] = useState(false);

  const [quantity, setQuantity] = useState(1);

  if (status === "loading") {
  return (
    <SafeAreaView style={commonStyles.screen}>
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

  if (!food) {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <Text>Food not found.</Text>
      </SafeAreaView>
    );
  }

  const totalPrice = useMemo(() => {
    return Number(food.price || 0) * quantity;
  }, [food.price, quantity]);

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleShare = () => {
    // Expo Snack:
    // sau này dùng Share API
  };

  const handleAddToCart = () => {
    /**
     * Backend sau này:
     *
     * {
     *    foodId: food.id,
     *    quantity
     * }
     *
     * dispatch(addCart())
     *
     */
  };

  useEffect(() => {
  if (foodId) {
    dispatch(fetchFoodById(foodId));
  }
}, [
  dispatch,
  foodId,
]);
  
  useEffect(() => {
  if (food?.categoryId) {
    dispatch(
      fetchFoodsByCategory({
        categoryId: food.categoryId,
      })
    );
  }
}, [
  dispatch,
  food,
]);

  return (
    <SafeAreaView style={commonStyles.screen} edges={['bottom']} >
      <RestaurantActionBar
        top={insets.top}
        favorite={favorite}
        onBackPress={() => navigation.goBack()}
        onFavoritePress={handleFavorite}
        onSharePress={handleShare}
      />

      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40,}}>
        <Image
          source={resolveImage(food.image)}
          style={foodDetailStyles.heroImage}
          resizeMode="cover"
        />
        <View style={foodDetailStyles.content}>
          <RestaurantBadge
            text={food.status || "Available"}
          />
          <Text style={foodDetailStyles.name}> {food.name} </Text>
          <View  style={foodDetailStyles.infoRow}>
            <RatingBadge rating={0} />
            <View  style={foodDetailStyles.dot } />
              <Text  style={ foodDetailStyles.infoText }>  1.2k sold   </Text>
          </View>
          <View style={ foodDetailStyles.restaurantRow } >
            <MaterialCommunityIcons
              name="storefront-outline"
              size={18}
              color={COLORS.primary}
            />

            <Text  style={ foodDetailStyles.restaurantName } >
              {food.restaurantName || "FoodHub Restaurant"}
            </Text>
          </View>
          {!!food.categoryName && (
            <View  style={ foodDetailStyles.categoryRow} >
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={18}
                color={COLORS.primary}
              />
              <Text style={ foodDetailStyles.categoryText } >  {food.categoryName} </Text>
            </View>
          )}
          <View  style={foodDetailStyles.priceRow} >
            <Text  style={foodDetailStyles.price} >
              $ {Number(food.price || 0).toFixed(2)}
            </Text>
            <Text style={  foodDetailStyles.oldPrice} >
              ${( Number(food.price || 0) + 3).toFixed(2)}
            </Text>
          </View>
          <RestaurantSectionTitle title="Description" />
          <Text style={ foodDetailStyles.description } >
            {food.description ||
              "Fresh ingredients prepared daily by our chef. Every order is cooked when you place it to ensure the best taste and quality."}
          </Text>
          <View style={foodDetailStyles.infoCard}>
            <View style={foodDetailStyles.infoItem } >
              <MaterialCommunityIcons
                name="clock-outline"
                size={22}
                color={COLORS.primary}
              />
              <Text  style={ foodDetailStyles.infoLabel} >  Delivery </Text>
              <Text  style={ foodDetailStyles.infoValue} >  20-30 min </Text>
            </View>

            <View style={foodDetailStyles.infoDivider} />

            <View style={foodDetailStyles.infoItem } >
              <MaterialCommunityIcons
                name="fire"
                size={22}
                color={COLORS.warning}
              />
              <Text style={foodDetailStyles.infoLabel} > Calories </Text>
              <Text  style={ foodDetailStyles.infoValue} >  520 kcal </Text>
            </View>

            <View style={foodDetailStyles.infoDivider } />
            <View style={foodDetailStyles.infoItem } >
              <MaterialCommunityIcons
                name="food"
                size={22}
                color={COLORS.success}
              />
              <Text style={foodDetailStyles.infoLabel} > Fresh </Text>
              <Text style={foodDetailStyles.infoLabel} > Daily </Text>
            </View>
          </View>
          <RestaurantSectionTitle title="Quantity" />
          <View style={foodDetailStyles.quantityCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleDecrease}
              style={ foodDetailStyles.qtyButton}
            >
              <MaterialCommunityIcons
                name="minus"
                size={22}
                color={COLORS.primaryDark}
              />
            </TouchableOpacity>
            <Text  style={ foodDetailStyles.qtyNumber} > {quantity} </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleIncrease}
              style={foodDetailStyles.qtyButton}
            >
              <MaterialCommunityIcons
                name="plus"
                size={22}
                color={COLORS.primaryDark}
              />
            </TouchableOpacity>
          </View>
          <View style={foodDetailStyles.summaryCard} >
            <View style={foodDetailStyles.summaryRow}>
              <Text  style={ foodDetailStyles.summaryLabel} >  Item Price </Text>
              <Text  style={ foodDetailStyles.summaryValue} > ${Number(food.price || 0).toFixed(2)} </Text>
            </View>
            <View style={foodDetailStyles.summaryRow } >
              <Text  style={ foodDetailStyles.summaryLabel} >  Quantity </Text>
              <Text  style={ foodDetailStyles.summaryValue} >  {quantity}</Text>
            </View>
            <View style={foodDetailStyles.totalRow } >
              <Text  style={ foodDetailStyles.totalLabel} >  Total </Text>
              <Text  style={ foodDetailStyles.totalValue} >  ${totalPrice.toFixed(2)} </Text>
            </View>
          </View>
          <CustomButton
            title={`Add to Cart • $${totalPrice.toFixed(2 )}`}
            onPress={handleAddToCart}
          />
          <RestaurantSectionTitle  title="You may also like" />
          <FlatList
            horizontal
            data={ relatedFoods}
            keyExtractor={(item) =>item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.85}
                style={homeStyles.foodCard}
                onPress={() =>
                    navigation.push(
                        "FoodDetail",
                        {
                            foodId: item.id,
                        }
                    )
                }
              >
                <View style={ homeStyles.foodImageContainer }>
                  <Image
                    source={resolveImage(
                        item.image
                    )}
                    style={ homeStyles.foodImage }
                  />

                  <TouchableOpacity style={ homeStyles.favoriteButton }>
                    <MaterialCommunityIcons
                      name="heart-outline"
                      size={18}
                      color={
                          COLORS.primary
                      }
                    />
                  </TouchableOpacity>
                </View>

                <Text numberOfLines={1}
                    style={ homeStyles.foodName } >
                    {item.name}
                </Text>

                <View style={ homeStyles.foodBottom}>
                  <Text style={ homeStyles.foodPrice}>
                      $ {Number(item.price).toFixed(2)}
                  </Text>
                  <TouchableOpacity style={ homeStyles.addButton }>
                    <MaterialCommunityIcons
                      name="plus"
                      size={18}
                      color={
                          COLORS.primaryDark
                      }
                    />
                  </TouchableOpacity>
                </View>
            </TouchableOpacity>
            )}
          />
          <View style={{ height: 40, }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}