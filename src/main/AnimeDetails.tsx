import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { theme } from '../theme/colors';

export type AnimeDetailsParams = { animeId?: string };

type Props = NativeStackScreenProps<RootStackParamList, 'AnimeDetails'>;

const sampleCover = 'https://placehold.co/600x900/png';
const sampleEpisodeThumb = 'https://placehold.co/120x80/png';

const synopsis = `Sakura Haruka tidak mau berurusan dengan orang lemah. Dia hanya tertarik pada yang kuat. Dia baru saja masuk ke SMA Furin, sebuah sekolah...`;

const episodes = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  title: `Episode ${i + 1}`,
  duration: '24 Min',
}));

const AnimeDetails: React.FC<Props> = ({ navigation, route }) => {
  const { animeId } = route.params || {};
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero Poster */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: sampleCover }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTopRow}>
            <Pressable hitSlop={8} onPress={() => navigation.goBack()}><Text style={styles.navIcon}>←</Text></Pressable>
            <Pressable hitSlop={8}><Text style={styles.navIcon}>♡</Text></Pressable>
          </View>
          <View style={styles.heroBottom}>
            <Text style={styles.title} numberOfLines={2}>Wind Breaker Season 2</Text>
            <View style={styles.tagRow}>
              {['TV', 'Web Manga', 'CloverWorks'].map(t => (
                <View key={t} style={styles.tag}><Text style={styles.tagText}>{t}</Text></View>
              ))}
            </View>
            <Text style={styles.metaLine}>Action, Delinquents, School</Text>
            <View style={styles.scorePill}><Text style={styles.scoreLabel}>Score</Text><Text style={styles.scoreValue}>8.73</Text></View>
          </View>
        </View>

        {/* Body Card */}
        <View style={styles.bodyCard}>
          <Text style={styles.sectionTitle}>Sinopsis</Text>
          <Text style={styles.synopsis} numberOfLines={4}>{synopsis}<Text style={styles.readMore}> Read More</Text></Text>
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Episode List</Text>
          {episodes.map(ep => (
            <View key={ep.id} style={styles.episodeRow}>
              <Image source={{ uri: sampleEpisodeThumb }} style={styles.episodeThumb} />
              <View style={styles.episodeInfo}>
                <Text style={styles.episodeTitle}>{ep.title}</Text>
                <Text style={styles.episodeDuration}>{ep.duration}</Text>
              </View>
              <Pressable style={styles.playBtn} android_ripple={{ color: 'rgba(255,0,0,0.15)', borderless: true }}>
                <Text style={styles.playIcon}>▶</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background },
  scroll: { paddingBottom: 48 },
  heroWrap: { height: 340, width: '100%', position: 'relative' },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  heroTopRow: { position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  navIcon: { fontSize: 20, color: '#fff', fontFamily: 'Poppins-Bold' },
  heroBottom: { position: 'absolute', left: 16, right: 16, bottom: -70 },
  title: { fontSize: 20, lineHeight: 26, color: '#fff', fontFamily: 'Poppins-Bold' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 6 },
  tag: { backgroundColor: '#FFFFFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 10, fontFamily: 'Poppins-Medium', color: theme.text },
  metaLine: { fontSize: 10, color: '#E4E4E4', marginTop: 6, fontFamily: 'Poppins-Regular' },
  scorePill: { position: 'absolute', right: 0, top: 0, backgroundColor: theme.primary, paddingHorizontal: 10, paddingVertical: 6, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center' },
  scoreLabel: { fontSize: 10, fontFamily: 'Poppins-Regular', color: '#fff' },
  scoreValue: { fontSize: 12, fontFamily: 'Poppins-Bold', color: '#fff', marginTop: 2 },
  bodyCard: { marginTop: 90, backgroundColor: '#FFFFFF', paddingHorizontal: 18, paddingTop: 20, paddingBottom: 34, borderTopLeftRadius: 26, borderTopRightRadius: 26 },
  sectionTitle: { fontSize: 16, fontFamily: 'Poppins-Bold', color: theme.text, marginBottom: 12 },
  synopsis: { fontSize: 12, fontFamily: 'Poppins-Regular', color: theme.textDim, lineHeight: 18 },
  readMore: { color: theme.primary, fontFamily: 'Poppins-Medium' },
  episodeRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 14, marginTop: 12 },
  episodeThumb: { width: 54, height: 54, borderRadius: 10, backgroundColor: '#ddd', marginRight: 12 },
  episodeInfo: { flex: 1 },
  episodeTitle: { fontSize: 13, fontFamily: 'Poppins-Bold', color: theme.text },
  episodeDuration: { fontSize: 10, fontFamily: 'Poppins-Regular', color: theme.textDim, marginTop: 4 },
  playBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: theme.primary, alignItems: 'center', justifyContent: 'center' },
  playIcon: { color: theme.primary, fontSize: 14, fontFamily: 'Poppins-Bold' },
});

export default AnimeDetails;
