import LinearGradient from "react-native-linear-gradient";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";

import homeStyles from "../styles/home";
import { COLORS } from "../styles/theme";

export default function CollectionCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={homeStyles.collectionCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[
          COLORS.secondary,
          COLORS.background,
          COLORS.surface,
        ]}
        locations={[0, 0.9, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={homeStyles.collectionGradient}
      >
        <View style={homeStyles.collectionContent}>
          <Text style={homeStyles.collectionTitle}>
            {item.name}
          </Text>

          <Text style={homeStyles.collectionSubtitle}>
            {item.subtitle}
          </Text>
        </View>

        <Image
          source={item.image}
          style={homeStyles.collectionImage}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}
