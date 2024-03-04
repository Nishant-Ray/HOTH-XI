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

const LobbyScreen = ({ navigation }) => {
  let [fontsLoaded, fontError] = useFonts({
    Righteous_400Regular,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [lobbyID, setLobbyID] = useState(null);

  
  
};

export default LobbyScreen;
