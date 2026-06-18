import React from "react";
import Navbar from "../components/navbar/Navbar";
import FadeInSection from "../components/ui/FadeInSection";
import ProfileHeaderView from "../components/profile/ProfileHeaderView";
import ProfileConfigView from "../components/profile/ProfileConfigView";
import ProfileIngestionView from "../components/profile/ProfileIngestionView"; 

const MOCK_USER_PROFILE = {
  name: "ALEX MORGAN",
  callsign: "bravo",
  role: "Senior Backend Engineer",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnK2RIeRnhNyCuwCKcAQXKTzIn0kmqIwADa8clLF0P-fGMp6hbKdGEw_pPCacnZV06y_CmT5tKCWyU31iyLPzS_Hxf2oUu43z_eJq462Xr24UJEu6jcNyKXRz48SH9AG1wnOrh8VmkgOmndIU_QHaZiE_V5QHPd5NGAGPpWiyA1zaQFddUg496GkJe9kltuC5fdAgl2l7MjlkcUFxFKG8ong23eE0zlvgKm8mbQQrRHUP-j8gPAsaMf-h3cSETovfLQFWuq1NmbsM9",
  stats: {
    interviews: 24,
    bestScore: 96,
    streak: 7,
    hours: 31
  }
};

const ProfileDashboard = () => {
  return (
    <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative selection:bg-neon-blue selection:text-abyss">
      
      {/* High-density blueprint styling backgrounds */}
      <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_95%)] pointer-events-none z-0" />
      
      {/* Cinematic ambient vector highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/5 blur-[150px] pointer-events-none z-0" />

      <Navbar isSimulation={false} />

      {/* Main Snap Scroller Container Framework */}
      <main className="h-[calc(100vh-4.5rem)] w-full overflow-y-scroll snap-y snap-mandatory overflow-x-hidden scroll-smooth mt-18 relative z-10">
        
        {/* VIEWPORT 1: Profile dossier headers & operational analytics */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4 relative z-10">
          <FadeInSection className="w-full">
            <ProfileHeaderView user={MOCK_USER_PROFILE} />
          </FadeInSection>
        </section>

        {/* VIEWPORT 2: System preferences module block swapper */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4 relative z-10">
          <FadeInSection className="w-full">
            <ProfileConfigView />
          </FadeInSection>
        </section>

        {/* VIEWPORT 3: Resume ingestion node zone & configuration submission controls */}
        <section className="h-[calc(100vh-4.5rem)] w-full flex-shrink-0 snap-start snap-always max-w-7xl mx-auto px-margin-edge flex flex-col justify-center py-4 relative z-10">
          <FadeInSection className="w-full h-full">
            <ProfileIngestionView />
          </FadeInSection>
        </section>

      </main>
    </div>
  );
};

export default ProfileDashboard;