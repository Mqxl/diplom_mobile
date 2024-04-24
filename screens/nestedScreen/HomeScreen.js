import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text, Linking } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const HomeScreen = ({ navigation }) => {
    const { userPhoto, nickname, email } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
    };

    const goToSettings = () => {
        navigation.navigate('Settings');
    };

    const openWhatsApp = () => {
        const whatsappNumber = '+77778223039'; // Replace with desired WhatsApp number
        Linking.openURL(`whatsapp://send?phone=${whatsappNumber}`);
    };

    const goToAboutCompany = () => {
        navigation.navigate('AboutCompany');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Профиль</Text>
                <TouchableOpacity onPress={signOut}>
                    <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity>
            </View>
            <View style={styles.userInfoContainer}>
                <Image style={styles.avatar} source={{ uri: userPhoto }} />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{nickname}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={goToSettings}>
                    <Feather name="settings" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Настройки</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
                    <Feather name="message-circle" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Связаться с нами</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={goToAboutCompany}>
                    <Feather name="info" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Информация</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sliderContainer}>
                {/* Your Slider Component Goes Here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    headerTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        lineHeight: 24,
        color: '#212121',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#BDBDBD',
    },
    userInfo: {
        marginLeft: 12,
    },
    username: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
    },
    email: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 16,
        color: '#757575',
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10,
    },
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default HomeScreen;
