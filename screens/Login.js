import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "test" || password !== "test") {
      alert("Invalid login credentials");
      return;
    }
    navigation.navigate("Main");
  };

  const [focused, setFocused] = useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          padding: 10 * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "blue",
              // fontFamily: "poppins-bold",
              marginVertical: 10 * 3,
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              // fontFamily: "poppins-semiBold",
              fontSize: 20,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: 10 * 3,
          }}
        >
          <TextInput
            // onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
            placeholder="Email"
            showSoftInputOnFocus={false}
            placeholderTextColor={"#626262"}
            style={[
              {
                // fontFamily: Font["poppins-regular"],
                fontSize: 14,
                padding: 10 * 2,
                backgroundColor: "#f1f4ff",
                borderRadius: 10,
                marginVertical: 10,
              },
              focused && {
                borderWidth: 3,
                borderColor: "#1F41BB",
                shadowOffset: { width: 4, height: 10 },
                shadowColor: "#1F41BB",
                shadowOpacity: 0.2,
                shadowRadius: 10,
              },
            ]}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            // onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
            placeholder="Password"
            showSoftInputOnFocus={false}
            secureTextEntry={true}
            placeholderTextColor={"#626262"}
            style={[
              {
                // fontFamily: Font["poppins-regular"],
                fontSize: 14,
                padding: 10 * 2,
                backgroundColor: "#f1f4ff",
                borderRadius: 10,
                marginVertical: 10,
              },
              focused && {
                borderWidth: 3,
                borderColor: "#1F41BB",
                shadowOffset: { width: 4, height: 10 },
                shadowColor: "#1F41BB",
                shadowOpacity: 0.2,
                shadowRadius: 10,
              },
            ]}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View>
          <Text
            style={{
              // fontFamily: "poppins-semiBold",
              fontSize: 14,
              color: "blue",
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            padding: 10 * 2,
            backgroundColor: "blue",
            marginVertical: 10 * 3,
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
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => navigate("Register")}
        >
          <Text
            style={{
              // fontFamily: "poppins-semiBold",
              color: "black",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: 10 * 3,
          }}
        >
          <Text
            style={{
              // fontFamily: "poppins-semiBold",
              color: "blue",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#ECECEC",
                borderRadius: 10 / 2,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-google" color={"black"} size={10 * 2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#ECECEC",
                borderRadius: 10 / 2,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-apple" color={"black"} size={10 * 2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#ECECEC",
                borderRadius: 10 / 2,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-facebook" color={"black"} size={10 * 2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
