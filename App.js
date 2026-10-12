import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProfileProvider, useProfile } from './src/ProfileContext';
import HomeScreen from './src/screens/HomeScreen';
import SkillsScreen from './src/screens/SkillsScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ProjectDetailsScreen from './src/screens/ProjectDetailsScreen';
import EditorScreen from './src/screens/EditorScreen';
import AboutScreen from './src/screens/AboutScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerStyle = { headerStyle: { backgroundColor: colors.brown }, headerTintColor: colors.gold };

function ProjectsStack() {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen name="ProjectsList" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ title: 'Project details' }} />
    </Stack.Navigator>
  );
}

const icons = {
  Home: 'home', Skills: 'ribbon', Projects: 'briefcase', Editor: 'create', About: 'information-circle',
};

function Tabs() {
  const { loaded } = useProfile();
  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.pink} />
      </View>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerStyle,
        tabBarActiveTintColor: colors.pink,
        tabBarInactiveTintColor: colors.brownLight,
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.gold },
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Projects" component={ProjectsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Editor" component={EditorScreen} options={{ title: 'Edit' }} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}