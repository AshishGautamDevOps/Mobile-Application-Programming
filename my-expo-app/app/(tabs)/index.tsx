import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../src/firebaseConfig";

type UserDoc = {
  name?: string;
  email?: string;
  streak: number;
  lastCompletedDate: string | null; // "YYYY-MM-DD"
};

const CHALLENGES = [
  "Write 3 things you're grateful for.",
  "Do 10 squats.",
  "Take 5 deep breaths slowly.",
  "Drink one glass of water.",
  "Write 1 goal for tomorrow.",
  "Clean your desk for 1 minute.",
  "Learn 1 new word and use it.",
  "Send a kind message to someone.",
];

function formatDateLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isYesterday(last: string, today: string) {
  const t = new Date(today + "T00:00:00");
  t.setDate(t.getDate() - 1);
  return formatDateLocal(t) === last;
}

function pickChallengeForDate(dateStr: string) {
  const seed = Number(dateStr.replaceAll("-", ""));
  return CHALLENGES[seed % CHALLENGES.length];
}

export default function HomeTab() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [streak, setStreak] = useState<number>(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);

  const today = useMemo(() => formatDateLocal(new Date()), []);
  const todaysChallenge = useMemo(() => pickChallengeForDate(today), [today]);
  const alreadyDoneToday = lastCompletedDate === today;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUid(null);
        setLoading(false);
        router.replace("/login");
        return;
      }

      setUid(user.uid);

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          const newUser: UserDoc = {
            name: user.displayName ?? "",
            email: user.email ?? "",
            streak: 0,
            lastCompletedDate: null,
          };
          await setDoc(ref, { ...newUser, createdAt: Date.now() });
          setName(newUser.name ?? "User");
          setStreak(0);
          setLastCompletedDate(null);
        } else {
          const data = snap.data() as UserDoc;
          setName(data.name ?? user.displayName ?? "User");
          setStreak(data.streak ?? 0);
          setLastCompletedDate(data.lastCompletedDate ?? null);
        }
      } catch (e: any) {
        Alert.alert("Error", e.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  const handleComplete = async () => {
    if (!uid) return;

    if (alreadyDoneToday) {
      Alert.alert("Already done!", "You already completed today's challenge. Come back tomorrow.");
      return;
    }

    const newStreak = lastCompletedDate && isYesterday(lastCompletedDate, today) ? streak + 1 : 1;

    try {
      const ref = doc(db, "users", uid);
      await updateDoc(ref, {
        streak: newStreak,
        lastCompletedDate: today,
        updatedAt: Date.now(),
      });

      setStreak(newStreak);
      setLastCompletedDate(today);
      router.push({ pathname: "/success", params: { streak: String(newStreak) } });
    } catch (e: any) {
      Alert.alert("Save Error", e.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi {name || "there"},</Text>
      <Text style={styles.header}>1-Minute Challenge</Text>
      <View style={styles.streakBox}>
        <Text style={styles.streakText}>Streak: {streak} Days</Text>
      </View>
      <Text style={styles.sectionTitle}>Today&apos;s Challenge</Text>
      <View style={styles.challengeBox}>
        <Text style={styles.challengeText}>{todaysChallenge}</Text>
      </View>
      <TouchableOpacity
        style={[styles.btn, alreadyDoneToday && styles.btnDisabled]}
        onPress={handleComplete}
        disabled={alreadyDoneToday}
      >
        <Text style={styles.btnText}>{alreadyDoneToday ? "DONE" : "I DID IT"}</Text>
      </TouchableOpacity>

      {alreadyDoneToday ? <Text style={styles.doneHint}>Come back tomorrow to keep the streak alive.</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 16 },
  greeting: { fontSize: 16, fontWeight: "600", color: "#667085", textAlign: "center" },
  header: { fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 4 },
  streakBox: { borderWidth: 1, borderRadius: 12, padding: 12, alignItems: "center" },
  streakText: { fontSize: 16, fontWeight: "700" },
  sectionTitle: { textAlign: "center", fontSize: 16, fontWeight: "700", marginTop: 6 },
  challengeBox: { borderWidth: 1, borderRadius: 12, padding: 16, alignItems: "center" },
  challengeText: { fontSize: 16, textAlign: "center", lineHeight: 22 },
  btn: { backgroundColor: "#50C9CE", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 6 },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  doneHint: { textAlign: "center", color: "#667085", fontSize: 13, marginTop: 4 },
});
