import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Enter App" onPress={() => navigation.replace('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24 },
});

export default Login;
