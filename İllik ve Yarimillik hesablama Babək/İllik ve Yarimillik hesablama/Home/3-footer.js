import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';

export default function Footer() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [supportPressed, setSupportPressed] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={FooterStyles.footer}>
      <TouchableOpacity
        activeOpacity={1}
        style={[FooterStyles.supportBtn, supportPressed && FooterStyles.supportBtnActive]}
        onPressIn={() => setSupportPressed(true)}
        onPressOut={() => setTimeout(() => setSupportPressed(false), 200)}
      >
        <Image source={require('./icons/wallet.png')} style={FooterStyles.icon} />
        <Text style={FooterStyles.supportText}>DƏSTƏK OL</Text>
      </TouchableOpacity>

      <View style={FooterStyles.menuContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[FooterStyles.menuBtn, menuVisible && FooterStyles.menuBtnActive]}
          onPress={toggleMenu}
        >
          <Image source={require('./icons/menu.png')} style={FooterStyles.menuIcon} />
        </TouchableOpacity>

        {menuVisible && (
          <Animated.View
            style={[FooterStyles.menu, {
              opacity: animation,
              transform: [
                { scale: animation },
                { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
              ]
            }]}
          >
            <TouchableOpacity activeOpacity={0.8} style={FooterStyles.menuItem}>
              <Text style={FooterStyles.menuItemText}>Müəllif</Text>
            </TouchableOpacity>

            <View style={FooterStyles.divider} />

            <TouchableOpacity activeOpacity={0.8} style={FooterStyles.menuItem}>
              <Text style={FooterStyles.menuItemText}>Çıxış</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const FooterStyles = StyleSheet.create({
  footer: {
    width: '94%',
    height: 50,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'relative',
  },
  menuBtn: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#069790',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuBtnActive: {
    backgroundColor: '#e0f7f6',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menu: {
    position: 'absolute',
    bottom: 60,
    right: 0,
    backgroundColor: '#ffffff',
    borderColor: '#069790',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 3,
  },
  menuItem: {
    width: 150,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    alignSelf: 'center',
  },
  menuItemText: {
    color: '#069790',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Calibri',
  },
  supportBtn: {
    width: 140,
    height: 50,
    backgroundColor: '#069790',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 3,
  },
  supportBtnActive: {
    backgroundColor: '#048178',
  },
  supportText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
