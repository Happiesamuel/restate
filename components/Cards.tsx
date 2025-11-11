import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

export function FeaturedCard({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      <View
        className="flex flex-row items-center bg-white/90 px-3 py-1.5 
       rounded-full top-5 right-5 absolute"
      >
        <Image source={icons.star} className="size-3.5 " />
        <Text className="text-xs font-rubik-bold ml-1 text-primary-300">
          4.4
        </Text>
      </View>

      <View className="flex-col flex items-start absolute gap-2.5  bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          Modern Apartment
        </Text>
        <Text className="text-base font-rubik text-white">New York, US</Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            $2,500
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
export function Card({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4
     bg-white rounded-lg shadow-lg shadow-black-100/70 relative"
    >
      <View
        className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 z-50
        p-1 rounded-full"
      >
        <Image source={icons.star} className="size-2.5 " />
        <Text className="text-xs font-rubik-bold ml-0.5 text-primary-300">
          4.4
        </Text>
      </View>

      <Image source={images.newYork} className="w-full h-40 rounded-lg" />

      <View className="flex-col flex mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          Cozy Studio
        </Text>
        <Text className="text-xs  font-rubik text-black-200">New York, US</Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            $2,500
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor={"#191d31"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
