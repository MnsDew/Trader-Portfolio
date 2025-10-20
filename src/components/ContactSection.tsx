import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Send, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.success'),
      description: 'I will get back to you soon!',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold pb-4">
          {t('contact.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder={t('contact.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-background"
            />
            <Input
              type="email"
              placeholder={t('contact.email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-background"
            />
            <Textarea
              placeholder={t('contact.message')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="bg-background"
            />
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              {t('contact.submit')}
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
          
          <div className="flex flex-col justify-center space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:Gourmetmeal9@gmail.com" className="text-sm md:text-base">
                    Gourmetmeal9@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm md:text-base">Global Trading Services</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">{t('footer.follow')}</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6 text-primary-foreground" />
                </a>
                <a href="#" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Send className="w-6 h-6 text-primary-foreground" />
                </a>
                <a href="#" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Youtube className="w-6 h-6 text-primary-foreground" />
                </a>
                <a href="#" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Twitter className="w-6 h-6 text-primary-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
