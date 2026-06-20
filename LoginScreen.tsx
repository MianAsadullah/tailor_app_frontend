/**
 * Login Screen Component
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
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage, Language } from './LanguageContext';
// import SewingMachineSvg from './img/sewing-machine.svg';
import Courier2Svg from './img/courier2.svg';
import GoogleLogoSvg from './img/googleLogo.svg';
import { User, ChevronDown, Globe } from 'lucide-react-native';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

// Reusable SVG Icon Component
interface SvgIconProps {
  SvgComponent: React.ComponentType<{ width: number; height: number }>;
  size: number;
  opacity?: number;
  aspectRatio: number;
}

const SvgIcon = ({
  SvgComponent,
  size,
  opacity = 1,
  aspectRatio,
}: SvgIconProps) => {
  const calculatedHeight = size / aspectRatio;
  return (
    <View style={{ width: size, height: calculatedHeight, opacity }}>
      <SvgComponent width={size} height={calculatedHeight} />
    </View>
  );
};

// Courier logo component (courier2.svg: 292×157)
const CourierLogo = ({ size = 60, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={Courier2Svg}
    size={size}
    opacity={opacity}
    aspectRatio={292 / 157}
  />
);

// Google logo component (googleLogo.svg: 22×22)
const GoogleLogo = ({ size = 22, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={GoogleLogoSvg}
    size={size}
    opacity={opacity}
    aspectRatio={22 / 22}
  />
);

const LoginScreen = () => {
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 360 || height < 700;

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { language, setLanguage, t } = useLanguage();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const handleLogin = () => {
    console.log('Login:', { loginMethod, email, phone, password });
    navigation.navigate('Home');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSendOtp = () => {
    if (!phone.trim()) return;
    console.log('Send OTP to:', phone);
    navigation.navigate('OTP', { phone: phone.trim() });
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: isSmallScreen ? 16 : 20 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { fontSize: isSmallScreen ? 22 : 24 }]}>
            {t('loginAccount')}
          </Text>
          <View style={styles.userIcon}>
            <User size={28} color="#190152" strokeWidth={2} />
          </View>
        </View>
        <View style={styles.flagContainer}>
          <TouchableOpacity
            style={styles.flagContainer}
            onPress={() => setShowLanguageOptions((prev) => !prev)}
            activeOpacity={0.8}
          >
            <View style={styles.flagIcon}>
              <Globe size={22} color="#190152" strokeWidth={2} />
            </View>
            <Text style={styles.languageText}>
              {language === 'English' ? t('languageEnglish') : t('languageUrdu')}
            </Text>
            <ChevronDown size={18} color="#190152" strokeWidth={2} />
          </TouchableOpacity>
          {showLanguageOptions && (
            <View style={styles.languageDropdown}>
              {(['English', 'Urdu'] as Language[]).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.languageOption}
                  onPress={() => {
                    setLanguage(option);
                    setShowLanguageOptions(false);
                  }}
                >
                  <Text style={styles.languageOptionText}>
                    {option === 'English' ? t('languageEnglish') : t('languageUrdu')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        </View>
      <View style={[styles.logoContainer, { marginBottom: isSmallScreen ? 20 : 30 }]}>
        <CourierLogo size={isSmallScreen ? 210 : 250} />
      </View>
      <Text style={styles.welcomeText}>{t('loginWelcome')}</Text>
      {/* Login Method Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            styles.emailTabActive,
            loginMethod === 'email' && styles.tabActive,
          ]}
          onPress={() => setLoginMethod('email')}
        >
          <Text
            style={[
              styles.tabText,
              loginMethod === 'email' && styles.tabTextActive,
            ]}
          >
            {t('emailTab')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            styles.phoneTabActive,
            loginMethod === 'phone' && styles.tabActive,
          ]}
          onPress={() => setLoginMethod('phone')}
        >
          <Text
            style={[
              styles.tabText,
              loginMethod === 'phone' && styles.tabTextActive,
            ]}
          >
            {t('phoneNumberTab')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        {loginMethod === 'email' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder={t('emailAddressPlaceholder')}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder={t('passwordPlaceholder')}
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.forgotPasswordLink}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>{t('login')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder={t('phoneNumberPlaceholder')}
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSendOtp}
            >
              <Text style={styles.loginButtonText}>{t('sendOtp')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Social Login Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>{t('orSignUpWith')}</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Google Login Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <View style={styles.googleIconWrap}>
          <GoogleLogo size={22} />
        </View>
        <Text style={styles.googleText}>{t('google')}</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t('noAccountYet')}{' '}
          <Text style={styles.createAccountLink} onPress={handleCreateAccount}>
            {t('createAccount')}
          </Text>
        </Text>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  userIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconText: {
    fontSize: 20,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  flagIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  languageText: {
    fontSize: 14,
    color: '#190152',
    marginRight: 4,
  },
  languageDropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 10,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  languageOptionText: {
    fontSize: 14,
    color: '#190152',
  },
  flagEmoji: {
    fontSize: 20,
  },
  flagArrow: {
    fontSize: 12,
    color: '#000000',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  tabActive: {
    backgroundColor: '#FFB200',
    borderColor: '#FFB200',
  },
  emailTabActive: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightWidth: 0,
    borderLeftWidth: 1,
  },
  phoneTabActive: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftWidth: 0,
  },
  tabText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  formContainer: {
    marginBottom: 20,
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
    marginBottom: 16,
    minHeight: 50,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    marginBottom: 0,
  },
  forgotPasswordLink: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  forgotPasswordText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#FFB200',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#666666',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleIconWrap: {
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#000000',
  },
  createAccountLink: {
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default LoginScreen;
