import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button} from "react-native";
import { useNavigation } from '@react-navigation/native';

const CreatePostsScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://2.132.51.228:8088/gateway/sms-gate/api/v1/notifications', {
                method: 'GET',
            });
            const json = await response.json();
            setNotifications(json);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleNotificationPress = (item) => {
        navigation.navigate('NotificationDetails', { notification: item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationPress(item)}>
            <Image source={require('assets/4226663.png')} style={styles.icon} />
            <View style={styles.notificationText}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="Обновить" onPress={fetchNotifications} />
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 44,
    },
    notificationItem: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    notificationText: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: '#757575',
    },
});

export default CreatePostsScreen;
