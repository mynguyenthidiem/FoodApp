import { StyleSheet } from "react-native";
import { COLORS, FONT, SPACING, RADIUS, SHADOW } from "./theme";

const foodDetailStyles = StyleSheet.create({
  heroImage: {
    width: "100%",
    height: 260,
  },
  content: {
    padding: SPACING.lg,
  },
  name: {
    fontSize: FONT.h2,
    fontWeight: "700",
    color: COLORS.heading,
    marginBottom: SPACING.xs,
  },
  categoryTag: {
    fontSize: FONT.small,
    color: COLORS.primary,
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  price: {
    fontSize: FONT.h3,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT.body,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.xl,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.circle,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: FONT.h4,
    fontWeight: "700",
    marginHorizontal: SPACING.lg,
    color: COLORS.heading,
  },
});

export default foodDetailStyles;