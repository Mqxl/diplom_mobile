import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutCompanyScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Наша компания занимается разработкой крутых приложений!
                Мы стараемся делать все возможное, чтобы наши пользователи
                получали удовольствие от использования наших продуктов.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 20,
        color: '#212121',
        textAlign: 'center',
    },
});

export default AboutCompanyScreen;
