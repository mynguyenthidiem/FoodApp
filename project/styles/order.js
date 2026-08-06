import { StyleSheet } from "react-native";
import { COLORS, FONT, SPACING, RADIUS, SHADOW } from "./theme";

const orderStyles = StyleSheet.create({
  // Cart Item

  cartItem: {
    flexDirection: "row",
    alignItems: "center",

    padding: SPACING.md,

    marginBottom: SPACING.md,

    borderRadius: RADIUS.lg,

    backgroundColor: COLORS.surface,

    ...SHADOW,
  },

  cartImage: {
    width: 90,
    height: 90,

    borderRadius: RADIUS.md,
  },

  cartContent: {
    flex: 1,

    marginLeft: SPACING.md,
  },

  cartTitle: {
    fontSize: FONT.body,
    fontWeight: "700",

    color: COLORS.heading,
  },

  cartRestaurant: {
    marginTop: SPACING.xs,

    fontSize: FONT.caption,

    color: COLORS.neutral,
  },

  cartBottomRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: SPACING.md,
  },

  cartPrice: {
    fontSize: FONT.subtitle,
    fontWeight: "700",

    color: COLORS.primaryDark,
  },

  // Address

  addressRow: {
    flexDirection: "row",

    alignItems: "flex-start",
  },

  addressContent: {
    flex: 1,

    marginLeft: SPACING.md,
  },

  addressTitle: {
    fontSize: FONT.label,
    fontWeight: "700",

    color: COLORS.heading,
  },

  addressText: {
    marginTop: SPACING.xs,

    fontSize: FONT.small,

    color: COLORS.text,

    lineHeight: 20,
  },

  changeText: {
    color: COLORS.primary,

    fontWeight: "700",
  },

  // Coupon

  couponRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  couponInput: {
    flex: 1,

    height: 48,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: RADIUS.md,

    paddingHorizontal: SPACING.md,

    backgroundColor: COLORS.background,

    color: COLORS.heading,

    fontSize: FONT.body,
  },

  // Empty

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: SPACING.xxxl,
  },

  emptyTitle: {
    marginTop: SPACING.xl,

    fontSize: FONT.h3,
    fontWeight: "700",

    color: COLORS.heading,
  },

  emptyText: {
    marginTop: SPACING.sm,

    textAlign: "center",

    fontSize: FONT.body,

    lineHeight: 24,

    color: COLORS.text,
  },
});

export default orderStyles;
