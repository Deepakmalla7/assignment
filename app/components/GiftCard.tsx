/**
 * GiftCard Component
 * Displays a single gift recommendation with image, title, and details
 */

import { Gift } from "@/lib/types/gift";
import Image from "next/image";

interface GiftCardProps {
  gift: Gift;
  onClick?: () => void;
}

export default function GiftCard({ gift, onClick }: GiftCardProps) {
  return (
    <div
      onClick={onClick}
      className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center overflow-hidden">
        {gift.image ? (
          <Image
            src={gift.image}
            alt={gift.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-4xl">🎁</div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="inline-block mb-2">
          <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
            {gift.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {gift.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {gift.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-semibold text-pink-600">
            {gift.price}
          </span>
          <span className="text-xs text-gray-500">
            Age {gift.ageRange}
          </span>
        </div>
      </div>
    </div>
  );
}
