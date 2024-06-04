// NotificationDetailsScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const NotificationDetailsScreen = ({ route }) => {
    const { data } = route.params;

    return (
        <View>
            <Text>Детали уведомления</Text>
            <Text>Информация: {JSON.stringify(data.notification.request.content.data.info, null, 2)}</Text>
        </View>
    );
}

export default NotificationDetailsScreen;