import Game from "@/components/TowerDefenseGame";

export default function ResumePage() {  
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-100 text-center">
          <h1 className="text-4xl font-roboto-serif text-brand-dark mb-6">My Resume</h1>
          <Game />
        </div>
      </section>
    </div>
  );
}
