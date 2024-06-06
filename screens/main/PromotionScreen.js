import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { base_url } from "../config/rest_config";

const PromotionScreen = ({ navigation }) => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        setRefreshing(true);
        try {
            const response = await fetch(`http://${base_url}:8088/gateway/websocket/api/v2/sales`);
            const data = await response.json();
            setPromotions(data);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const navigateToDetail = (promotion) => {
        navigation.navigate('PromotionDetail', { promotion });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Promotions</Text>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchPromotions}
                    />
                }
            >
                {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    promotions.map((promotion) => (
                        <TouchableOpacity key={promotion.id} onPress={() => navigateToDetail(promotion)}>
                            <View style={styles.promotionContainer}>
                                <View style={styles.promotionInfo}>
                                    <Text style={styles.promotionTitle}>{promotion.title}</Text>
                                    <Text style={styles.description}>{promotion.description}</Text>
                                    <Text style={styles.location}>{promotion.outlet.mall.name} - {promotion.outlet.name}</Text>
                                </View>
                                <Image
                                    source={{ uri: promotion.imageUrl || 'https://cdn-icons-png.flaticon.com/512/7650/7650815.png' }}
                                    style={styles.promotionImage}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
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
    scrollView: {
        flexGrow: 1,
    },
    promotionContainer: {
        backgroundColor: '#1e406c',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    promotionInfo: {
        flex: 1,
    },
    promotionTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
        fontSize: 16,
    },
    description: {
        color: '#fff',
        marginBottom: 5,
        fontSize: 14,
    },
    location: {
        color: '#fff',
        fontSize: 12,
    },
    promotionImage: {
        width: 120,
        height: 120,
        borderRadius: 20,
        marginLeft: 10,
    },
});

export default PromotionScreen;
