import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { base_url } from "../config/rest_config";

const MallScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [outlets, setOutlets] = useState([]);

    useEffect(() => {
        fetch(`http://${base_url}:8088/gateway/websocket/api/v2/outlets`)
            .then(response => response.json())
            .then(data => {
                const filteredOutlets = data.filter(outlet => outlet.mall.id === item.id);
                setOutlets(filteredOutlets);
            })
            .catch(error => console.error(error));
    }, [item.id]);

    const coordinates = [
        { latitude: item.latitude1, longitude: item.longitude1 },
        { latitude: item.latitude1, longitude: item.longitude2 },
        { latitude: item.latitude2, longitude: item.longitude2 },
        { latitude: item.latitude2, longitude: item.longitude1 },
    ];

    const handleOpenMap = () => {
        navigation.navigate('MallMap', { item, coordinates });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>{item.defaultNotification}</Text>
                </View>
                <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
                    <Ionicons name="map" size={30} color="#003366" />
                </TouchableOpacity>
                <Text style={styles.outletHeader}>Outlets</Text>
                <View style={styles.outletListContainer}>
                    <FlatList
                        data={outlets}
                        keyExtractor={outlet => outlet.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.outletItem}>
                                <Ionicons name="storefront" size={24} color="#003366" style={styles.storeIcon} />
                                <Text style={styles.outletName}>{item.name}</Text>
                                <TouchableOpacity
                                    style={styles.detailsButton}
                                    onPress={() => navigation.navigate('OutletDetails', { outlet: item })}
                                >
                                    <Text style={styles.detailsButtonText}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#003366',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#666666',
    },
    mapButton: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    outletHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#003366',
    },
    outletListContainer: {
        maxHeight: 250, // Set the max height for the outlet list
    },
    outletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    storeIcon: {
        marginRight: 10,
    },
    outletName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        flex: 1,
    },
    detailsButton: {
        backgroundColor: '#003366',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    detailsButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});

export default MallScreen;
