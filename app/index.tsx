import { storage } from "@/shared/storage/storage";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Button,
  ScrollView,
} from "react-native";

const foodLogsKey = "foodLogs";

interface IFoodLog {
  foods: string[];
}

export default function Index() {
  const [text, setText] = useState("");
  const [foodLogs, setFoodLogs] = useState<IFoodLog[]>([]);

  // On Start
  useEffect(() => {
    console.log("Hello, world!");
    storage.getData<IFoodLog[]>(foodLogsKey).then((data) => {
      if (data) {
        setFoodLogs(data);
      }
    });
  }, []);

  function submitFoodLog() {
    const foods = text.split("\n");
    console.log(foods);
    const foodLog: IFoodLog = { foods };
    const newFoodLogs = [foodLog, ...foodLogs];
    setFoodLogs(newFoodLogs);
    storage.storeData(foodLogsKey, newFoodLogs);

    // Clear input
    setText("");
  }

  function deleteFoodLog(foodLog: IFoodLog) {
    const newFoodLogs = foodLogs.filter((log) => log !== foodLog);
    setFoodLogs(newFoodLogs);
    storage.storeData(foodLogsKey, newFoodLogs);
  }

  const foodLogsUI = foodLogs.map((foodLog, index) => {
    return (
      <View key={index}>
        {foodLog.foods.map((food, index) => (
          <Text key={index}>{food}</Text>
        ))}
        <Button
          onPress={() => deleteFoodLog(foodLog)}
          title="Delete"
          color="red"
          accessibilityLabel="Delete this food log"
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>What have you eaten today?</Text>
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder="Enter the foods you've eaten, one in each row"
          multiline
          style={styles.input}
        ></TextInput>
        <Button
          onPress={submitFoodLog}
          title="Submit"
          color="#841584"
          accessibilityLabel="Submit the foods you've eaten"
        />
        {foodLogsUI}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 30,
  },
  input: {
    height: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
