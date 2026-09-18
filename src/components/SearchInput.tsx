import { Pressable, StyleSheet, TextInput, View } from "react-native";

type Props = {
  keyword: string;
  setKeyword: (text: string) => void;
};

const SearchInput = ({ keyword, setKeyword }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={"#ccc"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
});

export default SearchInput;
