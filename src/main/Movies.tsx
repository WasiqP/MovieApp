import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Movie { 
  id: string; 
  title: string; 
  image: string; 
  badge?: string; 
  rating?: string; 
  name?: string;
  subtitle?: string;
  year?: string;
  duration?: string;
}

// Mock data for movies
const trendingMoviesMock = [
  { id: '1', title: 'Oppenheimer', image: 'https://placehold.co/160x220/png', badge: '#1', rating: '8.9', year: '2023', duration: '180 min' },
  { id: '2', title: 'Spider-Man: Across the Spider-Verse', image: 'https://placehold.co/160x220/png', badge: '#2', rating: '9.1', year: '2023', duration: '140 min' },
  { id: '3', title: 'Barbie', image: 'https://placehold.co/160x220/png', badge: '#3', rating: '8.7', year: '2023', duration: '114 min' },
  { id: '4', title: 'Guardians of the Galaxy Vol. 3', image: 'https://placehold.co/160x220/png', badge: '#4', rating: '8.4', year: '2023', duration: '150 min' },
];

const newReleasesMock = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  title: ['The Batman', 'Top Gun: Maverick', 'Dune'][i % 3],
  image: 'https://placehold.co/120x160/png',
  rating: '8.65',
  year: ['2022', '2022', '2021'][i % 3],
  duration: ['176 min', '131 min', '155 min'][i % 3],
  subtitle: ['Action, Crime', 'Action, Drama', 'Sci-Fi, Adventure'][i % 3],
}));

const movieGenres = ['Action', 'Romance', 'Fantasy', 'Drama', 'Comedy', 'Thriller'];

const Movies: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderTrendingItem = ({ item }: { item: Movie }) => (
    <Pressable 
      onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })} 
      style={styles.trendingCard}
    >
      <Image source={{ uri: item.image }} style={styles.trendingImage} />
      <View style={styles.trendingGradient} />
      <View style={styles.trendingBadge}><Text style={styles.trendingBadgeText}>{item.badge}</Text></View>
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.trendingMeta}>{item.year} • {item.duration}</Text>
        <View style={styles.trendingRating}>
          <Text style={styles.trendingRatingText}>⭐ {item.rating}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Movies</Text>
          <Text style={styles.headerSubtitle}>Discover amazing movies</Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <TextInput 
            placeholder="Search movies..." 
            placeholderTextColor={theme.textDim} 
            style={styles.searchInput} 
          />
          <Text style={styles.searchIcon}>⌕</Text>
        </View>

        {/* Trending Movies */}
        <Text style={styles.sectionTitle}>Trending Movies</Text>
        <FlatList
          horizontal
          data={trendingMoviesMock}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingList}
          renderItem={renderTrendingItem}
        />

        {/* Movie Genres */}
        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Genres</Text>
        <View style={styles.genresRow}>
          {movieGenres.map(genre => (
            <Pressable key={genre} style={styles.genreChip} android_ripple={{ color: 'rgba(0,0,0,0.05)' }}>
              <Text style={styles.genreText}>{genre}</Text>
            </Pressable>
          ))}
        </View>

        {/* New Releases */}
        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>New Releases</Text>
        <View style={styles.newReleasesGrid}>
          {newReleasesMock.map(item => (
            <Pressable 
              key={item.id} 
              style={styles.newReleaseCard} 
              onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })}
            >
              <Image source={{ uri: item.image }} style={styles.newReleaseImage} />
              <View style={styles.newReleaseInfo}>
                <Text style={styles.newReleaseTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.newReleaseYear}>{item.year}</Text>
                <View style={styles.newReleaseRating}>
                  <Text style={styles.newReleaseRatingText}>⭐ {item.rating}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CARD_RADIUS = 14;
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  header: { marginTop: 8, marginBottom: 8 },
  headerTitle: { fontSize: 24, fontFamily: 'Poppins-Bold', color: theme.text },
  headerSubtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: theme.textDim, marginTop: 4 },
  searchWrap: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E5E5E5', 
    borderRadius: 14, 
    paddingHorizontal: 14, 
    marginTop: 18, 
    backgroundColor: '#FFFFFF' 
  },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 12, fontFamily: 'Poppins-Regular', color: theme.text },
  searchIcon: { fontSize: 14 },
  sectionTitle: { fontSize: 18, fontFamily: 'Poppins-Bold', color: theme.text, marginTop: 18 },
  trendingList: { paddingVertical: 14, paddingRight: 8 },
  trendingCard: { 
    width: 160, 
    height: 220, 
    marginRight: 14, 
    borderRadius: CARD_RADIUS, 
    overflow: 'hidden', 
    backgroundColor: '#ddd' 
  },
  trendingImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  trendingGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  trendingBadge: { 
    position: 'absolute', 
    top: 8, 
    left: 8, 
    backgroundColor: theme.primary, 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  trendingBadgeText: { color: '#fff', fontSize: 11, fontFamily: 'Poppins-Bold' },
  trendingInfo: { position: 'absolute', left: 8, right: 8, bottom: 8 },
  trendingTitle: { color: '#fff', fontSize: 12, fontFamily: 'Poppins-Bold', marginBottom: 2 },
  trendingMeta: { color: '#E4E4E4', fontSize: 10, fontFamily: 'Poppins-Regular', marginBottom: 4 },
  trendingRating: { flexDirection: 'row', alignItems: 'center' },
  trendingRatingText: { color: '#fff', fontSize: 10, fontFamily: 'Poppins-Medium' },
  genresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  genreChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 30, backgroundColor: '#F4F4F4' },
  genreText: { fontSize: 11, fontFamily: 'Poppins-Medium', color: theme.text },
  newReleasesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 14 },
  newReleaseCard: { 
    width: '48%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: CARD_RADIUS, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  newReleaseImage: { width: '100%', height: 140, backgroundColor: '#ddd' },
  newReleaseInfo: { padding: 12 },
  newReleaseTitle: { fontSize: 12, fontFamily: 'Poppins-Bold', color: theme.text, marginBottom: 4 },
  newReleaseYear: { fontSize: 10, fontFamily: 'Poppins-Regular', color: theme.textDim, marginBottom: 6 },
  newReleaseRating: { flexDirection: 'row', alignItems: 'center' },
  newReleaseRatingText: { fontSize: 10, fontFamily: 'Poppins-Medium', color: theme.primary },
});

export default Movies;
