import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import ApodListItem from "@/components/ApodListItem";
import { useEffect, useState } from "react";
import FullScreenImage from "../components/FullScreenImage";
import { Apod } from "../types";
import { fetchApods } from "../api/apods";
import { Stack } from "expo-router";

export default function Page() {
  const [apods, setApods] = useState<Apod[]>(null);
  const [activePicture, setActivePicture] = useState<string>(null);

  useEffect(() => {
    fetchApods().then(setApods);
  }, [])

  if (!apods) {
    return <ActivityIndicator />;
  }

  return (
    <>
    <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: `APOD Home`,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <FlatList data={apods} renderItem={({ item }) => <ApodListItem apod={item} onImagePress={() => setActivePicture(item.url)} />} />
      <FullScreenImage url={activePicture} onClose={() => setActivePicture(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  
});
