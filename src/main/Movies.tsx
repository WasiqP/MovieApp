import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Pressable, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTrendingMovies, useSearchMovies, usePopularMovies } from '../hooks/useMovies';
import { Movie } from '../services/api';
import apiService from '../services/api';

// Using API data now - remove mock data

const Movies: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [genres, setGenres] = useState<Array<{ id: number; name: string }>>([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // API hooks
  const { movies: trendingMovies, loading: trendingLoading, error: trendingError } = useTrendingMovies(1);
  const { movies: popularMovies, loading: popularLoading, error: popularError } = usePopularMovies(1);
  const { movies: searchResults, loading: searchLoading } = useSearchMovies(searchQuery);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setGenresLoading(true);
        const response = await apiService.getGenres();
        if (response.success) {
          setGenres(response.data);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setGenresLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    // Start animation when data is loaded
    if (!trendingLoading && !popularLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [trendingLoading, popularLoading, fadeAnim, slideAnim]);

  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsSearching(text.length > 0);
  };

  // Get display data based on search state
  const getDisplayMovies = () => {
    if (isSearching && searchQuery.length > 0) {
      return searchResults;
    }
    return popularMovies;
  };

  const renderTrendingItem = ({ item, index }: { item: Movie; index: number }) => (
    <Pressable 
      onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })} 
      style={styles.trendingCard}
    >
      <Image 
        source={{ 
          uri: item.posterPath || 'https://placehold.co/160x220/png' 
        }} 
        style={styles.trendingImage} 
      />
      <View style={styles.trendingGradient} />
      <View style={styles.trendingBadge}>
        <Text style={styles.trendingBadgeText}>#{index + 1}</Text>
      </View>
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.trendingMeta}>{item.releaseDate?.split('-')[0]} • {item.voteAverage.toFixed(1)}⭐</Text>
        <View style={styles.trendingRating}>
          <Text style={styles.trendingRatingText}>⭐ {item.voteAverage.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderNewReleaseItem = ({ item }: { item: Movie }) => (
    <Pressable 
      key={item.id} 
      style={styles.newReleaseCard} 
      onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })}
    >
      <Image 
        source={{ 
          uri: item.posterPath || 'https://placehold.co/120x160/png' 
        }} 
        style={styles.newReleaseImage} 
      />
      <View style={styles.newReleaseInfo}>
        <Text style={styles.newReleaseTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.newReleaseYear}>{item.releaseDate?.split('-')[0]}</Text>
        <View style={styles.newReleaseRating}>
          <Text style={styles.newReleaseRatingText}>⭐ {item.voteAverage.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header with back button */}
      <View style={styles.topHeader}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.topHeaderTitle}>Movies</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Header */}
          {/* <View style={styles.header}>
            <Text style={styles.headerTitle}>Movies</Text>
            <Text style={styles.headerSubtitle}>Discover amazing movies</Text>
          </View> */}

        {/* Search */}
        <View style={styles.searchWrap}>
          <TextInput 
            placeholder="Search movies..." 
            placeholderTextColor={theme.textDim} 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Text style={styles.searchIcon}>⌕</Text>
        </View>

        {/* Trending Movies */}
        <Text style={styles.sectionTitle}>Trending Movies</Text>
        {trendingLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>Loading trending movies...</Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={trendingMovies}
            keyExtractor={(item, index) => `trending-${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
            renderItem={renderTrendingItem}
            scrollEnabled={false}
          />
        )}

        {/* Movie Genres */}
        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Genres</Text>
        {genresLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.primary} />
            <Text style={styles.loadingText}>Loading genres...</Text>
          </View>
        ) : (
          <View style={styles.genresRow}>
            {genres.slice(0, 6).map(genre => (
              <Pressable key={genre.id} style={styles.genreChip} android_ripple={{ color: 'rgba(0,0,0,0.05)' }}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* New Releases / Search Results */}
        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>
          {isSearching ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
        </Text>
        
        {popularLoading || searchLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>Loading movies...</Text>
          </View>
        ) : (
          <FlatList
            data={getDisplayMovies()}
            renderItem={renderNewReleaseItem}
            keyExtractor={(item, index) => `popular-${item.id}-${index}`}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.newReleasesGrid}
            scrollEnabled={false}
          />
        )}
        
        {trendingError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load movies: {trendingError}</Text>
          </View>
        )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CARD_RADIUS = 14;
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: theme.primary,
    fontFamily: 'Poppins-Medium',
  },
  topHeaderTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    fontWeight:"bold",
    color: theme.text,
  },
  placeholder: {
    width: 60,
  },
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
  trendingList: { paddingVertical: 14, paddingRight: 8, paddingHorizontal: 1},
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
  newReleasesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 14, paddingHorizontal: 12 },
  newReleaseCard: { 
    width: '46%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: CARD_RADIUS, 
    marginBottom: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  newReleaseImage: { width: '100%', height: 180, backgroundColor: '#ddd' },
  newReleaseInfo: { padding: 12 },
  newReleaseTitle: { fontSize: 14, fontFamily: 'Poppins-Bold', color: theme.text, marginBottom: 6 },
  newReleaseYear: { fontSize: 12, fontFamily: 'Poppins-Regular', color: theme.textDim, marginBottom: 8 },
  newReleaseRating: { flexDirection: 'row', alignItems: 'center' },
  newReleaseRatingText: { fontSize: 12, fontFamily: 'Poppins-Medium', color: theme.primary },
  loadingContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 40 
  },
  loadingText: { 
    marginTop: 10, 
    fontSize: 12, 
    color: theme.textDim, 
    fontFamily: 'Poppins-Regular' 
  },
  errorContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 20,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginVertical: 10
  },
  errorText: { 
    fontSize: 12, 
    color: '#d32f2f', 
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
});

export default Movies;
