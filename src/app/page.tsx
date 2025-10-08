import Image from 'next/image';
import { useMemo } from "react";

export default function HomePage() {
  // useMemo so the timestamp doesn't change on every React re-render,
  // only once when the component mounts.
  const nonce = useMemo(() => Date.now(), []);
  
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <Image
            src={`https://pzachcomfn.azurewebsites.net/api/random-photo?ts=${nonce}`}
            width={500}
            height={500}
            alt="Description of the image"
            // unoptimized
          />
          <h2 className="text-4xl font-roboto-serif text-brand-dark -mb-3">
            Home page
          </h2>
          <p className="text-lg text-gray-700 mx-auto mb-6">
            Welcome.
          </p>
        </div>
      </section>
    </div>
  );
}
