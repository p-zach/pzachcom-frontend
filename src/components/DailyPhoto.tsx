"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import * as exifr from "exifr";
import { Fraction } from 'fraction.js';

export default function DailyPhoto() {
  const PHOTO_API_URL = "https://pzachcomfn.azurewebsites.net/api/photo-of-the-day?max_w=500"

  const [loading, setLoading] = useState(true);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [exifString, setExifString] = useState<string>("");

  async function loadExif() {
    try {
      const response = await fetch(PHOTO_API_URL);
      const blob = await response.blob();
      const exif = await exifr.parse(blob);
      setExifString(createExifString(exif));
    } catch (err) {
      console.error("Error loading EXIF:", err);
      setPhotoError(err as string);
    }
  }

  function createExifString(exif: Record<string, unknown>) {
    const model = exif["Model"] as string;
    const focalLength = exif["FocalLength"] as number;
    const iso = exif["ISO"] as number;
    const exposureTime = exif["ExposureTime"] as number;
    const aperture = (exif["FNumber"] as number).toFixed(1);

    const shutterSpeed = new Fraction(exposureTime).simplify(0.0000001).toFraction();

    return `${model} @ ${focalLength}mm, ISO ${iso}, ${shutterSpeed}, f/${aperture}`
  }

  useEffect(() => {
    loadExif();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-roboto-serif text-brand-dark mb-3">
        Photo of the Day
      </h1>
      {photoError && <p className="text-red-500">{photoError}</p>}
      {!photoError && (
        <Image
          src={PHOTO_API_URL}
          alt="Random photo"
          className="shadow-md mx-auto"
          width={0} height={0} // required by component
          style={{
            width: "500px", // actual fixed width
            height: "auto", // maintain aspect ratio
          }}
          priority
          unoptimized 
          onLoad={() => setLoading(false)}
        />
      )}
      <div className="p-3 text-sm italic">
        {!loading && (exifString? exifString : "Loading EXIF data...")}
      </div>
      {loading && <p>Loading photo of the day...</p>}
    </div>
  )
}