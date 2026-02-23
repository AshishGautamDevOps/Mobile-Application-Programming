import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../src/firebaseConfig";

type UserDoc = {
  name?: string;
  email?: string;
  streak?: number;
};

export default function ProfileTab() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("-");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = (snap.data() ?? {}) as UserDoc;

        setName(data.name ?? user.displayName ?? "User");
        setEmail(data.email ?? user.email ?? "-");
        setStreak(data.streak ?? 0);
      } catch (e: any) {
        Alert.alert("Load Error", e.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Logout Error", e.message);
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#50C9CE" />
        <Text style={styles.helper}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Current Streak</Text>
        <Text style={styles.value}>{streak} days</Text>
      </View>

      <TouchableOpacity style={[styles.btn, loggingOut && styles.btnDisabled]} onPress={handleLogout} disabled={loggingOut}>
        {loggingOut ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Logout</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  helper: { color: "#667085", marginTop: 10 },
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 12 },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 8, textAlign: "center" },
  card: { borderWidth: 1, borderColor: "#D0D5DD", borderRadius: 12, padding: 14, backgroundColor: "#fff" },
  label: { color: "#667085", fontSize: 13, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: "700", color: "#101828" },
  btn: { marginTop: 16, backgroundColor: "#E53935", borderRadius: 12, padding: 14, alignItems: "center" },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: "#fff", fontWeight: "800" },
});
