/**
 * Gift Recommendation Types
 * Core data structures for the gift recommendation system
 */

export type EventType = "birthday" | "anniversary" | "wedding" | "graduation" | "christmas" | "valentines";
export type GenderType = "male" | "female" | "other";
export type AgeGroup = "kids" | "teen" | "adult";

export interface Gift {
  id: string;
  name: string;
  description: string;
  category: string;
  ageRange: string;
  ageGroup: AgeGroup;
  price: string;
  event: EventType;
  gender: GenderType;
  image?: string;
}

export interface GiftRecommendationRequest {
  age: number;
  event: EventType;
  gender: GenderType;
}

export interface GiftRecommendationResponse {
  success: boolean;
  data: Gift[];
  message?: string;
  filters: GiftRecommendationRequest;
}

export interface GiftFilter {
  age?: number;
  event?: EventType;
  gender?: GenderType;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}
