import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Pressable, Image, Alert } from 'react-native';
import { useUser } from './../UserContext';
import * as Location from "expo-location";
import {
    useFonts,
    Righteous_400Regular,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
} from "@expo-google-fonts/dev";

const CreatePublicLobbyScreen = ({ navigation }) => {
    let [fontsLoaded, fontError] = useFonts({
        Righteous_400Regular,
        Outfit_400Regular,
        Outfit_500Medium,
        Outfit_600SemiBold,
    });

    const [currentLocation, setCurrentLocation] = useState(null);
    const [lobbyID, setLobbyID] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords);
            setCurrentLocation(location.coords);

            try {
                const response = await fetch(
                    `${process.env.EXPO_PUBLIC_BACKEND_SERVER}/create-lobby`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            location: currentLocation,
                            isPrivate: false,
                        }),
                    }
                );
    
                const data = await response.json();
    
                if (response.status == 200) {
                    setLobbyID(data.lobby)
                } else {
                    alert("Error creating public lobby!");
                }
            } catch (error) {
                alert("Server error!");
                console.log(error);
            }
        }
        
        fetchData();
        
    }, [])

    const { uid, setUid } = useUser();

    const startGame = () => {
        navigation.navigate("Map");
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.titleText}>Public Lobby Code:</Text>
            {lobbyID !== null ? (
                <Text style={styles.lobbyCodeText}>{lobbyID}</Text>
            ) : null}

            <ScrollView>

            </ScrollView>
            
            <Pressable style={styles.playButton} onPress={startGame}>
                <Text style={styles.playButtonText}>Start Game</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: "center"
    },
    titleText: {
        fontFamily: "Outfit_600SemiBold",
        fontSize: 56,
        marginTop: 80,
        marginBottom: 30,
        color: "#fa6161",
        alignSelf: "center",
    },
    lobbyCodeText: {
        fontFamily: "Outfit_600SemiBold",
        fontSize: 40,
        marginTop: 80,
        marginBottom: 30,
        color: "black",
        alignSelf: "center",
    },  
    playButton: {
        backgroundColor: "#fa6161",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "80%",
        marginTop: 25,
        marginBottom: 0,
        borderRadius: 5,
        backgroundColor: "#fa6161",
        alignSelf: "center",
    },
    playButtonText: {
        fontFamily: "Outfit_600SemiBold",
        fontSize: 22,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default CreatePublicLobbyScreen;