import DailyPhoto from "@/components/DailyPhoto";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Image from "next/image";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoIosDocument } from "react-icons/io";

export default function HomePage() {  
  const text = {
    title: "Hi, I'm Porter!",
    statement: "\
      I'm a full-stack developer who builds reliable systems and \
      APIs with Python, C#, and TypeScript. Code \
      is written once but read many times, so I aim for clarity, \
      consistency, and maintainability in everything I make. Many of \
      my projects run on Azure, where I enjoy designing solutions that \
      are both efficient and easy to understand.",
    hobbies: "\
      In my free time, I enjoy photography, programming, reading sci-fi and history, \
      and tinkering with hardware.",
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
    <section className="section">
      <div className="section-container">
        <div className="section-flex">

          {/* LEFT CARD */}
          <Card>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 relative mb-6">
                <Image
                  src="./headshot_square.jpg"
                  alt="Headshot photo"
                  fill
                  className="rounded-full object-cover shadow-xl"
                  priority
                />
              </div>
              <h1 className="text-2xl font-roboto-serif text-brand-dark mb-2">
                {text.title}
              </h1>
            </div>

            <div className="card-inner text-md">
              <p>{text.statement}</p>
              <p>{text.hobbies}</p>

              <div className="pt-4">
                <hr className="border-t border-dashed border-gray-200 mb-4" />
                <p className="italic text-sm text-gray-600">
                  {text.quote.text}
                  <br />
                  <span className="not-italic text-gray-700">
                    &nbsp;&nbsp;- <a href={text.quote.author_link} className="underline">{text.quote.author}</a>
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Button href="/resume" icon={IoIosDocument}>Resume</Button>
                <Button href="https://github.com/p-zach" icon={FaGithub} external>GitHub</Button>
                <Button href="https://linkedin.com/in/p-zach" icon={FaLinkedin} external>LinkedIn</Button>
              </div>
            </div>
          </Card>

          {/* RIGHT CARD */}
          <Card>
            <h2 className="text-2xl font-roboto-serif text-brand-dark mb-4 text-center">
              Photo of the Day
            </h2>

            <div className="rounded-xl overflow-hidden border border-gray-50 bg-gradient-to-b from-white to-gray-50 shadow-inner p-0">
              <div className="p-4">
                <DailyPhoto />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button href="/gallery">Visit the gallery</Button>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
