"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Ad() {
  const [ad, setAd] = useState<{ imageUrl: string; altText?: string } | null>(
    null
  );

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/ads/ad");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.imageUrl) {
          setAd(data);
        } else {
          console.error("Received invalid data", data);
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    fetchAd();
  }, []);

  return (
    <div>
      {/* Ad Image */}
      {ad && ad.imageUrl && (
        <div className="flex justify-center mb-5">
          <Image src={ad.imageUrl} alt={ad.altText || "Advertisement"} />
        </div>
      )}
    </div>
  );
}
