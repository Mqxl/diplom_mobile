import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [language, setLanguage] = useState('ru'); // Default language
    const [locationEnabled, setLocationEnabled] = useState(false);

    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
    };

    const toggleLocation = () => {
        setLocationEnabled(previousState => !previousState);
    };

    const changeLanguage = () => {
        const newLanguage = language === 'ru' ? 'en' : 'ru'; // Toggle between 'ru' and 'en'
        setLanguage(newLanguage);
    };

    return (
        <View style={styles.container}>
            <View style={styles.setting}>
                <Text style={styles.settingText}>Уведомления</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifications}
                    value={notificationsEnabled}
                />
            </View>
            <View style={styles.setting}>
                <Text style={styles.settingText}>Доступ к геопозиции</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLocation}
                    value={locationEnabled}
                />
            </View>
            <TouchableOpacity style={styles.languageButton} onPress={changeLanguage}>
                <Text style={styles.languageButtonText}>Изменить язык: {language === 'ru' ? 'Английский' : 'Русский'}</Text>
            </TouchableOpacity>
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
    languageButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    languageButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SettingsScreen;
