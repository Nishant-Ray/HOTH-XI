import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useUser } from "./../UserContext";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 25,
    },
    mapContainer: {
        borderWidth: 5,
        borderColor: "black",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

const MapScreen = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const { uid, setUid } = useUser();

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords);
            setCurrentLocation(location.coords);

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        };

        getLocation();
    }, []);

    return (
        <View style={styles.screen}>
            <Text>Map:</Text>
            {initialRegion && (
                <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={initialRegion} showsUserLocation={true} ></MapView>
            )}
        </View>
    );
};

export default MapScreen;
