/**
 * Home Screen - CallMe TAILOR
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Bell,
  Check,
  Minus,
  Plus,
  Trash2,
  User,
  Lock,
  ShoppingBag,
  Globe,
  Accessibility,
  Home as HomeIcon,
  Scissors,
  ChevronRight,
} from 'lucide-react-native';
import { styles } from '../assets/style';
import HomeTab from './components/HomeTab';
import OrderTab from './components/OrderTab';
import ProfileTab from './components/ProfileTab';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
  Home: undefined;
  EditProfile: undefined;
  ProductDetails: undefined;
  TailorProfile: { tailorId?: string; tailorName?: string };
  Payment: {
    items: Array<{ id: string; name: string; price: number; qty: number }>;
  };
  Summary: {
    items: Array<{ id: string; name: string; price: number; qty: number }>;
  };
  Notification: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;



type TabType = 'home' | 'order' | 'profile';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  

  return (
    <View style={styles.container}>
      {activeTab === 'home' && <HomeTab />}

      {activeTab === 'order' && <OrderTab setActiveTab={setActiveTab} />}

      {activeTab === 'profile' && (
        <ProfileTab setActiveTab={setActiveTab}/>
      )}

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
        >
          <View
            style={[
              styles.tabIconWrap,
              activeTab !== 'home' && styles.tabIconWrapInactive,
            ]}
          >
            <HomeIcon
              size={24}
              color={activeTab === 'home' ? '#FFB200' : '#000000'}
              strokeWidth={2}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'home' && styles.tabLabelActive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('order')}
        >
          <View style={[styles.tabIconWrap, styles.tabIconWrapInactive]}>
            <Scissors
              size={24}
              color={activeTab === 'order' ? '#FFB200' : '#000000'}
              strokeWidth={2}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'order' && styles.tabLabelActive,
            ]}
          >
            Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('profile')}
        >
          <View
            style={[
              styles.tabIconWrap,
              activeTab !== 'profile' && styles.tabIconWrapInactive,
            ]}
          >
            <User
              size={24}
              color={activeTab === 'profile' ? '#FFB200' : '#000000'}
              strokeWidth={2}
            />
          </View>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'profile' && styles.tabLabelActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
