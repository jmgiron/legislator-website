import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  ChevronDown,
  Menu,
  X,
  Award,
  Users,
  Building2,
  ExternalLink,
  Shield,
  Cpu,
  Database,
} from 'lucide-react';

const heroImage = '/FB_IMG_1779329080340.jpg';
const profileImage = '/FB_IMG_1779329063361.jpg';

const galleryData = [
  { caption: 'Actividad comunitaria', img: '/FB_IMG_1779329240120.jpg' },
  { caption: 'Conferencia legislativa', img: '/FB_IMG_1779329228939.jpg' },
  { caption: 'Actividad deportiva con jóvenes', img: '/FB_IMG_1779329218605.jpg' },
  { caption: 'Sesión en la Asamblea Legislativa', img: '/FB_IMG_1779329216907.jpg' },
  { caption: 'Diálogo con ciudadanos', img: '/FB_IMG_1779329209962.jpg' },
  { caption: 'Con el presidente Nayib Bukele', img: '/FB_IMG_1779329200838.jpg' },
  { caption: 'Inauguración de obra pública', img: '/FB_IMG_1779329172099.jpg' },
  { caption: 'Evento cultural internacional', img: '/FB_IMG_1779329164894.jpg' },
  { caption: 'Con la comunidad', img: '/FB_IMG_1779329189183.jpg' },
  { caption: 'Sesión plenaria', img: '/FB_IMG_1779329158249.jpg' },
  { caption: 'Jornada de salud comunitaria', img: '/FB_IMG_1779329146094.jpg' },
  { caption: 'Visita institucional educativa', img: '/FB_IMG_1779329141649.jpg' },
  { caption: 'Reunión con autoridades', img: '/FB_IMG_1779329110498.jpg' },
  { caption: 'Acuerdo interinstitucional', img: '/FB_IMG_1779329098375.jpg' },
  { caption: 'Retrato oficial — Asamblea Legislativa', img: '/FB_IMG_1779329090962.jpg' },
];

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Perfil', href: '#perfil' },
  { label: 'Formación', href: '#formacion' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const items = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const perfilRef = useReveal();
  const formacionRef = useReveal();
  const trayectoriaRef = useReveal();
  const galeriaRef = useReveal();
  const contactoRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((p) => (p! + 1) % galleryData.length);
      if (e.key === 'ArrowLeft') setLightbox((p) => (p! - 1 + galleryData.length) % galleryData.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 bg-white overflow-x-hidden">

      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0b2d6e]/95 backdrop-blur-md shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollTo('#inicio'); }} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-5 h-5 text-[#0b2d6e]" />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-white text-sm font-bold tracking-wide">Dip. Oscar García</p>
              <p className="text-cyan-300 text-[11px] font-medium tracking-widest uppercase">Nuevas Ideas</p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }} className="relative text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
                {l.label}
              </a>
            ))}
          </nav>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-400 bg-[#0b2d6e]/95 backdrop-blur-md ${menuOpen ? 'max-h-80 border-t border-white/10' : 'max-h-0'}`}>
          <nav className="px-5 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }} className="text-white/80 hover:text-white text-sm font-medium py-1 transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-end bg-[#061a4a]">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className={`w-full h-full object-cover object-center transition-all duration-[1.5s] ${heroLoaded ? 'opacity-40 scale-100' : 'opacity-0 scale-105'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061a4a] via-[#0b2d6e]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 pb-24 lg:pb-36 w-full">
          <div className="max-w-2xl">
            <div className={`flex items-center gap-3 mb-5 transition-all duration-700 delay-300 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-8 h-0.5 bg-cyan-400" />
              <span className="text-cyan-300 text-xs font-semibold tracking-[0.2em] uppercase">Grupo Parlamentario Nuevas Ideas</span>
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-5 transition-all duration-700 delay-500 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Oscar Marcial<br /><span className="text-cyan-300">García Chávez</span>
            </h1>
            <p className={`text-lg sm:text-xl text-white/80 font-light mb-1 transition-all duration-700 delay-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>Diputado Suplente por San Salvador</p>
            <p className={`text-base text-cyan-200/70 mb-10 transition-all duration-700 delay-[800ms] ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>Ingeniero en Ciencias de la Computación · Asamblea Legislativa de El Salvador</p>
            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-[1000ms] ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <button onClick={() => scrollTo('#perfil')} className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg shadow-cyan-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-800/40 transition-all duration-300">
                Conocer más
              </button>
              <button onClick={() => scrollTo('#contacto')} className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                Contacto
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo('#perfil')} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white animate-bounce">
          <ChevronDown className="w-7 h-7" />
        </button>
      </section>

      {/* STATS */}
      <div className="bg-[#0b2d6e] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Building2 className="w-5 h-5" />, value: '2021', label: 'Asamblea Legislativa' },
            { icon: <Award className="w-5 h-5" />, value: '4+', label: 'Certificaciones' },
            { icon: <Briefcase className="w-5 h-5" />, value: '8+', label: 'Años de experiencia' },
            { icon: <Users className="w-5 h-5" />, value: 'San Salvador', label: 'Departamento' },
          ].map((s, i) => (
            <div key={i} className="group hover:scale-105 transition-transform duration-300">
              <div className="text-cyan-400 mx-auto w-fit mb-2 group-hover:animate-pulse">{s.icon}</div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-cyan-200/60 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PERFIL */}
      <section id="perfil" className="py-24 lg:py-32 bg-gray-50" ref={perfilRef}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative reveal-left">
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-cyan-200 rounded-2xl" />
              <img src={profileImage} alt="Diputado Oscar García" className="relative z-10 w-full rounded-2xl shadow-2xl object-cover aspect-[4/5] hover:shadow-3xl transition-shadow duration-500" />
              <div className="absolute -bottom-4 -right-4 bg-[#0b2d6e] text-white px-5 py-3 rounded-xl shadow-lg z-20">
                <p className="text-[10px] text-cyan-300 uppercase tracking-widest font-semibold">Diputado Suplente</p>
                <p className="text-sm font-bold">San Salvador</p>
              </div>
            </div>

            <div className="reveal-right">
              <p className="text-cyan-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Perfil</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">Un servidor público comprometido con El Salvador</h2>
              <div className="w-10 h-1 bg-cyan-500 mb-7" />
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Oscar Marcial García Chávez es Ingeniero en Ciencias de la Computación y Diputado Suplente por el departamento de San Salvador, miembro del Grupo Parlamentario Nuevas Ideas en la Asamblea Legislativa de El Salvador.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Con formación sólida en tecnología de la información, seguridad informática y análisis de datos, combina su expertise tecnológico con un profundo compromiso por el bienestar de las comunidades salvadoreñas desde 2021.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: <Cpu className="w-5 h-5" />, label: 'Tecnología' },
                  { icon: <Shield className="w-5 h-5" />, label: 'Seguridad' },
                  { icon: <Database className="w-5 h-5" />, label: 'Datos & BI' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="w-9 h-9 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center">{item.icon}</div>
                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm w-fit hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">NI</span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Partido Político</p>
                  <p className="text-gray-900 font-bold">Nuevas Ideas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMACIÓN */}
      <section id="formacion" className="py-24 lg:py-32 bg-white" ref={formacionRef}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14 reveal">
            <p className="text-cyan-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Academia</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Formación Académica</h2>
            <div className="w-10 h-1 bg-cyan-500 mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <GraduationCap className="w-7 h-7" />, title: 'Ingeniería en Ciencias de la Computación', inst: 'Universidad Don Bosco', year: '2017', bg: 'bg-cyan-500' },
              { icon: <Shield className="w-7 h-7" />, title: 'CCNA Security', inst: 'CISCO Systems', year: '2017', bg: 'bg-[#0b2d6e]' },
              { icon: <Database className="w-7 h-7" />, title: 'Data Warehousing, ETL & BI', inst: 'America Business School', year: '2017', bg: 'bg-teal-600' },
              { icon: <Award className="w-7 h-7" />, title: 'Diplomado de Inclusión Financiera', inst: 'Asamblea Legislativa', year: '2021', bg: 'bg-sky-700' },
            ].map((item, i) => (
              <div key={i} className={`reveal stagger-${i + 1} group bg-gray-50 hover:bg-white border border-gray-100 hover:border-cyan-200 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}>
                <div className={`${item.bg} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">{item.year}</p>
                <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs">{item.inst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAYECTORIA */}
      <section id="trayectoria" className="py-24 lg:py-32 bg-gray-50" ref={trayectoriaRef}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14 reveal">
            <p className="text-cyan-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Experiencia</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trayectoria Profesional</h2>
            <div className="w-10 h-1 bg-cyan-500 mx-auto" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-cyan-100 hidden sm:block" />
            <div className="space-y-6">
              {[
                { period: '2021 — Actualidad', role: 'Analista de Fracción', org: 'G.P. Nuevas Ideas — Asamblea Legislativa', pub: true },
                { period: '2019 — 2021', role: 'Analista de Continuidad del Negocio (BCP)', org: 'Banco Davivienda El Salvador', pub: false },
                { period: '2018 — 2019', role: 'Analista y Soporte Técnico', org: 'Banco Davivienda El Salvador', pub: false },
                { period: '2016 — 2018', role: 'Soporte y Asistencia Técnica en Sistemas', org: 'SERFINSA', pub: false },
              ].map((item, i) => (
                <div key={i} className={`relative sm:pl-14 reveal stagger-${i + 1}`}>
                  <div className={`hidden sm:block absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-white shadow ${item.pub ? 'bg-cyan-500' : 'bg-slate-300'}`} />
                  <div className={`bg-white border rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${item.pub ? 'border-cyan-200 ring-1 ring-cyan-50' : 'border-gray-100'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${item.pub ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'}`}>{item.period}</span>
                      <span className={`text-[11px] px-3 py-1 rounded-full font-medium ${item.pub ? 'bg-cyan-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                        {item.pub ? 'Sector Público' : 'Sector Privado'}
                      </span>
                    </div>
                    <h3 className="text-gray-900 font-bold mb-1">{item.role}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-300" />{item.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-24 lg:py-32 bg-white" ref={galeriaRef}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14 reveal">
            <p className="text-cyan-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Actividad</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Galería de Trabajo</h2>
            <div className="w-10 h-1 bg-cyan-500 mx-auto mb-4" />
            <p className="text-gray-500 max-w-lg mx-auto text-sm">Momentos del trabajo legislativo y de servicio a la comunidad salvadoreña.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryData.map((item, i) => (
              <div key={i} className={`reveal-scale stagger-${(i % 8) + 1} group cursor-pointer overflow-hidden rounded-xl aspect-square relative`} onClick={() => setLightbox(i)}>
                <img src={item.img} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d6e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3">
                  <p className="text-white text-xs font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/60 hover:text-white hover:rotate-90 transition-all duration-300"><X className="w-7 h-7" /></button>
          <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryData.length) % galleryData.length); }}>
            <ChevronDown className="w-7 h-7 rotate-90" />
          </button>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryData.length); }}>
            <ChevronDown className="w-7 h-7 -rotate-90" />
          </button>
          <img src={galleryData[lightbox].img} alt={galleryData[lightbox].caption} className="max-h-[80vh] max-w-full rounded-lg object-contain animate-scale-in" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-1.5 rounded-full animate-fade-up">
            {galleryData[lightbox].caption} <span className="text-white/40 ml-2">{lightbox + 1}/{galleryData.length}</span>
          </p>
        </div>
      )}

      {/* CONTACTO */}
      <section id="contacto" className="py-24 lg:py-32 bg-[#0b2d6e] relative overflow-hidden" ref={contactoRef}>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full animate-pulse" />
        <div className="absolute top-20 -left-20 w-64 h-64 bg-white/3 rounded-full" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14 reveal">
            <p className="text-cyan-300 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Contacto</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Información de Contacto</h2>
            <div className="w-10 h-1 bg-cyan-400 mx-auto mb-5" />
            <p className="text-cyan-200/60 max-w-lg mx-auto text-sm">Canales institucionales de la Asamblea Legislativa de El Salvador.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-14">
            {[
              { icon: <Phone className="w-6 h-6" />, label: 'Teléfono', value: '2281-9000', href: 'tel:+50322819000' },
              { icon: <Mail className="w-6 h-6" />, label: 'Correo', value: 'Transparencia@asamblea.gob.sv', href: 'mailto:Transparencia@asamblea.gob.sv' },
              { icon: <MapPin className="w-6 h-6" />, label: 'Institución', value: 'Asamblea Legislativa de El Salvador', href: 'https://www.asamblea.gob.sv' },
            ].map((item, i) => (
              <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`reveal stagger-${i + 1} group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-900/20`}>
                <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-300 group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <p className="text-cyan-400 text-[10px] uppercase tracking-widest font-semibold mb-2">{item.label}</p>
                <p className="text-white font-bold text-sm break-all">{item.value}</p>
                {item.href.startsWith('http') && <ExternalLink className="w-3.5 h-3.5 text-cyan-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
              </a>
            ))}
          </div>

          <div className="max-w-xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-8 reveal">
            <h3 className="text-xl font-bold text-white mb-2">Representando a San Salvador</h3>
            <p className="text-cyan-200/60 text-sm mb-5">Comprometido con la transparencia, la innovación tecnológica y el bienestar de los salvadoreños.</p>
            <a href="https://www.asamblea.gob.sv" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-7 py-3 rounded-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-600/30 transition-all duration-300">
              Visitar Asamblea Legislativa <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#061a4a] py-7">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Diputado Oscar Marcial García Chávez — Asamblea Legislativa de El Salvador</p>
          <p className="text-white/25 text-xs">Grupo Parlamentario Nuevas Ideas · San Salvador</p>
        </div>
      </footer>
    </div>
  );
}
