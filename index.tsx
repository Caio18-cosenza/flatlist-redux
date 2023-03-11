import {useState, useEffect, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, Button, FlatList, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {increment, decrement} from '../../config/Slice/counterSlice';

export default function Home() {
  const [data, setData] = useState<Array<any>>([]);
  const count = useSelector(
    (state: {counters: {value: number}}) => state.counters
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json().then((json) => setData(json)))
      .catch((err) => console.warn(err));
  }, []);

  const onViewableItemsChanged = ({viewableItems}: any) => {
    Alert.alert('Você está olhando para o item', viewableItems[0]?.item.name);
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged,
    },
  ]);

  return (
    <View style={styles.container}>
      <Text> {count.value} </Text>
      <Button
        title='Incremento'
        onPress={() => {
          dispatch(increment());
        }}
      />
      <View style={{marginVertical: 10}} />
      <Button
        title='Decremento'
        onPress={() => {
          dispatch(decrement());
        }}
      />

      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <View
            style={{
              width: '100%',
              backgroundColor: '#7434eb',
              marginVertical: 20,
              height: 350,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100,
  },
  flatlist: {
    marginTop: 20,
    width: '95%',
  },
});
