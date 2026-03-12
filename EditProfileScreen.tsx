/**
 * Edit Profile Screen
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Share2 } from 'lucide-react-native';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
  Home: undefined;
  EditProfile: undefined;
};

type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const [username, setUsername] = useState('Ari_SGT');
  const [email, setEmail] = useState('arisugianto698@gmail.com');
  const [phone, setPhone] = useState('+6285279311524');
  const [password, setPassword] = useState('evFTbyVVCd');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    // Share profile or link
  };

  const handleChangePicture = () => {
    // Open image picker
  };

  const handleUpdate = () => {
    console.log('Update profile:', { username, email, phone });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header - Light mint green */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#190152" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
          <Share2 size={24} color="#190152" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile picture section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar} />
          </View>
          <TouchableOpacity onPress={handleChangePicture}>
            <Text style={styles.changePictureText}>Change Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Form - White background */}
        <View style={styles.formSection}>
          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email I'd</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB200',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFB200',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  headerButton: {
    padding: 8,
    minWidth: 40,
  },
  headerBackIcon: {
    fontSize: 24,
    color: '#190152',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#190152',
  },
  headerShareIcon: {
    fontSize: 22,
    color: '#190152',
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#FFB200',
  },
  avatarWrapper: {
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  changePictureText: {
    fontSize: 16,
    color: '#190152',
    fontWeight: '500',
  },
  formSection: {
    marginTop: 0,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
  },
  updateButton: {
    backgroundColor: '#FFB200',
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0,
  },
});

export default EditProfileScreen;
