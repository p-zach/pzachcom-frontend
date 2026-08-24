"use client";

import Link from "next/link";
import { StoryData } from "@/types/StoryData";


export default function Corpus({ storyIndex } : { storyIndex: StoryData[] | null }) {
  return (
    <div>
      <h1 className="text-4xl font-roboto-serif font-bold mb-6">
        Writing
      </h1>
      {storyIndex && storyIndex.map(item => 
        <div key={item.name} className="flex flex-row items-start">
          <span className="italic text-sm my-auto w-22">{item.date}</span>
          <Link href={`?s=${item.slug}`} className="link">{item.name.replace(".md", "")}</Link>
        </div>
      )}
      {storyIndex == null && 
        <p className="italic">Error fetching writing.</p>
      }
    </div>
  );
}
