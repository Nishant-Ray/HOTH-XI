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
import { useUser } from "./../UserContext";
import {
    useFonts,
    Righteous_400Regular,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
} from "@expo-google-fonts/dev";

const CreatePrivateLobbyScreen = ({ navigation }) => {
    let [fontsLoaded, fontError] = useFonts({
        Righteous_400Regular,
        Outfit_400Regular,
        Outfit_500Medium,
        Outfit_600SemiBold,
    });

    const [currentLocation, setCurrentLocation] = useState(null);
    const [lobbyID, setLobbyID] = useState(null);
    const [users, setUsers] = useState([]);

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

        async function fetchUsersWhoJoined() {
            try {
                const response = await fetch(
                    `${process.env.EXPO_PUBLIC_BACKEND_SERVER}/get-users-in-lobby`,
                    {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        lobbyId : lobbyID
                    }),
                    }
                );
        
                const data = await response.json();
        
                if (response.status == 200) {
                    setUsers(data.users);
                } else {
                    alert("Error finding users!");
                }
            } catch (error) {
                alert("Server error!");
                console.log(error);
            }
        }
        
        fetchData();

        const intervalId = setInterval(() => {
            fetchUsersWhoJoined();
        }, 5000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
        
    }, [])

    const { uid, setUid } = useUser();

    const startGame = () => {
        navigation.navigate("Map");
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.titleText}>Private Lobby Code:</Text>
            {lobbyID !== null ? (
                <Text style={styles.lobbyCodeText}>{lobbyID}</Text>
            ) : null}

            <ScrollView>
                {users.map((user, index) => (
                    <View style={styles.userBox}>
                        <Text style={styles.userText} key={index}>user</Text>
                    </View>
                ))}
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
        backgroundColor: "white",
        alignContent: "center",
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
    userBox: {
        backgroundColor: "#d1d1d1",
		width: "80%",
		paddingVertical: 10,
		marginBottom: 20,
    },
	userText: {
		fontFamily: "Outfit_600SemiBold",
        fontSize: 20,
	},
    playButton: {
        backgroundColor: "#fa6161",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "80%",
        marginTop: 0,
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

export default CreatePrivateLobbyScreen;
