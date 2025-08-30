import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding02'>;

const Onboarding02: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <Button title="Next" onPress={() => navigation.navigate('Onboarding03')} />
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button title="Skip" onPress={() => navigation.replace('Login')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#000' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 24, color: '#FFFFFF', fontFamily: 'Poppins-Bold' },
});

export default Onboarding02;
