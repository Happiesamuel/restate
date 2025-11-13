import icons from "@/constants/icons";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PropertyDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data, loading } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });
  if (loading)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  const windowHeight = Dimensions.get("window").height;
  return (
    <View className="">
      <ScrollView>
        <View className="relative">
          {/* <FlatList data={item.gallery} /> */}
          <Image
            className="w-full"
            resizeMode="cover"
            source={{ uri: data?.image }}
            style={{ height: windowHeight / 2 }}
          />

          <View className="absolute top-8 px-5 w-full flex items-center justify-between flex-row">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row bg-primary-200 size-11 items-center justify-center rounded-full "
            >
              <Image className="size-6" source={icons.backArrow} />
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-4">
              <TouchableOpacity className="flex flex-row bg-primary-200 size-11 items-center justify-center rounded-full ">
                <Image
                  className="size-6"
                  source={icons.heart}
                  tintColor="#000000"
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex flex-row bg-primary-200 size-11 items-center justify-center rounded-full ">
                <Image className="size-6" source={icons.send} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-5 mt-5">
          <View className="flex gap-4">
            <Text className="font-rubik-bold text-2xl text-black-300">
              {data?.name}
            </Text>
            <View className="flex flex-row items-center gap-3">
              <View className="rounded-full bg-primary-100 px-2 py-1.5">
                <Text className="font-rubik-medium uppercase font-bold text-xs text-primary-300">
                  {data?.type}
                </Text>
              </View>

              <View className="flex items-center gap-1 flex-row">
                <Image source={icons.star} className="size-5" />
                <Text className="text-black-200 text-sm font-medium">
                  {data?.rating} (1,278 reviews)
                </Text>
              </View>
            </View>

            <View className="flex items-center gap-6 flex-row">
              <Desc num={data!.bedrooms} icon={icons.bed}>
                Beds
              </Desc>
              <Desc num={data!.bathrooms} icon={icons.bath}>
                Bath
              </Desc>
              <Desc num={data!.area} icon={icons.area}>
                sqft
              </Desc>
            </View>
          </View>
        </View>
      </ScrollView>

      <View>
        <Text>sam</Text>
      </View>
    </View>
  );
}

function Desc({
  num,
  icon,
  children,
}: {
  children: React.ReactNode;
  icon: any;
  num: number;
}) {
  return (
    <View className="flex flex-row items-center gap-2">
      <View className="rounded-full size-10 bg-primary-100 flex items-center justify-center">
        <Image source={icon} className="size-4" />
      </View>
      <Text className="font-rubik-medium text-sm text-black-300">
        {num} {children}
      </Text>
    </View>
  );
}
