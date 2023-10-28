import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import ItemCardComponent from '../../components/ItemCard.component';
import RoundedButton from '../../components/RoundedButton.component';
import { getScaledNumber, items } from '../../lib/utils';
import colors from '../../res/colors';
import { Item } from '../../types';

const HomeScreen = () => {
  const [descriptions, setDescriptions] = useState<Item[]>(items);
  const [textValue, setTextValue] = useState<String>('');
  const [selectedItemKey, setSelectedItemKey] = useState<String>(null);
  const [isAdd, isSetAdd] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);

  const handleItemAdd = () => {
    if (textValue) {
      const newItem = {
        key: (descriptions.length + 1).toString(),
        label: `${textValue}`,
      };
      setDescriptions([...descriptions, newItem]);
      setTextValue('');
      scrollToItemInput();
    }
  };

  const handleItemDelete = (itemKey: string) => {
    const e = descriptions.find((item) => item.key === selectedItemKey);
    if (!isAdd && e) {
      isSetAdd(true);
    }
    const updatedDescriptions = descriptions.filter(
      (item) => item.key !== itemKey
    );
    setSelectedItemKey(itemKey);
    setDescriptions(updatedDescriptions);
    if (updatedDescriptions.length === 0) {
      setTextValue('');
    }
  };

  const handleItemUpdate = () => {
    if (selectedItemKey && textValue) {
      const updatedDescriptions = descriptions.map((item) =>
        item.key === selectedItemKey
          ? { ...item, label: textValue.toString() }
          : item
      );
      setDescriptions(updatedDescriptions);
      setSelectedItemKey(null);
      setTextValue('');
      isSetAdd(true);
    }
  };

  const onChangeText = (text: string) => {
    setTextValue(text);
  };

  const handleUpdate = (options: { key: string; label: string }) => {
    setSelectedItemKey(options.key);
    setTextValue(options.label);
    isSetAdd(false);
  };

  const scrollToItemInput = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const setAdd = isAdd || descriptions.length === 0;

  const todoLabel = setAdd ? 'ADD' : 'UPDATE';

  const todoMethod = setAdd ? handleItemAdd : handleItemUpdate;

  const renderOptions = (options: Item) => {
    return (
      <ItemCardComponent
        key={options.key}
        index={options.key}
        label={options.label}
        onPressUpdate={() => handleUpdate(options)}
        onPressRemove={() => handleItemDelete(options.key)}
      />
    );
  };
  const keyExtractor = (item: Item) => item.key;

  const renderItem = ({ item }: { item: Item }) => renderOptions(item);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  const itemInput = () => {
    return (
      <View style={styles.cardStyle}>
        <TextInput
          value={textValue.toString()}
          style={styles.textInputStyle}
          placeholderTextColor={colors.gray}
          placeholder='Enter here'
          onChangeText={onChangeText}
          multiline={true}
        />
        <View style={styles.buttonStyle}>
          <RoundedButton label={todoLabel} onPress={todoMethod} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>TODO :</Text>
      <FlatList
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={descriptions}
        onContentSizeChange={() => scrollToItemInput()}
      />
      {itemInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: getScaledNumber(20),
    paddingHorizontal: getScaledNumber(10),
    alignContent: 'flex-end',
  },
  textInputStyle: {
    marginLeft: getScaledNumber(20),
    fontSize: getScaledNumber(20),
    color: colors.gray,
    width: getScaledNumber(150),
    lineHeight: getScaledNumber(30),
    borderBottomWidth: 1,
    borderColor: colors.gray,
    marginTop: getScaledNumber(20),
    marginBottom: getScaledNumber(20),
  },
  container: {
    flex: 1,
  },
  cardStyle: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: getScaledNumber(20),
    marginVertical: getScaledNumber(30),
    borderRadius: getScaledNumber(30),
    height: getScaledNumber(100),
    justifyContent: 'space-between',
  },
  titleStyle: {
    marginLeft: getScaledNumber(30),
    marginBottom: getScaledNumber(10),
    color: colors.blue,
    fontSize: getScaledNumber(30),
    fontWeight: 'bold',
    marginTop: getScaledNumber(30),
  },
});

export default HomeScreen;
