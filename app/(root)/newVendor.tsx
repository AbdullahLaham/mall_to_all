import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function newVendorScreen () {
  const { currentUser: user, updatedUser } = useSelector((state: any) => state?.auth);

  const [form, setForm] = useState({
    brandName: '',
    description: '',
    personName: '',
    address: '',
    email: '',
    phone: '',
  });
  const [imageModalVisible, setImageModalVisible] = useState(false);
const [profileImage, setProfileImage] = useState(
    updatedUser?.profile_photo_url || user?.data?.client?.profile_photo_url || user?.data?.user?.profile_photo_url
  );
  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = () => {
    console.log('تم الإرسال:', form);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-right text-2xl font-bold text-orange-600">انضم كمزود في متجرنا</Text>
        <TouchableOpacity className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full" onPress={() => router.back()}>
          <Text className="text-white text-lg ">⮕</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-right text-2xl font-bold text-gray-800 mb-4 mt-2">سجل الآن</Text>
      <Text className="text-right text-sm text-gray-600 mb-4">جميع البيانات مطلوبة</Text>

      {/* Input Fields with Labels */}
      <View className="space-y-4">

        <View style={{ alignItems: "center", marginBottom: 16 }}>
                    <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                      {profileImage?.startsWith('https://ui-avatars.com/api') ? (
                        <View className=" rounded-full h-[110px] w-[110px] border-[3px] border-gray-300 shadow-sm shadow-neutral-300 flex items-center justify-center bg-purple-500 "><Text className="uppercase font-bold text-6xl text-white">{user?.data?.client?.name.charAt(0) || user?.data?.user?.name.charAt(0)}</Text></View>
        
                      ) : (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        
                      )}
                    </TouchableOpacity>
                  </View>


        {/* Brand Name */}
        <View>
          <Text className="text-right text-xl font-semibold text-gray-500 my-2">اسم العلامة التجارية</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
            <Text className="mr-2">🏷️</Text>
            <TextInput
              className="flex-1 text-right"
              placeholder="ادخل اسم العلامة التجارية"
              value={form.brandName}
              onChangeText={(text) => handleChange('brandName', text)}
            />
          </View>
        </View>

        {/* Description */}
        <View>
          <Text className="text-right text-xl font-semibold text-gray-500 my-2">وصف مختصر</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
            <Text className="mr-2 text-xl">📝</Text>
            <TextInput
              className="flex-1 text-right"
              placeholder="ادخل وصف مختصر"
              value={form.description}
              onChangeText={(text) => handleChange('description', text)}
            />
          </View>
        </View>

        {/* Person Name */}
        <View>
          <Text className="text-right text-xl font-semibold text-gray-500 my-2">اسم الشخص مقدم الطلب</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
            <Text className="mr-2 text-xl">👤</Text>
            <TextInput
              className="flex-1 text-right"
              placeholder="ادخل اسم الشخص"
              value={form.personName}
              onChangeText={(text) => handleChange('personName', text)}
            />
          </View>
        </View>

        {/* Address */}
        <View>
          <Text className="text-right text-xl font-semibold text-gray-500 my-2">العنوان</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
            <Text className="mr-2 text-xl">📍</Text>
            <TextInput
              className="flex-1 text-right"
              placeholder="ادخل عنوان موقعك"
              value={form.address}
              onChangeText={(text) => handleChange('address', text)}
            />
          </View>
        </View>

        {/* Email */}
        <View>
          <Text className="text-right text-xl font-semibold text-gray-500 my-2">البريد الإلكتروني</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
            <Text className="mr-2 text-xl">📧</Text>
            <TextInput
              className="flex-1 text-right"
              placeholder="ادخل بريدك الإلكتروني"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>
        </View>

        {/* Phone */}
        <View>
          <Text className="text-right text-xl font-semibold text-gray-500 my-2">رقم الهاتف</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
            <Text className="mr-2 text-xl">📞</Text>
            <TextInput
              className="flex-1 text-right"
              placeholder="ادخل رقم الهاتف"
              value={form.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-orange-500 mt-6 p-4 rounded-full shadow-lg mb-8"
        onPress={handleSubmit}
      >
        <Text className="text-white text-lg text-center font-bold">إرسال الطلب</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#ccc",
  },
  initialImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#ccc",
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  initialText: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  
});