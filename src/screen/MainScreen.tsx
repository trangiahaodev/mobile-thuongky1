import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import SearchInput from "../components/SearchInput";
import { Product } from "../type/Product";
import { ApiResponse } from "../type/ApiResponse";
import ProductCard from "../components/ProductCard";

const MainScreen = () => {
  // Search keyword
  const [keyword, setKeyword] = useState<string>("");

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

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SearchInput keyword={keyword} setKeyword={setKeyword} />

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
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MainScreen;
