import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const [backPressed, setBackPressed] = useState(false);
    const handlePressInBack = () => setBackPressed(true);
    const handlePressOutBack = () => setBackPressed(false);
    const navigation = useNavigation();
    
    const handleBack = () => {
        navigation.goBack();
    };
    
    return (
        <View style={styles.top}>
            {/* <View style={styles.backButtonContainer}>
                <TouchableWithoutFeedback
                    onPressIn={handlePressInBack}
                    onPressOut={handlePressOutBack}
                    onPress={handleBack}
                >
                    <View style={[styles.back, backPressed && styles.backPressed]}>
                        <Image style={styles.icon} source={require('../../../assets/icons/back.png')} />
                    </View>
                </TouchableWithoutFeedback>
            </View> */}
            
            <View style={styles.titleContainer}>
                <Image source={require('./../../assets/icons/semestr.png')} style={styles.logo} />
                <Text style={styles.headerText}>YARIMİLLİK QİYMƏTLƏNDİRMƏ</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    top: {
        marginTop: 50,
        backgroundColor: 'rgba(231, 227, 227, 0.32)',
        width: '94%',
        marginHorizontal: '3%',
        flexDirection: 'row',
        paddingVertical: 10,
        shadowColor: 'rgba(182, 182, 182, 0.322)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    backButtonContainer: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -25 }],
        zIndex: 10,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
        textAlign: 'center',
    },
    buttons: {
        width: '94%',
        marginHorizontal: '3%',
        position: 'relative',
    },
    back: {
        width: 50,
        height: 50,
        backgroundColor: '#e7f4f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backPressed: {
        backgroundColor: '#c8e4e0', // Koyu renk tonu
    },
    icon: {
        width: 35,
        height: 35,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
        textAlign: 'center',
    },
    logo: {
        width: '10%',
        maxWidth: 60,
        height: 60,
        borderRadius: 5,
        resizeMode: 'contain',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#363636',
        textAlign: 'center',
        fontFamily: 'Calibri',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
});
