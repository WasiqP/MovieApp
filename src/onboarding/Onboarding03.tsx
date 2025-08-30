import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding03'>;

const Onboarding03: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Start Streaming</Text>
      <Button title="Finish" onPress={() => navigation.replace('Login')} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#000' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 24, color: '#FFFFFF', fontFamily: 'Poppins-Bold' },
});

export default Onboarding03;
