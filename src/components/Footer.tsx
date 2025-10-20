export default function Footer() {
    return (
        <footer className="bg-brand-dark text-black py-8 mt-12">
        <div className="font-noto-sans container mx-auto text-center">
            <p>© {(new Date()).getFullYear()} by Porter Zach</p>
        </div>
        </footer>
    );
}