import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { mountains } from '@/data/mountains';
import { Theme } from '@/constants/Theme';
import { ChevronLeft, MapPin, Clock, Flag, Camera, Calendar, Shield, Mountain } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';

export default function MountainDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mountainId = parseInt(id);
  const mountain = mountains.find(m => m.id === mountainId);
  const { isAuthenticated, isLoading, markAsClimbed } = useAuth();
  
  const [selectedRoute, setSelectedRoute] = useState(0);
  
  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  if (!mountain) {
    return (
      <View style={styles.errorContainer}>
        <Mountain size={64} color={Theme.colors.textLight} />
        <Text style={styles.errorText}>找不到该山峰信息</Text>
        <TouchableOpacity 
          style={styles.backToHomeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backToHomeButtonText}>返回首页</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const handleClimbed = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('需要相机权限来上传您的登顶照片！');
        return;
      }
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      markAsClimbed(mountainId);
      router.push('/achievements');
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image 
            source={{ uri: mountain.images[0] }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay} />
          
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color={Theme.colors.white} />
            </TouchableOpacity>
            
            <View style={styles.mountainInfo}>
              <Text style={styles.mountainName}>{mountain.name}</Text>
              <View style={styles.mountainLocation}>
                <MapPin size={16} color={Theme.colors.white} style={{ marginRight: 4 }} />
                <Text style={styles.locationText}>{mountain.region}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Mountain size={20} color={Theme.colors.primary} />
              <Text style={styles.statValue}>{mountain.elevation}m</Text>
              <Text style={styles.statLabel}>海拔</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Shield size={20} color={Theme.colors.primary} />
              <Text style={styles.statValue}>{mountain.difficulty}</Text>
              <Text style={styles.statLabel}>难度</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Flag size={20} color={Theme.colors.primary} />
              <Text style={styles.statValue}>{mountain.routes.length}</Text>
              <Text style={styles.statLabel}>路线</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>山峰介绍</Text>
            <Text style={styles.description}>{mountain.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>登山路线</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.routeTabs}
            >
              {mountain.routes.map((route, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.routeTab,
                    selectedRoute === index && styles.selectedRouteTab
                  ]}
                  onPress={() => setSelectedRoute(index)}
                >
                  <Text 
                    style={[
                      styles.routeTabText,
                      selectedRoute === index && styles.selectedRouteTabText
                    ]}
                  >
                    {route.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <View style={[
                  styles.routeDifficultyBadge,
                  { backgroundColor: getDifficultyColor(mountain.routes[selectedRoute].difficulty) }
                ]}>
                  <Text style={styles.routeDifficultyText}>
                    {mountain.routes[selectedRoute].difficulty}
                  </Text>
                </View>
                
                <View style={styles.routeTime}>
                  <Clock size={16} color={Theme.colors.textLight} style={{ marginRight: 4 }} />
                  <Text style={styles.routeTimeText}>
                    约 {mountain.routes[selectedRoute].duration}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.routeDescription}>
                {mountain.routes[selectedRoute].description}
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>登山照片</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imageGallery}
            >
              {mountain.images.map((image, index) => (
                <Image 
                  key={index}
                  source={{ uri: image }}
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Calendar size={20} color={Theme.colors.primary} />
              <Text style={styles.sectionTitle}>最佳登山时间</Text>
            </View>
            <Text style={styles.seasonText}>{mountain.bestSeason}</Text>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color={Theme.colors.primary} />
              <Text style={styles.sectionTitle}>安全提示</Text>
            </View>
            <Text style={styles.safetyText}>{mountain.safetyTips}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.markAsClimbedButton,
            isAuthenticated && { marginRight: 12 }
          ]}
          onPress={handleClimbed}
        >
          {isAuthenticated ? (
            <>
              <Flag size={20} color={Theme.colors.white} style={{ marginRight: 8 }} />
              <Text style={styles.markAsClimbedButtonText}>标记为已登顶</Text>
            </>
          ) : (
            <Text style={styles.markAsClimbedButtonText}>登录以记录登顶</Text>
          )}
        </TouchableOpacity>
        
        {isAuthenticated && (
          <TouchableOpacity style={styles.uploadPhotoButton}>
            <Camera size={20} color={Theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case '低':
      return Theme.colors.success;
    case '中':
      return Theme.colors.warning;
    case '高':
      return Theme.colors.error;
    case '极高':
      return '#D00000';
    default:
      return Theme.colors.text;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Theme.colors.background,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    marginTop: 16,
    marginBottom: 24,
  },
  backToHomeButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backToHomeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  mountainInfo: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    right: 16,
  },
  mountainName: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: Theme.colors.white,
    marginBottom: 8,
  },
  mountainLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.white,
  },
  content: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 16,
    marginTop: -40,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.text,
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.text,
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
    lineHeight: 24,
  },
  routeTabs: {
    paddingBottom: 12,
  },
  routeTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: Theme.colors.cardBackground,
  },
  selectedRouteTab: {
    backgroundColor: Theme.colors.primary,
  },
  routeTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
  },
  selectedRouteTabText: {
    color: Theme.colors.white,
    fontFamily: 'Inter-SemiBold',
  },
  routeCard: {
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    padding: 16,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routeDifficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  routeDifficultyText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  routeTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeTimeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
  routeDescription: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
    lineHeight: 22,
  },
  imageGallery: {
    paddingBottom: 8,
  },
  galleryImage: {
    width: 280,
    height: 180,
    borderRadius: 12,
    marginRight: 12,
  },
  seasonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
    lineHeight: 24,
  },
  safetyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: Theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  markAsClimbedButton: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 0,
  },
  markAsClimbedButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  uploadPhotoButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
});