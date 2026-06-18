import { createSlice } from "@reduxjs/toolkit";

export const DIFFICULTY = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
  ADAPTIVE: "ADAPTIVE",
};

export const THEME = {
  CYBER: "CYBER",
  BLUEPRINT: "BLUEPRINT",
  TERMINAL: "TERMINAL",
};

const initialState = {
  length: 10,
  difficulty: DIFFICULTY.ADAPTIVE,
  theme: THEME.CYBER,

  operatorIdentity: {
    name: "ALEX MORGAN",
    callsign: "PHANTOM",
    role: "Senior Backend Engineer",

    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnK2RIeRnhNyCuwCKcAQXKTzIn0kmqIwADa8clLF0P-fGMp6hbKdGEw_pPCacnZV06y_CmT5tKCWyU31iyLPzS_Hxf2oUu43z_eJq462Xr24UJEu6jcNyKXRz48SH9AG1wnOrh8VmkgOmndIU_QHaZiE_V5QHPd5NGAGPpWiyA1zaQFddUg496GkJe9kltuC5fdAgl2l7MjlkcUFxFKG8ong23eE0zlvgKm8mbQQrRHUP-j8gPAsaMf-h3cSETovfLQFWuq1NmbsM9",

    stats: {
      interviews: 24,
      bestScore: 96,
      streak: 7,
      hours: 31,
    },

    achievements: [
      {
        id: "first-interview",
        title: "FIRST INTERVIEW",
        description: "INITIALIZED // 2023.10.12",
        icon: "award",
      },
      {
        id: "score-above-90",
        title: "SCORE ABOVE 90",
        description: "EXCEPTIONAL MATRIX PERFORMANCE",
        icon: "trophy",
      },
      {
        id: "backend-specialist",
        title: "BACKEND SPECIALIST",
        description: "GO / RUST / NODE.JS PROTOCOLS",
        icon: "code",
      },
    ],
  },
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    setInterviewLength: (state, action) => {
      state.length = action.payload;
    },

    setDifficultyThreshold: (state, action) => {
      state.difficulty = action.payload;
    },

    setInterfaceTheme: (state, action) => {
      state.theme = action.payload;
    },

    updateOperatorProfile: (state, action) => {
      const { name, callsign, role, avatarUrl } = action.payload;

      if (name) state.operatorIdentity.name = name;
      if (callsign) state.operatorIdentity.callsign = callsign;
      if (role) state.operatorIdentity.role = role;
      if (avatarUrl) state.operatorIdentity.avatarUrl = avatarUrl;
    },

    incrementInterviewMetrics: (state, action) => {
      const { score } = action.payload;

      state.operatorIdentity.stats.interviews += 1;
      state.operatorIdentity.stats.streak += 1;

      if (score > state.operatorIdentity.stats.bestScore) {
        state.operatorIdentity.stats.bestScore = score;
      }
    },

    incrementStudyHours: (state, action) => {
      state.operatorIdentity.stats.hours += action.payload;
    },

    resetProfileStats: (state) => {
      state.operatorIdentity.stats = {
        interviews: 0,
        bestScore: 0,
        streak: 0,
        hours: 0,
      };
    },

    unlockAchievement: (state, action) => {
      state.operatorIdentity.achievements.push(action.payload);
    },
  },
});

export const {
  setInterviewLength,
  setDifficultyThreshold,
  setInterfaceTheme,
  updateOperatorProfile,
  incrementInterviewMetrics,
  incrementStudyHours,
  resetProfileStats,
  unlockAchievement,
} = profileSlice.actions;

export const selectProfile = (state) => state.profile;

export const selectOperatorIdentity = (state) =>
  state.profile.operatorIdentity;

export const selectOperatorStats = (state) =>
  state.profile.operatorIdentity.stats;

export const selectAchievements = (state) =>
  state.profile.operatorIdentity.achievements;

export const selectInterviewConfig = (state) => ({
  length: state.profile.length,
  difficulty: state.profile.difficulty,
  theme: state.profile.theme,
});

export const selectInterviewLength = (state) =>
  state.profile.length;

export const selectDifficulty = (state) =>
  state.profile.difficulty;

export const selectTheme = (state) =>
  state.profile.theme;

export default profileSlice.reducer;