import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { COLORS, SPACING } from "../styles/theme";
import commonStyles from "../styles/common";

export default function BackHeader({
  title,
  subtitle,
  rightIcon,
  onRightPress,
}) {
  const navigation = useNavigation();

  return (
    <View style={commonStyles.header}>

      <TouchableOpacity
        style={commonStyles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={SPACING.xxl}
          color={COLORS.primaryDark}
        />
      </TouchableOpacity>

      <View style={commonStyles.headerContent}>
        <Text
          numberOfLines={1}
          style={commonStyles.headerTitle}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            numberOfLines={1}
            style={commonStyles.headerSubtitle}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightIcon ? (
        <TouchableOpacity
          style={commonStyles.headerRightButton}
          onPress={onRightPress}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={rightIcon}
            size={24}
            color={COLORS.primaryDark}
          />
        </TouchableOpacity>
      ) : (
        <View style={commonStyles.headerRightButton} />
      )}
    </View>
  );
}
