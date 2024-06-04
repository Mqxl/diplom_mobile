// MallScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Polygon } from "react-native-maps";

const MallScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [outlets, setOutlets] = useState([]);

    useEffect(() => {
        // Выполнение запроса к API при монтировании компонента
        fetch('http://2.132.51.228:8088/gateway/websocket/api/v2/outlets')
            .then(response => response.json())
            .then(data => {
                // Фильтрация аутлетов по ID торгового центра
                const filteredOutlets = data.filter(outlet => outlet.mall.id === item.id);
                // Установка отфильтрованных аутлетов в состояние
                setOutlets(filteredOutlets);
            })
            .catch(error => console.error(error));
    }, [item.id]); // Обновление запроса при изменении ID торгового центра

    const coordinates = [
        { latitude: item.latitude1, longitude: item.longitude1 },
        { latitude: item.latitude1, longitude: item.longitude2 },
        { latitude: item.latitude2, longitude: item.longitude2 },
        { latitude: item.latitude2, longitude: item.longitude1 },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.defaultNotification}</Text>
                <FlatList
                    data={outlets}
                    keyExtractor={outlet => outlet.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.outletItem}
                            onPress={() => navigation.navigate('OutletDetails', { outlet: item })}
                        >
                            <Text style={styles.outletName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: item.latitude1,
                    longitude: item.longitude1,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}
            >
                <Polygon
                    coordinates={coordinates}
                    fillColor="rgba(0, 200, 0, 0.5)" // Цвет заливки полигона
                    strokeColor="rgba(0,0,0,0.5)" // Цвет линии полигона
                    strokeWidth={2} // Толщина линии полигона
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 20, // увеличенный отступ для отделения от карты
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    outletItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    outletName: {
        fontSize: 18,
    },
    map: {
        height: 200, // Высота карты
        marginBottom: 120,
    },
});


export default MallScreen;
