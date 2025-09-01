import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
// Replaced raster illustration with new vector version where hat & shirt colors are editable.
import GetStartedIllustration from '../../assets/images/GetStartedIllustration';
import GetStartedVector from '../../assets/images/GetStartedVector.svg';
import { theme } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;

const GetStarted: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.centerContent}>
        <View style={styles.illustrationWrap}>
          <GetStartedVector width={320} height={300} style={styles.bgVector} />
          <GetStartedIllustration width={250} height={200} />
        </View>
        <Text style={styles.welcome}>welcome to</Text>
        <Text style={styles.brand}><Text style={styles.brandAir}>Air</Text><Text style={styles.brandAnime}>Anime</Text></Text>
        <Text style={styles.subtitle}>Stream, track & discover anime you love.</Text>
        <Text style={styles.meta}>Binge the latest episodes, explore classics and build your ultimate watchlist.</Text>
        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryBtn} android_ripple={{ color: 'rgba(255,255,255,0.15)' }} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.primaryLabel}>Get Started</Text>
          </Pressable>
            <Pressable style={styles.secondaryBtn} android_ripple={{ color: 'rgba(255,0,0,0.08)' }} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.secondaryLabel}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background, paddingHorizontal: 28 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 16 },
  illustrationWrap: { alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 4, height: 260 },
  bgVector: { position: 'absolute' },
  welcome: { fontSize: 15, color: theme.textDim, fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 18 },
  brand: { fontSize: 44, fontWeight: '800', fontFamily: 'Poppins-Bold', marginTop: 4, textAlign: 'center' },
  brandAir: { color: theme.text },
  brandAnime: { color: theme.primary },
  subtitle: { marginTop: 6, fontSize: 14, color: theme.text, fontFamily: 'Poppins-Medium', textAlign: 'center' },
  meta: { marginTop: 10, fontSize: 12, lineHeight: 18, color: theme.textDim, textAlign: 'center', fontFamily: 'Poppins-Regular', paddingHorizontal: 8 },
  actionsRow: { flexDirection: 'row', gap: 14, marginTop: 26, marginBottom: 20 },
  primaryBtn: { flex: 1, backgroundColor: theme.primary, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  primaryLabel: { color: '#FFFFFF', fontSize: 15, fontWeight: '600', fontFamily: 'Poppins-Medium' },
  secondaryBtn: { flex: 1, borderWidth: 2, borderColor: theme.primary, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  secondaryLabel: { color: theme.primary, fontSize: 15, fontWeight: '600', fontFamily: 'Poppins-Medium' },
});

export default GetStarted;
