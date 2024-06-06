import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../nestedScreen/HomeScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";
import AboutCompanyScreen from "../nestedScreen/AboutCompanyScreen";
import SettingsScreen from "../nestedScreen/SettingsScreen";
import NotificationDetails from "./NotificationDetails";
import OutletDetailsScreen from "../nestedScreen/OutletDetailsScreen";
import NotificationDetailsScreen from "../nestedScreen/NotificationDetail";
import MallMapScreen from "../nestedScreen/MallMapScreen";
import PromotionDetailScreen from "../nestedScreen/PromotionDetailScreen";


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
            <NestedScreen.Screen name="OutletDetails" component={OutletDetailsScreen} />
            <NestedScreen.Screen name="Settings" component={SettingsScreen} />
            <NestedScreen.Screen name="PromotionDetail" component={PromotionDetailScreen} />
            <NestedScreen.Screen name="NotificationDetails" component={NotificationDetailsScreen} />
            <NestedScreen.Screen name="MallMap" component={MallMapScreen} />
        </NestedScreen.Navigator>
    );
};

export default PostsScreen;