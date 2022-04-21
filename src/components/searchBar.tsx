import React, { NamedExoticComponent, useState } from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

interface SearchBarProps {
  onChange: (text: string) => void;
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
}

const SearchBar: NamedExoticComponent<SearchBarProps> = React.memo(
  ({
    onChange,
    value,
    placeholder = '',
    keyboardType = 'default',
    returnKeyType = 'search'
  }): JSX.Element => {
    const [tempValue, setTempValue] = useState<string>(value);

    const onTempValueChange = (text: string): void => {
      setTempValue(text);
      onChange(text);
    };

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={onTempValueChange}
          value={tempValue}
          placeholder={placeholder}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    margin: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingLeft: 5
  },
  textInputContainer: {
    flex: 1
  }
});

export default SearchBar;
