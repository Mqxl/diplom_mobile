import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const PromotionDetailScreen = ({ route }) => {
    const { promotion } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={{ uri: promotion.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{promotion.title}</Text>
                    <Text style={styles.description}>{promotion.description}</Text>
                    <View style={styles.details}>
                        <Text style={styles.detailLabel}>Start Time:</Text>
                        <Text style={styles.detailValue}>{promotion.startTime}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.detailLabel}>End Time:</Text>
                        <Text style={styles.detailValue}>{promotion.endTime}</Text>
                    </View>
                    <Text style={styles.location}>{promotion.outlet.mall.name} - {promotion.outlet.name}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    detailsContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
        lineHeight: 24,
        color: '#555',
        textAlign: 'center',
    },
    details: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#777',
    },
    detailValue: {
        color: '#555',
    },
    location: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default PromotionDetailScreen;
