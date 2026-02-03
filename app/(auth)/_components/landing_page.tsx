"use client";

import { useState } from "react";
import SimpleHeader from "./SimpleHeader";
import AuthModal from "./AuthModal";
import { getGiftRecommendations } from "@/lib/api/gift";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [event, setEvent] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleGetStarted = async () => {
    setError("");
    
    if (!event || !age || !gender) {
      setError("Please fill in all fields");
      return;
    }

    try {
      console.log("Fetching recommendations for:", { age, event, gender });
      const result = await getGiftRecommendations(parseInt(age), event, gender);
      console.log("Got result:", result);
      
      if (result.success) {
        // Store the gift recommendations and preferences in localStorage
        localStorage.setItem("giftPreferences", JSON.stringify({ age: parseInt(age), event, gender }));
        localStorage.setItem("giftRecommendations", JSON.stringify(result.data));
        // Navigate to results page
        router.push("/dashboard/recommendations");
      } else {
        setError(result.message || "Failed to get recommendations");
      }
    } catch (err: any) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || "Failed to get recommendations. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      <SimpleHeader 
        onLoginClick={() => setAuthModal("login")}
        onSignupClick={() => setAuthModal("register")}
      />

      {/* HERO SECTION WITH FEATURES */}
      <section className="bg-[#faf7f2] border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT: FORM */}
            <div className="bg-[#f1f1ef] rounded-[32px] p-10 shadow-sm">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Find a perfect gift
              </h1>
              <p className="text-sm text-gray-600 mb-8">
                Give the perfect gift to your friend or loved one
              </p>

              {/* FORM */}
              <div className="space-y-6">
                {/* Event */}
                <div>
                  <label className="text-sm font-medium text-gray-700">For</label>
                  <select value={event} onChange={(e) => setEvent(e.target.value)} className="mt-1 w-full rounded-full bg-[#9db89d] px-4 py-3 text-sm text-white focus:outline-none cursor-pointer">
                    <option value="">Select an event</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                  </select>
                </div>

                {/* Age */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Age</label>
                  <select value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 w-full rounded-full bg-[#9db89d] px-4 py-3 text-sm text-white focus:outline-none cursor-pointer">
                    <option value="">Select age</option>
                    {Array.from({ length: 116 }, (_, i) => i + 5).map((a) => (
                      <option key={a} value={a.toString()}>{a}</option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1 w-full rounded-full bg-[#9db89d] px-4 py-3 text-sm text-white focus:outline-none cursor-pointer">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-600">{error}</p>}

                {/* Button */}
                <button 
                  onClick={handleGetStarted}
                  className="mt-6 w-full inline-flex items-center justify-center rounded-full bg-pink-500 px-8 py-3 text-sm font-semibold text-white hover:bg-pink-600 transition disabled:opacity-60"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <img src="/hero.png" alt="Giftly Assistant" className="max-w-md w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* AUTH MODAL */}
      <AuthModal 
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        type={authModal}
      />
    </main>
  );
}
