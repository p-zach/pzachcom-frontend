import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="font-noto-sans container mx-auto text-center">
        <span>
           © {(new Date()).getFullYear()} Porter Zach • <FaGithub className="inline" />&nbsp;
          <Link href="https://github.com/p-zach/pzachcom-frontend" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline"
          >
            source
          </Link> • <Link href="/ai"
            className='underline'
          >
            AI policy
          </Link>
        </span>
      </div>
    </footer>
  );
}