import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="font-noto-sans container mx-auto text-center">
        <span>© {(new Date()).getFullYear()} by Porter Zach • <FaGithub className="inline" /> <a href="https://github.com/p-zach/pzachcom-frontend" className="underline">Frontend
        </a> / <a href="https://github.com/p-zach/pzachcom-backend" className="underline">Backend
        </a> </span>
      </div>
    </footer>
  );
}