import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const GratitudeChallenge: React.FC = () => {
  const [streak, setStreak] = useState(3);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    // Add logic to increment streak, save to storage, etc.
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>1-Minute Challenge</Text>
        </View>

        {/* Streak Badge */}
        <View style={styles.streakContainer}>
          <View style={styles.streakBadge}>
            <Text style={styles.fireEmoji}>🔥</Text>
            <Text style={styles.streakLabel}>Streak: </Text>
            <Text style={styles.streakNumber}>{streak} Days</Text>
          </View>
        </View>

        {/* Challenge Section */}
        <View style={styles.challengeSection}>
          <View style={styles.challengeHeader}>
            <View style={styles.lineLeft} />
            <Text style={styles.challengeTitle}>Today's Challenge</Text>
            <View style={styles.lineRight} />
          </View>

          {/* Challenge Card */}
          <View style={styles.challengeCard}>
            <Text style={styles.sparkle}>✨</Text>
            <Text style={styles.sparkle2}>✨</Text>
            <Text style={styles.challengeText}>
              Write 3 things{'\n'}you're grateful for
            </Text>
            <Text style={styles.sparkle3}>✨</Text>
          </View>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={[styles.button, completed && styles.buttonCompleted]}
          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>I DID IT</Text>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Cloud Decorations */}
        <View style={styles.cloudTop1} />
        <View style={styles.cloudTop2} />
        <View style={styles.cloudTop3} />
        <View style={styles.cloudBottom1} />
        <View style={styles.cloudBottom2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ECDC4',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#A8E6E3',
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    width: '100%',
    backgroundColor: '#2BACA3',
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  streakContainer: {
    marginBottom: 50,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  fireEmoji: {
    fontSize: 36,
    marginRight: 8,
  },
  streakLabel: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2C3E50',
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F39C12',
  },
  challengeSection: {
    width: '90%',
    marginBottom: 60,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  lineLeft: {
    width: 60,
    height: 2,
    backgroundColor: '#7DD3CF',
    marginRight: 12,
  },
  lineRight: {
    width: 60,
    height: 2,
    backgroundColor: '#7DD3CF',
    marginLeft: 12,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2B9A92',
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
    alignItems: 'center',
  },
  challengeText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 44,
  },
  sparkle: {
    position: 'absolute',
    top: 20,
    left: 30,
    fontSize: 24,
    color: '#F39C12',
  },
  sparkle2: {
    position: 'absolute',
    top: 30,
    right: 25,
    fontSize: 20,
    color: '#5FCFDB',
  },
  sparkle3: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    fontSize: 18,
    color: '#F39C12',
  },
  button: {
    width: '85%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonCompleted: {
    opacity: 0.9,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 32,
    backgroundColor: '#5FCD78',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#4AA866',
  },
  buttonText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginRight: 12,
  },
  checkmark: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5FCD78',
  },
  // Cloud decorations
  cloudTop1: {
    position: 'absolute',
    top: 100,
    left: 20,
    width: 80,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 40,
  },
  cloudTop2: {
    position: 'absolute',
    top: 120,
    right: 30,
    width: 100,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 50,
  },
  cloudTop3: {
    position: 'absolute',
    top: 180,
    left: 260,
    width: 70,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 35,
  },
  cloudBottom1: {
    position: 'absolute',
    bottom: 120,
    left: 15,
    width: 90,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 45,
  },
  cloudBottom2: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 110,
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 55,
  },
});

export default GratitudeChallenge;