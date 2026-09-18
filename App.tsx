import { SafeAreaView, StyleSheet } from "react-native";
import MainScreen from "./src/screen/MainScreen";
import { ThemeProvider, useTheme } from "./src/context/useTheme";

const AppContent = () => {
  const { darkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkMode]}>
      <MainScreen />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkMode: {
    backgroundColor: "#222222",
  },
});
