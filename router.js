import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from "./redux/auth/authOperations";
import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import PostsScreen from "./screens/main/PostsScreen";
import MessagesScreen from "./screens/main/MessagesScreen";
import NewsScreen from "./screens/main/NewsScreen";
import PromotionScreen from "./screens/main/PromotionScreen";


const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();


export const useRoute = (isAuth, navigation) => {
  const dispatch = useDispatch();

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
                  borderRadius:30,
                  backgroundColor:"black",
                  position: 'absolute',
                  overflow:'hidden',
                  left: 10,
                  bottom: 30,
                  right: 10,
                  padding:15, // Измените это значение на желаемый цвет фона

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
                  name={focused ? "dollar-sign" : "dollar-sign"}
                  size={28}
                  color={color}
                  style={{ alignSelf: 'center', marginTop: 10 }}
              />
          ),
            headerShown: false,

        })}
      />
          <MainTab.Screen
              name='Promotion'
              component={PromotionScreen}
              options={({ navigation, route }) => ({
                  tabBarIcon: ({ focused, size, color }) => (
                      <Feather
                          name={focused ? "gift" : "gift"}
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
    </MainTab.Navigator>
  )
}
