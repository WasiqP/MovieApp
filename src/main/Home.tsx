import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Pressable, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DrawerMenu from '../components/DrawerMenu';

interface Movie { id: string; title: string; image: string; badge?: string; rating?: string; name?: string }

const popularMock = [
  { id: '1', title: 'Oppenheimer', image: 'https://placehold.co/160x220/png', badge: '#1' },
  { id: '2', title: 'Spider-Man: Across...', image: 'https://placehold.co/160x220/png', badge: '#2' },
  { id: '3', title: 'Barbie', image: 'https://placehold.co/160x220/png', badge: '#3' },
  { id: '4', title: 'Guardians of the Galaxy', image: 'https://placehold.co/160x220/png', badge: '#4' },
];

const latestMock = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  title: ['The Batman', 'Top Gun: Maverick', 'Dune'][i % 3],
  image: 'https://placehold.co/120x160/png',
  rating: '8.65',
  name: ['Action', 'Drama', 'Sci-Fi'][i % 3],
}));

const genres = ['Action', 'Drama', 'Comedy', 'Thriller'];

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
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
    }, 300);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim]);

  console.log('Home component rendered, drawerVisible:', drawerVisible);

  const renderPopularItem = ({ item }: { item: Movie }) => (
    <Pressable onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })} style={styles.popularCard}>
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <View style={styles.popularGradient} />
      <View style={styles.popularBadge}><Text style={styles.popularBadgeText}>{item.badge}</Text></View>
      <Text style={styles.popularTitle} numberOfLines={1}>{item.title}</Text>
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
        <FlatList
          horizontal
          data={popularMock}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularList}
          renderItem={renderPopularItem}
        />
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <TextInput placeholder="Find what you are looking for?" placeholderTextColor={theme.textDim} style={styles.searchInput} />
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

        {/* Latest */}
  <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Trending Movies</Text>
        <View style={styles.latestGrid}>
          {latestMock.map(item => (
            <Pressable key={item.id} style={styles.latestCard} onPress={() => navigation.navigate('AnimeDetails', { animeId: String(item.id) })}>
              <Image source={{ uri: item.image }} style={styles.latestImage} />
              <Text style={styles.latestTitle} numberOfLines={2}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
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
  latestGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 14 },
  latestCard: { width: '31%', marginBottom: 22 },
  latestImage: { width: '100%', height: 110, borderRadius: 12, backgroundColor: '#ddd' },
  latestTitle: { fontSize: 10, color: theme.text, marginTop: 6, fontFamily: 'Poppins-Medium' },
});

export default Home;
