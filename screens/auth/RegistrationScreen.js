import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, Alert } from "react-native";
import { useDispatch } from 'react-redux';
import uuid from "react-native-uuid";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from '@expo/vector-icons';
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { Platform } from "react-native";
import {getExpoPushTokenAsync} from "expo-notifications";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  userPhoto: "",
};

export default function RegistrationScreen({ navigation }) {
  const { height, width } = Dimensions.get('window');

  const [isSecureEntry, setSecureEntry] = useState(true);
  const [state, setState] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [libraryPermission, setLibraryPermission] = useState();
  const [isFocused, setIsFocused] = useState({
    nickname: false,
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

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const PickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      Alert.alert('Выберите изображение');
    }

    if (!result.canceled) {
      const photoLink = await uploadPhotoToServer(result.assets[0].uri);
      setProfileImage(photoLink);
      setState((prevState) => ({
        ...prevState,
        userPhoto: photoLink,
      }));
    }
  };

  const uploadPhotoToServer = async (photo) => {
    try {
      const id = uuid.v4();
      const storageRef = ref(storage, `images/${id}`);
      const resp = await fetch(photo);
      const file = await resp.blob();
      await uploadBytesResumable(storageRef, file);
      const link = await getDownloadURL(ref(storage, `images/${id}`));
      return link;
    } catch (error) {
      Alert.alert(error.message);
      return;
    }
  };

  const RemoveProfileImage = () => {
    setProfileImage(null);
  };

  const handleSubmit = () => {
    if (!state.email || !state.nickname || !state.password) {
      return Alert.alert('Все поля обязательны для заполнения');
    }
    dispatch(authSignUpUser(state)).then((userId) => {
      // Получение токена устройства
      getExpoPushTokenAsync().then((token) => {
        // Отправка данных пользователя на сервер
        const requestBody = {
          userid: userId,
          email: state.email,
          name: state.nickname,
          expoToken: token.data
        };

        fetch('http://192.168.31.205:8088/gateway/websocket/api/v2/firebaseUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
              // Обработка ответа от сервера
              console.log(data);
              // Возможно, здесь нужно что-то сделать с ответом
            })
            .catch(error => {
              console.error('Error:', error);
            });
      });
    });
    setState(initialState);
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
              {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.photoBox} />
              ) : (
                  <View style={styles.photoBoxPlaceholder} />
              )}
              {profileImage ? (
                  <TouchableOpacity onPress={RemoveProfileImage}>
                    <View style={styles.photoBoxBtn}>
                      <AntDesign name="close" size={16} color="#BDBDBD" />
                    </View>
                  </TouchableOpacity>
              ) : (
                  <TouchableOpacity onPress={PickProfileImage}>
                    <View style={styles.photoBoxBtn}>
                      <AntDesign name="plus" size={16} color="#FF6C00" />
                    </View>
                  </TouchableOpacity>
              )}
              <Text style={styles.titleText}>Sign up</Text>
              <View style={styles.form}>
                <TextInput
                    style={isFocused.nickname ? [styles.input, styles.inputFocused] : styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#BDBDBD"
                    textContentType="username"
                    value={state.nickname}
                    onChangeText={(value) =>
                        setState((prevState) => ({ ...prevState, nickname: value }))
                    }
                    onFocus={() => onFocus('nickname')}
                    onBlur={() => onBlur('nickname')}
                />
                <TextInput
                    style={isFocused.email ? [styles.input, styles.inputFocused] : styles.input}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={state.email}
                    onChangeText={(value) =>
                        setState((prevState) => ({ ...prevState, email: value }))
                    }
                    onFocus={() => onFocus('email')}
                    onBlur={() => onBlur('email')}
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
                      value={state.password}
                      onChangeText={(value) =>
                          setState((prevState) => ({ ...prevState, password: value }))
                      }
                      onFocus={() => onFocus('password')}
                      onBlur={() => onBlur('password')}
                  />
                  <TouchableOpacity
                      onPress={() => setSecureEntry((prev) => !prev)}
                      style={styles.toggleButton}
                  >
                    <Text style={styles.textSecure}>{isSecureEntry ? 'Show' : 'Hide'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                      onPress={() => navigation.navigate("Login")}
                      style={styles.text}
                  >
                    Already have an account? Sign in
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
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 25,
    padding: 20,
  },
  photoBox: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginTop: -60,
    marginBottom: 15,
  },
  photoBoxPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginTop: -60,
    marginBottom: 15,
  },
  photoBoxBtn: {
    position: "absolute",
    top: 75,
    right: 45,
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 1,
    fontWeight: "bold",
    marginBottom: 15,
  },
  form: {
    width: "100%",
  },
  input: {
    marginTop: 16,
    height: 50,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#E8E8E8",
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    position: "relative",
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
    color: "#1B4371",
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#FF6C00",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
});
