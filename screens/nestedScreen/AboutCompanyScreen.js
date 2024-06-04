import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AboutCompanyScreen = () => {
    return (
        <View style={styles.container} >
            <View style={styles.content}>
                <Text style={styles.title}>About Us</Text>
                <View style={styles.card}>
                    <Text style={styles.cardText}>Our company develops cool applications!
                        We try to do everything possible to ensure that our users
                        enjoyed using our products.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796B',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#212121',
    },
    card: {
        backgroundColor: '#006064',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    cardText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    cardLink: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },
    footer: {
        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    footerIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#BDBDBD',
        borderRadius: 15,
    },
});

export default AboutCompanyScreen;
