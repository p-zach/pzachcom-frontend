"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StyledMarkdown from "./StyledMarkdown";
import matter from 'gray-matter';

export default function RemoteMarkdownPage({ md_url } : { md_url: string | null }) {
  const [date, setDate] = useState("");
  const [content, setContent] = useState<string | null>(null);

  const parseDate = (date: string | Date): string => {
    if (typeof date == "string")
      return date
    else if (!date)
      return ""
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (md_url == null)
      return

    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch(md_url);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const raw_markdown = await response.text();
        const { data: frontmatter, content: markdown_content } = matter(raw_markdown);
        setContent(markdown_content);
        setDate(parseDate(frontmatter['date']));
      } catch (err) {
        console.error("Error fetching markdown content:", err)
        setContent("*Error loading content. Try again later.*");
      }
    };

    fetchMarkdownContent();
  }, [md_url])
    
  return (
    <div>
      <p className="mb-3">
        <span>
          <Link href={"/writing"} className="link">writing</Link>
        </span> {date && <span>&gt; <span className="italic">
          {date}
        </span></span>}
      </p>
      {content && <StyledMarkdown>
        {content}
      </StyledMarkdown>}
      {md_url == null && <div className="italic">
        Loading content...
      </div>}
    </div>
  );
}