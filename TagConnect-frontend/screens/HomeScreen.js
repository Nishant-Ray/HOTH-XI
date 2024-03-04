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

    const createLobby = () => {

    };

    const joinPublicLobby = () => {
        
    };

    function joinPrivateLobbyRoute(code) {
        console.log(code);
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

            <Pressable style={styles.playButton} onPress={createLobby}>
                <Text style={styles.playButtonText}>Create a Lobby</Text>
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
        marginTop: 120,
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
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#fa6161",
        alignSelf: "center",
    },
    playButtonText: {
        fontFamily: "Outfit_600SemiBold",
        fontSize: 28,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    tagContainer: {
        marginTop: 75,
        height: 250
    },
    tagPicture: {
        width: "100%",
        height: "100%",

    }
});

export default HomeScreen;