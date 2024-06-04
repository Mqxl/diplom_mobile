import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(true);

    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
    };

    const toggleLocation = () => {
        setLocationEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <View style={styles.setting}>
                <Text style={styles.settingText}>Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifications}
                    value={notificationsEnabled}
                />
            </View>
            <View style={styles.setting}>
                <Text style={styles.settingText}>Location</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLocation}
                    value={locationEnabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        paddingBottom: 15,
        marginBottom: 15,
    },
    settingText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 20,
        color: '#212121',
    },
});

export default SettingsScreen;
