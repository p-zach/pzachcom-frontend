"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaAt } from 'react-icons/fa';
import AudioPlayer from "@/components/AudioPlayer";
import { useSpring, animated } from "@react-spring/web";
import BirdSwarm from "@/components/Boids";

export default function HomePage() {  
  const [{ progress }, api] = useSpring(() => ({ progress: 0 }));
  const pronunciationGuide = useRef<HTMLParagraphElement>(null);

  const highlight = () => {
    api.start({ progress: 1 })
    pronunciationGuide.current!.scrollIntoView();
    setTimeout(() => {
      api.start({ progress: 0 })
    }, 1000)
  }

  const text = {
    title: <span>Porter Zach<sup onClick={highlight} className="cursor-pointer">¹</sup></span>,
    introduction: "\
      Hi! I'm Porter, a full-stack software engineer.", 
    description: "\
      Code is written once but read many times, so I aim for clarity, \
      consistency, and maintainability in everything I make. I'm enthusiastic about designing solutions that \
      are both efficient and easy to understand. Much of my work is in Python, C#, and Typescript.",
    hobbies: <span>
      Outside of programming, I enjoy <Link href="/gallery" className="link text-gray-950 dark:text-gray-50">photography</Link>,
      learning new languages,&nbsp;
      <Link 
        href="https://www.goodreads.com/user/show/102527332-porter-zach" 
        target="_blank"
        rel="noopener noreferrer" 
        className="link text-gray-950 dark:text-gray-50">
          reading sci-fi and history
      </Link>,
      and <Link href="/writing" className="link text-gray-950 dark:text-gray-50">writing</Link>.
    </span>,
    quote: {
      text: "\
        All problems in computer science can be solved by another level \
        of indirection, except of course for the problem of too many \
        levels of indirection.",
      author: "David Wheeler",
      author_link: "https://en.wikipedia.org/wiki/David_Wheeler_(computer_scientist)",
    }
  }

  return (
    <div className="relative">
      <BirdSwarm className="absolute z-0"/>
      <Section className="relative pointer-events-none">
        <div className="max-w-2xl mx-auto font-noto-sans p-2 md:p-6">
          <div className="text-left leading-7 pointer-events-auto bg-white/60 dark:bg-gray-800/60">
            <h1 className="text-4xl font-roboto-serif font-bold mb-2">
              {text.title}
            </h1>

            <div className="space-y-4 mt-4 text-md">
              <p>{text.introduction}</p>
              <p>{text.description}</p>
              <p>{text.hobbies}</p>
              <p>
                You can email me at&nbsp;
                <span className="mono text-gray-950 dark:text-gray-50">
                  porterdzach<FaAt className="w-3 h-3 inline-block align-middle"/>gmail.com
                </span> or find me on GitHub or LinkedIn.</p>
            </div>

            <div className="mt-8 mb-6">
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="https://github.com/p-zach" icon={FaGithub} external>GitHub</Button>
                <Button href="https://linkedin.com/in/p-zach" icon={FaLinkedin} external>LinkedIn</Button>
              </div>
            </div>

            <div className="pt-4 text-sm text-gray-500 dark:text-gray-300 border-b border-gray-300">
              <hr className="border-t border-dashed border-gray-300 mb-4" />
              <p className="italic">
                {text.quote.text}
              </p>
              <p className="mt-2 mb-6">
                &nbsp;&nbsp;- <Link href={text.quote.author_link} className="underline">{text.quote.author}</Link>
              </p>
            </div>

            <animated.div
              className="mt-4 w-fit" 
              style={{
                backgroundColor: progress.to([0, 1], ["rgba(96, 165, 250, 0)", "rgba(96, 165, 250, 1)"]),
              }}
            >
              <p ref={pronunciationGuide}>¹ /zɑːk/ <AudioPlayer path="./zach.mp3" className="cursor-pointer w-4 h-4 inline-block align-[-7%]"/></p>
            </animated.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
