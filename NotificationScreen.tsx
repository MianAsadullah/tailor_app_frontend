/**
 * Notification Screen
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Bell } from 'lucide-react-native';

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

type NotificationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Notification'
>;

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Order accepted',
    message: 'Rumah Mode Edelweis accepted your order request.',
    time: '5 min ago',
  },
  {
    id: '2',
    title: 'Payment reminder',
    message: 'Please complete payment for your latest cart.',
    time: '30 min ago',
  },
  {
    id: '3',
    title: 'New promo available',
    message: 'Get 10% discount for your next tailoring order.',
    time: 'Today',
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation<NotificationNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.headerBg}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#ffffff" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {NOTIFICATIONS.map(item => (
          <View key={item.id} style={styles.notificationCard}>
            <View style={styles.iconWrap}>
              <Bell size={18} color="#FFB200" strokeWidth={2} />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBg: {
    backgroundColor: '#FFB200',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: 8,
    minWidth: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF8E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  textWrap: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default NotificationScreen;
