import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { GifyWebView, SearchBar } from '../components';
import { MainStackParams } from '../navigation/mainStack';
import { debounce } from 'lodash';
import { giphyApi } from '../redux/middleWare/giphyApi';
import { useAppDispatch } from '../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Giphy } from '../types/giphy';
import { refreshList, setSearchText } from '../redux/gifSlice';

interface HomeScreenProps extends NativeStackScreenProps<MainStackParams, 'HomeScreen'> {}

const width = '100%';
const height = 220;
const borderRadius = 15;

const HomeScreen: FC<HomeScreenProps> = ({ navigation }): JSX.Element => {
  const data: Giphy[] = useSelector((store: RootState) => store.gifs.value);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  const handler = useCallback(
    debounce((searchText: string) => {
      giphyApi(searchText, dispatch);
    }, 300),
    []
  );
  const style = useMemo(() => {
    return { flex: 1, height, width };
  }, []);

  const injectedJS = useMemo(
    () => `
  document.body.style.width = "${width}px";
  document.body.style.height = "${height}px";
  document.body.style.backgroundColor = "${'#fff'}";
  document.body.style.overflow = "hidden";
  const img = document.querySelector("img");
  img.style.position = "absolute";
  img.style.top = 0;
  img.style.left = 0;
  img.style.margin = "auto";
  img.style[img.offsetWidth > img.offsetHeight ? 'width' : 'height'] = "100%";
  img.style.borderRadius = "${borderRadius}px";
`,
    []
  );

  const onChange = (text: string): void => {
    if (text === '') {
      dispatch(refreshList([]));
    } else {
      handler(text);
    }
    dispatch(setSearchText(text));
  };

  const loadMore = useCallback((): void => {
    // implement loadmore data from api here
  }, []);

  const renderGifs = ({ item }: ListRenderItemInfo<Giphy>) => {
    const uri = item.embed_url ?? '';
    return (
      <View style={styles.gifContainer}>
        <Text style={styles.headerText}>{item.title}</Text>
        <GifyWebView uri={uri} style={style} injectedJS={injectedJS} />
      </View>
    );
  };

  const keyExtactor = (item: Giphy) => item.id;

  const seperator = () => <View style={styles.seperator}></View>;

  return (
    <View style={styles.container}>
      <SearchBar onChange={onChange} value={''} placeholder={'Search Here...'} />

      <FlatList
        data={data}
        renderItem={renderGifs}
        keyExtractor={keyExtactor}
        ItemSeparatorComponent={seperator}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gifContainer: {
    width,
    height,
    overflow: 'hidden',
    borderWidth: 0.5,
    margin: 5,
    borderRadius: 5,
    paddingBottom: 5
  },
  headerText: {
    margin: 5,
    fontWeight: 'bold'
  },
  seperator: {
    height: 20,
    width: '100%',
    backgroundColor: '#fff'
  }
});

export default HomeScreen;
