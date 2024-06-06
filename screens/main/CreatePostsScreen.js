import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from "../../firebase/config";
import {base_url} from "../config/rest_config";

const CreatePostsScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
    }, []);

    const handleChoosePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Ошибка', 'Не удалось получить доступ к галерее.');
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                await sendImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error choosing photo:', error);
            Alert.alert('Ошибка', 'Что-то пошло не так при выборе изображения.');
        }
    };

    const sendImage = async (uri) => {
        const formData = new FormData();
        formData.append('document', {
            uri: uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        try {
            const response = await fetch('https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict', {
                method: 'POST',
                headers: {
                    'Authorization': '174b9e38fb9a695d8fefb44ff90c1d15',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const data = await response.json();
            if (data.document.inference.pages[0].prediction.date.value === null) {
                Alert.alert('Ошибка', 'Это не чек.');
            } else {
                try {
                    console.log(auth.currentUser.uid)
                    const response = await fetch(`http://${base_url}:8088/gateway/websocket/api/v2/firebaseUsers/1/increase-balance?amount=100`, {
                        method: 'POST'
                    });
                    console.log(response.status)
                } catch (error) {
                    Alert.alert('Ошибка', 'Не удалось пополнить баланс');
                }
            }
        } catch (error) {
            console.error('Error sending image:', error);
            Alert.alert('Ошибка', 'Что-то пошло не так при отправке изображения.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bonus program</Text>
            <Text style={styles.instructions}>
                1. Take a photo of the receipt with your phone {"\n"}
                2. Select a check and click send and receive a bonus for each check
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
                <Text style={styles.buttonText}>Add a photo from gallery</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CreatePostsScreen;
