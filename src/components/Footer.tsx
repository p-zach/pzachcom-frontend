import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="font-noto-sans container mx-auto text-center">
        <span>
          © {(new Date()).getFullYear()} by Porter Zach •&nbsp;
          <FaGithub className="inline" />&nbsp;
          <a href="https://github.com/p-zach/pzachcom-frontend" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline"
          >
            Frontend
          </a> 
          &nbsp;/&nbsp;
          <a href="https://github.com/p-zach/pzachcom-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Backend
          </a> 
        </span>
      </div>
    </footer>
  );
}