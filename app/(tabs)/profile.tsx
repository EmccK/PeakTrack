import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { Theme } from '@/constants/Theme';
import { router } from 'expo-router';
import { mountains } from '@/data/mountains';
import { LogOut, Settings, User, Award, Bell, Info, MapPin, Flag, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  
  // Demo climbed mountains
  const userClimbedMountains = isAuthenticated ? [1, 3] : [];
  const totalMountains = mountains.length;
  const climbedPercentage = (userClimbedMountains.length / totalMountains) * 100;
  
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>个人信息</Text>
        </View>
        
        <View style={styles.notAuthenticatedContainer}>
          <View style={styles.avatarPlaceholder}>
            <User size={64} color={Theme.colors.textLight} />
          </View>
          <Text style={styles.notAuthenticatedText}>登录以访问您的个人资料</Text>
          <View style={styles.authButtons}>
            <TouchableOpacity 
              style={[styles.authButton, styles.loginButton]}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.loginButtonText}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.authButton, styles.registerButton]}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.registerButtonText}>注册</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>个人信息</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileCard}>
        <View style={styles.profileCardHeader}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.profileImage}
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name || '登山爱好者'}</Text>
            <Text style={styles.userLocation}>中国, 北京</Text>
            
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>编辑资料</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userClimbedMountains.length}</Text>
            <Text style={styles.statLabel}>已登顶</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>成就</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.round(climbedPercentage)}%</Text>
            <Text style={styles.statLabel}>完成率</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionTitle}>
        <Award size={20} color={Theme.colors.primary} />
        <Text style={styles.sectionTitleText}>最近成就</Text>
      </View>
      
      <View style={styles.achievementCard}>
        <View style={[styles.achievementIconContainer, { backgroundColor: Theme.colors.primary }]}>
          <Flag size={24} color={Theme.colors.white} />
        </View>
        
        <View style={styles.achievementContent}>
          <Text style={styles.achievementName}>初次登顶</Text>
          <Text style={styles.achievementDescription}>完成第一次登山</Text>
          <Text style={styles.achievementDate}>2023年6月15日获得</Text>
        </View>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>设置</Text>
        
        <View style={styles.settingsOptions}>
          <TouchableOpacity style={styles.settingsOption}>
            <Bell size={20} color={Theme.colors.text} />
            <Text style={styles.settingsOptionText}>通知</Text>
            <ChevronRight size={20} color={Theme.colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsOption}>
            <Info size={20} color={Theme.colors.text} />
            <Text style={styles.settingsOptionText}>关于</Text>
            <ChevronRight size={20} color={Theme.colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingsOption}
            onPress={logout}
          >
            <LogOut size={20} color={Theme.colors.error} />
            <Text style={[styles.settingsOptionText, { color: Theme.colors.error }]}>退出登录</Text>
            <ChevronRight size={20} color={Theme.colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>山岳探险者 v1.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Theme.colors.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAuthenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Theme.colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  notAuthenticatedText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  authButtons: {
    flexDirection: 'row',
  },
  authButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  loginButton: {
    backgroundColor: Theme.colors.primary,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.primary,
  },
  profileCard: {
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileCardHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  editProfileButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.primary,
  },
  profileStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  statItem: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.text,
    marginLeft: 8,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.primary,
  },
  settingsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.text,
    marginBottom: 12,
  },
  settingsOptions: {
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  settingsOptionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
    marginLeft: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 100,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
});