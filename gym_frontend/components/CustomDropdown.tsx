import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

interface CustomDropdownProps {
  title: string;
  data: string[];
  onSelectValue: (value: string) => void;
  defaultValue?: string;
}

const CustomDropdown = ({
  data,
  title,
  onSelectValue,
  defaultValue,
}: CustomDropdownProps) => {
  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue); // Set selected value to defaultValue if provided
    }
  }, [defaultValue]); // Re-run if defaultValue changes

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mapping data to display in the dropdown
  const dropdownData = data.map((item) => ({
    label: item,
    value: item,
  }));

  const renderLabel = () => {
    if (selectedValue || isVisible) {
      return <Text className="text-sm">{title.toUpperCase()}</Text>;
    }
    return null;
  };

  return (
    <View className="w-full mt-4">
      {/* {renderLabel()} */}
      <Text className="text-xl">{title.toUpperCase()}</Text>
      <Dropdown
        data={dropdownData}
        style={styles.dropdown}
        itemTextStyle={styles.textItem}
        itemContainerStyle={styles.item}
        containerStyle={styles.container}
        placeholderStyle={styles.placeholderStyle}
        labelField="label"
        valueField="value"
        placeholder={!selectedValue ? `Select the ${title}` : selectedValue}
        value={selectedValue}
        onBlur={() => setIsVisible(false)}
        onChange={(item) => {
          setSelectedValue(item.value);
          onSelectValue(item.value); // Call onSelectValue with the selected value
        }}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    fontSize: 14,
    elevation: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    borderRadius: 12,
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 10,
  },
});
