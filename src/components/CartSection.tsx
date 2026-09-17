import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActionType } from "../reducer/cartReducer";
import { CartItem } from "./../type/CartItem";

type Props = {
  cartItems: CartItem[];
  dispatch: React.Dispatch<ActionType>;
};

const CartSection = ({ cartItems, dispatch }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      {cartItems.map((item) => (
        <View style={styles.itemRow} key={item.id}>
          <Text>#{item.id}</Text>
          <Text>{item.title}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}>
            <Pressable
              style={styles.quantityButton}
              onPress={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item })
              }>
              <Text>-</Text>
            </Pressable>
            <Text>{item.quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => dispatch({ type: "ADD_TO_CART", payload: item })}>
              <Text>+</Text>
            </Pressable>
            <Pressable
              style={styles.quantityButton}
              onPress={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item })
              }>
              <Text>X</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginVertical: 20,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    paddingVertical: 10,
    marginVertical: 5,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    width: 20,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartSection;
