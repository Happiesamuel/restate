import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { loading, isLoggedin } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="h-full bg-white justify-center items-center flex ">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  if (!isLoggedin) return <Redirect href="/sign-in" />;

  return <Slot />;
}
