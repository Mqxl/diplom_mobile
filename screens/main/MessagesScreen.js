import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const MessagesScreen = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://192.168.31.205:8088/gateway/websocket/api/v2/malls', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpdmFuLml2YW5vdjQyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzEzOTMwMDc5LCJleHAiOjE3MTQ2MzAwNzl9.DLHOohe3ltkGtRQcG6uPrnAHvM3u50qo-1ga0gOtybY',
                },
            });
            const json = await response.json();
            setData(json);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <View style={styles.item}>
                <Feather name="chevron-right" size={24} color="#BDBDBD" />
                <Image
                    style={styles.image}
                    source={{ uri: item.image ? item.image : 'https://cdn-icons-png.flaticon.com/512/998/998718.png' }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    {/* Add other fields you want to display */}
                </View>
            </View>
        </TouchableOpacity>
    );

    const handleItemClick = (item) => {
        navigation.navigate('Map', { item });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Сообщения</Text>
            <Button title="Обновить" onPress={fetchData} />
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: '10%',
        height: '100%',
        resizeMode: 'stretch',
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MessagesScreen;
