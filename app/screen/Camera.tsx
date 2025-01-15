import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import getStyles from "./Camera.style";
import { getProduct } from "../service/ProductService";
import * as Speech from "expo-speech";
import JsBarcode from "jsbarcode";

const { height, width } = Dimensions.get("window");

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const styles = getStyles(width, height);
  useEffect(() => {
    if (isTouched) {
      setIsScanning(true);
      Speech.speak("Tarama başlatıldı", { language: "tr-TR" });
    } else {
      setIsScanning(false);
      Speech.speak("Tarama durduruldu", { language: "tr-TR" });
    }
  }, [isTouched]);

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
  const handleBarCodeScanned = async ({
    data,
    bounds,
  }: BarcodeScanningResult) => {
    //if (!isTouched && isScanning) return;
    setIsTouched(false);
    setIsScanning(false);

    let barcode = data;
    if (data.includes("-")) {
      const parts = data.split("-");
      barcode = parts[1];
    }

    console.log("data: ", data);
    console.log("barcode: ", barcode);

    const product = await getProduct(barcode);
    const message =
      product != "Ürün bulunamadı."
        ? `${product.name}, ${product.price} TL`
        : "Ürün bulunamadı";

    const speakWords = async (message: string) => {
      const word = message.replaceAll("-", " ");
      Speech.speak(word, { language: "tr-TR" });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Speech.speak("Tarama tamamlandı", { language: "tr-TR" });
    };
    await speakWords(message);
  };
  const resetScanner = () => {
    setIsTouched(!isTouched);
    if (isTouched) {
      setIsScanning(true);
    } else {
      setIsScanning(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={resetScanner}>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        >
          <View style={styles.buttonContainer}></View>
        </CameraView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Camera;
