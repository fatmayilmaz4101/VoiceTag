import { StyleSheet } from "react-native";
const getStyles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    camera: {
      width: width,
      height: height,
      justifyContent: "flex-end",
    },
    message: {
      textAlign: "center",
      paddingBottom: 10,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 30,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
  });

export default getStyles;
