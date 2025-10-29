"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import * as exifr from "exifr";
import { Fraction } from 'fraction.js';

export default function DailyPhoto() {
  const PHOTO_API_URL = "https://pzachcomfn.azurewebsites.net/api/photo-of-the-day"

  const [loading, setLoading] = useState(true);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [exifString, setExifString] = useState<string>("");

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

    loadExif();
  }, []);

  return (
    <div>
      {photoError && <p className="text-red-500 font-bold">Error fetching the photo!</p>}
      {!photoError && (
        <Image
          src={PHOTO_API_URL}
          alt="Random photo"
          className="shadow-lg mx-auto"
          width={0} height={0} // required by component
          style={{
            width: "500px", // actual fixed width
            height: "auto", // maintain aspect ratio
          }}
          priority 
          onLoad={() => setLoading(false)}
        />
      )}
      {!loading && !photoError && <div className="pt-3 text-sm italic">
        {exifString? exifString : "Loading EXIF data..."}
      </div>}
      {loading && !photoError && <p>Loading photo of the day...</p>}
    </div>
  )
}