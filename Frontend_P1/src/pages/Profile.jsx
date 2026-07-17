import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import FadeInSection from "../components/ui/FadeInSection";
import ProfileHeaderView from "../components/profile/ProfileHeaderView";
import ProfileConfigView from "../components/profile/ProfileConfigView";
import ProfileIngestionView from "../components/profile/ProfileIngestionView";
import { userService } from "../services/userService";
import { updateUser } from "../redux/features/authSlice";

const ProfileDashboard = () => {
  const dispatch = useDispatch();

  const [profileDataState, setProfileDataState] = useState({
    profile: null,
    stats: null,
    preferences: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch all profile data ───────────────────────────────────
  const fetchProfileData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [fetchedProfile, fetchedStats, fetchedPrefs] = await Promise.all([
        userService.getProfile(),
        userService.getStats(),
        userService.getPreferences(),
      ]);

      setProfileDataState({
        profile: fetchedProfile,
        stats: fetchedStats,
        preferences: fetchedPrefs,
      });

      // Fix 2: Use updateUser instead of setCredentials
      dispatch(updateUser(fetchedProfile));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // ── Handle profile update ────────────────────────────────────
  const handleProfileUpdate = async (updateData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const updated = await userService.updateProfile(updateData);
      setProfileDataState((prev) => ({ ...prev, profile: updated }));

      // Fix 2: updateUser not setCredentials
      dispatch(updateUser(updated));
    } catch (err) {
      throw err;
    }
  };

  // ── Handle preferences update ────────────────────────────────
  const handlePreferencesUpdate = async (prefsData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const updated = await userService.updatePreferences(prefsData);
      setProfileDataState((prev) => ({ ...prev, preferences: updated }));
    } catch (err) {
      throw err;
    }
  };

  // Fix 5: Memoize buildUserProfile
  const userProfile = useMemo(() => {
    const { profile, stats } = profileDataState;
    if (!profile || !stats) return null;
    return {
      name: profile.name?.toUpperCase() || "UNKNOWN OPERATOR",
      callsign: profile.callsign || "OPERATOR",
      role: profile.role || "Candidate",
      avatarUrl: profile.avatarUrl,
      stats: {
        interviews: stats.interviewsCompleted,
        bestScore: stats.bestScore,
        streak: stats.streak,
        hours: stats.studyHours,
      },
    };
  }, [profileDataState]);

  // ── Loading ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-abyss flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-t-2 border-l-2 border-neon-blue rounded-full animate-spin" />
          <p className="font-mono text-xs text-steel uppercase tracking-widest animate-pulse">
            LOADING OPERATOR DOSSIER...
          </p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="w-full h-screen bg-abyss flex items-center justify-center">
        <div className="text-center space-y-6">
          <p className="font-mono text-sm text-danger uppercase tracking-wider">
            ⚠ {error}
          </p>
          <button
            onClick={fetchProfileData}
            className="border border-neon-blue text-neon-blue font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-neon-blue/10 transition-all duration-300 cursor-pointer"
          >
            [ RETRY ]
          </button>
        </div>
      </div>
    );
  }

  // Fix 3: Replace return null with proper fallback
  if (
    !profileDataState.profile ||
    !profileDataState.stats ||
    !profileDataState.preferences ||
    !userProfile
  ) {
    return (
      <div className="w-full h-screen bg-abyss flex items-center justify-center">
        <div className="text-center space-y-6">
          <p className="font-mono text-sm text-steel uppercase tracking-wider">
            // UNABLE TO LOAD OPERATOR PROFILE
          </p>
          <button
            onClick={fetchProfileData}
            className="border border-neon-blue text-neon-blue font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-neon-blue/10 transition-all duration-300 cursor-pointer"
          >
            [ RETRY ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative selection:bg-neon-blue selection:text-abyss">
      {/* Background */}
      <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_95%)] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/5 blur-[150px] pointer-events-none z-0" />

      <Navbar isSimulation={false} />

      <main className="h-[calc(100vh-4.5rem)] w-full overflow-y-scroll snap-y snap-mandatory overflow-x-hidden scroll-smooth mt-18 relative z-10">
        {/* VIEWPORT 1: Profile dossier + stats */}
        <section className="min-h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-8 md:py-4 relative z-10">
          <FadeInSection className="w-full">
            <ProfileHeaderView
              user={userProfile}
              onUpdate={handleProfileUpdate}
            />
          </FadeInSection>
        </section>

        {/* VIEWPORT 2: System preferences */}
        <section className="min-h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-8 md:py-4 relative z-10">
          <FadeInSection className="w-full">
            <ProfileConfigView
              preferences={profileDataState.preferences}
              onUpdate={handlePreferencesUpdate}
            />
          </FadeInSection>
        </section>

        {/* VIEWPORT 3: Resume ingestion */}
        <section className="min-h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-8 md:py-4 relative z-10">
          <FadeInSection className="w-full h-full">
            <ProfileIngestionView />
          </FadeInSection>
        </section>
      </main>
    </div>
  );
};

export default ProfileDashboard;
