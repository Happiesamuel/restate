import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingItem({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: {
  icon: ImageSourcePropType;
  title: string;
  onPress?(): void;
  textStyle?: string;
  showArrow?: boolean;
}) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-between"
      onPress={onPress}
    >
      <View className="flex flex-row items-center gap-3">
        <Image className="size-6" source={icon} />
        <Text
          className={` text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
}

export default function Profile() {
  const { user, refetch } = useGlobalContext();

  async function handleLogout() {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "An error occured");
    }
  }
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flez flex-row items-center justify-between mt-5">
          <Text className="font-rubik-bold text-xl">profile</Text>
          <Image className="size-5" source={icons.bell} />
        </View>

        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image className="size-9" source={icons.edit} />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col gap-8 mt-10">
          <SettingItem icon={icons.calendar} title="My Bookings" />
          <SettingItem icon={icons.wallet} title="My Payments" />
        </View>
        <View className="flex flex-col gap-8 mt-5 border-t border-primary-200 pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingItem key={index} {...item} />
          ))}
        </View>
        <View className="flex flex-col gap-8 mt-5 border-t border-primary-200 pt-5">
          <SettingItem
            icon={icons.logout}
            showArrow={false}
            title="Logout"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
