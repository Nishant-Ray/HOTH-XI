import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
} from "react-native";
import { useUser } from "./../UserContext";
import {
    useFonts,
    Righteous_400Regular,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
} from "@expo-google-fonts/dev";

const SignUpScreen = ({ navigation }) => {
    let [fontsLoaded, fontError] = useFonts({
        Righteous_400Regular,
        Outfit_400Regular,
        Outfit_500Medium,
        Outfit_600SemiBold,
    });

    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { uid, setUid } = useUser();

    if (!fontsLoaded || fontError) {
        console.log("Error loading fonts");
    }

    const handleSignup = async () => {

        if (newEmail == "" || newName == "" || newPassword == "") {
            alert("Please enter an email, name, and password!");
            return;
        }

        // Actual authentication logic using the backend server
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_SERVER}/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: newEmail,
                        name: newName,
                        password: newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setNewEmail("");
                setNewName("");
                setNewPassword("");
                setUid(data.uid);
                navigation.navigate("Home");
            } else {
                alert("An account with that email already exists!");
            }
        } catch (error) {
            alert("Server error!");
            console.log(error);
        }
    };

    const fakeHandleSignup = () => {
        setNewEmail("");
        setNewName("");
        setNewPassword("");
        //setUid(data.uid);
        navigation.navigate("Home");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigateToLogin = () => {
        // Navigate to the SignUpScreen
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>TagConnect</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.formDiv}>
                    <Text style={styles.welcomeText}>Create an Account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={"gray"}
                        onChangeText={(text) => setNewEmail(text)}
                        value={newEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor={"gray"}
                        onChangeText={(text) => setName(text)}
                        value={newName}
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor={"gray"}
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => setPassword(text)}
                            value={newPassword}
                        />
                        <Pressable style={styles.showPasswordButton}
                            onPress={togglePasswordVisibility}
                        >
                            <Text style={styles.showPasswordText}>{showPassword ? "Hide" : "Show"}</Text>
                        </Pressable>
                    </View>

                    <Pressable style={styles.signUpButton} onPress={fakeHandleSignup}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </Pressable>

                    <Text style={styles.loginInfo}>Already have an account?</Text>

                    <Pressable style={styles.loginButton} onPress={navigateToLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    header: {
        backgroundColor: "white",
        width: "100%",
        height: 200,
        alignItems: "flex-end",
    },
    titleText: {
        fontFamily: "Righteous_400Regular",
        fontSize: 56,
        marginTop: 100,
        color: "#fa6161",
        alignSelf: "center",
    },
    formContainer: {
        backgroundColor: "white",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    formDiv: {
        backgroundColor: "white",
        paddingTop: 50,
        width: "75%",
        alignItems: "left",
    },
    welcomeText: {
        fontFamily: "Outfit_500Medium",
        fontSize: 28,
        marginBottom: 20,
        color: "#333330", // Updated text color
    },
    input: {
        height: 60,
        width: "100%",
        backgroundColor: "white",
        color: "#333333",
        paddingHorizontal: 15,
        fontSize: 20,
        marginBottom: 20,
        backgroundColor: "#ffb8b8",
        borderRadius: 7,
        fontFamily: "Outfit_400Regular",
        overflow: "hidden",
        alignSelf: "center",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
        backgroundColor: "#ffb8b8",
        borderRadius: 7,
        alignSelf: "center",
    },
    passwordInput: {
        flex: 1,
        height: 60,
        paddingLeft: 15,
        color: "#333333",
        fontSize: 20,
        fontFamily: "Outfit_400Regular",
        overflow: "hidden",
        alignSelf: "center",
    },
    showPasswordButton: {
        paddingRight: 10
    },
    showPasswordText: {
        color: "#1f8df2",
        fontFamily: "Outfit_600SemiBold",
        fontSize: 18,
    },
    signUpButton: {
        backgroundColor: "#fa6161",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "100%",
        marginTop: 25,
        marginBottom: 40,
        borderRadius: 5,
        backgroundColor: "#fa6161",
        alignSelf: "center",
    },
    signUpButtonText: {
        fontFamily: "Outfit_600SemiBold",
        fontSize: 20,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    loginInfo: {
        color: "#333333",
        fontSize: 18,
        fontFamily: "Outfit_500Medium",
        alignSelf: "center",
    },
    loginButton: {
        backgroundColor: "#ffffff",
        alignSelf: "center",
    },
    loginButtonText: {
        color: "#fa6161",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Outfit_500Medium",
        textDecorationLine: "underline",
    },
});

export default SignUpScreen;