import Section from "@/components/Section";
import SelectableText from "@/components/SelectableText";
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
        end_date: "2028",
        gpa: "4.0"
      },
      {
        school: "Georgia Institute of Technology",
        type: "Bachelor's degree",
        field: "Computer Science",
        start_date: "2022",
        end_date: "2025",
        gpa: "3.94",
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
          "Developed, maintained, and deployed core Azure infrastructure, web UI applications, data pipelines, and shared services used by internal teams and production customers.",
          "Migrated Azure resources from manual management to Terraform, reducing configuration drift and improving fail-safety through version-controlled infrastructure.",
          "Engineered Azure DevOps pipelines for automated building, unit testing, and deployment, significantly reducing time to deploy and lowering change failure rates.",
          "Designed and implemented infrastructure-level alerts and monitoring modules within Terraform to improve incident response times and system clarity.",
          "Implemented Config & Label editor tools, facilitating an 80% reduction in customer service response time."
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
        <div className="relative w-full h-full rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 md:p-15 overflow-hidden">
          <div className="relative z-10 text-brand-dark text-left pointer-events-none">
            <h1 className="text-3xl font-roboto-serif text-center font-semibold mb-2">
              <SelectableText>
                Porter Zach
              </SelectableText>
            </h1>
            <p className="text-center pb-3 mb-3 border-b border-dashed border-gray-300">
              <SelectableText>
                porterdzach [at] gmail [dot] com
                | <FaLinkedin className="inline" />&nbsp;
                <a href="https://www.linkedin.com/in/p-zach/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  linkedin.com/in/p-zach
                </a> 
                &nbsp;| <FaGithub className="inline" />
                &nbsp;
                <a href="https://github.com/p-zach" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline"
                >
                  github.com/p-zach
                </a>
              </SelectableText>
            </p>
            <h2 className="text-2xl font-roboto-serif italic -mb-3">
              <SelectableText>
                Experience
              </SelectableText>
            </h2>
            <div className="ml-4">
              {resume.jobs.map((j) => 
                <div key={j.company + j.title} className="mt-5">
                  <h3 className="text-xl font-bold mb-1">
                    <SelectableText>
                      {j.title}
                    </SelectableText>
                  </h3>
                  <div className="ml-4">
                    <p className="mb-1">
                      <SelectableText>
                        <a href={j.company_link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-400"
                        >
                          {j.company}
                        </a>
                        &nbsp;| {j.type},&nbsp;
                        <span className="italic">
                          {j.start_date} - {j.end_date}
                        </span>
                      </SelectableText>
                    </p>
                    {j.bullets.map((b) =>
                      <p key={b} className="mb-1">
                        <SelectableText>
                          · {b}
                        </SelectableText>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-roboto-serif italic -mb-3 mt-4 pt-4 border-t border-dashed border-gray-300">
              <SelectableText>
                Education
              </SelectableText>
            </h2>
            {resume.education.map((e) => 
              <div key={e.type} className="mt-5">
                <h3 className="text-xl font-bold mb-1">
                  <SelectableText>
                    {e.school}
                  </SelectableText>
                </h3>
                <div className="ml-4">
                  <p>
                    <SelectableText>
                      {e.type}, {e.field}
                    </SelectableText>
                  </p>
                  <p>
                    <SelectableText>
                      <span className="italic">
                        {e.start_date} - {e.end_date}
                      </span>
                      &nbsp;| GPA: {e.gpa}/4.0
                    </SelectableText>
                  </p>
                  {e.coursework && <p className="text-sm mt-2">
                    <SelectableText>
                      <span className="italic">Notable coursework:</span> {e.coursework}
                    </SelectableText>
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
