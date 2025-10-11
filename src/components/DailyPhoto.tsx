"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import seedrandom from 'seedrandom';
import * as exifr from "exifr";
import { Fraction } from 'fraction.js';

interface PhotoList {
  photos: string[];
}

export default function DailyPhoto() {
  const PHOTO_BLOB_URL = "https://pzach.blob.core.windows.net/photos"

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [exifError, setExifError] = useState<string | null>(null);
  const [exifString, setExifString] = useState<string>("");

  async function fetchRandomPhoto() {
    try {
      setLoading(true);
      setPhotoError(null);

      const res = await fetch(`${PHOTO_BLOB_URL}/photos.json`);
      if (!res.ok) throw new Error(`Failed to load JSON (${res.status})`);

      const data: PhotoList = await res.json();
      if (!data.photos?.length) throw new Error("No photos found in JSON");

      const today = new Date();
      const seed = today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate();
      const rng = seedrandom(`${seed}`);

      const randomIndex = Math.floor(rng() * data.photos.length);
      const chosen = data.photos[randomIndex];

      setPhotoUrl(`${PHOTO_BLOB_URL}/${chosen}`);
    } catch (err: any) {
      setPhotoError(err.message || "Error fetching photo");
    } finally {
      setLoading(false);
    }
  };

  async function loadExif() {
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const exif = await exifr.parse(blob);
      setExifString(createExifString(exif));
    } catch (err) {
      console.error("Error loading EXIF:", err);
      setExifError("Could not read EXIF data.");
    }
  }

  function createExifString(exif: Record<string, any>) {
    const model = exif["Model"];
    const focalLength = exif["FocalLength"];
    const iso = exif["ISO"];
    const exposureTime = exif["ExposureTime"];
    const aperture = exif["FNumber"].toFixed(1);

    const shutterSpeed = new Fraction(exposureTime).simplify(0.0000001).toFraction();

    return `${model} @ ${focalLength}mm, ISO ${iso}, ${shutterSpeed}, f/${aperture}`
  }

  useEffect(() => {
    fetchRandomPhoto();
  }, []);

  useEffect(() => {
    if (photoUrl) {
      loadExif();
    }
  }, [photoUrl]);

  return (
    <div>
      <h1 className="text-4xl font-roboto-serif text-brand-dark mb-3">
        Photo of the Day
      </h1>
      {loading && <p>Loading random photo...</p>}
      {photoError && <p className="text-red-500">{photoError}</p>}
      {photoUrl && !loading && !photoError && (
        <Image
          src={photoUrl}
          alt="Random photo"
          className="shadow-md mx-auto"
          width={0} height={0} // required by component
          style={{
            width: "500px", // actual fixed width
            height: "auto", // maintain aspect ratio
          }}
          priority
          unoptimized
        />
      )}
      <div className="p-3 text-sm italic">
        {exifString? exifString : "Loading EXIF data..."}
      </div>
    </div>
  )
}