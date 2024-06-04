import React, {useEffect} from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {firestore} from "../../firebase/config";
import {useNavigation} from "@react-navigation/native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        (async () => {
            const isDevice = Device.isDevice
            if(!isDevice) return
            console.log('get push token')
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                return;
            }
            const auth = getAuth();
            const token = await Notifications.getExpoPushTokenAsync({
                projectId: "f74bdb73-6063-4309-b369-8deaf496224a"
            });
            let uid = ""
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    uid = user.uid;
                    console.log(uid)
                } else {
                    console.log("err")
                }
            });
            const tokensRef = doc(firestore, 'tokens', uid);
            try {
                await setDoc(tokensRef, {
                    token: token.data,
                    id: uid,
                });
                console.log("Данные успешно записаны в Firestore.");
            } catch (error) {
                console.error("Произошла ошибка при записи данных в Firestore:", error);
            }
        })();
    }, [])

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log("receiv", notification);
        });
        const subscription2= Notifications.addNotificationResponseReceivedListener(notification => {
            console.log("response", notification);
            navigation.navigate('NotificationDetails', { data: notification});
        });
        return () => {
            subscription.remove();
            subscription2.remove;
        }
    }, []);
    const { nickname } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
    };

    const goToSettings = () => {
        navigation.navigate('Settings');
    };

    const goToDetails = () => {
        navigation.navigate('NotificationDetails')
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
            <Text style={styles.greeting}>Hello, {nickname}!</Text>
            <TouchableOpacity style={styles.button} onPress={goToSettings}>
                <Feather name="settings" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
                <Feather name="message-circle" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Contact us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToAboutCompany}>
                <Feather name="info" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Information</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#004A6F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#004A6F',
        paddingVertical: 10,
        justifyContent: 'space-around',
    },
});

export default HomeScreen;
