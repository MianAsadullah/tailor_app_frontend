/**
 * Tailor / Provider Profile Screen
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  // Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Share2,
  Check,
  Star,
  MapPin,
  MessageCircle,
  ChevronRight,
} from 'lucide-react-native';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
};

type TailorProfileRouteProp = RouteProp<RootStackParamList, 'TailorProfile'>;
type TailorProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TailorProfile'
>;

const SERVICES = [
  { id: '1', name: 'ATASAN', detail: 'Order 7 - pengerjaan - 2 hari' },
  { id: '2', name: 'BAWAHAN', detail: 'Order 4 - pengerjaan - 2 hari' },
  { id: '3', name: 'TERUSAN', detail: 'Order 8 - pengerjaan - 2 hari' },
  { id: '4', name: 'PERBAIKAN', detail: 'Order 4 - pengerjaan - 2 hari' },
];

const COLLECTION_FILTERS = ['Pakaian', 'Aksesoris', 'Bahan', 'Wearable'];

const TailorProfileScreen = () => {
  const navigation = useNavigation<TailorProfileNavigationProp>();
  const route = useRoute<TailorProfileRouteProp>();
  const tailorName = route.params?.tailorName || 'El Modiste';

  const [activeFilter, setActiveFilter] = useState('Bahan');

  const handleBack = (): void => navigation.goBack();
  const handleShare = (): void => {};
  const handleOrder = (): void => {
    console.log('Order from tailor:', tailorName);
    navigation.goBack();
  };
  const handleChat = (): void => {
    console.log('Chat with tailor:', tailorName);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Light mint green */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#190152" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share2 size={24} color="#190152" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Profile section - on mint green */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.tailorName}>{tailorName}</Text>
              <View style={styles.verifiedBadge}>
                <View style={styles.verifiedCheckWrap}>
                  <Check size={12} color="#FFFFFF" strokeWidth={3} />
                </View>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
              <View style={styles.ratingLineRow}>
                <Star
                  size={14}
                  color="#000000"
                  fill="#000000"
                  strokeWidth={0}
                />
                <Text style={styles.ratingLine}>
                  {' '}
                  5 | Home Service | Drop Off
                </Text>
              </View>
              <View style={styles.locationLineRow}>
                <MapPin size={14} color="#666666" strokeWidth={2} />
                <Text style={styles.locationLine}> Pamekasan Jawa Timur</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content - White */}
        <View style={styles.content}>
          {/* Description */}
          <View style={styles.block}>
            <View style={styles.blockHeader}>
              <Text style={styles.blockTitle}>Description</Text>
              <TouchableOpacity>
                <Text style={styles.lihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.descriptionText}>
              For all your sewing needs
            </Text>
          </View>

          {/* Nilai & Ulasan */}
          <View style={styles.block}>
            <View style={styles.blockHeader}>
              <Text style={styles.blockTitle}>Nilai & Ulasan</Text>
              <TouchableOpacity>
                <Text style={styles.lihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.reviewerName}>Arista</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  size={14}
                  color="#000000"
                  fill="#000000"
                  strokeWidth={0}
                />
              ))}
            </View>
            <Text style={styles.reviewText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </Text>
          </View>

          {/* Jasa Jahit & Permak */}
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Jasa Jahit & Permak</Text>
            {SERVICES.map(service => (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceLeft}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDetail}>{service.detail}</Text>
                </View>
                <ChevronRight size={24} color="#666666" strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Koleksi */}
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Koleksi {tailorName}</Text>
            <View style={styles.filterRow}>
              {COLLECTION_FILTERS.map(filter => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterPill,
                    activeFilter === filter && styles.filterPillActive,
                  ]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      activeFilter === filter && styles.filterPillTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Bottom bar - dark purple */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <MessageCircle size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7EF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E0F7EF',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  headerButton: {
    padding: 8,
    minWidth: 40,
  },
  headerIcon: {
    fontSize: 24,
    color: '#190152',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#190152',
  },
  profileSection: {
    backgroundColor: '#E0F7EF',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    borderWidth: 3,
    borderColor: '#E6B800',
  },
  profileInfo: {
    flex: 1,
  },
  tailorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#60A5FA',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  verifiedCheckWrap: {
    marginRight: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingLine: {
    fontSize: 14,
    color: '#000000',
  },
  locationLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLine: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  block: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  lihatSemua: {
    fontSize: 14,
    color: '#666666',
  },
  descriptionText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 22,
  },
  reviewerName: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 22,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E0F7EF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  serviceLeft: {},
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  serviceDetail: {
    fontSize: 14,
    color: '#666666',
  },
  serviceArrow: {
    fontSize: 24,
    color: '#666666',
    fontWeight: '300',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  filterPill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
    marginRight: 8,
    marginBottom: 8,
  },
  filterPillActive: {
    backgroundColor: '#190152',
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#190152',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 28,
  },
  chatButton: {
    padding: 12,
    marginRight: 16,
  },
  chatIcon: {
    fontSize: 24,
  },
  orderButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TailorProfileScreen;
