/**
 * Footer Component
 * Application footer with attribution and legal information
 */
export default function Footer() {
  return (
    <footer className="bg-dark-gray border-t border-medium-gray py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Attribution */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">StreamFinder</h3>
          <p className="text-light-gray text-sm">
            Your entertainment discovery platform
          </p>
        </div>

        {/* Data Sources */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 mb-6">
          <div className="text-center">
            <p className="text-sm text-light-gray">Movies & TV Shows powered by</p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              The Movie Database (TMDB)
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm text-light-gray">Anime data from</p>
            <a
              href="https://anilist.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              AniList
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="text-center mb-6 max-w-3xl mx-auto">
          <p className="text-xs text-light-gray leading-relaxed">
            <strong>Legal Disclaimer:</strong> This website does not host, stream, or provide
            downloads for any content. We are a metadata discovery platform that redirects users
            to official legal streaming platforms. All content is the property of their
            respective owners.
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-light-gray hover:text-white text-sm transition">
            About
          </a>
          <a href="#" className="text-light-gray hover:text-white text-sm transition">
            Privacy
          </a>
          <a href="#" className="text-light-gray hover:text-white text-sm transition">
            Terms
          </a>
          <a href="#" className="text-light-gray hover:text-white text-sm transition">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-light-gray">
            © {new Date().getFullYear()} StreamFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
