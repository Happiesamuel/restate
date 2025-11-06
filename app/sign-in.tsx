import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { refetch, loading, isLoggedin } = useGlobalContext();

  if (!loading && isLoggedin) return <Redirect href="/" />;

  async function handleLogin() {
    const res = await login();
    if (res) {
      refetch();
    } else {
      Alert.alert("Failed to login");
    }
  }
  return (
    <SafeAreaView className=" bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Restate
          </Text>
          <Text className="text-3xl font-rubik-bold mt-2 text-black-300 text-center">
            Let&apos;s Get You Closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12 ">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            className="bg-white shadow-zinc-300 shadow-md rounded-full w-full py-4"
            onPress={handleLogin}
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5 "
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2 ">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
