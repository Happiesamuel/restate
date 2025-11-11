import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function Filters() {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [filter, setFilter] = useState(params.filter || "All");
  function handleClick(fil: string) {
    if (filter === fil) {
      setFilter("");
      router.setParams({ filter: "All" });
      return;
    }
    setFilter(fil);
    router.setParams({ filter: fil });
  }
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleClick(item.category)}
          className={`flex flex-col rounded-full px-4 py-2 mr-4
         items-start ${
           filter === item.category
             ? "bg-primary-300 text-white"
             : "bg-primary-100 border border-primary-200"
         }`}
        >
          <Text
            className={`${
              filter === item.category
                ? " text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            } text-sm `}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
