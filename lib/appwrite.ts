import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
} from "react-native-appwrite";
// import "react-native-url-polyfill/auto";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// const account = new Account(client);
export const avatar = new Avatars(client);

export const account = new Account(client);
export const database = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const res = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!res) throw new Error("Failed to login");

    const browserRes = await WebBrowser.openAuthSessionAsync(
      res.toString(),
      redirectUri
    );
    if (browserRes.type !== "success") throw new Error("Failed to login!");

    const url = new URL(browserRes.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId!, secret!);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const res = await account.get();
    if (res.$id) {
      const userAvatar = avatar.getInitials(res.name);
      return {
        ...res,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
