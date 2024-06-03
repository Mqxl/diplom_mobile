import React, {useState, useContext, useEffect, useRef} from "react";
import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from "./redux/auth/authOperations";
import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from "./screens/main/ProfileScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import PostsScreen from "./screens/main/PostsScreen";
import MessagesScreen from "./screens/main/MessagesScreen";
import NewsScreen from "./screens/main/NewsScreen";
import * as Notifications from 'expo-notifications'
import { firestore } from "./firebase/config";
import { setDoc, doc } from 'firebase/firestore';
import * as Device from 'expo-device';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useNavigation} from "@react-navigation/native";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


export const useRoute = (isAuth, navigation) => {
  const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const isDevice = Device.isDevice
            if(!isDevice) return
            console.log('get push token')
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                return;
            }
            const auth = getAuth();
            const token = await Notifications.getExpoPushTokenAsync({
                projectId: "f74bdb73-6063-4309-b369-8deaf496224a"
            });
            let uid = ""
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    uid = user.uid;
                    console.log(uid)
                } else {
                    console.log("err")
                }
            });
            const tokensRef = doc(firestore, 'tokens', uid);
            try {
                await setDoc(tokensRef, {
                    token: token.data,
                    id: uid,
                });
                console.log("Данные успешно записаны в Firestore.");
            } catch (error) {
                console.error("Произошла ошибка при записи данных в Firestore:", error);
            }
        })();
    }, [])

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log("receiv", notification);
        });
        const subscription2= Notifications.addNotificationResponseReceivedListener(notification => {
            console.log("response", notification);
            navigation.current?.navigate('NotificationDetails', { notification: notification });
        });
        return () => {
            subscription.remove();
            subscription2.remove;
        }
    }, []);

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    )
  }

  return (
      <MainTab.Navigator
          screenOptions={{
              tabBarShowLabel: false,
              tabBarStyle: {
                  height: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#094780', // Измените это значение на желаемый цвет фона

              },
              tabBarActiveTintColor: '#ffffff',
          }}
      >

      <MainTab.Screen
        name='Posts'
        component={PostsScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name={focused ? "user" : "user"}
              size={size}
              color={color}
              style={{ alignSelf: 'center', marginTop: 10 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16, bottom: 4 }}
              onPress={() => dispatch(authSignOutUser())}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerShown: false,
        })}
      />
      <MainTab.Screen
        name='Messages'
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
                name={focused ? "shopping-bag" : "shopping-bag"} // Используем иконку "file-upload-outline" для загрузки файла
              size={size}
              color={color}
              style={{ alignSelf: 'center', marginTop: 10 }}
            />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name='Create post'
        component={CreatePostsScreen}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused, size, color }) => (
              <Feather
                  name={focused ? "bell" : "bell"}
                  size={28}
                  color={color}
                  style={{ alignSelf: 'center', marginTop: 10 }}
              />
          ),
            headerShown: false,

        })}
      />
      <MainTab.Screen
        name='News'
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "newspaper" : "newspaper-outline"}
              size={size}
              color={color}
              style={{ alignSelf: 'center', marginTop: 10 }}
            />
          ),
          headerShown: false,
        }}
      />
      {/*<MainTab.Screen*/}
      {/*  name='Profile'*/}
      {/*  component={ProfileScreen}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({ focused, size, color }) => (*/}
      {/*      <Feather*/}
      {/*        name={focused ? "user" : "user"}*/}
      {/*        size={size}*/}
      {/*        color={color}*/}
      {/*        style={{ alignSelf: 'center', marginTop: 10 }}*/}
      {/*      />*/}
      {/*    ),*/}
      {/*    headerShown: false,*/}
      {/*  }}*/}
      {/*/>*/}
    </MainTab.Navigator>
  )
}
