import Section from "@/components/Section";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import StyledMarkdown from "@/components/StyledMarkdown";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Research and documentation for GTSAM",
      role: "Researcher",
      from_date: "January 2025",
      to_date: "July 2025",
      link: "https://github.com/borglab/gtsam",
      image: "./projects/gtsam.png",
      description: `
Researched drone IMU factorization and created documentation for the GTSAM robotics library.
`,
    },
    {
      title: "Pixel-perfect destruction in Godot",
      role: "Solo developer",
      from_date: "March 2024",
      link: "https://github.com/p-zach/godot-pixel-destruction",
      image: "./projects/gppd.gif",
      description: `
A Godot tool that implements the destruction (in the sprite and collision shape) of terrain or objects via arbitrary masks.
`,
    },
    {
      title: "Data reconciliation for the CDC",
      role: "Developer, full-stack",
      from_date: "November 2023",
      to_date: "April 2024",
      link: "https://github.com/waffy1901/CDC-Data-Reconciliation",
      description: `
A tool that helps [CDC](https://en.wikipedia.org/wiki/Centers_for_Disease_Control_and_Prevention) data analysts 
reconcile data discrepancies between the CDC disease statistics database and reporting state databases.
Commissioned by the CDC for my team's capstone project at Georgia Tech. Archived by the CDC [here](https://github.com/CDCgov/CDC-Data-Reconciliation-Tool).
`,
    },
    {
      title: "Media Forensics Hub",
      role: "Developer",
      from_date: "January 2022",
      to_date: "May 2022",
      link: "https://www.clemson.edu/centers-institutes/watt/hub/",
      image: "./projects/mfh.png",
      description: `
Implemented algorithms for flagging of disinformation on media networks like Twitter and Wikipedia. 
`,
    },
    {
      title: "2D machine learning self-driving car",
      role: "Solo developer",
      from_date: "August 2021",
      link: "https://github.com/p-zach/self-driving-car",
      image: "./projects/sdc.gif",
      description: `
A little ML experiment to create a self-driving car using neural networks and a genetic algorithm.
`,
    },
    {
      title: "ASCII raytracing",
      role: "Solo developer",
      from_date: "June 2021",
      link: "https://github.com/p-zach/ascii-raytrace",
      image: "./projects/asciiray.png",
      description: `
A basic (naive) raytracing engine that outputs in ASCII.
`,
    },
    {
      title: "Picross for a Cause",
      role: "Solo developer",
      from_date: "May 2020",
      to_date: "September 2020",
      link: "https://store.steampowered.com/app/1373440/Picross_for_a_Cause/",
      image: "./projects/picross.jpg",
      description: `
[Picross](https://en.wikipedia.org/wiki/Nonogram) game published on Steam originally with proceeds to charity; now free-to-play.
70k+ downloads and ~55 daily active users as of August 2026.
`,
    },
  ];

  return (
    <Section>
      <div className="max-w-3xl mx-auto font-noto-sans p-2 md:p-6">
        <div className="text-left leading-7">
          <h1 className="text-4xl font-roboto-serif font-bold mb-6">
            Projects
          </h1>
        </div>
        {projects.map((p) =>
          <div key={p.title} className="mb-6">
            <Card className="text-left" expandOnHover={false}>
              <div className="flex flex-row items-center justify-between gap-5">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-roboto-serif font-bold"><Link href={p.link} className="link">{p.title}</Link></h2>
                  <div>
                    <p>
                      {p.role} • <span className="italic">{p.from_date + (p.to_date ? " - " + p.to_date : "")}</span>
                    </p>
                  </div>
                  
                  <StyledMarkdown>
                    {p.description}
                  </StyledMarkdown>
                </div>
                {p.image && <div className="min-w-4">
                  <Image src={p.image} alt="" width={200} height={200}></Image>
                </div>}
              </div>
            </Card>
          </div>
        )}
      </div>
    </Section>
  );
}
