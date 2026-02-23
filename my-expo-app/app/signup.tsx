import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../src/firebaseConfig";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      Alert.alert("Invalid Name", "Please enter your full name.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      await updateProfile(res.user, { displayName: trimmedName });

      await setDoc(doc(db, "users", res.user.uid), {
        name: trimmedName,
        email: trimmedEmail,
        streak: 0,
        lastCompletedDate: null,
        createdAt: Date.now(),
      });

      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Signup Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start your habit journey in under a minute.</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ashish Gautam"
          placeholderTextColor="#98A2B3"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor="#98A2B3"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="At least 6 characters"
          placeholderTextColor="#98A2B3"
        />

        <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Sign Up</Text>}
        </TouchableOpacity>

        <Text style={styles.linkText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/login")}>
            Login
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  subtitle: { fontSize: 14, color: "#667085", marginBottom: 6 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: "600" },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, borderColor: "#D0D5DD" },
  btn: { marginTop: 18, backgroundColor: "#50C9CE", padding: 14, borderRadius: 12, alignItems: "center" },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: "#fff", fontWeight: "700" },
  linkText: { marginTop: 16, textAlign: "center" },
  link: { fontWeight: "700" },
});
