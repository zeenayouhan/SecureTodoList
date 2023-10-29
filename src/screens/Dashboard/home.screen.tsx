import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { items } from '../../common/constants/HomeScreen.contants';
import ItemCardComponent from '../../components/ItemCard.component';
import RoundedButton from '../../components/RoundedButton.component';
import { getScaledNumber } from '../../lib/utils';
import colors from '../../res/colors';
import { Item } from '../../types';

const HomeScreen = () => {
  const [descriptions, setDescriptions] = useState<Item[]>(items);
  const [textValue, setTextValue] = useState<String>('');
  const [selectedItemKey, setSelectedItemKey] = useState<String>(null);
  const [isAdd, isSetAdd] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);

  const handleItemAdd = () => {
    // handle the adding item functionality
    if (textValue) {
      let highestKey = 0;
      descriptions.forEach((item) => {
        let itemKey = parseInt(item.key);
        if (itemKey > highestKey) {
          highestKey = itemKey;
        }
      });
      const newItem = {
        key: (highestKey + 1).toString(),
        label: `${textValue}`,
      };
      setDescriptions([...descriptions, newItem]);
      setTextValue('');
      scrollToItemInput();
    }
  };

  const handleItemDelete = (itemKey: string) => {
    // handle the deleting item functionality when clicking 'REMOVE' in each item

    if (itemKey === selectedItemKey) {
      isSetAdd(true);
    }
    const updatedDescriptions = descriptions.filter(
      (item) => item.key !== itemKey
    );
    setDescriptions(updatedDescriptions);
    if (updatedDescriptions.length === 0) {
      setTextValue('');
    }
  };

  const handleItemUpdate = () => {
    // update the item using the text input
    if (selectedItemKey && textValue) {
      const updatedDescriptions = descriptions.map((item) =>
        item.key === selectedItemKey
          ? { ...item, label: textValue.toString() }
          : item
      );
      setDescriptions(updatedDescriptions);
      setSelectedItemKey(selectedItemKey);
      setTextValue('');
      isSetAdd(true);
    }
  };

  const onChangeText = (text: string) => {
    setTextValue(text);
  };

  const handleUpdate = (options: Item) => {
    // click the item card to update
    setSelectedItemKey(options.key);
    setTextValue(options.label);
    isSetAdd(false);
  };

  const scrollToItemInput = () => {
    // always scroll to the last added item
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const todoLabel = isAdd ? 'ADD' : 'UPDATE';

  const todoMethod = isAdd ? handleItemAdd : handleItemUpdate;

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

  const isAddStyle = isAdd
    ? styles.buttonContentIsAddStyle
    : styles.buttonContentIsUpdateStyle;

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
          <RoundedButton
            label={todoLabel}
            onPress={todoMethod}
            buttonContentStyle={isAddStyle}
          />
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
  buttonContentIsUpdateStyle: {
    width: getScaledNumber(140),
    height: getScaledNumber(70),
  },
  buttonContentIsAddStyle: {
    width: getScaledNumber(120),
    height: getScaledNumber(70),
  },
  buttonStyle: {
    marginVertical: getScaledNumber(5),
    paddingHorizontal: getScaledNumber(15),
    alignContent: 'flex-end',
  },
  textInputStyle: {
    marginLeft: getScaledNumber(20),
    fontSize: getScaledNumber(20),
    color: colors.black,
    width: '45%',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    marginVertical: getScaledNumber(20),
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
    height: getScaledNumber(90),
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
