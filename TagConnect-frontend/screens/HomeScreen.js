import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { useUser } from './../UserContext';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A9E8BF',
  },
});

const HomeScreen = ({ navigation }) => {
  const { uid, setUid } = useUser();

  return (
    <View style={styles.screen}>
        <Text>Hello</Text>
    </View>
    
  );
};

export default HomeScreen;