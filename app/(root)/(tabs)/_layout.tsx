import { Tabs } from "expo-router";

import { Image, ImageSourcePropType, View } from "react-native";
// import { LinearGradient } from 'expo-linear-gradient';

import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <SafeAreaView
    className={`rounded-full flex flex-row justify-center items-center `}
  >
    
    <View
      className={`rounded-full w-12 h-12 p-7 ml-3 items-center justify-center  ${focused ? "bg-[#bba12d]" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-10 h-10 rounded-full"
      />
    </View>
  </SafeAreaView>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderRadius: 50,
          paddingBottom: 20, // ios only
          paddingTop: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 10,
          height: 60,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
  
  <Tabs.Screen
        name="prices"
        options={{
          title: "Prices",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.dollar} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      
      
      
      
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.reports} focused={focused} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
      
    </Tabs>
  );
}
