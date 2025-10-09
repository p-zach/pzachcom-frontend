import Image from 'next/image';

export default function HomePage() {  
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <Image
            src={`https://pzachcomfn.azurewebsites.net/api/photo-of-the-day`}
            width={500}
            height={500}
            alt="A random photo"
            priority={true}
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
