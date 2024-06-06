import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import { base_url } from "../config/rest_config";

const MessagesScreen = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // Состояние для обозначения обновления данных
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://${base_url}:8088/gateway/websocket/api/v2/malls`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setData(json);
            setLoading(false);
            setRefreshing(false); // После завершения загрузки сбрасываем состояние обновления
        } catch (error) {
            setError(error);
            console.log(error)
            setLoading(false);
            setRefreshing(false); // Если возникает ошибка, сбрасываем состояние обновления
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => handleItemClick(item)}>
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    style={styles.image}
                    source={{ uri: item.imageUrl ? item.imageUrl : 'https://cdn-icons-png.flaticon.com/512/998/998718.png' }}
                />
            </View>
        </TouchableOpacity>
    );

    const handleItemClick = (item) => {
        navigation.navigate('Map', { item });
    };

    const onRefresh = () => {
        setRefreshing(true); // Установка состояния обновления в true
        fetchData(); // Вызов функции для загрузки данных
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shopping malls</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: '100%' }}
                refreshControl={ // Добавляем компонент RefreshControl
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 33,
        textAlign: 'center',
        color: '#333',
    },
    item: {
        backgroundColor: '#1e406c',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        padding: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 20,
        marginLeft: 10,
    },
    textContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#BDBDBD',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        fontSize: 14,
        color: '#003366',
        fontWeight: 'bold',
    },
});

export default MessagesScreen;
