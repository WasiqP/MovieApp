import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';

const Profile: React.FC = () => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // Handle logout logic here
          console.log('User logged out');
        }}
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality would be implemented here');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings functionality would be implemented here');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Help and support functionality would be implemented here');
  };

  const ProfileItem = ({ icon, title, subtitle, onPress, showArrow = true }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
  }) => (
    <Pressable style={styles.profileItem} onPress={onPress} android_ripple={{ color: 'rgba(0,0,0,0.05)' }}>
      <View style={styles.profileItemLeft}>
        <Text style={styles.profileItemIcon}>{icon}</Text>
        <View style={styles.profileItemText}>
          <Text style={styles.profileItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <Text style={styles.profileItemArrow}>›</Text>}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://placehold.co/100x100/png' }} 
              style={styles.avatar} 
            />
            <Pressable style={styles.editAvatarButton}>
              <Text style={styles.editAvatarText}>✏️</Text>
            </Pressable>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Pressable style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Watched</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <ProfileItem
            icon="⚙️"
            title="Settings"
            subtitle="App preferences and notifications"
            onPress={handleSettings}
          />
          <ProfileItem
            icon="📊"
            title="Watch History"
            subtitle="View your watching progress"
            onPress={() => Alert.alert('Watch History', 'Watch history functionality would be implemented here')}
          />
          <ProfileItem
            icon="⭐"
            title="My Reviews"
            subtitle="Reviews and ratings you've given"
            onPress={() => Alert.alert('My Reviews', 'Reviews functionality would be implemented here')}
          />
          <ProfileItem
            icon="📱"
            title="Downloaded Content"
            subtitle="Manage offline downloads"
            onPress={() => Alert.alert('Downloads', 'Download management functionality would be implemented here')}
          />
        </View>

        {/* Support Section */}
        <View style={styles.optionsContainer}>
          <ProfileItem
            icon="❓"
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={handleHelp}
          />
          <ProfileItem
            icon="📄"
            title="Terms of Service"
            onPress={() => Alert.alert('Terms of Service', 'Terms of service would be displayed here')}
          />
          <ProfileItem
            icon="🔒"
            title="Privacy Policy"
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy would be displayed here')}
          />
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const CARD_RADIUS = 14;
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  header: { marginTop: 8, marginBottom: 16 },
  headerTitle: { fontSize: 24, fontFamily: 'Poppins-Bold', color: theme.text },
  userCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: CARD_RADIUS, 
    padding: 24, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd' },
  editAvatarButton: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    backgroundColor: theme.primary, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  editAvatarText: { fontSize: 12 },
  userName: { fontSize: 20, fontFamily: 'Poppins-Bold', color: theme.text, marginBottom: 4 },
  userEmail: { fontSize: 14, fontFamily: 'Poppins-Regular', color: theme.textDim, marginBottom: 16 },
  editProfileButton: { 
    backgroundColor: theme.primary, 
    paddingHorizontal: 24, 
    paddingVertical: 8, 
    borderRadius: 20 
  },
  editProfileText: { color: '#FFFFFF', fontSize: 12, fontFamily: 'Poppins-Medium' },
  statsContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    borderRadius: CARD_RADIUS, 
    padding: 20, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontFamily: 'Poppins-Bold', color: theme.primary, marginBottom: 4 },
  statLabel: { fontSize: 12, fontFamily: 'Poppins-Regular', color: theme.textDim },
  statDivider: { width: 1, backgroundColor: '#E5E5E5', marginHorizontal: 16 },
  optionsContainer: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: CARD_RADIUS, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  profileItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  profileItemIcon: { fontSize: 20, marginRight: 16 },
  profileItemText: { flex: 1 },
  profileItemTitle: { fontSize: 14, fontFamily: 'Poppins-Medium', color: theme.text, marginBottom: 2 },
  profileItemSubtitle: { fontSize: 12, fontFamily: 'Poppins-Regular', color: theme.textDim },
  profileItemArrow: { fontSize: 18, color: theme.textDim },
  logoutButton: { 
    backgroundColor: '#FFE5E5', 
    paddingVertical: 16, 
    borderRadius: CARD_RADIUS, 
    alignItems: 'center', 
    marginTop: 8,
    marginBottom: 20,
  },
  logoutButtonText: { color: theme.primary, fontSize: 16, fontFamily: 'Poppins-Medium' },
  versionText: { 
    textAlign: 'center', 
    fontSize: 12, 
    fontFamily: 'Poppins-Regular', 
    color: theme.textDim, 
    marginTop: 8 
  },
});

export default Profile;
