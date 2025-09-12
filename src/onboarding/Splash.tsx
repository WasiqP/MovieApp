import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { useTheme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: React.FC<Props> = ({ navigation }) => {
  const t = useTheme();
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 1, bounciness: 14 }),
    ]).start(() => {
      setTimeout(() => navigation.replace('Onboarding01'), 700);
    });
  }, [fade, scale, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }]}>      
      <StatusBar barStyle="light-content" />
      <Animated.View style={{ opacity: fade, transform: [{ scale }] }}>
        <Image 
          source={require('../../assets/images/MovieAppLogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.Text style={[styles.brand, { color: '#FFFFFF', opacity: fade }]}>AirCorn</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 120, height: 120 },
  brand: { marginTop: 24, fontSize: 32, fontWeight: '800', letterSpacing: 0.5, fontFamily: 'Poppins-Bold' },
});

export default Splash;