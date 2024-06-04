import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Polygon } from "react-native-maps";

const OutletDetailsScreen = ({ route }) => {
    const { outlet } = route.params;

    const coordinates = [
        { latitude: outlet.latitude1, longitude: outlet.longitude1 },
        { latitude: outlet.latitude1, longitude: outlet.longitude2 },
        { latitude: outlet.latitude2, longitude: outlet.longitude2 },
        { latitude: outlet.latitude2, longitude: outlet.longitude1 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{outlet.name}</Text>
            <Text style={styles.category}>Category: {outlet.category}</Text>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: outlet.latitude1,
                    longitude: outlet.longitude1,
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
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    category: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default OutletDetailsScreen;
