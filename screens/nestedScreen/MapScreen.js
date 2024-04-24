import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({route}) => {
    const { item } = route.params;
    return <View style={styles.container}>
        <MapView
            style={{flex: 1}}
            initialRegion={{
                latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.006,
            }}
        >
            <Marker
                coordinate={{latitude: item.latitude, longitude: item.longitude}}
                title="Travel photo"
            />
        </MapView>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;