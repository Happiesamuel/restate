import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-red-600">
      <Link href="/sign-in">Sign in</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property</Link>
      <Link href="/explore">Explore</Link>
    </View>
  );
}
