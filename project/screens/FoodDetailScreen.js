// import React, { useState } from "react";
// import { View, Text, Image, ScrollView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import BackHeader from "../components/BackHeader";
// import CustomButton from "../components/CustomButton";
// import commonStyles from "../styles/common";
// import foodDetailStyles from "../styles/food";
// import { resolveImage } from "../utils/imageUrl";

// export default function FoodDetailScreen({ route, navigation }) {
//   const { food } = route.params || {};
//   const [quantity, setQuantity] = useState(1);

//   if (!food) {
//     return (
//       <SafeAreaView style={commonStyles.screen}>
//         <Text>Không tìm thấy món ăn.</Text>
//       </SafeAreaView>
//     );
//   }

//   const handleAddToCart = () => {
//     // TODO: nối vào cartSlice thật khi làm luồng Cart (chưa thuộc phạm vi lần này)
//     navigation.goBack();
//   };

//   return (
//     <SafeAreaView style={commonStyles.screen} edges={["top"]}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <BackHeader title={food.name} />

//         <Image
//           source={resolveImage(food.image)}
//           style={foodDetailStyles.heroImage}
//           resizeMode="cover"
//         />

//         <View style={foodDetailStyles.content}>
//           {!!food.categoryName && (
//             <Text style={foodDetailStyles.categoryTag}>{food.categoryName}</Text>
//           )}
//           <Text style={foodDetailStyles.name}>{food.name}</Text>
//           <Text style={foodDetailStyles.price}>
//             ${Number(food.price ?? 0).toFixed(2)}
//           </Text>
//           {!!food.description && (
//             <Text style={foodDetailStyles.description}>{food.description}</Text>
//           )}

//           <View style={foodDetailStyles.quantityRow}>
//             <TouchableQty
//               onPress={() => setQuantity((q) => Math.max(1, q - 1))}
//               label="－"
//             />
//             <Text style={foodDetailStyles.qtyText}>{quantity}</Text>
//             <TouchableQty onPress={() => setQuantity((q) => q + 1)} label="＋" />
//           </View>

//           <CustomButton title="Add to Cart" onPress={handleAddToCart} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function TouchableQty({ onPress, label }) {
//   const { TouchableOpacity } = require("react-native");
//   return (
//     <TouchableOpacity style={foodDetailStyles.qtyButton} onPress={onPress}>
//       <Text style={foodDetailStyles.qtyText}>{label}</Text>
//     </TouchableOpacity>
//   );
// }