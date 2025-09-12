import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import { theme } from '../theme/colors';
import { useMovieDetails } from '../hooks/useMovies';

export type AnimeDetailsParams = { animeId?: string };

type Props = NativeStackScreenProps<RootStackParamList, 'AnimeDetails'>;

const AnimeDetails: React.FC<Props> = ({ navigation, route }) => {
  const { animeId } = route.params || {};
  const movieId = animeId ? parseInt(animeId) : null;
  const { movie, loading, error } = useMovieDetails(movieId);
  if (loading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={styles.loadingText}>Loading movie details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !movie) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load movie details</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero Poster */}
        <View style={styles.heroWrap}>
          <Image 
            source={{ 
              uri: movie.backdropPath || movie.posterPath || 'https://placehold.co/600x900/png' 
            }} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTopRow}>
            <Pressable hitSlop={8} onPress={() => navigation.goBack()}>
              <Text style={styles.navIcon}>←</Text>
            </Pressable>
            <Pressable hitSlop={8}>
              <Text style={styles.navIcon}>♡</Text>
            </Pressable>
          </View>
          <View style={styles.heroBottom}>
            <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
            <View style={styles.tagRow}>
              {movie.genres?.slice(0, 3).map(genre => (
                <View key={genre.id} style={styles.tag}>
                  <Text style={styles.tagText}>{genre.name}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.metaLine}>
              {movie.releaseDate?.split('-')[0]} • {movie.runtime} min
            </Text>
            <View style={styles.scorePill}>
              <Text style={styles.scoreLabel}>Score</Text>
              <Text style={styles.scoreValue}>{movie.voteAverage.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* Body Card */}
        <View style={styles.bodyCard}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsis} numberOfLines={6}>
            {movie.overview || 'No synopsis available.'}
          </Text>
          
          {movie.tagline && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Tagline</Text>
              <Text style={styles.taglineText}>"{movie.tagline}"</Text>
            </>
          )}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Movie Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Release Date:</Text>
            <Text style={styles.infoValue}>{movie.releaseDate || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Runtime:</Text>
            <Text style={styles.infoValue}>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rating:</Text>
            <Text style={styles.infoValue}>{movie.voteAverage.toFixed(1)}/10 ({movie.voteCount} votes)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{movie.status || 'N/A'}</Text>
          </View>
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
  loadingContainer: { 
    flex: 1, 
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
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  errorText: { 
    fontSize: 16, 
    color: '#d32f2f', 
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 8
  },
  errorSubtext: { 
    fontSize: 12, 
    color: theme.textDim, 
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 20
  },
  retryButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium'
  },
  taglineText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: theme.text,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: theme.textDim,
    flex: 1
  },
  infoValue: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: theme.text,
    flex: 2,
    textAlign: 'right'
  },
});

export default AnimeDetails;
