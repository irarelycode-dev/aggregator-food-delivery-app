import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState, useReducer, useEffect } from "react";
import * as Location from "expo-location";

const screenWidth = Dimensions.get("screen").width;

const LandingScreen: React.FC = (): JSX.Element => {
  const {
    container,
    navigation,
    body,
    deliveryIcon,
    footer,
    addressContainer,
    addressTitle,
  } = styles;

  const [address, setAddress] = useState<Location.LocationGeocodedAddress>();
  const [errorMsg, setErrorMsg] = useState("");

  const [displayAddress, setDisplayAddress] = useState(
    "Waiting for your current location"
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Location access is not enabled");
      }
      let location: any = await Location.getCurrentPositionAsync({});
      const { coords } = location;
      if (coords) {
        const { latitude, longitude } = coords;
        let addressResponse: any = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        for (let item of addressResponse) {
          setAddress(item);
          let currentAddress = `${item.name},${item.street},${item.postalCode},${item.country}`;
          setDisplayAddress(currentAddress);
          return;
        }
      } else {
      }
    })();
  }, []);

  return (
    <View style={container}>
      <View style={navigation}></View>
      <View style={body}>
        <Image
          source={require("../images/delivery_icon.png")}
          style={deliveryIcon}
        />
        <View style={addressContainer}>
          {errorMsg !== "" ? (
            <Text style={addressTitle}>Your delivery address</Text>
          ) : (
            <Text style={addressTitle}>{errorMsg}</Text>
          )}
        </View>
        <Text>{displayAddress}</Text>
      </View>
      <View style={footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242,242,242,1)",
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  footer: {
    flex: 1,
  },
  deliveryIcon: {
    width: 120,
    height: 120,
  },
  addressContainer: {
    width: screenWidth - 100,
  },
  addressTitle: {
    fontSize: 72,
    fontWeight: "700",
    color: "#707070",
  },
  addressText: {
    fontSize: 20,
    fontWeight: "200",
    color: "#4f4f4f",
  },
});

export default LandingScreen;
