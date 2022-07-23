import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useReducer, useEffect } from "react";
import * as Location from "expo-location";
import { useNavigation } from "../../utils/useNavigation";

const screenWidth = Dimensions.get("screen").width;

const LandingScreen: React.FC = (): JSX.Element => {
  const { navigate } = useNavigation();

  const {
    container,
    navigation,
    body,
    deliveryIcon,
    footer,
    addressContainer,
    addressTitle,
    addressText,
  } = styles;

  const [address, setAddress] = useState<Location.LocationGeocodedAddress>();
  const [errorMsg, setErrorMsg] = useState("");

  const [displayAddress, setDisplayAddress] = useState(
    "Fetching your location"
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Permissions to access your location has been denied. Please change your settings"
        );
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
          let currentAddress = `${item.city},${item.postalCode},${item.country}`;
          setDisplayAddress(currentAddress);

          if (currentAddress.length > 0) {
            setTimeout(() => {
              navigate("homeStack");
            }, 2000);
          }

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
          <Text style={addressTitle}>Your delivery address</Text>
          {errorMsg.length !== 0 ? (
            <Text style={addressTitle}>{errorMsg}</Text>
          ) : null}
        </View>
        <Text style={addressText}>{displayAddress}</Text>
        {!address ? (
          <View>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : null}
      </View>
      <View style={footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(224,234,24,1)",
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
    fontSize: 13,
    fontWeight: "bold",
    color: "#4f4f4f",
    marginTop: 50,
  },
});

export default LandingScreen;
