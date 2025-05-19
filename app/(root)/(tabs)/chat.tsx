
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TextInput, Image, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Linking, ActivityIndicator, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import Pusher from "pusher-js";
import { runPusher } from "../_layout";
import { FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useConversationStore } from "@/lib/conversationStore";

let i = 0;
const ChatConversationsPage = () => {
  const { currentUser: user, isNewMessageNotification } = useSelector((state) => state?.auth);


  const [conversations, setConversations] = useState<null | any>([]);
  const [userId, setUserId] = useState(user?.data?.client?.id || user?.data?.user?.id);
  const [loading, setLoading] = useState(false);
  const [newOne, setNewOne] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [isrefreshing, setIsRefreshing] = useState(false);


  




  // addConversation
  const setConversation = useConversationStore((state) => state.setConversation);




  // Fetch conversations when page changes or app loads
  const fetchConversations = async (isRefresh = false) => {

    console.log(isrefreshing, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(`https://ajwan.mahmoudalbatran.com/api/myConversactions?page=${page}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const newConversations = response.data.data;

      console.log(response.data?.data, 'daaaaaaaataaaaaaaaaaaa');

      if (newConversations?.length > 0) {
        if (isRefresh) {
          console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
          setConversations([...newConversations]);
          setHasMore(response.data.next_page_url !== null);
          setPage((prev) => prev + 1);
          setIsRefreshing(false);
          return;
      }
        
        if (!newOne) {
          console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
          setConversations((prev) => [...prev, ...newConversations]);
        }
        setHasMore(response.data.next_page_url !== null);
        setPage((prev) => prev + 1);
        return;
      }





      if (response?.data.data?.length == 0 && !isrefreshing) {
        const newConv = await axios.post(`https://ajwan.mahmoudalbatran.com/api/AddConversation`, {}, {
          headers: { Authorization: `Bearer ${user?.data?.token}` },
        });
        setNewOne(true);
        console.log('no daat daaaaaaaataaaaaaaaaaaa', newConv?.data)


        if (newConv?.data?.[0]?.id) {
          setConversations(newConv?.data);
          return;
          // setConversation(newConv.data[0]);
          // fetchMessages(newConv.data[0].id);
          // fetchConversations();
        }


      }


      // Check if there are more conversations to load

    } catch (error) {
      if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
        Alert.alert("خطأ في الاتصال", "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };


  // useFocusEffect(
  //     useCallback(() => {
  //       console.log('Page reloaded');
  //       fetchConversations();
  //       // You can also trigger state updates or re-fetch data here.
  //     }, [])
  //   );

  useEffect(() => {
    setConversation(null)
    fetchConversations();
  }, [isNewMessageNotification]);

  // Render a single conversation item
  const renderConversation = ({ item }) => {
    const lastMessage = item.last_message ? (item.last_message?.type !== 'attachment' ? item?.last_message?.body : "attachment") : "ليس لديك رسائل بعد";
    const participant = item.participants[0]; // Assuming there is at least one participant

    return (
      <TouchableOpacity style={styles.conversationItem} onPress={() => { router.push(`/(root)/currentConversation/${item?.id}`); setConversation(item) }} className="relative">
        <Image source={{ uri: participant.profile_photo_url }} style={styles.avatar} />
        <View style={styles.conversationInfo}>
          <Text style={styles.name}>{participant.name}</Text>
          <Text style={styles.lastMessage}>{lastMessage} </Text>
          {item?.new_messages > 0 ? <Text className="absolute  right-2 border border-gray-200 rounded-full p-1">{item?.new_messages}</Text> : ''}
        </View>
      </TouchableOpacity>
    );
  };



  // Handle reaching the bottom of the list
  const handleLoadMore = () => {
    if (hasMore) {
      fetchConversations();
    }
  };

  const onRefresh = useCallback(() => {
    console.log('rrrrrrrreeeeeeeeeeggggggggg')
    setRefreshing(true);
    setIsRefreshing(true);
    console.log('rrrrrrrreeeeeeeeeeggggggggg', isrefreshing)

    // setConversations([]);
    // setPage(1);

    // Simulate fetching data or refreshing the page
    // setConversations([]);

    setPage(1);




    fetchConversations(true); // isRefresh is true


    setTimeout(() => {

      setRefreshing(false);
    }, 2000);
  }, []);


























  // 🔹 الاستماع للرسائل الجديدة من `Pusher`
  useEffect(() => {

    try {
      const pusher = runPusher(user);
      // الاشتراك في القناة الخاصة بالمستخدم
      const channel = pusher.subscribe(`presence-Messenger.${userId}`);

      // const handleNewMessage = (event: any) => {
      //   // console.log("📩 رسالة جديدة:", event);
      //   const newMessage: any = event?.message;
      //   // console.log("📩 رسالة جديدة:", newMessage);
      //   // onRefresh();

      //   setRefreshing(true);
      //   setIsRefreshing(true);
      //   setConversations([]);
      //   setPage(1);
      //   // Simulate fetching data or refreshing the page
      //   setConversations([]);
      //   setPage(1);
      //   fetchConversations();


      //   // setTimeout(() => {

      //   //   setRefreshing(false);
      //   // }, 2000);

      // };


      channel.bind("new-message", () => {
        onRefresh();
      });

      // تنظيف الاشتراك عند التفكيك
      return () => {
        channel.unbind_all();
        // pusher.unsubscribe(`presence-Messenger.${userId}`);
      };
    } catch (error) {
      console.log(error)
    }
  }, [user]);













  if (loading) {
    return (
      <View className="space-y-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} className="flex-row items-center space-x-4 p-3 bg-gray-100 rounded-lg animate-pulse">
            {/* صورة بروفايل دائرية */}
            <View className="w-12 h-12 bg-gray-300 rounded-full"></View>

            {/* تفاصيل المحادثة الوهمية */}
            <View className="flex-1 space-y-2">
              <View className="w-3/4 h-4 bg-gray-300 rounded"></View>
              <View className="w-1/2 h-3 bg-gray-300 rounded"></View>
            </View>
          </View>
        ))}
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text className='flex items-center justify-center p-3 bg-[#2b2b2b] text-white text-center font-bold text-lg'>
        محادثاتك
      </Text>
      <FlatList
        data={loading ? [...conversations, "loading"] : conversations} // Add "loading" as a placeholder
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={(item) => item?.item == 'loading' ?
          <View className="`p-4 bg-white m-2 rounded-lg shadow items-center`">
            <ActivityIndicator size="large" color="gray" />
            <Text className="`text-gray-500 mt-2`">Loading more...</Text>
          </View> :
          renderConversation(item)}
        keyExtractor={(item) => i++}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Trigger next page load when 50% of the list is visible
      // ListFooterComponent={loading && <Text>Loading...</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    color: '#888',
    fontSize: 14,
  },
});

export default ChatConversationsPage;
