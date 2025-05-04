import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Theme } from '@/constants/Theme';
import { mountains } from '@/data/mountains';
import { ChevronRight, Trophy, Award, Flag, Star, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function AchievementsScreen() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'achievements' | 'climbed'>('achievements');
  
  // Demo user achievements
  const userAchievements = [
    { id: 1, name: '初次登顶', description: '完成第一次登山', icon: <Flag size={24} color={Theme.colors.white} />, progress: 1, total: 1, completed: true, color: Theme.colors.primary },
    { id: 2, name: '山岳探险家', description: '登顶5座不同的山峰', icon: <Award size={24} color={Theme.colors.white} />, progress: 3, total: 5, completed: false, color: Theme.colors.secondary },
    { id: 3, name: '高海拔征服者', description: '登顶海拔超过4000米的山峰', icon: <Trophy size={24} color={Theme.colors.white} />, progress: 0, total: 1, completed: false, color: Theme.colors.accent },
    { id: 4, name: '五岳完成者', description: '登顶中国五岳', icon: <Star size={24} color={Theme.colors.white} />, progress: 1, total: 5, completed: false, color: Theme.colors.warning },
  ];
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }
  
  // Demo climbed mountains
  const userClimbedMountains = isAuthenticated ? [1, 3] : [];
  const climbedMountainsData = mountains.filter(m => userClimbedMountains.includes(m.id));
  
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>成就</Text>
        </View>
        
        <View style={styles.notAuthenticatedContainer}>
          <Trophy size={64} color={Theme.colors.textLight} />
          <Text style={styles.notAuthenticatedText}>登录以追踪你的登山成就</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginButtonText}>登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const renderAchievementItem = ({ item }: { item: any }) => (
    <View style={styles.achievementCard}>
      <View style={[styles.achievementIconContainer, { backgroundColor: item.color }]}>
        {item.icon}
      </View>
      
      <View style={styles.achievementContent}>
        <View style={styles.achievementHeader}>
          <Text style={styles.achievementName}>{item.name}</Text>
          {item.completed && <CheckCircle2 size={18} color={Theme.colors.success} />}
        </View>
        
        <Text style={styles.achievementDescription}>{item.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${(item.progress / item.total) * 100}%`, backgroundColor: item.color }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{item.progress}/{item.total}</Text>
        </View>
      </View>
    </View>
  );
  
  const renderClimbedMountainItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.climbedMountainCard}
      onPress={() => router.push(`/mountain/${item.id}`)}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={styles.climbedMountainImage}
      />
      
      <View style={styles.climbedMountainInfo}>
        <Text style={styles.climbedMountainName}>{item.name}</Text>
        <Text style={styles.climbedMountainDetails}>
          {item.elevation}m • {item.region}
        </Text>
        <View style={styles.climbedDate}>
          <Text style={styles.climbedDateText}>2023-06-15</Text>
        </View>
      </View>
      
      <ChevronRight size={20} color={Theme.colors.textLight} />
    </TouchableOpacity>
  );
  
  const renderEmptyClimbedList = () => (
    <View style={styles.emptyContainer}>
      <Flag size={64} color={Theme.colors.textLight} />
      <Text style={styles.emptyText}>你还没有记录过登山活动</Text>
      <TouchableOpacity 
        style={styles.exploreMountainsButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.exploreMountainsButtonText}>探索山脉</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>成就</Text>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
          onPress={() => setActiveTab('achievements')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'achievements' && styles.activeTabText
            ]}
          >
            成就徽章
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'climbed' && styles.activeTab]}
          onPress={() => setActiveTab('climbed')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'climbed' && styles.activeTabText
            ]}
          >
            已登顶
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'achievements' ? (
        <FlatList
          data={userAchievements}
          renderItem={renderAchievementItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.achievementsList}
        />
      ) : (
        <View style={styles.climbedListContainer}>
          {climbedMountainsData.length > 0 ? (
            <FlatList
              data={climbedMountainsData}
              renderItem={renderClimbedMountainItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.climbedList}
            />
          ) : (
            renderEmptyClimbedList()
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Theme.colors.text,
  },
  notAuthenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notAuthenticatedText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: Theme.colors.cardBackground,
  },
  activeTab: {
    backgroundColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.text,
  },
  activeTabText: {
    color: Theme.colors.white,
  },
  achievementsList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    padding: 16,
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
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.text,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: Theme.colors.background,
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
  climbedListContainer: {
    flex: 1,
  },
  climbedList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  climbedMountainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  climbedMountainImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  climbedMountainInfo: {
    flex: 1,
  },
  climbedMountainName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  climbedMountainDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    marginBottom: 4,
  },
  climbedDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  climbedDateText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  exploreMountainsButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exploreMountainsButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
});