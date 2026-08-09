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

  cartPrice: {
    fontSize: FONT.subtitle,
    fontWeight: "700",

    color: COLORS.primaryDark,
  },

  //quantity
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.md,
  },
  qtyText: {
    width: 42,
    textAlign: "center",
    fontSize: FONT.body,
    fontWeight: "700",
    color: COLORS.heading,
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
