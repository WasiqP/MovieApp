import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Pressable, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DrawerMenu from '../components/DrawerMenu';
import { usePopularMovies, useTrendingMovies, useSearchMovies } from '../hooks/useMovies';
import { Movie } from '../services/api';

// Remove old interface and mock data - using API data now

const genres = ['Action', 'Drama', 'Comedy', 'Thriller'];

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // API hooks
  const { movies: popularMovies, loading: popularLoading, error: popularError } = usePopularMovies(1);
  const { movies: trendingMovies, loading: trendingLoading, error: trendingError } = useTrendingMovies(1);
  const { movies: searchResults, loading: searchLoading } = useSearchMovies(searchQuery);

  useEffect(() => {
    // Start animation when data is loaded
    if (!popularLoading && !trendingLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [popularLoading, trendingLoading, fadeAnim, slideAnim]);

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
    return trendingMovies;
  };

  console.log('Home component rendered, drawerVisible:', drawerVisible);

  const renderPopularItem = ({ item, index }: { item: Movie; index: number }) => (
    <Pressable onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })} style={styles.popularCard}>
      <Image 
        source={{ 
          uri: item.posterPath || 'https://placehold.co/160x220/png' 
        }} 
        style={styles.popularImage} 
      />
      <View style={styles.popularGradient} />
      <View style={styles.popularBadge}>
        <Text style={styles.popularBadgeText}>#{index + 1}</Text>
      </View>
      <Text style={styles.popularTitle} numberOfLines={1}>{item.title}</Text>
    </Pressable>
  );

  const renderTrendingItem = ({ item }: { item: Movie }) => (
    <Pressable 
      key={item.id} 
      style={styles.latestCard} 
      onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })}
    >
      <Image 
        source={{ 
          uri: item.posterPath || 'https://placehold.co/120x160/png' 
        }} 
        style={styles.latestImage} 
      />
      <Text style={styles.latestTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.latestRating}>⭐ {item.voteAverage.toFixed(1)}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header with menu button */}
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingLight}>Hello,</Text>
          <Text style={styles.greetingName}>User</Text>
        </View>
        
        {/* Center Logo */}
        <View style={styles.headerCenter}>
          <Text style={styles.logoText}>
            <Text style={styles.logoAir}>Air</Text>
            <Text style={styles.logoCorn}>Corn</Text>
          </Text>
        </View>
        
        <Pressable 
          style={styles.menuButton} 
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            console.log('Menu button pressed, setting drawerVisible to true');
            setDrawerVisible(true);
          }}
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </Pressable>
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Popular Section */}
          <Text style={styles.sectionTitle}>Popular</Text>
        {popularLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>Loading popular movies...</Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={popularMovies}
            keyExtractor={(item, index) => `popular-${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
            renderItem={renderPopularItem}
            scrollEnabled={false}
          />
        )}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <TextInput 
            placeholder="Find what you are looking for?" 
            placeholderTextColor={theme.textDim} 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Text style={styles.searchIcon}>⌕</Text>
        </View>

        {/* Genres */}
        <View style={styles.genresRow}>
          {genres.map(g => (
            <Pressable key={g} style={styles.genreChip} android_ripple={{ color: 'rgba(0,0,0,0.05)' }}>
              <Text style={styles.genreText}>{g}</Text>
            </Pressable>
          ))}
        </View>

        {/* Trending Movies */}
        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>
          {isSearching ? `Search Results for "${searchQuery}"` : 'Trending Movies'}
        </Text>
        
        {trendingLoading || searchLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>Loading movies...</Text>
          </View>
        ) : (
          <FlatList
            data={getDisplayMovies()}
            renderItem={renderTrendingItem}
            keyExtractor={(item, index) => `trending-${item.id}-${index}`}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.latestGrid}
            scrollEnabled={false}
          />
        )}
        
        {popularError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load movies: {popularError}</Text>
          </View>
        )}
        </Animated.View>
      </ScrollView>
      
      {/* Drawer Menu */}
      <DrawerMenu 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
        navigation={navigation}
      />
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
  headerLeft: {
    flex: 0.8,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontFamily: 'Poppins-Black',
    letterSpacing: 1,
  },
  logoAir: {
    color: '#000000',
    fontWeight: "bold"
  },
  logoCorn: {
    color: '#FF0000',
    fontWeight: "bold"
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  menuButtonText: {
    fontSize: 18,
    color: theme.text,
    fontFamily: 'Poppins-Bold',
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  greetingWrap: { marginTop: 8 },
  greetingLight: { fontSize: 12, color: theme.textDim, fontFamily: 'Poppins-Regular' },
  greetingName: { fontSize: 16, color: theme.primary, fontFamily: 'Poppins-Bold', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontFamily: 'Poppins-Bold', color: theme.text, marginTop: 18 },
  popularList: { paddingVertical: 14, paddingRight: 8 },
  popularCard: { width: 140, height: 190, marginRight: 14, borderRadius: CARD_RADIUS, overflow: 'hidden', backgroundColor: '#ddd' },
  popularImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  popularGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  popularBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: theme.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  popularBadgeText: { color: '#fff', fontSize: 11, fontFamily: 'Poppins-Bold' },
  popularTitle: { position: 'absolute', bottom: 10, left: 10, right: 10, color: '#fff', fontSize: 11, fontFamily: 'Poppins-Medium' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: -4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E0E0E0' },
  dotActive: { backgroundColor: theme.primary },
  searchWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 14, paddingHorizontal: 14, marginTop: 18, backgroundColor: '#FFFFFF' },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 12, fontFamily: 'Poppins-Regular', color: theme.text },
  searchIcon: { fontSize: 14 },
  genresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  genreChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 30, backgroundColor: '#F4F4F4' },
  genreText: { fontSize: 11, fontFamily: 'Poppins-Medium', color: theme.text },
  latestGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 14, paddingHorizontal: 12 },
  latestCard: { width: '46%', marginBottom: 24, marginHorizontal: 4 },
  latestImage: { width: '100%', height: 160, borderRadius: 12, backgroundColor: '#ddd' },
  latestTitle: { fontSize: 12, color: theme.text, marginTop: 8, fontFamily: 'Poppins-Medium' },
  latestRating: { fontSize: 10, color: theme.primary, marginTop: 4, fontFamily: 'Poppins-Medium' },
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

export default Home;
