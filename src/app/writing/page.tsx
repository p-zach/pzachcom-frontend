"use client";

import Section from "@/components/Section";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Corpus from "@/components/Corpus";
import RemoteMarkdownPage from "@/components/RemoteMarkdownPage";
import { StoryData } from "@/types/StoryData";

const WRITING_BLOB_URL = "https://pzach.blob.core.windows.net/writing/";
const WRITING_INDEX_URL = "https://pzach.blob.core.windows.net/writing/writing.json";

export default function WritingPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("s")
  const [storyIndex, setStoryIndex] = useState<StoryData[] | null>([])

  useEffect(() => {
    const fetchStoryIndex = async () => {
      try {
        const response = await fetch(WRITING_INDEX_URL)
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const body = await response.json()
        const index = body["writing"] as StoryData[]
        index.sort((a, b) => b.date.localeCompare(a.date))
        setStoryIndex(index)
      } catch (err) {
        console.error("Error loading writing:", err)
        setStoryIndex(null)
      }
    }

    fetchStoryIndex();
  }, [])

  const getUrlFromSlug = (match_slug: string) => {
    if (storyIndex == null || storyIndex.length == 0) return null
    const story = storyIndex.find(s => s.slug == match_slug)!
    return WRITING_BLOB_URL + story.name
  }

  return (
    <Section>
      <div className="max-w-2xl mx-auto font-noto-sans p-2 md:p-6">
        <div className="text-left leading-7">
          {slug == null 
            ? <Corpus storyIndex={storyIndex} />
            : <RemoteMarkdownPage md_url={getUrlFromSlug(slug)} />
          }
        </div>
      </div>
    </Section>
  );
}
