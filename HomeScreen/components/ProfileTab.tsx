import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/style';
import {
  Accessibility,
  ArrowLeft,
  Bell,
  ChevronRight,
  Globe,
  Lock,
  ShoppingBag,
  User,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

const ProfileTab = ({ setActiveTab }: { setActiveTab: any }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView
      style={styles.profileScroll}
      contentContainerStyle={styles.profileScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header - Light green */}
      <View style={styles.profileHeader}>
        <TouchableOpacity
          style={styles.profileHeaderBack}
          onPress={() => setActiveTab('home')}
        >
          <ArrowLeft size={24} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.profileHeaderTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.profileHeaderBell}
          onPress={() => navigation.navigate('Notification')}
        >
          <Bell size={24} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Profile Section - White */}
      <View style={styles.profileSection}>
        <View style={styles.profileSectionWrapper}>
          <View style={styles.profileAvatarWrapper}>
            <View style={styles.profileAvatar} />
          </View>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings: Akun */}

      <View style={styles.settingsSection}>
        <View style={styles.settingsBlock}>
          <Text style={styles.settingsBlockTitle}>Akun</Text>
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsRowIconWrap}>
              <User size={20} color="#000000" strokeWidth={2} />
            </View>
            <Text style={styles.settingsRowLabel}>Akun</Text>
            <ChevronRight size={24} color="#999999" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsRowIconWrap}>
              <Lock size={20} color="#000000" strokeWidth={2} />
            </View>
            <Text style={styles.settingsRowLabel}>Privasi</Text>
            <ChevronRight size={24} color="#999999" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsRowIconWrap}>
              <ShoppingBag size={20} color="#000000" strokeWidth={2} />
            </View>
            <Text style={styles.settingsRowLabel}>Pesanan</Text>
            <ChevronRight size={24} color="#999999" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Settings: Tampilan */}
        <View style={styles.settingsBlock}>
          <Text style={styles.settingsBlockTitle}>Tampilan</Text>
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsRowIconWrap}>
              <Globe size={20} color="#000000" strokeWidth={2} />
            </View>
            <Text style={styles.settingsRowLabel}>Bahasa</Text>
            <ChevronRight size={24} color="#999999" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsRowIconWrap}>
              <Accessibility size={20} color="#000000" strokeWidth={2} />
            </View>
            <Text style={styles.settingsRowLabel}>Aksesibilitas</Text>
            <ChevronRight size={24} color="#999999" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Settings: Dukungan */}
        <View style={styles.settingsBlock}>
          <Text style={styles.settingsBlockTitle}>Dukungan</Text>
        </View>

        {/* Logout */}
        <View style={styles.settingsBlock}>
          <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
            <Text style={styles.logoutRowText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileBottomSpacer} />
      </View>
    </ScrollView>
  );
};

export default ProfileTab;
