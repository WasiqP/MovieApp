import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Svg, { Path } from 'react-native-svg';

type Props = NativeStackScreenProps<RootStackParamList, 'AboutUs'>;

// SVG Icons
const MovieIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 4V20L17 12L7 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SmartphoneIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M12 18H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 21L16.65 16.65"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TwitterIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95718 14.8821 3.28445C14.0247 3.61172 13.2884 4.19439 12.773 4.95371C12.2575 5.71303 11.9877 6.61232 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39524C5.36074 6.60467 4.01032 5.43865 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FacebookIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InstagramIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 11.37C16.1234 12.2022 15.9812 13.0522 15.5937 13.8021C15.2062 14.5519 14.5931 15.1639 13.8416 15.5293C13.0901 15.8946 12.2384 15.9957 11.4077 15.8178C10.5771 15.6399 9.80976 15.1923 9.21484 14.5337C8.61992 13.8752 8.22522 13.0422 8.08001 12.15C8.08001 10.79 8.08001 9.4 8.08001 8.02C8.22522 7.12795 8.61992 6.29489 9.21484 5.63636C9.80976 4.97783 10.5771 4.53022 11.4077 4.35234C12.2384 4.17445 13.0901 4.27559 13.8416 4.64095C14.5931 5.00631 15.2062 5.61826 15.5937 6.36812C15.9812 7.11798 16.1234 7.96798 16 8.8V11.37Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M17.5 6.5H17.51" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const HeartIcon = ({ size = 24, color = theme.text }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AboutUs: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Trigger animations on mount
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
      }),
    ]).start();
  }, []);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.animatedContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Welcome to AirCorn</Text>
            <Text style={styles.sectionDescription}>
              We are passionate about bringing you the best movie experience. Our app provides 
              access to thousands of movies, TV shows, and documentaries from around the world.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.sectionDescription}>
              To make entertainment accessible to everyone, everywhere. We believe that great 
              stories should be available to all, regardless of location or device.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What We Offer</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <MovieIcon size={24} color={theme.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Latest Movies</Text>
                  <Text style={styles.featureDescription}>Access to the newest releases and trending content</Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <StarIcon size={24} color={theme.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Personalized Recommendations</Text>
                  <Text style={styles.featureDescription}>AI-powered suggestions based on your preferences</Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <SmartphoneIcon size={24} color={theme.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Cross-Platform</Text>
                  <Text style={styles.featureDescription}>Watch on any device, anywhere, anytime</Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <SearchIcon size={24} color={theme.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Smart Search</Text>
                  <Text style={styles.featureDescription}>Find exactly what you're looking for with our advanced search</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Team</Text>
            <Text style={styles.sectionDescription}>
              We're a team of movie enthusiasts, developers, and designers who are dedicated 
              to creating the best possible experience for our users. Our diverse backgrounds 
              help us understand and serve our global community.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connect With Us</Text>
            <View style={styles.socialLinks}>
              <Pressable 
                style={styles.socialButton}
                onPress={() => handleLinkPress('https://twitter.com/aircorn')}
              >
                <TwitterIcon size={20} color={theme.primary} />
                <Text style={styles.socialText}>Twitter</Text>
              </Pressable>
              
              <Pressable 
                style={styles.socialButton}
                onPress={() => handleLinkPress('https://facebook.com/aircorn')}
              >
                <FacebookIcon size={20} color={theme.primary} />
                <Text style={styles.socialText}>Facebook</Text>
              </Pressable>
              
              <Pressable 
                style={styles.socialButton}
                onPress={() => handleLinkPress('https://instagram.com/aircorn')}
              >
                <InstagramIcon size={20} color={theme.primary} />
                <Text style={styles.socialText}>Instagram</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Version</Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.sectionDescription}>
              Built with <HeartIcon size={16} color="#FF0000" /> using React Native
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
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
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: theme.text,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  animatedContent: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: theme.text,
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.textDim,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  featureList: {
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: theme.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: theme.textDim,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  socialText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: theme.text,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: theme.primary,
    marginBottom: 8,
  },
});

export default AboutUs;
