import { Instagram, Send, Youtube, Twitter } from 'lucide-react';

export const SocialWidget = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      <a
        href="https://www.tiktok.com/@aboudimustafa0"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        aria-label="TikTok"
      >
        <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      </a>
      <a
        href="#"
        className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        aria-label="Instagram"
      >
        <Instagram className="w-5 h-5 text-primary-foreground" />
      </a>
      <a
        href="#"
        className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        aria-label="Telegram"
      >
        <Send className="w-5 h-5 text-primary-foreground" />
      </a>
      <a
        href="#"
        className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        aria-label="YouTube"
      >
        <Youtube className="w-5 h-5 text-primary-foreground" />
      </a>
      <a
        href="#"
        className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        aria-label="Twitter"
      >
        <Twitter className="w-5 h-5 text-primary-foreground" />
      </a>
    </div>
  );
};
