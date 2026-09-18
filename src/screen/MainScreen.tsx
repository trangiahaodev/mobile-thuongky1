import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import SearchInput from "../components/SearchInput";
import { Product } from "../type/Product";
import { ApiResponse } from "../type/ApiResponse";
import ProductCard from "../components/ProductCard";
import cartReducer from "../reducer/cartReducer";
import { CartItem } from "../type/CartItem";
import CartSection from "../components/CartSection";
import { useTheme } from "../context/useTheme";

const MainScreen = () => {
  // Search keyword
  const [keyword, setKeyword] = useState<string>("");

  // Swipe down to refresh
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError("");

    try {
      // Gọi lại API y hệt như lúc mount component
      const res = await fetch("https://dummyjson.com/products?limit=20");
      const data = await res.json();
      setProducts(data as ApiResponse<Product>);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      }
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch products
  const [products, setProducts] = useState<ApiResponse<Product> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20");
        const data = await res.json();
        setProducts(data as ApiResponse<Product>);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products?.products.filter((product) => {
      const combinedString =
        `${product.title} ${product.description} ${product.brand} ${product.category}`.toLowerCase();

      return combinedString.includes(normalizedKeyword);
    });
  }, [products, keyword]);

  // Reducer for Add to cart
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const addToCart = useCallback((item: Product) => {
    // Ép kiểu item thành CartItem ngay tại thời điểm gửi đi
    dispatch({ type: "ADD_TO_CART", payload: item as CartItem });
  }, []);

  // Toggle theme
  const { toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}>
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        <Pressable
          onPress={toggleTheme}
          style={{
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 5,
            padding: 10,
            height: 36,
          }}>
          <Text>Theme</Text>
        </Pressable>
      </View>

      {/* Cart */}
      <CartSection cartItems={cartItems} dispatch={dispatch} />

      {/* Hiển thị Loading */}
      {loading && (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 24, color: "orange" }}>
            Loading products...
          </Text>
        </View>
      )}

      {/* Hiển thị Lỗi */}
      {error !== "" && (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 24, color: "red" }}>
            {error}
          </Text>
        </View>
      )}

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard item={item} addToCart={addToCart} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default MainScreen;
