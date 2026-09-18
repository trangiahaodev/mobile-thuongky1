import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActionType } from "../reducer/cartReducer";
import { CartItem } from "./../type/CartItem";

type Props = {
  cartItems: CartItem[];
  dispatch: React.Dispatch<ActionType>;
};

const CartSection = ({ cartItems, dispatch }: Props) => {
  const totalCartPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

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
              onPress={() => dispatch({ type: "DECREASE", payload: item })}>
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
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        <strong>Total: </strong>${totalCartPrice}
      </Text>

      <Pressable
        style={styles.removeCart}
        onPress={() => dispatch({ type: "CLEAR_CART" })}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}>
          Clear cart
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 20,
    borderWidth: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 10,
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
  removeCart: {
    flex: 1,
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default CartSection;
