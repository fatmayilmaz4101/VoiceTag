import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Camera from "./app/screen/Camera";

export default function App() {
  return (
    <View style={styles.container}>
      <Camera></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
