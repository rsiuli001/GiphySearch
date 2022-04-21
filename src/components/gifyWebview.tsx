import React, { memo, NamedExoticComponent, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';

interface GifyWebViewProps {
  uri: string;
  style: StyleProp<ViewStyle>;
  injectedJS: string;
}

const GifyWebView: NamedExoticComponent<GifyWebViewProps> = memo(({ uri, style, injectedJS }) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  return (
    <>
      <WebView
        source={{ uri }}
        style={style}
        injectedJavaScript={injectedJS}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLoadEnd={() => {
          setIsloading(false);
        }}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GifyWebView;
