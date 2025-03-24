import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const MenuButton = ({ imageSource, text, onPress }) => {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.button, pressed && styles.buttonActive]}
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            activeOpacity={1}
        >
            <Image source={imageSource} style={styles.icon} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '48%',
        height: 115,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b4ded7',
        borderRadius: 5,
        paddingTop: 15,
        paddingHorizontal: 10,
        shadowColor: 'rgba(161, 160, 160, 1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 3,
    },
    buttonActive: {
        backgroundColor: '#8fcdc4',
    },
    icon: {
        position: 'absolute',
        top: 15,
        width: 20,
        height: 20,
        borderRadius: 1,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#363636',
        textAlign: 'center',
        fontFamily: 'Arial', // Calibri əvəzinə
    },
});

export default MenuButton;
