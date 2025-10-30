"use client";

import Section from "@/components/Section";
import Card from "@/components/Card";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import { useEffect, useState } from "react";

type Photo = { name: string, src: string, width: number, height: number, alt: string };

export default function GalleryPage() {
  const GALLERY_API_URL = "https://pzachcomfn.azurewebsites.net/api/gallery-list";

  const [photosList, setPhotosList] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const response = await fetch(GALLERY_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setPhotosList(data);
      }
      catch (err) {
        console.error("Error loading photos:", err);
        setPhotoError(err as string);
      }
    }

    loadPhotos();
  }, [])

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <Card expandOnHover={false} className="mb-8 p-10 w-3/4 mx-auto">
          <h1 className="text-3xl font-roboto-serif font-semibold mb-6">Photo Gallery</h1>
          <p className="text-left">
            I started photography in 2023 and have thoroughly appreciated the opportunities to explore more and meet other photographers.
            I most enjoy taking photos in nature, but you&apos;ll also find me snapping pictures in cities and of people!
            Below is a selection of my work--please enjoy!
          </p>
        </Card>
        <Card expandOnHover={false}>
          {photoError 
            ? <p>Error loading photos: {photoError}</p>
            : <ColumnsPhotoAlbum photos={photosList} />
          }
        </Card>
      </div>
    </Section>
  );
}
