import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import React, { useState } from "react";
import { Dimensions, Text, View, Button } from "react-native";
import getStyles from "./Camera.style";
import { getProduct } from "../service/ProductService";
import * as Speech from "expo-speech";

const { height, width } = Dimensions.get("window");

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const styles = getStyles(width, height);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Kamera erişimi için izin gerekiyor</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    let barcode = data;
    if (data.includes("-")) {
      const parts = data.split("-");
      barcode = parts[1];
    }
    console.log(barcode);
    const product = await getProduct(barcode);

    if (product != "Ürün bulunamadı.") {
      const message = `${product.name}, ${product.price} TL`;
      Speech.speak(message, {
        language: "tr-TR",
        onDone: () => setScanned(false),
      });
    } else {
      const message = "Ürün bulunamadı";
      Speech.speak(message, {
        language: "tr-TR",
        onDone: () => setScanned(false),
      });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}></View>
      </CameraView>
    </View>
  );
};

export default Camera;
