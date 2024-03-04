import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Pressable, Image, Alert } from 'react-native';
import tagImage from "./../assets/tag.png";
import { useUser } from './../UserContext';
import {
    useFonts,
    Righteous_400Regular,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
} from "@expo-google-fonts/dev";

const HomeScreen = ({ navigation }) => {
    let [fontsLoaded, fontError] = useFonts({
        Righteous_400Regular,
        Outfit_400Regular,
        Outfit_500Medium,
        Outfit_600SemiBold,
    });

    const { uid, setUid } = useUser();

    const createPublicLobby = () => {
        navigation.navigate("CreatePublicLobby");
    };

    const createPrivateLobby = () => {
        navigation.navigate("CreatePrivateLobby");
    };

    const joinPublicLobby = () => {
        navigation.navigate("FindPublicLobby");
    };

    function joinPrivateLobbyRoute(lobbyId) {
        async function fetchData() {
          try {
            const response = await fetch(
              `${process.env.EXPO_PUBLIC_BACKEND_SERVER}/join-lobby`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  code: lobbyId
                }),
              }
            );

            const data = await response.json();

            if (response.status == 200) {
              setLobbyID(data.lobby);
            } else {
              alert("Error joining private lobby!");
            }
          } catch (error) {
            alert("Server error!");
            console.log(error);
          }
        }

        fetchData();
        navigation.navigate("LobbyScreen");
    };

    const joinPrivateLobby = () => {
        Alert.prompt(
            "Join Private Lobby",
            "Enter lobby code to join!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "OK",
                onPress: code => joinPrivateLobbyRoute(code)
              }
            ],
            'plain-text'
        );
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.titleText}>TagConnect</Text>

            <Pressable style={styles.playButton} onPress={createPublicLobby}>
                <Text style={styles.playButtonText}>Create a Public Lobby</Text>
            </Pressable>

            <Pressable style={styles.playButton} onPress={createPrivateLobby}>
                <Text style={styles.playButtonText}>Create a Private Lobby</Text>
            </Pressable>

            <Pressable style={styles.playButton} onPress={joinPublicLobby}>
                <Text style={styles.playButtonText}>Join a Public Lobby</Text>
            </Pressable>

            <Pressable style={styles.playButton} onPress={joinPrivateLobby}>
                <Text style={styles.playButtonText}>Join a Private Lobby</Text>
            </Pressable>
            
            <View style={styles.tagContainer}>
                <Image source={tagImage} style={styles.tagPicture} />
            </View>
            
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
        fontFamily: "Righteous_400Regular",
        fontSize: 56,
        marginTop: 80,
        marginBottom: 30,
        color: "#fa6161",
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
    tagContainer: {
        marginTop: 85,
        height: 250
    },
    tagPicture: {
        width: "100%",
        height: "100%",

    }
});

export default HomeScreen;