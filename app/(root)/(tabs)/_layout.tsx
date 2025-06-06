// import { Tabs } from "expo-router";

// import { Image, ImageSourcePropType, View } from "react-native";
// // import { LinearGradient } from 'expo-linear-gradient';

// import { icons } from "@/constants";
// import { SafeAreaView } from "react-native-safe-area-context";

// const TabIcon = ({
//   source,
//   focused,
// }: {
//   source: ImageSourcePropType;
//   focused: boolean;
// }) => (
//   <SafeAreaView
//     className={`rounded-full flex flex-row justify-center items-center `}
//   >

//     <View
//       className={`rounded-full w-12 h-12 p-7 ml-3 items-center justify-center  ${focused ? "bg-[#bba12d]" : ""}`}
//     >
//       <Image
//         source={source}
//         tintColor="white"
//         resizeMode="contain"
//         className="w-10 h-10 rounded-full"
//       />
//     </View>
//   </SafeAreaView>
// );

// export default function Layout() {
//   return (
//     <Tabs
//       initialRouteName="home"
//       screenOptions={{
//         tabBarActiveTintColor: "white",
//         tabBarInactiveTintColor: "white",
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "transparent",
//           borderRadius: 50,
//           paddingBottom: 20, // ios only
//           paddingTop: 0,
//           overflow: "hidden",
//           marginHorizontal: 20,
//           marginBottom: 10,
//           height: 60,
//           display: "flex",
//           justifyContent: "space-around",
//           alignItems: "center",
//           flexDirection: "row",
//           position: "absolute",
//         },
//       }}
//     >

//   <Tabs.Screen
//         name="prices"
//         options={{
//           title: "Prices",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon source={icons.dollar} focused={focused} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="rides"
//         options={{
//           title: "Rides",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon source={icons.list} focused={focused} />
//           ),
//         }}
//       />




//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon source={icons.home} focused={focused} />
//           ),
//         }}
//       />
//       {/* <Tabs.Screen
//         name="reports"
//         options={{
//           title: "Reports",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon source={icons.reports} focused={focused} />
//           ),
//         }}
//       /> */}
//       <Tabs.Screen
//         name="chat"
//         options={{
//           title: "chat",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon source={icons.chat} focused={focused} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon source={icons.profile} focused={focused} />
//           ),
//         }}
//       />

//     </Tabs>
//   );
// }



// app/_layout.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from "@/constants";

// Import your screens
import HomeScreen from './home';
import PricesScreen from './prices';
import RidesScreen from './rides';
import ChatScreen from './chat';
import ProfileScreen from './profile';
import { Ionicons } from '@expo/vector-icons';
import newVendorScreen from '../newVendor';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ source, focused }) => (
  <SafeAreaView>
    <View style={[styles.tabIconContainer, focused && styles.tabIconFocused]}>
      <Image source={source} style={styles.tabIconImage} />
    </View>
  </SafeAreaView>
);

// 🟢 Tabs Component
function TabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          marginHorizontal: 20,
          marginBottom: 10,
        },
      }}
    >
      <Tab.Screen name="home" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => <TabIcon source={icons.home} focused={focused} />,
      }} />
      <Tab.Screen name="prices" component={PricesScreen} options={{
        tabBarIcon: ({ focused }) => <TabIcon source={icons.dollar} focused={focused} />,
      }} />
      <Tab.Screen name="rides" component={RidesScreen} options={{
        tabBarIcon: ({ focused }) => <TabIcon source={icons.list} focused={focused} />,
      }} />
      <Tab.Screen name="chat" component={ChatScreen} options={{
        tabBarIcon: ({ focused }) => <TabIcon source={icons.chat} focused={focused} />,
      }} />
      <Tab.Screen name="profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => <TabIcon source={icons.profile} focused={focused} />,
      }} />
    </Tab.Navigator>
  );
}







function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        {/* Top: Profile Section */}
        <View className="items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 py-6">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            className="w-20 h-20 rounded-full mb-2"
          />
          <Text className="text-white text-lg font-semibold">John Doe</Text>
          <Text className="text-white text-sm">johndoe@example.com</Text>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />

        {/* Custom Logout Button */}
        <TouchableOpacity
          onPress={() => console.log('Logout')}
          className="flex-row items-center p-4 mt-auto border-t border-gray-200"
        >
          <Ionicons name="log-out-outline" size={24} color="gray" />
          <Text className="ml-3 text-base text-gray-700">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// 🟢 Drawer Layout
export default function Layout() {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // headerStyle: { backgroundColor: '#005834', height: 50, display: 'flex', padding: 0, },
        header: ({ navigation, route, options }) => (
          <View className="flex-row items-center justify-between bg-black bg-gradient-to-r from-blue-600 to-purple-500 h-16 px-4 shadow-lg">
            {/* Left: Hamburger */}
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>

            {/* Center: Title */}
            <Text className="text-white text-lg font-bold">
              {options.title ?? route.name}
            </Text>

            {/* Right: Profile Avatar */}
            <Image
              source={{ uri: '' }} // Replace with your image
              className="w-8 h-8 rounded-full"
            />
          </View>
        ),
        headerTintColor: 'white',
        drawerStyle: { width: 250 },
      }}
    >
      {/* The Tabs as a single Drawer entry */}
      <Drawer.Screen name="Tabs" component={HomeScreen} options={{ title: 'الصفحة الرئيسيه' }} />
      <Drawer.Screen name="Rides" component={RidesScreen} options={{ title: 'الرحلات' }} />
      <Drawer.Screen name="Chat" component={ChatScreen} options={{ title: 'المحادثة' }} />
      <Drawer.Screen name="Prices" component={PricesScreen} options={{ title: '🛒 السلة' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'الملف الشخصي' }} />
      <Drawer.Screen name="newVendor" component={newVendorScreen} options={{ title: ' انضم ك مزود' }} />

      {/* Optional: Add more direct Drawer Screens if needed */}
      {/* 
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25,
  },
  tabIconFocused: {
    backgroundColor: '#bba12d',
  },
  tabIconImage: {
    width: 30, height: 30, tintColor: 'white',
  },
});
