import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { mountains } from '@/data/mountains';
import { Theme } from '@/constants/Theme';
import { Search, Layers, Compass, X } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

// Create a web-specific map placeholder component
const WebMapPlaceholder = () => (
  <View style={styles.webPlaceholder}>
    <Text style={styles.webPlaceholderText}>
      地图功能仅在移动应用中可用
    </Text>
    <Text style={styles.webPlaceholderSubtext}>
      请在iOS或Android设备上使用此功能
    </Text>
  </View>
);

// Only define map components for native platforms
let MapView = null;
let Marker = null;
let PROVIDER_GOOGLE = null;

// Move the import inside a try-catch to prevent the native module from being imported on web
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
    PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  } catch (error) {
    console.warn('Failed to load react-native-maps:', error);
  }
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

export default function MapScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const mapRef = useRef(null);
  const [selectedMountain, setSelectedMountain] = useState<number | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'hybrid'>('standard');

  const initialRegion = {
    latitude: 35.8617,
    longitude: 104.1954,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render web placeholder on web platform
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <WebMapPlaceholder />
      </View>
    );
  }

  const handleMarkerPress = (mountainId: number) => {
    setSelectedMountain(mountainId);
    
    const mountain = mountains.find(m => m.id === mountainId);
    if (mountain && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mountain.coordinates.latitude,
        longitude: mountain.coordinates.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }, 300);
    }
  };

  const closeInfoCard = () => {
    setSelectedMountain(null);
  };

  const navigateToMountainDetail = (mountainId: number) => {
    router.push(`/mountain/${mountainId}`);
  };

  const toggleMapType = () => {
    setMapType(prev => prev === 'standard' ? 'hybrid' : 'standard');
  };

  const selectedMountainData = mountains.find(m => m.id === selectedMountain);

  return (
    <View style={styles.container}>
      {MapView && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          mapType={mapType}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        >
          {mountains.map((mountain) => (
            <Marker
              key={mountain.id}
              coordinate={{
                latitude: mountain.coordinates.latitude,
                longitude: mountain.coordinates.longitude,
              }}
              title={mountain.name}
              description={`${mountain.elevation}m`}
              onPress={() => handleMarkerPress(mountain.id)}
            >
              <View style={[
                styles.markerContainer,
                selectedMountain === mountain.id && styles.selectedMarker
              ]}>
                <View style={styles.marker} />
              </View>
            </Marker>
          ))}
        </MapView>
      )}

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color={Theme.colors.text} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>搜索山脉...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapButton} onPress={toggleMapType}>
          <Layers size={24} color={Theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapButton}>
          <Compass size={24} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>

      {selectedMountainData && (
        <View style={styles.infoCard}>
          <TouchableOpacity style={styles.closeButton} onPress={closeInfoCard}>
            <X size={20} color={Theme.colors.text} />
          </TouchableOpacity>

          <Image
            source={{ uri: selectedMountainData.images[0] }}
            style={styles.infoCardImage}
          />

          <View style={styles.infoCardContent}>
            <View>
              <Text style={styles.mountainName}>{selectedMountainData.name}</Text>
              <Text style={styles.mountainRegion}>{selectedMountainData.region}</Text>
              <View style={styles.mountainStats}>
                <Text style={styles.elevationText}>{selectedMountainData.elevation}m</Text>
                <View style={styles.difficultyContainer}>
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(selectedMountainData.difficulty) }
                  ]}>
                    <Text style={styles.difficultyText}>{selectedMountainData.difficulty}</Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigateToMountainDetail(selectedMountainData.id)}
            >
              <Text style={styles.detailsButtonText}>查看详情</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    padding: 20,
  },
  webPlaceholderText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  webPlaceholderSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
  },
  mapControls: {
    position: 'absolute',
    top: 130,
    right: 16,
  },
  mapButton: {
    width: 44,
    height: 44,
    backgroundColor: Theme.colors.white,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  marker: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Theme.colors.primary,
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  selectedMarker: {
    transform: [{ scale: 1.2 }],
  },
  infoCard: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: Theme.colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  infoCardImage: {
    width: '100%',
    height: 150,
  },
  infoCardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mountainName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  mountainRegion: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.colors.textLight,
    marginBottom: 8,
  },
  mountainStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  elevationText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.text,
    marginRight: 12,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
  detailsButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.white,
  },
});