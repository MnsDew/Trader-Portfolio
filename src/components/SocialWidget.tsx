import { Instagram, Send, Youtube, Twitter } from 'lucide-react';

export const SocialWidget = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
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
