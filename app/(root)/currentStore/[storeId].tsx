import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';

const StoreDetailsScreen = () => {

    const { storeId } = useLocalSearchParams();
    console.log(storeId, 'tttttttttttttttttttttttttttttttttttttttttttttttt')

      const { currentUser: user, isNewMessageNotification } = useSelector((state: any) => state?.auth);


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://coffee.mahmoudalbatran.com/api/provider/${storeId}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    })
    .then(res => setData(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text>جاري التحميل...</Text>
      </View>
    );
  }

  if (!data?.status) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>حدث خطأ في جلب البيانات!</Text>
      </View>
    );
  }

  const store = data.provider;
  const products = data.products?.data || [];
  const apiBase = 'https://coffee.mahmoudalbatran.com/';

  return (
    <ScrollView className="bg-white">
      <Image source={{ uri: `${apiBase}${store.profile_photo_path}` }} className="w-full h-60" resizeMode="contain" />
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-600  ">{store.store_name}</Text>
        <Text className="text-lg text-gray-700 font-semibold mt-1">{store.description}</Text>
        <Text className="text-md font-semibold text-gray-600 mt-1">📍 {store.location_desc ?? 'الموقع غير متوفر'}</Text>
        <Text className="text-md font-semibold text-gray-600 mt-1">📞 {store.phone_number}</Text>
        <Text className="text-md font-semibold text-gray-600 mt-1">📂 التصنيف: {store.category?.name}</Text>

        <View className="mt-2">
  <Text className="font-semibold text-lg mb-2">📑 التصنيفات الفرعية:</Text>
  {store.sub_categories?.length > 0 ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {store.sub_categories.map(sub => (
        <View
          key={sub.id}
          className="bg-gray-200 px-4 py-2 rounded-full mr-2"
        >
          <Text className="text-gray-700 font-semibold">{sub.name}</Text>
        </View>
      ))}
    </ScrollView>
  ) : (
    <Text className="text-sm text-gray-500 ml-2">لا توجد تصنيفات فرعية</Text>
  )}
</View>
      </View>

      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">🛒 المنتجات</Text>
        {products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperClassName="justify-between"
            renderItem={({ item }) => (
              <View className="bg-gray-100 p-2 rounded-lg mb-4 w-[48%]">
                <Image source={{ uri: `${apiBase}${item.image}` }} className="w-full h-24 rounded-lg" resizeMode="cover" />
                <Text className="font-semibold text-base mt-2">{item.name}</Text>
                <Text className="text-sm text-gray-600">{item.description}</Text>
                <Text className="text-sm text-green-600 mt-1">{item.price} ₪</Text>
              </View>
            )}
          />
        ) : (
          <Text className="text-center text-gray-500">لا توجد منتجات</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default StoreDetailsScreen;
