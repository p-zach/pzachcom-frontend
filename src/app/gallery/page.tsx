"use client";

import Section from "@/components/Section";
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
      <div className="mx-auto">
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
      </div>
    </Section>
  );
}
