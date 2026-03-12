/**
 * Home Screen - CallMe TAILOR
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Courier2Svg from './img/home screen log.svg';
import {
  ArrowLeft,
  Bell,
  Banknote,
  Coins,
  Check,
  Star,
  Shirt,
  Clock,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
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

const CourierLogo = ({ size = 60, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={Courier2Svg}
    size={size}
    opacity={opacity}
    aspectRatio={292 / 157}
  />
);

// Placeholder data
const RECOMMENDED_TAILORS = [
  { id: '1', name: 'Rumah Mode Edelweis', rating: '5.0', orders: '153 order' },
  { id: '2', name: 'El Modiste', rating: '5.0', orders: '145 order' },
  { id: '3', name: 'Rumah Mode Edelweis', rating: '5.0', orders: '153 order' },
  { id: '4', name: 'Tailor Studio', rating: '4.9', orders: '98 order' },
];

const LATEST_NEWS = [
  {
    id: '1',
    title: 'Tren Baju Batik Wanita Untuk Setelan Kantor',
    tag: 'News',
    time: '2 bulan yang lalu',
  },
  {
    id: '2',
    title: 'Ide Outfit Untuk Kencan Sama Doi',
    tag: 'News',
    time: '5 bulan yang lalu',
  },
  {
    id: '3',
    title: 'Tips Memilih Kain Berkualitas',
    tag: 'News',
    time: '1 bulan yang lalu',
  },
];

const ORDER_ITEMS = [
  { id: '1', name: 'Batik Furry Tunik Sakura', price: 170000 },
  { id: '2', name: 'Gamis Brokat', price: 200000 },
  { id: '3', name: 'Gamis Crinkle Airflow', price: 195000 },
  { id: '4', name: 'Shimmer', price: 125000 },
];

type TabType = 'home' | 'order' | 'profile';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [orderItems, setOrderItems] = useState(ORDER_ITEMS);
  const [orderQty, setOrderQty] = useState<Record<string, number>>({
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
  });
  const [trashForId, setTrashForId] = useState<string | null>(null);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleQtyChange = (id: string, delta: number) => {
    setOrderQty(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleDeleteItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
    setTrashForId(null);
  };

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * (orderQty[item.id] || 1),
    0,
  );

  const formatRupiah = (value: number) =>
    `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  return (
    <View style={styles.container}>
      {activeTab === 'home' && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header: Logo + Welcome + Bell */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <CourierLogo size={180} />
            </View>
            <View style={styles.welcomeRow}>
              <View>
                <Text style={styles.selamatDatang}>Selamat Datang,</Text>
                <Text style={styles.userName}>Ari sugianto</Text>
              </View>
              <TouchableOpacity style={styles.bellButton}>
                <Bell size={24} color="#000000" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Balance & Points Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceLeft}>
              <Text style={styles.balanceLabel}>Saldo :</Text>
              <Text style={styles.balanceValue}>Rp. 100.000</Text>
              <Text style={styles.pointLabel}>Antar Point :</Text>
              <Text style={styles.pointValue}>100 point</Text>
            </View>
            <View style={styles.balanceActions}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIconWrap}>
                  <Banknote size={28} color="#000000" strokeWidth={2} />
                </View>
                <Text style={styles.actionLabel}>Add Saldo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIconWrap}>
                  <Coins size={28} color="#000000" strokeWidth={2} />
                </View>
                <Text style={styles.actionLabel}>Get Point</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Penjahit Rekomendasi */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Penjahit Rekomendasi</Text>
              <TouchableOpacity>
                <Text style={styles.lihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {RECOMMENDED_TAILORS.map(tailor => (
                <TouchableOpacity
                  key={tailor.id}
                  style={styles.tailorCard}
                  onPress={() =>
                    navigation.navigate('TailorProfile', {
                      tailorId: tailor.id,
                      tailorName: tailor.name,
                    })
                  }
                >
                  <View style={styles.avatarWrapper}>
                    <View style={styles.avatarPlaceholder} />
                    <View style={styles.verifiedBadge}>
                      <Check size={12} color="#FFFFFF" strokeWidth={3} />
                    </View>
                  </View>
                  <Text style={styles.tailorName} numberOfLines={2}>
                    {tailor.name}
                  </Text>
                  <View style={styles.tailorMeta}>
                    <View style={styles.tailorMetaRow}>
                      <Star
                        size={12}
                        color="#000000"
                        fill="#000000"
                        strokeWidth={0}
                      />
                      <Text style={styles.star}> {tailor.rating}</Text>
                    </View>
                    <View style={styles.tailorMetaRow}>
                      <Shirt size={12} color="#666666" strokeWidth={2} />
                      <Text style={styles.orderCount}> {tailor.orders}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Produk Pilihan - Featured Product */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Produk Pilihan</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetails')}
              >
                <Text style={styles.lihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              <TouchableOpacity
                style={styles.featuredProductCard}
                onPress={() => navigation.navigate('ProductDetails')}
              >
                <View style={styles.featuredProductImage} />
                <Text style={styles.featuredProductName} numberOfLines={2}>
                  Batik Furry Tunik Sakura
                </Text>
                <Text style={styles.featuredProductPrice}>Rp 170.000</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Berita Terkini */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Berita Terkini</Text>
              <TouchableOpacity>
                <Text style={styles.lihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {LATEST_NEWS.map(news => (
                <TouchableOpacity key={news.id} style={styles.newsCard}>
                  <View style={styles.newsImagePlaceholder} />
                  <Text style={styles.newsTitle} numberOfLines={3}>
                    {news.title}
                  </Text>
                  <View style={styles.newsFooter}>
                    <View style={styles.newsTag}>
                      <Text style={styles.newsTagText}>{news.tag}</Text>
                    </View>
                    <View style={styles.newsTimeRow}>
                      <Clock size={11} color="#666666" strokeWidth={2} />
                      <Text style={styles.newsTime}> {news.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}

      {activeTab === 'order' && (
        <View style={styles.myOrderContainer}>
          <View style={styles.myOrderHeaderBg}>
            <View style={styles.myOrderHeaderRow}>
              <TouchableOpacity
                onPress={() => setActiveTab('home')}
                style={styles.myOrderBackBtn}
              >
                <ArrowLeft size={24} color="#2E1065" strokeWidth={2} />
              </TouchableOpacity>
              <Text style={styles.myOrderTitle}>My order</Text>
              <View style={styles.myOrderHeaderRight} />
            </View>

            <View style={styles.myOrderStepperRow}>
              <View style={styles.myOrderStepperLine} />
              <View style={[styles.myOrderStepDot, styles.myOrderStepDone]}>
                <Check size={12} color="#FFFFFF" strokeWidth={3} />
              </View>
              <View style={styles.myOrderStepDot} />
              <View style={styles.myOrderStepDot} />
            </View>
          </View>

          <ScrollView
            style={styles.myOrderScroll}
            contentContainerStyle={styles.myOrderScrollContent}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => setTrashForId(null)}
          >
            {orderItems.map(item => (
              <View key={item.id} style={styles.myOrderRowWrap}>
                <TouchableOpacity
                  style={styles.myOrderCard}
                  activeOpacity={0.95}
                  onLongPress={() => setTrashForId(item.id)}
                  onPress={() => setTrashForId(null)}
                >
                  <View style={styles.myOrderImage} />
                  <View style={styles.myOrderInfo}>
                    <Text style={styles.myOrderItemName}>{item.name}</Text>
                    <Text style={styles.myOrderItemPrice}>
                      {formatRupiah(item.price)}
                    </Text>
                    <Text style={styles.myOrderItemEdit}>Edit</Text>
                  </View>
                  <View style={styles.myOrderQtyPill}>
                    <TouchableOpacity
                      style={styles.myOrderQtyBtn}
                      onPress={() => handleQtyChange(item.id, -1)}
                    >
                      <Minus size={16} color="#FFFFFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.myOrderQtyText}>
                      {orderQty[item.id] || 1}
                    </Text>
                    <TouchableOpacity
                      style={styles.myOrderQtyBtn}
                      onPress={() => handleQtyChange(item.id, 1)}
                    >
                      <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                {trashForId === item.id && (
                  <TouchableOpacity
                    style={styles.myOrderDeleteBtn}
                    onPress={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 size={20} color="#FFFFFF" strokeWidth={2} />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <View style={styles.myOrderDivider} />
            <View style={styles.myOrderTotalRow}>
              <Text style={styles.myOrderTotalLabel}>Total price</Text>
              <Text style={styles.myOrderTotalValue}>
                {formatRupiah(totalPrice)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.myOrderActionBtn}
              onPress={() =>
                navigation.navigate('Payment', {
                  items: orderItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    qty: orderQty[item.id] || 1,
                  })),
                })
              }
            >
              <Text style={styles.myOrderActionText}>Order</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {activeTab === 'profile' && (
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
            <TouchableOpacity style={styles.profileHeaderBell}>
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
      )}

      {/* Bottom Navigation Bar */}
      {activeTab !== 'order' && (
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
                color={activeTab === 'home' ? '#38A169' : '#000000'}
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
              <Scissors size={24} color="#000000" strokeWidth={2} />
            </View>
            <Text style={styles.tabLabel}>Order</Text>
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
                color={activeTab === 'profile' ? '#38A169' : '#000000'}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selamatDatang: {
    fontSize: 16,
    color: '#000000',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  bellButton: {
    padding: 8,
  },
  bellIcon: {
    fontSize: 24,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLeft: {},
  balanceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  pointLabel: {
    fontSize: 14,
    color: '#666666',
  },
  pointValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#38A169',
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
  },
  actionIconWrap: {
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  lihatSemua: {
    fontSize: 14,
    color: '#666666',
  },
  horizontalList: {
    paddingRight: 20,
  },
  tailorCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E0E0E0',
    borderWidth: 3,
    borderColor: '#D4AF37',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#190152',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tailorName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 6,
  },
  tailorMeta: {
    alignItems: 'center',
  },
  tailorMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  star: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 2,
  },
  orderCount: {
    fontSize: 11,
    color: '#666666',
  },
  featuredProductCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredProductImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E0E0E0',
  },
  featuredProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    padding: 12,
    paddingBottom: 4,
  },
  featuredProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  newsCard: {
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newsImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#E0E0E0',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    padding: 12,
    paddingBottom: 4,
  },
  newsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  newsTag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newsTagText: {
    fontSize: 11,
    color: '#666666',
  },
  newsTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsTime: {
    fontSize: 11,
    color: '#666666',
  },
  bottomSpacer: {
    height: 24,
  },
  // My Order tab styles (match attached design)
  myOrderContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  myOrderHeaderBg: {
    backgroundColor: '#DFF2EE',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
  },
  myOrderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  myOrderBackBtn: {
    padding: 8,
    minWidth: 40,
  },
  myOrderBackIcon: {
    fontSize: 24,
    color: '#2E1065',
  },
  myOrderTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2E1065',
  },
  myOrderHeaderRight: {
    width: 40,
  },
  myOrderStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 12,
  },
  myOrderStepperLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 3,
    backgroundColor: '#2E1065',
    top: 11,
  },
  myOrderStepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E1065',
    borderWidth: 6,
    borderColor: '#2E1065',
    zIndex: 1,
  },
  myOrderStepDone: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  myOrderStepCheck: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  myOrderScroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  myOrderScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  myOrderRowWrap: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 14,
  },
  myOrderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    flex: 1,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  myOrderImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  myOrderInfo: {
    flex: 1,
  },
  myOrderItemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2E1065',
    marginBottom: 4,
  },
  myOrderItemPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#F59E0B',
    marginBottom: 2,
  },
  myOrderItemEdit: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '400',
  },
  myOrderQtyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginLeft: 8,
    backgroundColor: 'transparent',
  },
  myOrderQtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E1065',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myOrderQtyIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 4,
  },
  myOrderQtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E1065',
    minWidth: 20,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  myOrderDeleteBtn: {
    width: 42,
    borderRadius: 22,
    marginLeft: 8,
    backgroundColor: '#2E1065',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myOrderDeleteIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  myOrderDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  myOrderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 18,
    paddingTop: 0,
    paddingHorizontal: 4,
  },
  myOrderTotalLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
  },
  myOrderTotalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  myOrderActionBtn: {
    backgroundColor: '#FFB200',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myOrderActionText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  // Profile tab styles
  profileScroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileScrollContent: {
    paddingBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFB200',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  profileHeaderBack: {
    padding: 8,
  },
  profileHeaderBackIcon: {
    fontSize: 24,
    color: '#000000',
  },
  profileHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  profileHeaderBell: {
    padding: 8,
  },
  profileSection: {
    backgroundColor: '#FFB200',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  profileSectionWrapper: {
    marginBottom: -126,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    marginBottom: 12,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  editProfileButton: {
    backgroundColor: '#FFB200',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsSection: {
    marginTop: 116,
  },
  settingsBlock: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  settingsBlockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingsRowIconWrap: {
    marginRight: 12,
  },
  settingsRowLabel: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  settingsRowArrow: {
    fontSize: 24,
    color: '#999999',
    fontWeight: '300',
  },
  profileBottomSpacer: {
    height: 24,
  },
  logoutRow: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutRowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B91C1C',
  },
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#190152',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabIconWrap: {
    marginBottom: 4,
  },
  tabIconWrapInactive: {
    opacity: 0.6,
  },
  tabLabel: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.6,
  },
  tabLabelActive: {
    color: '#38A169',
    fontWeight: '600',
    opacity: 1,
  },
});

export default HomeScreen;
