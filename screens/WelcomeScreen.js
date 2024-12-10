import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
const height = Dimensions.get("window").height;

function WelcomeScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../assets/images/welcome-img.png")}
        />
        <View
          style={{
            paddingHorizontal: 10 * 4,
            paddingTop: 10 * 4,
          }}
        >
          <Text
            style={{
              fontSize: 35,
              color: "blue",
              //   fontFamily: "poppins-bold",
              textAlign: "center",
            }}
          >
            Your Health, Our Priority!
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "black",
              //   fontFamily: "poppins-regular",
              textAlign: "center",
              marginTop: 10 * 2,
            }}
          >
           It perfectly captures the motivation of a patient care application 
           that provides comprehensive assistance.
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10 * 2,
            paddingTop: 10 * 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "blue",
              paddingVertical: 10 * 1.5,
              paddingHorizontal: 10 * 2,
              width: "48%",
              borderRadius: 10,
              shadowColor: "blue",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          >
            <Text
              style={{
                // fontFamily: "poppins-bold",
                color: "white",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;