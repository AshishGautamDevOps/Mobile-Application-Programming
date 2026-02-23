import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebaseConfig";

export default function WelcomeScreen() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
        return;
      }

      setCheckingAuth(false);
    });

    return () => unsub();
  }, [router]);

  if (checkingAuth) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#50C9CE" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1-Minute Challenge</Text>
      <Text style={styles.subtitle}>Build small habits in just one minute a day</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/signup")}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  loaderText: { color: "#667085", fontSize: 14 },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 24 },
  subtitle: { fontSize: 16, opacity: 0.7, marginBottom: 24, textAlign: "center" },
  btn: { backgroundColor: "#50C9CE", padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  link: { marginTop: 18, textAlign: "center", fontWeight: "600" },
});
