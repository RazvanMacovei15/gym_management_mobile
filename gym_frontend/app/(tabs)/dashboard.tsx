import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/navigation/TopNav";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PieChart from "react-native-pie-chart";

type GymData = {
  totalTasks: number;
  backlogTasks: number;
  cancelledTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  toDoTasks: number;
};

const Dashboard = () => {
  const [gymData, setGymData] = useState<GymData>({
    totalTasks: 0,
    backlogTasks: 0,
    cancelledTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    toDoTasks: 0,
  });

  const [gymId, setGymId] = useState(null);
  const [gymName, setGymName] = useState<string | null>(null);

  const { authState } = useAuth();
  const userId = authState?.currentUser?.id;

  const taskData = [
    { name: "Completed", value: gymData?.completedTasks },
    { name: "To Do", value: gymData?.toDoTasks },
    { name: "In Progress", value: gymData.inProgressTasks },
    { name: "Cancelled", value: gymData?.cancelledTasks },
    { name: "Backlog", value: gymData?.backlogTasks },
  ];

  const colors = [
    "#2E8B57", // Completed - Sea Green (symbolizing success/completion)
    "#FFA500", // To Do - Orange (indicates tasks waiting to be done)
    "#1E90FF", // In Progress - Dodger Blue (represents active progress)
    "#FF4500", // Cancelled - Orange Red (symbolizing a stop or cancellation)
    "#808080", // Backlog - Gray (indicating inactive or pending tasks)
  ];
  // Calculate total tasks
  const totalTasks = gymData.totalTasks || 1; // Avoid division by zero

  // Create series data with percentage labels
  const series = taskData.map((task, index) => {
    const percentage = ((task.value || 0) / totalTasks) * 100;
    return {
      value: task.value || 0,
      color: colors[index],
      label: {
        text: task.value > 0 ? `${percentage.toFixed(1)}%` : "",
        fontSize: 14,
        fontFamily: "Poppins-Light",
      },
    };
  });

  // Device Width and Height for PieChart
  const widthAndHeight = Dimensions.get("window").width * 0.6;

  const fetchGymData = async () => {
    try {
      const gymResponse = await axios.get(
        "http://maco-coding.go.ro:8010/gyms/getGymByUserId",
        { params: { userId } }
      );

      const fetchedGymId = gymResponse.data.id;
      setGymId(fetchedGymId);
      setGymName(gymResponse.data.name);

      const dataResponse = await axios.get(
        "http://maco-coding.go.ro:8010/gyms/getBucket",
        { params: { gymId: fetchedGymId } }
      );

      setGymData(dataResponse.data);

      console.log("Gym data:", dataResponse.data);
    } catch (err) {
      console.error("Failed to fetch gym data:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchGymData();
    }
  }, [userId]);

  // Render Task Card
  const renderItem = ({ item, index }: any) => (
    <View style={[styles.card, { backgroundColor: colors[index] }]}>
      <Text style={styles.taskName}>{item.name}:</Text>
      <Text style={styles.taskValue}>{item.value}</Text>
    </View>
  );

  // Calculate total sum of series values
  const totalSeriesValue = series.reduce((sum, item) => sum + item.value, 0);

  return (
    <SafeAreaView className="bg-slate-900 flex-1">
      <TopNav />
      <View className="grow items-center justify-center h-3/5">
        <Text
          className="text-white text-2xl"
          style={{ fontFamily: "Poppins-Light" }}
          onPress={() => fetchGymData()}
        >
          Tasks Overview: {gymName?.toUpperCase()}
        </Text>
        <Text className="text-white text-xl p-5"></Text>
        {totalSeriesValue > 0 ? (
          <PieChart series={series} widthAndHeight={widthAndHeight} />
        ) : (
          <Text className="text-white text-lg mt-5">No tasks to display.</Text>
        )}
      </View>

      {/* Horizontal FlatList at Bottom */}
      <FlatList
        data={taskData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        className="bg-slate-700"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 5,
    marginHorizontal: 8,
    borderRadius: 20,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  taskName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  taskValue: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins-Light",
  },
});

export default Dashboard;
