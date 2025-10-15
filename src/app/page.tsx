import DailyPhoto from "@/components/DailyPhoto";
import Image from "next/image";

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
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl mx-auto p-4">
            <div className="flex-1">
              <div className="w-1/3 relative aspect-square mx-auto mb-6">
                <Image 
                  src="./headshot_square.jpg"
                  alt="Headshot photo"
                  fill
                  className="rounded-full object-cover shadow-xl"
                />
              </div>
              <h1 className="text-2xl font-roboto-serif text-brand-dark mb-6">
                {text.title}
              </h1>
              <div className="text-md text-gray-700 mx-auto mb-6 text-left">
                <p className="mb-6">
                  {text.statement}
                </p>
                <p className="mb-6">
                  {text.hobbies}
                </p>
                <p className="italic">
                  {text.quote.text}
                  <br />
                  &nbsp;&nbsp;- <a href={text.quote.author_link} className="underline">{text.quote.author}</a>
                </p>
              </div>
              <div>
                <Image
                  src="https://github-readme-stats.vercel.app/api?username=p-zach&show_icons=true&theme=transparent&hide_border=true&show_icons=true&include_all_commits=true"
                  alt="GitHub stats"
                  width={500}
                  height={500}
                  className="mx-auto"
                />
              </div>
            </div>
            <div className="flex-1">
              <DailyPhoto />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
