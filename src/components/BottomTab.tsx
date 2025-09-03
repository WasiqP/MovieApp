import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { theme } from '../theme/colors';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TabItem {
  id: string;
  label: string;
  Icon: React.ComponentType<{ size: number; color: string; isActive: boolean }>;
}

interface BottomTabProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

// Modern SVG Icons
const HomeIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={color}
      strokeWidth={isActive ? 2.5 : 2}
      fill="none"
    />
  </Svg>
);

const MovieIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4Z"
      stroke={color}
      strokeWidth={isActive ? 2.5 : 2}
      fill="none"
    />
    <Path
      d="M7 2V6M17 2V6M2 9H22"
      stroke={color}
      strokeWidth={isActive ? 2.5 : 2}
      strokeLinecap="round"
    />
  </Svg>
);

const HeartIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z"
      stroke={color}
      strokeWidth={isActive ? 2.5 : 2}
      fill="none"
    />
  </Svg>
);

const ProfileIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={color}
      strokeWidth={isActive ? 2.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={color}
      strokeWidth={isActive ? 2.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const BottomTab: React.FC<BottomTabProps> = ({ activeTab, onTabPress }) => {
  const tabs: TabItem[] = [
    { id: 'Home', label: 'Home', Icon: HomeIcon },
    { id: 'Movies', label: 'Movies', Icon: MovieIcon },
    { id: 'Favourites', label: 'Favourites', Icon: HeartIcon },
    { id: 'Profile', label: 'Profile', Icon: ProfileIcon },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onTabPress(tab.id)}
              android_ripple={{ color: 'rgba(255,17,17,0.1)', borderless: true, radius: 30 }}
            >
              <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                <tab.Icon 
                  size={24} 
                  color={isActive ? theme.primary : theme.textDim} 
                  isActive={isActive}
                />
              </View>
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 16,
    marginHorizontal: 2,
    position: 'relative',
    minHeight: 60,
    justifyContent: 'center',
  },
  activeTab: {
    // Removed background color and scaling
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    // Removed background color and scaling
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: theme.textDim,
    textAlign: 'center',
    marginTop: 2,
  },
  activeTabLabel: {
    color: theme.primary,
    fontFamily: 'Poppins-Bold',
    fontSize: 11,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -15,
    width: 30,
    height: 3,
    backgroundColor: theme.primary,
    borderRadius: 2,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default BottomTab;