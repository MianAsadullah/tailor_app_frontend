/**
 * Summary Screen
 * @format
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Check } from 'lucide-react-native';

type SummaryItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

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
  Summary: { items: SummaryItem[] };
};

type SummaryRouteProp = RouteProp<RootStackParamList, 'Summary'>;
type SummaryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Summary'
>;

const FALLBACK_ITEMS: SummaryItem[] = [
  { id: '1', name: 'Batik Furry Tunik Sakura', price: 170000, qty: 1 },
  { id: '2', name: 'Gamis Brokat', price: 200000, qty: 1 },
  { id: '3', name: 'Gamis Crinkle Airflow', price: 195000, qty: 1 },
  { id: '4', name: 'Shimmer', price: 125000, qty: 1 },
];

const SERVICE_FEE = 3988;

const formatRupiah = (value: number) =>
  `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

const ACCENT = '#3A1078';

const SummaryScreen = () => {
  const navigation = useNavigation<SummaryNavigationProp>();
  const route = useRoute<SummaryRouteProp>();
  const items = route.params?.items?.length
    ? route.params.items
    : FALLBACK_ITEMS;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + SERVICE_FEE;

  return (
    <View style={styles.container}>
      <View style={styles.headerBg}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color={ACCENT} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Summary</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.stepperRow}>
          <View style={styles.stepperLine} />
          <View style={[styles.stepDot, styles.stepDone]}>
            <Check size={12} color="#FFFFFF" strokeWidth={3} />
          </View>
          <View style={[styles.stepCurrent]}>
            <View style={styles.stepCurrentInner} />
          </View>
          <View style={styles.stepPending} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Summary</Text>

          <View style={styles.itemsList}>
            {items.map(item => (
              <View style={styles.itemRow} key={item.id}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  {formatRupiah(item.price * item.qty)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>{formatRupiah(subtotal)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Services Fee</Text>
            <Text style={styles.priceValue}>{formatRupiah(SERVICE_FEE)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatRupiah(total)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.bottomLine} />

          <View style={styles.finalRow}>
            <Text style={styles.finalText}>Total price</Text>
            <Text style={styles.finalPrice}>{formatRupiah(total)}</Text>
          </View>

          <TouchableOpacity style={styles.payBtn}>
            <Text style={styles.payBtnText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBg: {
    backgroundColor: '#E0FAF8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: { padding: 8, minWidth: 40 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: ACCENT },
  headerRight: { width: 40 },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 8,
  },
  stepperLine: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 3,
    backgroundColor: ACCENT,
    top: 10,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ACCENT,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    zIndex: 1,
  },
  stepDone: { alignItems: 'center', justifyContent: 'center' },
  stepCurrent: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ACCENT,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepCurrentInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  stepPending: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: ACCENT,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 16,
  },
  itemsList: {
    gap: 12,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  itemPrice: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 16,
    marginHorizontal: 0,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  priceValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  totalLabel: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '700',
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginBottom: 16,
  },
  finalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  finalText: { fontSize: 18, fontWeight: '700', color: '#000000' },
  finalPrice: { fontSize: 22, fontWeight: '700', color: ACCENT },
  payBtn: {
    backgroundColor: ACCENT,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});

export default SummaryScreen;
