import Section from "@/components/Section";
import Game from "@/components/TowerDefense";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ResumePage() {  
  const resume = {
    education: [
      {
        school: "Georgia Institute of Technology",
        type: "Master's degree",
        field: "Computer Science",
        start_date: "2025",
        end_date: "2027",
        gpa: "4.0"
      },
      {
        school: "Georgia Institute of Technology",
        type: "Bachelor's degree",
        field: "Computer Science",
        start_date: "2022",
        end_date: "2025",
        gpa: "3.95",
        coursework: "Design & Analysis of Algorithms, Software Project Design &\
          Implementation, Machine Learning, Artificial Intelligence, Computer \
          Networking, Prototyping Intelligent Devices"
      },
    ],
    jobs: [
      {
        title: "Software Development Engineer I",
        company: "iA",
        company_link: "https://www.iarx.com",
        start_date: "May 2025",
        end_date: "Present",
        type: "Full-time",
        bullets: [
          "Helped lead an API and UI overhaul for internal Config and Label \
          editor tools, improving response times by 80% and enabling internal \
          teams to deliver customer updates 2+ hours faster, reducing support \
          delays and accelerating pharmacy automation workflows.",
          "Developed and maintained full-stack cloud features across Azure \
          Function Apps, Cosmos DB, and Entra (B2C), collaborating with QA and \
          Product to modernize legacy services, expand test coverage by more \
          than 50%, and deliver more reliable, scalable APIs, UIs, and \
          automation workflows.",
          "Improved platform reliability and engineering quality by reducing \
          latency, eliminating bugs, writing CI/CD and automation scripts, and \
          championing code reviews, documentation, and clean design patterns \
          while helping lead development of a key internal Config Editor tool \
          and streamlining team development processes."
        ]
      },
      {
        title: "Open Source Developer",
        company: "Georgia Tech Research",
        company_link: "https://www.gtri.gatech.edu/",
        start_date: "Jan 2025",
        end_date: "May 2025",
        type: "Contract",
        bullets: [
          "Contributed to GTSAM (robotics SLAM library) codebase, improving \
          usability for developers.",
          "Authored and refined technical documentation to enhance clarity and \
          accessibility for new users.",
          "Developed an LLM-based automated documentation generation pipeline \
          using the OpenAI API."
        ]
      },
      {
        title: "Data Science & Machine Learning Intern",
        company: "Cox Communications",
        company_link: "https://www.cox.com",
        start_date: "May 2024",
        end_date: "Aug 2024",
        type: "Internship",
        bullets: [
          "Designed, developed, and trained an upgrade propensity machine \
          learning model with a long-term value of more than $1 million over 5 \
          years.",
          "Wrote performant queries for databases with over 4 billion rows and \
          1500 columns.",
          "Conducted analysis on Internet plan purchase data, identifying \
          high-value customer trends and designating special groups to receive \
          targeted campaigns."
        ]
      },
      {
        title: "Software Engineer",
        company: "Polytechnique Montreal",
        company_link: "https://www.polymtl.ca",
        start_date: "May 2023",
        end_date: "Aug 2023",
        type: "Internship",
        bullets: [
          "Developed large-scale robotic swarming software at MIST Lab for \
          aerospace and defense purposes.",
          "Designed application to automate distribution of tasks between \
          designated worker robots, reducing process startup time from 30 \
          minutes to 0.",
          "This internship was sponsored by Fulbright Canada and Canada's \
          Mitacs Globalink program."
        ]
      }
    ]
  }

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        {/* <span className="...">...</span> is around every text field so
        that only the actual text can be clicked on, not the whole text box.
        If you just put `pointer-events-auto select-text` on the div or p
        elements, there's a lot of blank space that the text box won't let
        you click through, which is inconvenient for the minigame. */}
        <div className="relative w-full h-full rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-15 overflow-hidden">
          <div className="relative z-10 text-brand-dark text-left pointer-events-none">
            <h1 className="text-3xl font-roboto-serif text-center font-semibold mb-2"><span className="pointer-events-auto select-text">Porter Zach</span></h1>
            <p className="text-center mb-6"><span className="pointer-events-auto select-text">
              porterdzach [at] gmail [dot] com | <FaLinkedin className="inline" />&nbsp;<a href="https://www.linkedin.com/in/p-zach/" target="_blank" rel="noopener noreferrer" className="underline">linkedin.com/in/p-zach
              </a> | <FaGithub className="inline" />&nbsp;<a href="https://github.com/p-zach" target="_blank" rel="noopener noreferrer" className="underline">github.com/p-zach</a>
            </span></p>
            <h2 className="text-2xl font-roboto-serif italic -mb-3"><span className="pointer-events-auto select-text">Experience</span></h2>
            <div className="ml-4">
              {resume.jobs.map((j) => 
                <div key={j.company + j.title} className="mt-5">
                  <h2 className="text-xl font-bold mb-1"><span className="pointer-events-auto select-text">{j.title}</span></h2>
                  <div className="ml-4">
                    <p className="mb-1">
                      <span className="pointer-events-auto select-text"><a href={j.company_link} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">
                        {j.company}
                      </a> | <span className="">{j.type}
                      </span>, <span className="italic">{j.start_date} - {j.end_date}</span></span>
                    </p>
                    {j.bullets.map((b) =>
                      <p key={b} className="mb-1">
                        <span className="pointer-events-auto select-text">· {b}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-roboto-serif italic -mb-3 mt-8"><span className="pointer-events-auto select-text">Education</span></h2>
            {resume.education.map((e) => 
              <div key={e.type} className="mt-5">
                <h2 className="text-xl font-bold mb-1"><span className="pointer-events-auto select-text">{e.school}</span></h2>
                <div className="ml-4">
                  <p className="">
                    <span className="pointer-events-auto select-text">{e.type}, {e.field}</span>
                  </p>
                  <p className="">
                    <span className="pointer-events-auto select-text"><span className="italic">{e.start_date} - {e.end_date}</span> | GPA: {e.gpa}/4.0</span>
                  </p>
                  {e.coursework && <p className="text-sm mt-2">
                    <span className="pointer-events-auto select-text"><span className="italic">Notable coursework:</span> {e.coursework}</span>
                  </p>}
                </div>
              </div>
            )}
          </div>
          <Game />
        </div>
      </div>
    </Section>
  );
}
