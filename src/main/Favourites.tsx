import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, ScrollView, Animated } from 'react-native';
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
}

// Mock data for favorites - using same structure as Home.tsx
const favoritesMock = [
  { id: '1', title: 'Oppenheimer', image: 'https://placehold.co/160x220/png', rating: '9.2', name: 'Oppenheimer', subtitle: 'Biography, Drama' },
  { id: '2', title: 'The Batman', image: 'https://placehold.co/160x220/png', rating: '8.9', name: 'The Batman', subtitle: 'Action, Crime' },
  { id: '3', title: 'Top Gun: Maverick', image: 'https://placehold.co/160x220/png', rating: '8.7', name: 'Top Gun: Maverick', subtitle: 'Action, Drama' },
  { id: '4', title: 'Dune', image: 'https://placehold.co/160x220/png', rating: '9.1', name: 'Dune', subtitle: 'Sci-Fi, Adventure' },
  { id: '5', title: 'Spider-Man: No Way Home', image: 'https://placehold.co/160x220/png', rating: '8.5', name: 'Spider-Man: No Way Home', subtitle: 'Action, Adventure' },
  { id: '6', title: 'Black Widow', image: 'https://placehold.co/160x220/png', rating: '8.8', name: 'Black Widow', subtitle: 'Action, Adventure' },
];

const recentlyWatchedMock = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  title: ['The Batman', 'Top Gun: Maverick', 'Dune'][i % 3],
  image: 'https://placehold.co/120x160/png',
  rating: '8.65',
  name: ['Action', 'Drama', 'Sci-Fi'][i % 3],
  subtitle: ['Action, Crime', 'Action, Drama', 'Sci-Fi, Adventure'][i % 3],
}));

const Favourites: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
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
  }, [fadeAnim, slideAnim]);

  const renderFavoriteItem = ({ item }: { item: Movie }) => (
    <Pressable 
      onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })} 
      style={styles.favoriteCard}
    >
      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.favoriteSubtitle} numberOfLines={1}>{item.subtitle}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      <Pressable style={styles.removeButton} android_ripple={{ color: 'rgba(255,0,0,0.1)' }}>
        <Text style={styles.removeButtonText}>×</Text>
      </Pressable>
    </Pressable>
  );

  const renderRecentItem = ({ item }: { item: Movie }) => (
    <Pressable 
      onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })} 
      style={styles.recentCard}
    >
      <Image source={{ uri: item.image }} style={styles.recentImage} />
      <Text style={styles.recentTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
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
        <Text style={styles.topHeaderTitle}>My Favourites</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Header
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Favourites</Text>
            <Text style={styles.headerSubtitle}>{favoritesMock.length} saved items</Text>
          </View> */}

        {/* Favorites List */}
        {/* <Text style={styles.sectionTitle}>Saved Movies</Text> */}
        <FlatList
          data={favoritesMock}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
          scrollEnabled={false}
          contentContainerStyle={styles.favoritesList}
        />

        {/* Recently Watched */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Recently Watched</Text>
        <View style={styles.recentGrid}>
          {recentlyWatchedMock.map(item => (
            <Pressable 
              key={item.id} 
              style={styles.recentCard} 
              onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })}
            >
              <Image source={{ uri: item.image }} style={styles.recentImage} />
              <Text style={styles.recentTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
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
  sectionTitle: { fontSize: 18, fontFamily: 'Poppins-Bold', color: theme.text, marginTop: 18 },
  favoritesList: { paddingVertical: 8 },
  favoriteCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    borderRadius: CARD_RADIUS, 
    marginBottom: 12, 
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteImage: { width: 80, height: 100, borderRadius: 8, backgroundColor: '#ddd' },
  favoriteInfo: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  favoriteTitle: { fontSize: 16, fontFamily: 'Poppins-Bold', color: theme.text, marginBottom: 4 },
  favoriteSubtitle: { fontSize: 12, fontFamily: 'Poppins-Regular', color: theme.textDim, marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, fontFamily: 'Poppins-Medium', color: theme.primary },
  removeButton: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#FFE5E5', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginLeft: 8,
  },
  removeButtonText: { fontSize: 18, color: theme.primary, fontFamily: 'Poppins-Bold' },
  recentGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 14 },
  recentCard: { width: '31%', marginBottom: 22 },
  recentImage: { width: '100%', height: 110, borderRadius: 12, backgroundColor: '#ddd' },
  recentTitle: { fontSize: 10, color: theme.text, marginTop: 6, fontFamily: 'Poppins-Medium' },
  recentName: { fontSize: 9, color: theme.textDim, marginTop: 2, fontFamily: 'Poppins-Regular' },
});

export default Favourites;