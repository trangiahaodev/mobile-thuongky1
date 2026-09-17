import { Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../type/Product";
import { CartItem } from "../type/CartItem";

type Props = {
  item: Product;
  addToCart: (item: Product) => void;
};

const ProductCard = ({ item, addToCart }: Props) => {
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
      <Pressable
        style={styles.addToCart}
        onPress={() => {
          addToCart(item);
        }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 18,
          }}>
          Add to Cart
        </Text>
      </Pressable>
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
  addToCart: {
    flex: 1,
    backgroundColor: "#0077ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default ProductCard;
