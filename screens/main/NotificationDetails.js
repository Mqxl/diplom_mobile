import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotificationDetails = ({ route }) => {
    const { notification } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.description}>{notification.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: '#757575',
    },
});

export default NotificationDetails;
