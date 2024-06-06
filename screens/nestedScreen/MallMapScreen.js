import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Polygon } from "react-native-maps";

const MallMapScreen = ({ route }) => {
    const { item, coordinates } = route.params;

    return (
        <View style={styles.container}>
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
                    fillColor="rgba(0, 128, 255, 0.5)"
                    strokeColor="rgba(0, 0, 0, 0.5)"
                    strokeWidth={2}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MallMapScreen;
