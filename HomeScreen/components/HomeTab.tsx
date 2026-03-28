import React from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import { styles } from '../../assets/style'
import { Banknote, Bell, Check, Clock, Coins, Shirt, Star } from 'lucide-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Courier2Svg from '../../img/home screen log.svg';
import { LATEST_NEWS, RECOMMENDED_TAILORS } from '../../assets/mockdata';


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


const HomeTab = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();


    const CourierLogo = ({ size = 60, opacity = 1 }) => (
        <SvgIcon
          SvgComponent={Courier2Svg}
          size={size}
          opacity={opacity}
          aspectRatio={292 / 157}
        />
      );

  return (
    <View style={styles.myOrderContainer}>
    <View style={styles.bgcontainerWrapper}>
      {/* Header: Logo + Welcome + Bell */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <CourierLogo size={180} />
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => navigation.navigate('Notification')}
          >
            <Bell size={30} color="#000000" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.welcomeRow}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>Mian Asad</Text>
        </View>
      </View>

      {/* Balance & Points Card */}
      <View style={styles.balanceCardWrapper}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceLeft}>
            <View>
              <Text style={styles.balanceLabel}>Balance : </Text>
              <Text style={styles.pointLabel}>Antar Point :</Text>
            </View>
            <View>
              <Text style={styles.balanceValue}>Rp. 100.000</Text>
              <Text style={styles.pointValue}>100 point</Text>
            </View>
          </View>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconWrap}>
                <Banknote size={28} color="#000000" strokeWidth={2} />
              </View>
              <Text style={styles.actionLabel}>Add Balance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconWrap}>
                <Coins size={28} color="#000000" strokeWidth={2} />
              </View>
              <Text style={styles.actionLabel}>Get Point</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Penjahit Rekomendasi */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Tailor</Text>
          <TouchableOpacity>
            <Text style={styles.lihatSemua}>See All</Text>
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
          <Text style={styles.sectionTitle}>Latest News</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetails')}
          >
            <Text style={styles.lihatSemua}>See All</Text>
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
            <Text style={styles.lihatSemua}>See All</Text>
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
  </View>
  )
}

export default HomeTab