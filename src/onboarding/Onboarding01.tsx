import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding01'>;

const Onboarding01: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button title="Next" onPress={() => navigation.navigate('Onboarding02')} />
      <Button title="Skip" onPress={() => navigation.replace('Login')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#000' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 24, color: '#FF1111', fontFamily: 'Poppins-Bold' },
});

export default Onboarding01;
