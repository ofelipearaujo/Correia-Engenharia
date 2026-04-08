import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  HardHat, 
  FileText, 
  Search, 
  Zap, 
  ArrowRight, 
  Menu, 
  X,
  AlertTriangle,
  Clock,
  Users,
  ChevronDown,
  Instagram,
  Facebook,
  Linkedin,
  Target,
  Eye,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBER = "5579999546057"; // Exemplo
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20técnico.`;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você integraria com um serviço de e-mail ou backend
    setShowSuccessDialog(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground selection:bg-primary selection:text-white">
      {/* Floating WhatsApp Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:shadow-xl"
      >
        <MessageCircle className="h-8 w-8" />
      </motion.a>

      {/* Navbar */}
      <nav className={`fixed top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 py-3 shadow-md backdrop-blur-md' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src="/logo.png" 
              alt="Correia Engenharia Logo" 
              className="h-12 w-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {['Serviços', 'Sobre', 'Diferenciais', 'FAQ', 'Contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'Sobre' ? 'sobre' : item.toLowerCase())}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item}
              </button>
            ))}
            <Button onClick={() => window.open(WHATSAPP_LINK, '_blank')} className="rounded-full bg-primary hover:bg-primary/90">
              Falar com Engenheiro
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white p-6 shadow-xl md:hidden"
            >
              <div className="flex flex-col gap-4">
                {['Serviços', 'Sobre', 'Diferenciais', 'FAQ', 'Contato'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item === 'Sobre' ? 'sobre' : item.toLowerCase())}
                    className="text-left text-lg font-medium"
                  >
                    {item}
                  </button>
                ))}
                <Button onClick={() => window.open(WHATSAPP_LINK, '_blank')} className="w-full bg-primary">
                  Falar no WhatsApp
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="/background.jpg" 
            alt="Engenharia" 
            className="h-full w-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20" variant="secondary">
                <ShieldCheck className="mr-1 h-3 w-3" /> Responsabilidade Técnica & ART
              </Badge>
              <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-secondary md:text-7xl">
                Evite prejuízos e riscos na sua obra com <span className="text-primary">engenharia especializada</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Laudos técnicos, vistorias e soluções com validade jurídica para proteger seu patrimônio e garantir a segurança da sua edificação.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                  className="h-14 rounded-full bg-primary px-8 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
                >
                  <MessageCircle className="mr-2 h-5 w-5" /> Falar com Engenheiro no WhatsApp
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('serviços')}
                  className="h-14 rounded-full border-secondary px-8 text-lg font-bold text-secondary hover:bg-secondary hover:text-white"
                >
                  Ver Serviços
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-secondary">CREA Ativo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-secondary">Validade Jurídica</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Authority Stats */}
      <section className="bg-secondary py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Projetos Realizados', value: '+300' },
              { label: 'Laudos Emitidos', value: '+200' },
              { label: 'Atendimento Rápido', value: '24h' },
              { label: 'Anos de Experiência', value: '+10' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mb-1 text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="text-xs font-medium uppercase tracking-widest text-white/60 md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="serviços" className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-secondary md:text-5xl">Nossas Soluções Técnicas</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Serviços de alta complexidade executados com rigor técnico e conformidade normativa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Laudo Técnico',
                desc: 'Documento com validade jurídica para proteger você em processos, reformas e vistorias cautelares.',
                icon: FileText,
                benefit: 'Segurança Jurídica'
              },
              {
                title: 'Vistorias e Inspeções',
                desc: 'Análise detalhada de patologias estruturais, infiltrações e conformidade de sistemas prediais.',
                icon: Search,
                benefit: 'Prevenção de Riscos'
              },
              {
                title: 'SPDA (Para-raios)',
                desc: 'Projeto, instalação e laudo de para-raios conforme NBR 5419 para proteção contra descargas.',
                icon: Zap,
                benefit: 'Proteção Total'
              },
              {
                title: 'Gestão de Obras',
                desc: 'Acompanhamento técnico para garantir que sua obra siga o projeto, prazo e orçamento previsto.',
                icon: HardHat,
                benefit: 'Economia e Prazo'
              },
              {
                title: 'Trabalhos em Altura',
                desc: 'Inspeções e manutenções em fachadas utilizando técnicas de acesso por corda com segurança.',
                icon: ShieldCheck,
                benefit: 'Acesso Especializado'
              },
              {
                title: 'Regularização',
                desc: 'Processos de AVCB, Habite-se e regularização de imóveis junto aos órgãos competentes.',
                icon: CheckCircle2,
                benefit: 'Imóvel Regular'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group h-full border-none bg-muted/50 transition-all hover:bg-white hover:shadow-xl">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white transition-transform group-hover:scale-110">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="mb-2 w-fit border-primary/30 text-primary">{service.benefit}</Badge>
                    <CardTitle className="text-xl text-secondary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="diferenciais" className="bg-secondary py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-8 text-3xl font-bold leading-tight md:text-5xl">
                Não espere o <span className="text-primary">problema</span> se tornar um <span className="text-primary">prejuízo</span> irreversível.
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Obra Irregular', desc: 'Evite multas pesadas e embargos da prefeitura ou condomínio.', icon: AlertTriangle },
                  { title: 'Risco Estrutural', desc: 'Identifique fissuras e rachaduras antes que comprometam a segurança.', icon: AlertTriangle },
                  { title: 'Falta de SPDA', desc: 'Não fique vulnerável a raios e multas do corpo de bombeiros.', icon: AlertTriangle },
                  { title: 'Infiltrações Graves', desc: 'Resolva a origem do problema antes que destrua seu acabamento.', icon: AlertTriangle },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => scrollToSection('contato')}
                className="mt-10 h-14 rounded-full bg-primary px-8 text-lg font-bold hover:bg-primary/90"
              >
                Solicitar Análise Técnica <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" 
                alt="Inspeção Técnica" 
                className="relative rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="sobre" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20" variant="secondary">
                Nossa História
              </Badge>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-secondary md:text-5xl">
                Mais de 15 anos de <span className="text-primary">excelência</span> técnica
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Desde 2011, a Correia Engenharia atua com o compromisso de entregar soluções técnicas confiáveis, atendendo clientes residenciais, comerciais e industriais com rigor e precisão.
                </p>
                <p>
                  Ao longo desse período, desenvolvemos uma atuação focada em projetos, laudos, vistorias e fiscalização de obras, garantindo mais segurança, controle e assertividade nas decisões dos nossos clientes.
                </p>
                <p className="font-semibold text-secondary">
                  Nosso compromisso é evitar erros, reduzir prejuízos e entregar resultados que superam as expectativas normativas.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" 
                alt="Equipe Técnica" 
                className="rounded-2xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Missão',
                desc: 'Oferecer serviços de engenharia voltados a projetos, laudos, vistorias e fiscalização de obras, com precisão técnica, controle e segurança nas decisões do cliente.',
                icon: Target
              },
              {
                title: 'Visão',
                desc: 'Ser referência na região em serviços técnicos de engenharia, reconhecido pela confiabilidade dos laudos, qualidade dos projetos e eficiência na fiscalização de obras.',
                icon: Eye
              },
              {
                title: 'Valores',
                desc: [
                  'Rigor técnico e responsabilidade profissional',
                  'Clareza nos relatórios e orientações',
                  'Compromisso com prazos',
                  'Ética e transparência',
                  'Foco em prevenção de problemas'
                ],
                icon: Award
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none bg-muted/30 hover:bg-white hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl text-secondary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Array.isArray(item.desc) ? (
                      <ul className="space-y-2">
                        {item.desc.map((val, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm">{val}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-secondary md:text-5xl">Como Funciona</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Contato via WhatsApp', desc: 'Você nos conta seu problema e agendamos uma visita técnica rápida.', icon: MessageCircle },
              { step: '02', title: 'Análise Técnica', desc: 'Realizamos a vistoria no local com equipamentos de precisão.', icon: Search },
              { step: '03', title: 'Entrega com ART', desc: 'Você recebe o laudo ou projeto com validade legal e responsabilidade técnica.', icon: CheckCircle2 },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="relative text-center p-8 rounded-2xl transition-all hover:bg-muted/50 group"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <item.icon className="h-10 w-10" />
                </div>
                <div className="absolute top-4 right-1/2 translate-x-12 text-6xl font-black text-muted/50 transition-all group-hover:text-primary/10">{item.step}</div>
                <h3 className="mb-4 text-xl font-bold text-secondary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-secondary md:text-5xl">O que dizem nossos clientes</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: 'Ricardo Santos', role: 'Síndico Profissional', text: 'O laudo técnico da Correia Engenharia foi fundamental para resolvermos um impasse jurídico sobre a fachada do condomínio. Profissionalismo impecável.' },
              { name: 'Ana Paula', role: 'Proprietária de Indústria', text: 'Precisávamos regularizar o SPDA com urgência. O atendimento foi rápido e o projeto seguiu todas as normas à risca. Recomendo.' },
              { name: 'Marcos Oliveira', role: 'Investidor Imobiliário', text: 'Sempre contrato a vistoria cautelar antes de fechar qualquer negócio. A segurança que eles passam é o diferencial.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-none shadow-sm transition-shadow hover:shadow-xl h-full">
                  <CardContent className="pt-8">
                    <div className="mb-4 flex gap-1">
                      {[1,2,3,4,5].map(s => <Zap key={s} className="h-4 w-4 fill-primary text-primary" />)}
                    </div>
                    <p className="mb-6 italic text-muted-foreground">"{item.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        {item.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-secondary">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary md:text-5xl">Dúvidas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: 'Quando preciso de um laudo técnico?', a: 'Você precisa de um laudo sempre que houver necessidade de comprovação técnica de um estado (reformas, processos judiciais, vistorias de vizinhança, problemas estruturais ou exigências de órgãos públicos).' },
              { q: 'Os laudos têm validade jurídica?', a: 'Sim. Todos os nossos laudos são emitidos por engenheiros registrados no CREA, acompanhados de ART (Anotação de Responsabilidade Técnica), o que confere validade legal perante a justiça e órgãos públicos.' },
              { q: 'Quanto custa um serviço de engenharia?', a: 'O valor depende da complexidade, metragem e tipo de serviço. Oferecemos orçamentos personalizados após uma breve análise do seu caso via WhatsApp.' },
              { q: 'Qual o tempo médio de entrega?', a: 'Para laudos simples, a entrega ocorre em média entre 3 a 7 dias úteis após a vistoria. Casos complexos são acordados individualmente.' },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-bold text-secondary">{item.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">Fale agora com um engenheiro e evite prejuízos</h2>
          <p className="mb-10 text-xl text-white/80">Atendimento imediato para situações de urgência e orçamentos técnicos.</p>
          <Button 
            size="lg" 
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            className="h-16 rounded-full bg-white px-10 text-xl font-bold text-primary hover:bg-white/90"
          >
            <MessageCircle className="mr-2 h-6 w-6" /> Chamar no WhatsApp
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-secondary md:text-5xl">Solicite um Orçamento</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Preencha o formulário abaixo e nossa equipe técnica entrará em contato em menos de 24 horas.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-secondary">Telefone / WhatsApp</div>
                    <div className="text-muted-foreground">(79) 99954-6057</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-secondary">Atendimento</div>
                    <div className="text-muted-foreground">Segunda a Sexta, das 08h às 18h</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-6 shadow-xl">
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Tipo de Serviço</Label>
                  <select id="service" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option>Laudo Técnico</option>
                    <option>Vistoria / Inspeção</option>
                    <option>SPDA (Para-raios)</option>
                    <option>Gestão de Obras</option>
                    <option>Regularização</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" placeholder="Conte-nos brevemente sobre sua necessidade" className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-primary py-6 text-lg font-bold">Enviar Solicitação</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 text-white/60">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-8 md:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="Correia Engenharia Logo" 
                  className="h-12 w-auto brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="max-w-md">
                Especialistas em engenharia diagnóstica, segurança estrutural e soluções técnicas com responsabilidade e ética profissional.
              </p>
            </div>
            <div>
              <h4 className="mb-6 font-bold text-white">Links Rápidos</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-primary">Início</button></li>
                <li><button onClick={() => scrollToSection('serviços')} className="hover:text-primary">Serviços</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-primary">Dúvidas</button></li>
                <li><button onClick={() => scrollToSection('contato')} className="hover:text-primary">Contato</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-bold text-white">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            <p>© 2024 Correia Engenharia Ltda. Todos os direitos reservados. Engenheiro Responsável: CREA-SP 123456789</p>
          </div>
        </div>
      </footer>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <DialogTitle className="text-2xl font-bold text-secondary">Solicitação Enviada!</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground pt-2">
              Recebemos suas informações com sucesso. Nossa equipe técnica analisará seu caso e entrará em contato em **até 24 horas**.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-primary py-6 text-lg font-bold rounded-full"
            >
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
