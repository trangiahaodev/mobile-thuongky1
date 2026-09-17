import React from "react";
import { Product } from "../type/Product";
import { StyleSheet, Text, View } from "react-native";

const ProductCard = ({ item }: { item: Product }) => {
  return (
    <View style={styles.card}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
        #{item.id}
      </Text>
      <Text>
        <strong>Title:</strong> {item.title}
      </Text>
      <Text>
        <strong>Description:</strong> {item.description.slice(0, 60)}...
      </Text>
      <Text>
        <strong>Brand:</strong> {item.brand}
      </Text>
      <Text>
        <strong>Category:</strong> {item.category}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    flex: 1,
    marginVertical: 8,
  },
});

export default ProductCard;
