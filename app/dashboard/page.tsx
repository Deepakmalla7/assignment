"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGiftRecommendations } from "@/lib/api/gift";

export default function DashboardPage() {
  const router = useRouter();
  const [event, setEvent] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRecommendations = async () => {
    setError("");

    if (!event || !age || !gender) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await getGiftRecommendations(parseInt(age), event, gender);

      if (result.success) {
        localStorage.setItem("giftPreferences", JSON.stringify({ age: parseInt(age), event, gender }));
        localStorage.setItem("giftRecommendations", JSON.stringify(result.data));
        router.push("/dashboard/recommendations");
      } else {
        setError(result.message || "Failed to get recommendations");
      }
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome to GIFTLY</h1>
        <p className="text-gray-600 dark:text-gray-400">A smart Gift Recommendation at your fingertips</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Age</h3>
          </div>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select an age</option>
            {Array.from({ length: 116 }, (_, i) => i + 5).map((age) => (
              <option key={age} value={age}>
                {age} years old
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Event</h3>
          </div>
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select an event</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="wedding">Wedding</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">👥</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Gender</h3>
          </div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">AI Suggested Gifts</h2>

        <div className="mb-8">
          <button
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Finding Gifts...
              </>
            ) : (
              <>
                <span>🎁</span>
                <span>Get Recommendations</span>
              </>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-5xl mb-2">🎁</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Select options above</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          💡 Tip: Select age, event, and gender to get personalized gift recommendations powered by AI
        </p>
      </div>
    </div>
  );
}
