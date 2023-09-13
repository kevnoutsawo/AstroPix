import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Apod } from '@/types';
import { fetchApod } from '@/api/apods';
import ApodListItem from '@/components/ApodListItem';
import { ScrollView } from 'react-native-gesture-handler';

const ApodDetails = () => {
  const { date } = useLocalSearchParams();

  const [apod, setApod] = useState<Apod>(null);

  useEffect(() => {
    fetchApod(date).then(setApod);
  }, [date])
  
  if (!apod) {
    return <ActivityIndicator />
  }
 
  return (
    <ScrollView>
      <ApodListItem apod={apod} />
      <Text
        style={{
          padding: 15,
          backgroundColor: 'white',
          lineHeight: 22,
          fontSize: 16,
          maxWidth: 500,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        {apod.explanation}
      </Text>
    </ScrollView>
  )
}

export default ApodDetails

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  console.log(process.cwd());

  return [
    {date: '2023-07-12'},
    {date: '2023-07-13'},
    {date: '2023-07-14'},
  ]
}