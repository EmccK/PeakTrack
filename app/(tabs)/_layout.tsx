import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { MapPin, Flag, User, List, Plus } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { useState, useCallback } from 'react';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export default function TabLayout() {
  const [tabBarVisible, setTabBarVisible] = useState(true);

  const hideTabBar = useCallback(() => {
    setTabBarVisible(false);
  }, []);

  const showTabBar = useCallback(() => {
    setTabBarVisible(true);
  }, []);

  const renderTabBar = (props: any) => {
    if (!tabBarVisible) return null;
    
    return (
      <View style={styles.tabBarContainer}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} style={styles.tabBar}>
            {props.state.routes.map((route: any, index: number) => {
              const { options } = props.descriptors[route.key];
              const isFocused = props.state.index === index;
              
              const onPress = () => {
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });
                
                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route.name);
                }
              };
              
              return (
                <View key={index} style={styles.tabItem}>
                  <Text 
                    style={[
                      styles.tabIcon, 
                      { color: isFocused ? Theme.colors.primary : Theme.colors.text }
                    ]}
                    onPress={onPress}
                  >
                    {options.tabBarIcon({ 
                      color: isFocused ? Theme.colors.primary : Theme.colors.text,
                      size: 24
                    })}
                  </Text>
                  <Text 
                    style={[
                      styles.tabLabel, 
                      { color: isFocused ? Theme.colors.primary : Theme.colors.text }
                    ]}
                  >
                    {options.title}
                  </Text>
                </View>
              );
            })}
          </BlurView>
        ) : (
          <View style={[styles.tabBar, { backgroundColor: Theme.colors.cardBackground }]}>
            {props.state.routes.map((route: any, index: number) => {
              const { options } = props.descriptors[route.key];
              const isFocused = props.state.index === index;
              
              const onPress = () => {
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });
                
                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route.name);
                }
              };
              
              return (
                <View key={index} style={styles.tabItem}>
                  <Text 
                    style={[
                      styles.tabIcon, 
                      { color: isFocused ? Theme.colors.primary : Theme.colors.text }
                    ]}
                    onPress={onPress}
                  >
                    {options.tabBarIcon({ 
                      color: isFocused ? Theme.colors.primary : Theme.colors.text,
                      size: 24
                    })}
                  </Text>
                  <Text 
                    style={[
                      styles.tabLabel, 
                      { color: isFocused ? Theme.colors.primary : Theme.colors.text }
                    ]}
                  >
                    {options.title}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={renderTabBar}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '山脉',
          tabBarIcon: ({ color, size }) => (
            <List color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: '地图',
          tabBarIcon: ({ color, size }) => (
            <MapPin color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: '成就',
          tabBarIcon: ({ color, size }) => (
            <Flag color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});