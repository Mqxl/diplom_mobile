// NotificationDetailsScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function NotificationDetailsScreen({ route }) {
    const { data } = route.params;

    return (
        <View>
            <Text>Детали уведомления</Text>
            <Text>Название: {data.title}</Text>
            <Text>Текст: {data.body}</Text>
            <Text>Информация: {data.data.info}</Text>
        </View>
    );
}