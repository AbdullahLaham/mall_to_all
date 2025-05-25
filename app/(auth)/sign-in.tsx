import { Link, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as Device from "expo-device";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Loader, LoaderCircle } from "lucide-react-native";
const SignIn = () => {
  const [deviceName, setDeviceName] = useState("");
  const [loading, setLoading] = useState(false);


  const dispatch = useAppDispatch();
  
  const router = useRouter();
  const {currentUser: user, error, isError} = useSelector((state: any) => state?.auth);
  


  // const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    // if (!isLoaded) return;
    setLoading(true);

    try {
      console.log('data', {
        email: form?.email,
        password: form?.password,
        device_name: deviceName
      })
      const res = dispatch(login({
        email: form?.email,
        password: form?.password,
        device_name: deviceName
      }));

      const client = await res;


      if (client?.payload?.data) {
        router.replace(`/(root)/(tabs)/home`);
      } else {
      }


    }  catch (error) {
      if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
        Alert.alert("خطأ في الاتصال", "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
        return; // لا نسجل خروج المستخدم
      }

      Alert.alert("خطأ ", `فشل في تغيير الرقم السري ${error}`);


    } finally {
      setLoading(false)
    }
  }, [ form]);

  useEffect(() => {
    if (user?.data?.token) {
      // router.push(`/(root)/(tabs)/home`);
    }

    async function getDeviceName() {
      const name = await Device.deviceName;
      setDeviceName(name || "Unknown Device");
    }

    getDeviceName();

  }, []);


  return (
  <ScrollView className="flex-1 bg-white">
    <SafeAreaView>
      
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[220px]">
          <Image source={images.auth} className="z-0 w-full h-[220px] contain" />
          
        </View>
{/* <Text className="text-2xl text-black font-JakartaSemiBold my-1">
            أهلا وسهلا 👋
          </Text> */}
        {isError && <Text className="mx-5 text-red-500 font-JakartaBold text-md bg-gray-100 rounded-lg p-2">{error}</Text>}

        <View className="p-5 bg-blue-50 h-[33rem]">
          <InputField
            label="الايميل"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField

            label="الرقم السري"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          {/* {loading ?  (
            <View className="w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 h-[3rem] bg-blue-400 mt-5">
              <Loader size={30} color="blue" className="animate-spin" /> 
            </View>
          ) :<CustomButton
          
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />} */}

        
        {loading ? (
            <View className="w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 h-[3rem] bg-blue-400 mt-5">
              <ActivityIndicator size={30} color="blue" />
            </View>
          ) : (
            <CustomButton
                  
          title="تسجيل الدخول"
          onPress={onSignInPress}
          className="mt-6"
        />
          )}

          {/* <OAuth /> */}

          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}

            // href="/sign-up"
            className="text-lg text-center text-general-200 mt-10 flex flex-row items-center gap-2 "
          >
            <Text className="font-semibold ">هل أنت زبون جديد?</Text>
            <Text className="text-primary-500 font-JakartaExtraBold">أنشىء حسابا</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    
    </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;

/**i needs you to help me to fetch the data in my expo app they are three apis the first returns the categories https://coffee.mahmoudalbatran.com/api/category with a list of the products categories with data format like this {"status":true,"message":"هذا الركويست لعرض التصنيفات بشكل سكرول افقي","categories":[{"id":1,"name":"مطاعم","slug":"mtaaam","description":"مطاعم وجبات جاهزة, شاورما , كباب ...","image":"image/1747736476-cZMcesYvSt-jpg","created_at":"2025-05-20T10:21:16.000000Z","updated_at":"2025-05-20T10:21:16.000000Z","products_count":6},{"id":2,"name":"مخابز و حلويات","slug":"mkhabz-o-hloyat","description":"مخابز و حلويات","image":"image/1747736647-rYjF9Kl8sF-jpg","created_at":"2025-05-20T10:24:07.000000Z","updated_at":"2025-05-20T10:24:07.000000Z","products_count":3},{"id":3,"name":"صيدليات","slug":"sydlyat","description":"صيدليات","image":"image/1747736755-iKBd9RYfih-jpg","created_at":"2025-05-20T10:25:55.000000Z","updated_at":"2025-05-20T10:25:55.000000Z","products_count":2},{"id":4,"name":"الأسر المنتجة","slug":"alasr-almntg","description":"الأسر المنتجة","image":"image/1747736852-ZmqdpVkBbP-jpg","created_at":"2025-05-20T10:27:32.000000Z","updated_at":"2025-05-20T10:27:32.000000Z","products_count":0}]} and the second one is https://coffee.mahmoudalbatran.com/api/sub-category/1 for the sub categories of the categories  */
