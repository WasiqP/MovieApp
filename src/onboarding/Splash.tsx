import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import Logo from '../assets/Logo';
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
    <View style={[styles.container, { backgroundColor: t.background }]}>      
      <StatusBar barStyle="light-content" />
      <Animated.View style={{ opacity: fade, transform: [{ scale }] }}>
        <Logo size={120} />
      </Animated.View>
  <Animated.Text style={[styles.brand, { color: t.primary, opacity: fade }]}>MovieApp</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  brand: { marginTop: 24, fontSize: 32, fontWeight: '800', letterSpacing: 0.5, fontFamily: 'Poppins-Bold' },
});

export default Splash;