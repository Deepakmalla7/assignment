"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGiftRecommendations } from "@/lib/api/gift";

export default function Home() {
  const router = useRouter();
  const [event, setEvent] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setError("");
    
    if (!event || !age || !gender) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold text-pink-500">Giftly</span>
              <span className="text-2xl">🎁</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Gift Finder Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Gift</h2>
            <p className="text-gray-600 mb-8">Answer a few quick questions to get personalized recommendations</p>

            <div className="space-y-6">
              {/* Event Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select an event</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="wedding">Wedding</option>
                </select>
              </div>

              {/* Age Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient's Age <span className="text-red-500">*</span>
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select an age</option>
                  {Array.from({ length: 116 }, (_, i) => i + 5).map((age) => (
                    <option key={age} value={age}>
                      {age} years old
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select a gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Get Started Button */}
              <button
                onClick={handleGetStarted}
                disabled={isLoading}
                className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Finding Perfect Gifts...
                  </>
                ) : (
                  "Get Started"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Takes less than 1 minute to get personalized recommendations
              </p>
            </div>
          </div>

          {/* Right Side - Hero Image and Features */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl p-8 text-center min-h-96 flex flex-col items-center justify-center">
              <div className="text-8xl mb-4">🎁</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Your Perfect Gift Awaits
              </h3>
              <p className="text-gray-600">
                Smart recommendations based on age, event, and gender preferences
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Fast & Easy</h4>
                    <p className="text-sm text-gray-600">Get recommendations in seconds</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Personalized</h4>
                    <p className="text-sm text-gray-600">Tailored to your specific needs</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✨</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Quality Picks</h4>
                    <p className="text-sm text-gray-600">Carefully curated gift suggestions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 text-pink-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Select Details</h3>
              <p className="text-gray-600">Choose the event, recipient's age, and gender</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 text-pink-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Get Recommendations</h3>
              <p className="text-gray-600">View personalized gift suggestions</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 text-pink-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Choose & Give</h3>
              <p className="text-gray-600">Pick the perfect gift and make someone happy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-pink-500">Giftly</span>
              <span className="text-lg">🎁</span>
            </div>
            <p className="text-gray-400">© 2026 Giftly. Finding perfect gifts since 2026.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
