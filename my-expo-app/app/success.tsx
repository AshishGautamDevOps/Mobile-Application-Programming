import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Success() {
  const router = useRouter();
  const params = useLocalSearchParams<{ streak?: string }>();
  const streak = params?.streak ?? "__";
  const streakNum = Number(streak);
  const motivation = Number.isFinite(streakNum) && streakNum >= 7 ? "Excellent consistency. Keep going." : "Small daily wins build big habits.";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Great Job!</Text>
      <Text style={styles.subtitle}>You completed today&apos;s challenge</Text>

      <View style={styles.box}>
        <Text style={styles.boxText}>Current Streak: {streak} Days</Text>
      </View>
      <Text style={styles.helper}>{motivation}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 18 },
  title: { fontSize: 28, fontWeight: "800", textAlign: "center" },
  subtitle: { fontSize: 16, opacity: 0.7, textAlign: "center" },
  box: { borderWidth: 1, borderRadius: 12, padding: 14, alignItems: "center" },
  boxText: { fontSize: 16, fontWeight: "700" },
  helper: { textAlign: "center", color: "#667085", fontSize: 13 },
  btn: { backgroundColor: "#50C9CE", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  btnText: { color: "#fff", fontWeight: "800" },
});
