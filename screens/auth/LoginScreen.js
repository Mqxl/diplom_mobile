import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useDispatch } from 'react-redux';
import { authSignInUser } from "../../redux/auth/authOperations";
import { Platform } from "react-native";

export default function LoginScreen({ navigation }) {
  const { height, width } = Dimensions.get('window');
  const [isSecureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const dispatch = useDispatch();

  const onFocus = (inputName) => {
    setIsFocused({
      [inputName]: true,
    });
  };

  const onBlur = (inputName) => {
    setIsFocused({
      [inputName]: false,
    });
  };

  const handleLogin = () => {
    dispatch(authSignInUser({ email, password }));
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            height={height}
            width={width}
            style={styles.container}
            keyboardVerticalOffset={-150}
        >
          <ImageBackground
              source={require("../../assets/images/signUp.jpg")}
              style={styles.backgroundImage}
          >
            <View style={styles.innerBox}>
              <Text style={styles.titleText}>Sign in</Text>
              <View style={styles.form}>
                <TextInput
                    style={isFocused.email ? [styles.input, styles.inputFocused] : styles.input}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    inputMode="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    onFocus={() => onFocus("email")}
                    onBlur={() => onBlur("email")}
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                      style={
                        isFocused.password
                            ? [styles.input, styles.inputFocused]
                            : styles.input
                      }
                      placeholder="Password"
                      placeholderTextColor="#BDBDBD"
                      textContentType="password"
                      secureTextEntry={isSecureEntry}
                      value={password}
                      onChangeText={(value) => setPassword(value)}
                      onFocus={() => onFocus("password")}
                      onBlur={() => onBlur("password")}
                  />
                  <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)} style={styles.toggleButton}>
                    <Text style={styles.textSecure}>{isSecureEntry ? 'Show' : 'Hide'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                  <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                      onPress={() => navigation.navigate("Registration")}
                      style={styles.text}
                  >
                    Don't have an account? Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 20,
  },
  titleText: {
    marginTop: 92,
    marginBottom: 15,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  input: {
    marginTop: 16,
    height: 50,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#E8E8E8',
  },
  inputFocused: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    position: 'relative',
    marginTop: 16,
    height: 50, // Ensure the container matches the input height
  },
  toggleButton: {
    position: 'absolute',
    right: 15,
    top: 12, // Centered vertically
  },
  textSecure: {
    fontSize: 14,
    color: '#1B4371',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#FF6C00',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#1B4371',
    textAlign: 'center',
  },
});
