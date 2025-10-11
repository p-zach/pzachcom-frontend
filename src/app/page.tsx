import DailyPhoto from "@/components/DailyPhoto";
import Image from "next/image";

export default function HomePage() {  
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl mx-auto p-4">
            <div className="flex-1">
              <div className="w-1/3 relative aspect-square mx-auto mb-6">
                <Image 
                  src="/headshot_square.jpg"
                  alt="Headshot photo"
                  fill
                  className="rounded-full object-cover shadow-xl"
                />
              </div>
              <h2 className="text-2xl font-roboto-serif text-brand-dark mb-6">
                Hi, I&apos;m Porter!
              </h2>
              <div className="text-md text-gray-700 mx-auto mb-6 text-left">
                <p className="mb-6">
                  I&apos;m a full-stack developer who builds reliable systems and 
                  APIs with Python, C#, and TypeScript. My work often lives in the 
                  intersection of automation and system design, where small 
                  improvements can make a big difference at scale. I believe code 
                  is written once but read many times, so I aim for clarity, 
                  consistency, and maintainability in everything I build. Many of 
                  my projects run on Azure, where I enjoy designing solutions that 
                  are both efficient and easy to understand.
                </p>
                <p className="mb-6">
                  In my free time, I enjoy photography, programming, reading sci-fi and history,
                  and tinkering with hardware. 
                </p>
                <p className="italic">
                  All problems in computer science can be solved by another level 
                  of indirection, except of course for the problem of too many 
                  levels of indirection.
                  <br />
                  &nbsp;&nbsp;- <a href="https://en.wikipedia.org/wiki/David_Wheeler_(computer_scientist)" className="underline">David Wheeler</a>
                </p>
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
