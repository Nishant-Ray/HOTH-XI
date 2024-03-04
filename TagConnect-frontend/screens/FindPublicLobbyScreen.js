import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useUser } from "../UserContext";
import {
  useFonts,
  Righteous_400Regular,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
} from "@expo-google-fonts/dev";

const FindPublicLobbyScreen = ({ navigation }) => {
  let [fontsLoaded, fontError] = useFonts({
    Righteous_400Regular,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [lobbyID, setLobbyID] = useState(null);
  const [lobbies, setLobbies] = useState([]);

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
            `${process.env.EXPO_PUBLIC_BACKEND_SERVER}/find-lobby`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                location: currentLocation,
                radius: 2000
            }),
            }
        );

        const data = await response.json();

        if (response.status == 200) {
            setLobbyID(data.lobby);
        } else {
            alert("Error finding public lobbies!");
        }
        } catch (error) {
        alert("Server error!");
        console.log(error);
        }
    }

    fetchData();
  return (
    <div></div>
  );
};

export default FindPublicLobbyScreen;
