import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

const client = new Client()
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);

export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const res = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!res) throw new Error("Failed to login,first");

    const browserRes = await WebBrowser.openAuthSessionAsync(
      res.toString(),
      redirectUri
    );
    if (browserRes.type !== "success")
      throw new Error("Failed to login!,second");

    const url = new URL(browserRes.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Failed to login,third");

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
    console.log(error, "sam");
    return false;
  }
}

export async function getLatestProperties() {
  try {
    const res = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return res.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdtAt")];
    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }
    if (limit) {
      buildQuery.push(Query.limit(limit));
    }
    const res = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );
    return res.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}
