import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../nestedScreen/HomeScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";
import AboutCompanyScreen from "../nestedScreen/AboutCompanyScreen";
import SettingsScreen from "../nestedScreen/SettingsScreen";
import NotificationDetails from "./NotificationDetails";


const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                name="Home"
                component={HomeScreen}
                options={{
                headerShown: false,
                }}
            />
            <NestedScreen.Screen name="Comments" component={CommentsScreen} />
            <NestedScreen.Screen name="Map" component={MapScreen}/>
            <NestedScreen.Screen name="AboutCompany" component={AboutCompanyScreen} />
            <NestedScreen.Screen name="Settings" component={SettingsScreen} />
            <NestedScreen.Screen name="NotificationDetails" component={NotificationDetails} />
        </NestedScreen.Navigator>
    );
};

export default PostsScreen;