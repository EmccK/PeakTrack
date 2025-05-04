import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Search, ChevronDown, Filter, MapPin } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { mountains } from '@/data/mountains';
import { Mountain } from '@/types/mountain';

export default function MountainListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMountains, setFilteredMountains] = useState(mountains);
  const [filterRegion, setFilterRegion] = useState('全部');
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  
  // Extract unique regions from mountains data
  const regions = ['全部', ...Array.from(new Set(mountains.map(m => m.region)))];

  useEffect(() => {
    let result = mountains;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(mountain => 
        mountain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mountain.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply region filter
    if (filterRegion !== '全部') {
      result = result.filter(mountain => mountain.region === filterRegion);
    }
    
    setFilteredMountains(result);
  }, [searchQuery, filterRegion]);

  const renderMountainItem = ({ item }: { item: Mountain }) => (
    <TouchableOpacity
      style={styles.mountainCard}
      onPress={() => {
        router.push({
          pathname: "/mountain/[id]",
          params: { id: item.id }
        });
      }}
    >
      <ImageBackground
        source={{ uri: item.images[0] }}
        style={styles.mountainImage}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.mountainImageOverlay}>
          <View style={styles.mountainNameContainer}>
            <Text style={styles.mountainName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Theme.colors.white} />
              <Text style={styles.regionText}>{item.region}</Text>
            </View>
          </View>
          <View style={styles.elevationBadge}>
            <Text style={styles.elevationText}>{item.elevation}m</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.difficultyContainer}>
        <Text style={[
          styles.difficultyBadge, 
          { backgroundColor: getDifficultyColor(item.difficulty) }
        ]}>
          {item.difficulty}
        </Text>
        <Text style={styles.trailsText}>
          {item.routes.length} 条路线
        </Text>
      </View>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>中国山脉</Text>
        <Text style={styles.subtitle}>探索并记录你的登山旅程</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Theme.colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索山脉..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Theme.colors.textLight}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.regionSelector} 
          onPress={() => setShowRegionFilter(!showRegionFilter)}
        >
          <Text style={styles.regionText}>{filterRegion}</Text>
          <ChevronDown size={18} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      {showRegionFilter && (
        <View style={styles.regionDropdown}>
          {regions.map((region) => (
            <TouchableOpacity 
              key={region} 
              style={styles.regionOption}
              onPress={() => {
                setFilterRegion(region);
                setShowRegionFilter(false);
              }}
            >
              <Text 
                style={[
                  styles.regionOptionText, 
                  region === filterRegion && styles.selectedRegionText
                ]}
              >
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {filteredMountains.length} 座山脉
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={18} color={Theme.colors.text} />
          <Text style={styles.filterText}>更多筛选</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredMountains}
        renderItem={renderMountainItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  regionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
    marginRight: 4,
  },
  regionDropdown: {
    position: 'absolute',
    top: 124,
    right: 16,
    width: 120,
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 12,
    padding: 8,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  regionOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  regionOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
  },
  selectedRegionText: {
    color: Theme.colors.primary,
    fontFamily: 'Inter-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.text,
    marginLeft: 4,
  },
  listContainer: {
    paddingBottom: 100,
  },
  mountainCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: Theme.colors.cardBackground,
    overflow: 'hidden',
  },
  mountainImage: {
    height: 180,
    justifyContent: 'flex-end',
  },
  mountainImageOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mountainNameContainer: {
    flex: 1,
  },
  mountainName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.white,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  elevationBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  elevationText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  trailsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
});