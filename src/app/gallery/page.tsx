"use client";

import Section from "@/components/Section";
import Card from "@/components/Card";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import { useEffect, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type Photo = { name: string, src: string, width: number, height: number, alt: string };

export default function GalleryPage() {
  const GALLERY_API_URL = "https://pzachcomfn.azurewebsites.net/api/gallery-list";

  const [photosList, setPhotosList] = useState<Photo[]>([]);
  const [index, setIndex] = useState(-1);
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
      <div className="max-w-5xl mx-auto">
        <Card expandOnHover={false} className="mb-8 w-full md:w-3/4 mx-auto">
          <h1 className="text-3xl font-roboto-serif font-semibold pb-3 mb-3 border-b border-dashed border-gray-300">Photo Gallery</h1>
          <p className="text-left">
            I started photography in 2023 and have thoroughly appreciated the opportunities to explore more and meet other photographers.
            I most enjoy taking photos in nature, but you&apos;ll also find me snapping pictures in cities and of people!
            Below is a selection of my work--please enjoy!
          </p>
        </Card>
        <Card expandOnHover={false}>
          {photoError 
            ? <p>Error loading photos: {photoError}</p>
            : <>
                <ColumnsPhotoAlbum photos={photosList} onClick={({ index }) => setIndex(index)} />
                <Lightbox
                  slides={photosList}
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                  // enable optional lightbox plugins
                  plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                />
              </>
          }
        </Card>
      </div>
    </Section>
  );
}
