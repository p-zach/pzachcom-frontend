"use client";

import seedrandom from 'seedrandom';
import { useEffect, useState } from "react";
import Image from "next/image";

interface PhotoList {
  photos: string[];
}

export default function HomePage() {  
  const PHOTO_BLOB_URL = "https://pzach.blob.core.windows.net/photos"

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomPhoto = async () => {
    try {
      setLoading(true);
      setError(null);

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
      setError(err.message || "Error fetching photo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPhoto();
  });

  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          {loading && <p>Loading random photo...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {photoUrl && !loading && !error && (
            <Image
              src={photoUrl}
              alt="Random photo"
              className="rounded-xl shadow-md mx-auto"
              width={0} height={0} // required by next/image
              style={{
                width: "500px",   // actual fixed width
                height: "auto",   // maintain aspect ratio
              }}
              priority
              unoptimized
            />
          )}
          <h2 className="text-4xl font-roboto-serif text-brand-dark -mb-3">
            Home page
          </h2>
          <p className="text-lg text-gray-700 mx-auto mb-6">
            Welcome.
          </p>
        </div>
      </section>
    </div>
  );
}
