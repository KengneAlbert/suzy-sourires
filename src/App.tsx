import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Star, CheckCircle2, Phone, MapPin, Clock, CreditCard, ChevronDown } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Product } from './types/product';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ProductPage } from './components/ProductPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const services = [
    {
      title: "Assistance administrative",
      desc: "Documents & démarches",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
      fullDesc: "Nous vous accompagnons dans toutes vos démarches administratives pour vous simplifier la vie.",
      details: [
        "Aide à la constitution et au suivi de dossiers administratifs",
        "Accompagnement aux rendez-vous administratifs",
        "Gestion du courrier et classement de documents",
        "Aide à la déclaration d'impôts et formalités diverses",
        "Soutien dans les démarches en ligne",
        "Rédaction de courriers administratifs"
      ]
    },
    {
      title: "Services de nettoyage",
      desc: "Entretien professionnel",
      image: "https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600",
      fullDesc: "Un intérieur propre et bien entretenu pour votre confort et votre bien-être au quotidien.",
      details: [
        "Nettoyage complet de toutes les pièces",
        "Dépoussiérage et aspiration méticuleuse",
        "Nettoyage des sols, vitres et surfaces",
        "Entretien des sanitaires et cuisine",
        "Repassage et entretien du linge",
        "Nettoyage en profondeur selon vos besoins"
      ]
    },
    {
      title: "Aide aux courses et repas",
      desc: "Courses & préparation",
      image: "https://images.pexels.com/photos/4792486/pexels-photo-4792486.jpeg?auto=compress&cs=tinysrgb&w=600",
      fullDesc: "Nous vous aidons à faire vos courses et à préparer des repas équilibrés adaptés à vos goûts.",
      details: [
        "Courses alimentaires selon vos listes et préférences",
        "Préparation de repas équilibrés et savoureux",
        "Adaptation aux régimes spécifiques (diabète, sans sel, etc.)",
        "Rangement des provisions",
        "Aide à la prise des repas si nécessaire",
        "Nettoyage de la cuisine après préparation"
      ]
    },
    {
      title: "Entretien espaces",
      desc: "Intérieur & extérieur",
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600",
      fullDesc: "Maintenance et entretien de vos espaces intérieurs et extérieurs pour un cadre de vie agréable.",
      details: [
        "Entretien du jardin et des espaces verts",
        "Tonte de pelouse et taille des haies",
        "Arrosage des plantes et fleurs",
        "Petits travaux de bricolage",
        "Entretien des terrasses et balcons",
        "Déneigement et déblaiement en hiver"
      ]
    },
    {
      title: "Assistance déménagements",
      desc: "Organisation & aide",
      image: "https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600",
      fullDesc: "Accompagnement complet pour un déménagement serein et bien organisé.",
      details: [
        "Aide à la préparation et aux cartons",
        "Tri et organisation de vos affaires",
        "Protection des meubles et objets fragiles",
        "Chargement et déchargement",
        "Déballage et installation dans le nouveau logement",
        "Nettoyage de l'ancien et du nouveau domicile"
      ]
    },
    {
      title: "Garde d'enfants",
      desc: "Surveillance bienveillante",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
      fullDesc: "Garde et accompagnement de vos enfants avec attention, bienveillance et professionnalisme.",
      details: [
        "Garde d'enfants à domicile en soirée ou week-end",
        "Accompagnement aux activités scolaires et extra-scolaires",
        "Aide aux devoirs et soutien éducatif",
        "Préparation des repas et goûters",
        "Activités ludiques et éducatives",
        "Surveillance et sécurité assurées"
      ]
    }
  ];

  useEffect(() => {
    if (selectedService !== null || selectedProduct !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService, selectedProduct]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setIsLoadingProducts(false);
    };

    fetchProducts();
  }, []);

  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Tous'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const faqItems = [
    {
      question: "Quels sont vos tarifs ?",
      answer: "Nos tarifs varient selon les services demandés et la fréquence d'intervention. Nous proposons des devis personnalisés gratuits. En moyenne, nos prestations débutent à 15€/heure pour l'aide à domicile classique. Bénéficiez de 50% de crédit d'impôt sur les services à la personne."
    },
    {
      question: "Quels sont vos horaires d'intervention ?",
      answer: "Nous intervenons du lundi au samedi, de 8h à 20h. Des interventions le dimanche et en soirée peuvent être organisées sur demande pour répondre à vos besoins spécifiques."
    },
    {
      question: "Quelle est votre zone d'intervention ?",
      answer: "Nous intervenons principalement à Aulnay-Sous-Bois et les communes environnantes (Sevran, Drancy, Le Blanc-Mesnil, Bondy, Villepinte, Tremblay-en-France). N'hésitez pas à nous contacter pour vérifier si nous desservons votre secteur."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les paiements par chèque, virement bancaire, espèces et CESU (Chèque Emploi Service Universel). Le paiement peut être effectué après chaque intervention ou mensuellement selon vos préférences."
    },
    {
      question: "Êtes-vous assuré et certifié ?",
      answer: "Oui, nous disposons d'une assurance responsabilité civile professionnelle et sommes déclarés pour les services à la personne. Cela vous permet de bénéficier des avantages fiscaux et d'une prestation en toute sécurité."
    },
    {
      question: "Comment annuler ou modifier un rendez-vous ?",
      answer: "Vous pouvez annuler ou modifier votre rendez-vous en nous contactant par téléphone au moins 24h à l'avance. Nous ferons notre possible pour nous adapter à vos contraintes et trouver un nouveau créneau."
    },
    {
      question: "Dois-je fournir le matériel pour le ménage ?",
      answer: "Nous pouvons utiliser votre matériel et vos produits d'entretien si vous le souhaitez. Nous pouvons également apporter nos propres produits professionnels et écologiques moyennant un léger supplément."
    },
    {
      question: "Puis-je avoir la même personne à chaque intervention ?",
      answer: "Oui, nous privilégions la continuité et mettons tout en œuvre pour que ce soit la même personne qui intervienne chez vous. Cela permet d'établir une relation de confiance et de mieux connaître vos habitudes et préférences."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Contact",
      description: "Contactez-nous par téléphone ou via notre formulaire pour nous exposer vos besoins"
    },
    {
      number: "02",
      title: "Devis gratuit",
      description: "Nous établissons ensemble un devis personnalisé et transparent, adapté à votre situation"
    },
    {
      number: "03",
      title: "Intervention",
      description: "Nos intervenants qualifiés réalisent les prestations avec soin et professionnalisme"
    },
    {
      number: "04",
      title: "Satisfaction",
      description: "Votre satisfaction est notre priorité. Nous restons à votre écoute pour améliorer nos services"
    }
  ];

  const coverageAreas = [
    "Aulnay-Sous-Bois",
    "Sevran",
    "Drancy",
    "Le Blanc-Mesnil",
    "Bondy",
    "Villepinte",
    "Tremblay-en-France",
    "Livry-Gargan",
    "Noisy-le-Sec",
    "Bobigny",
    "Pantin",
    "Romainville"
  ];

  const beforeAfterGallery = [
    {
      before: "https://images.pexels.com/photos/6195299/pexels-photo-6195299.jpeg?auto=compress&cs=tinysrgb&w=600",
      after: "https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Salon",
      description: "Nettoyage en profondeur"
    },
    {
      before: "https://images.pexels.com/photos/5824471/pexels-photo-5824471.jpeg?auto=compress&cs=tinysrgb&w=600",
      after: "https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Cuisine",
      description: "Dégraissage complet"
    },
    {
      before: "https://images.pexels.com/photos/6195299/pexels-photo-6195299.jpeg?auto=compress&cs=tinysrgb&w=600",
      after: "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Salle de bain",
      description: "Détartrage et brillance"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <nav className="fixed top-0 w-full bg-[#FDFBF7]/90 backdrop-blur-xl z-50">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="flex justify-between items-center h-28">
            <button onClick={() => scrollToSection('accueil')} className="group text-3xl font-serif italic flex items-center gap-2">
              <span className="group-hover:text-[#E8B4A0] transition-colors">Suzy Sourires</span>
              <span className="text-2xl group-hover:scale-125 transition-transform">😊</span>
            </button>

            <div className="hidden lg:flex items-center gap-16">
              <button onClick={() => scrollToSection('services')} className="text-sm hover:opacity-60 transition-opacity">
                Services
              </button>
              <button onClick={() => scrollToSection('produits')} className="text-sm hover:opacity-60 transition-opacity">
                Produits
              </button>
              <button onClick={() => scrollToSection('apropos')} className="text-sm hover:opacity-60 transition-opacity">
                À propos
              </button>
              <a href="tel:0781324474" className="text-sm bg-[#2D2A26] text-white px-8 py-4 rounded-full hover:scale-105 transition-transform">
                Nous contacter
              </a>
            </div>

            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-[#FDFBF7] border-t border-black/5">
            <div className="px-8 py-12 space-y-8">
              <button onClick={() => scrollToSection('services')} className="block text-lg hover:opacity-60 transition-opacity">
                Services
              </button>
              <button onClick={() => scrollToSection('produits')} className="block text-lg hover:opacity-60 transition-opacity">
                Produits
              </button>
              <button onClick={() => scrollToSection('apropos')} className="block text-lg hover:opacity-60 transition-opacity">
                À propos
              </button>
              <a href="tel:0781324474" className="block text-sm bg-[#2D2A26] text-white px-8 py-4 rounded-full text-center">
                Nous contacter
              </a>
            </div>
          </div>
        )}
      </nav>

      <section id="accueil" className="pt-56 pb-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-bounce-slow"></div>
                <span className="text-sm tracking-widest uppercase">Aide à domicile</span>
                <div className="text-2xl animate-wiggle">😊</div>
              </div>

              <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight mb-12">
                <span className="font-light">Des services qui</span>
                <span className="block font-serif italic text-[clamp(3.5rem,9vw,8rem)] bg-gradient-to-r from-[#E8B4A0] via-[#D4A090] to-[#E8B4A0] bg-clip-text text-transparent">simplifient</span>
                <span className="font-bold">votre quotidien</span>
              </h1>

              <div className="mb-16 relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#E8B4A0] to-transparent"></div>
                <p className="text-2xl text-black/80 leading-relaxed mb-8 font-medium">
                  Parce qu'un sourire ne coûte rien mais apporte beaucoup, nous vous accompagnons avec bienveillance et professionnalisme.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:0781324474"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#E8B4A0] via-[#D4A090] to-[#E8B4A0] text-white px-12 py-6 rounded-full hover:scale-110 transition-all duration-300 text-lg font-bold shadow-2xl hover:shadow-[#E8B4A0]/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4A090] via-[#E8B4A0] to-[#D4A090] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">07 81 32 44 74</span>
                  <ArrowUpRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <button
                  onClick={() => scrollToSection('services')}
                  className="inline-flex items-center gap-3 border-2 border-[#2D2A26] px-10 py-6 rounded-full hover:bg-gradient-to-r hover:from-[#2D2A26] hover:to-[#3D3A36] hover:text-white hover:scale-105 transition-all duration-300 text-lg font-medium hover:border-transparent"
                >
                  Découvrir
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="https://images.pexels.com/photos/6195276/pexels-photo-6195276.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Aide à domicile"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Services professionnels"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="https://images.pexels.com/photos/6195299/pexels-photo-6195299.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Accompagnement personnalisé"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src="https://images.pexels.com/photos/5206952/pexels-photo-5206952.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Services à domicile"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-[#2D2A26] via-[#3D3A36] to-[#2D2A26] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#E8B4A0] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E8B4A0] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-[#E8B4A0] bg-clip-text text-transparent">
            Prêt à simplifier votre quotidien ?
          </h3>
          <p className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Contactez-nous dès maintenant pour un devis gratuit et personnalisé
          </p>
          <a
            href="tel:0781324474"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#E8B4A0] via-[#D4A090] to-[#E8B4A0] text-white px-12 py-6 rounded-full hover:scale-110 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-[#E8B4A0]/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Phone className="w-6 h-6 relative z-10 group-hover:rotate-12 group-hover:animate-shake transition-transform" />
            <span className="relative z-10">07 81 32 44 74</span>
            <span className="text-2xl relative z-10 group-hover:animate-bounce-slow">📞</span>
          </a>
        </div>
      </section>

      <section className="py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
              <span className="text-sm tracking-widest uppercase">Notre processus</span>
              <span className="text-2xl animate-float">🔄</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light mb-6">
              Comment ça
              <span className="block font-serif italic">fonctionne</span>
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Un processus simple et transparent pour des prestations de qualité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="relative bg-gradient-to-br from-white to-[#FDFBF7] rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E8B4A0]/20 hover:border-[#E8B4A0] overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E8B4A0]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="text-7xl font-bold bg-gradient-to-br from-[#E8B4A0] to-[#D4A090] bg-clip-text text-transparent mb-6 relative z-10">{step.number}</div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-black/70 leading-relaxed text-lg relative z-10">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-[#E8B4A0] to-[#E8B4A0]/30 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-8 lg:px-16 bg-[#E8B4A0]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-3xl relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sourire et bienveillance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm">
                <span className="text-lg animate-bounce-slow">💭</span>
                <span>Notre philosophie</span>
              </div>
              <h2 className="text-5xl lg:text-6xl leading-tight font-light">
                "Un sourire ne coûte rien mais
                <span className="block font-serif italic">apporte beaucoup"</span>
              </h2>
              <p className="text-xl text-black/70 leading-relaxed max-w-xl">
                Il enrichit celui qui reçoit sans appauvrir celui qui le donne. C'est avec cette conviction que nous vous accompagnons depuis 2024.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
              <span className="text-sm tracking-widest uppercase">Nos prestations</span>
              <span className="text-2xl animate-wiggle">✨</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light max-w-3xl">
              Des services adaptés à
              <span className="block font-serif italic">vos besoins</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(index)}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#E8B4A0]/30"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-[#E8B4A0]/60 transition-colors duration-500"></div>
                  <div className="absolute top-6 right-6">
                    <span className="text-6xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-white to-[#FDFBF7] group-hover:from-[#FDFBF7] group-hover:to-white transition-colors duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold group-hover:text-[#E8B4A0] transition-colors">{service.title}</h3>
                    <ArrowUpRight className="w-7 h-7 text-[#E8B4A0] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  <p className="text-base text-black/70 font-medium">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apropos" className="py-32 px-8 lg:px-16 bg-[#2D2A26] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
                <span className="text-sm tracking-widest uppercase text-white/60">Pourquoi nous choisir</span>
                <span className="text-xl animate-float">⭐</span>
              </div>
              <h2 className="text-5xl lg:text-6xl leading-tight font-light mb-12">
                Une approche
                <span className="block font-serif italic">humaine</span>
                et professionnelle
              </h2>
            </div>

            <div className="space-y-8 text-lg text-white/80 leading-relaxed">
              <p>
                Suzy Sourires a été créé en 2024 avec la conviction que notre monde actuel est en constante évolution
                et que de plus en plus de personnes ont besoin d'aide à domicile.
              </p>

              <p>
                Nous travaillons dur pour offrir des services à domicile personnalisés pour chacun de nos clients.
                L'excellence et le professionnalisme de nos prestataires de services sont ce qui nous distingue.
              </p>

              <p>
                Notre approche garantit une réactivité et une sensibilité optimale. Nous comprenons qu'il est difficile
                de concilier les exigences de la vie quotidienne et c'est pourquoi nous nous engageons à rendre nos
                services abordables et pratiques.
              </p>

              <div className="pt-8 mt-8 border-t border-white/10">
                <p className="text-white text-xl">
                  Que vous ayez besoin d'assistance due à votre âge, un handicap ou d'un emploi du temps trop chargé,
                  vous pouvez vous reposer sur nous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-spin-slow"></div>
              <span className="text-sm tracking-widest uppercase">Nos résultats</span>
              <span className="text-2xl animate-bounce-slow">✨</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light mb-6">
              Avant / Après
              <span className="block font-serif italic">notre passage</span>
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Découvrez la différence que nos services de nettoyage peuvent faire
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {beforeAfterGallery.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-[#FDFBF7] rounded-3xl overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.before}
                        alt={`Avant - ${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Avant
                      </div>
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.after}
                        alt={`Après - ${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-[#E8B4A0] text-white px-3 py-1 rounded-full text-xs font-medium">
                        Après
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-black/60">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 lg:px-16 bg-[#2D2A26] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-light mb-4">
                Une question ?
                <span className="block font-serif italic">Appelez-nous</span>
              </h3>
              <p className="text-xl text-white/80">
                Notre équipe est à votre écoute pour répondre à toutes vos questions
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="tel:0781324474"
                className="inline-flex items-center gap-3 bg-[#E8B4A0] text-white px-10 py-5 rounded-full hover:scale-105 transition-transform text-lg font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>07 81 32 44 74</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="produits" className="py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-spin-slow"></div>
              <span className="text-sm tracking-widest uppercase">Notre boutique</span>
              <span className="text-2xl animate-float">🛍️</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <h2 className="text-5xl lg:text-6xl font-light max-w-3xl">
                Des produits artisanaux
                <span className="block font-serif italic">de qualité</span>
              </h2>
              <p className="text-xl text-black/70 max-w-xl">
                Découvrez notre sélection de produits faits main avec passion et savoir-faire
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm transition-all hover:scale-110 ${
                    selectedCategory === category
                      ? 'bg-[#2D2A26] text-white animate-bounce-slow'
                      : 'bg-white text-black hover:bg-black/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {isLoadingProducts ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#E8B4A0] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-black/50">Aucun produit disponible dans cette catégorie</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setViewingProductId(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
              <span className="text-sm tracking-widest uppercase">Zone d'intervention</span>
              <span className="text-2xl animate-wiggle">🗺️</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light mb-6">
              Nous intervenons
              <span className="block font-serif italic">près de chez vous</span>
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto mb-12">
              Découvrez les villes et quartiers où nous proposons nos services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Zone d'intervention"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#E8B4A0]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#E8B4A0]" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-3">Secteur principal</h3>
                  <p className="text-black/70 text-lg leading-relaxed">
                    Basés à Aulnay-Sous-Bois, nous couvrons toute la Seine-Saint-Denis (93)
                    et les communes limitrophes. Notre proximité nous permet d'intervenir
                    rapidement et de vous garantir un service de qualité.
                  </p>
                </div>
              </div>

              <div className="bg-[#FDFBF7] rounded-3xl p-8">
                <h4 className="text-lg font-medium mb-6">Communes desservies</h4>
                <div className="grid grid-cols-2 gap-4">
                  {coverageAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#E8B4A0] flex-shrink-0" />
                      <span className="text-black/80">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-black/60 mt-6 pt-6 border-t border-black/10">
                  Votre ville n'est pas dans la liste ? Contactez-nous, nous étudierons votre demande.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 lg:px-16 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
              <span className="text-sm tracking-widest uppercase">Questions fréquentes</span>
              <span className="text-2xl animate-wiggle">❓</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light mb-6">
              Foire aux
              <span className="block font-serif italic">questions</span>
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-black/5 transition-colors"
                >
                  <span className="text-xl font-medium pr-8">{item.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-[#E8B4A0] flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-8 pb-6 pt-2">
                    <p className="text-lg text-black/70 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-black/70 mb-6">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a
              href="tel:0781324474"
              className="inline-flex items-center gap-3 bg-[#2D2A26] text-white px-10 py-5 rounded-full hover:scale-105 transition-transform text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Contactez-nous</span>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-bounce-slow"></div>
                <span className="text-sm tracking-widest uppercase">Contact</span>
                <span className="text-2xl animate-float">👋</span>
              </div>
              <h2 className="text-5xl lg:text-6xl leading-tight font-light mb-12">
                Discutons de
                <span className="block font-serif italic">vos besoins</span>
              </h2>
              <p className="text-xl text-black/70 leading-relaxed mb-16">
                Disponible 7 jours sur 7 pour vous accompagner
              </p>

              <div className="space-y-10">
                <a href="tel:0781324474" className="group block">
                  <div className="text-xs uppercase tracking-widest text-black/50 mb-3 flex items-center gap-2">
                    <span>Téléphone</span>
                    <span className="text-lg group-hover:animate-shake">📱</span>
                  </div>
                  <div className="text-3xl group-hover:text-[#E8B4A0] transition-colors">07 81 32 44 74</div>
                </a>

                <a href="mailto:suzysourires31@gmail.com" className="group block">
                  <div className="text-xs uppercase tracking-widest text-black/50 mb-3 flex items-center gap-2">
                    <span>Email</span>
                    <span className="text-lg group-hover:animate-float">✉️</span>
                  </div>
                  <div className="text-2xl group-hover:text-[#E8B4A0] transition-colors break-all">suzysourires31@gmail.com</div>
                </a>

                <div>
                  <div className="text-xs uppercase tracking-widest text-black/50 mb-3">Adresse</div>
                  <div className="text-xl">
                    29 Rue du Dr Fleming<br/>
                    93600 Aulnay-Sous-Bois
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-black/50 mb-3">Horaires</div>
                  <div className="space-y-2 text-lg">
                    <p>Lundi - Vendredi : 8h - 20h</p>
                    <p>Samedi : 9h - 19h</p>
                    <p>Dimanche : 9h - 20h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-3xl">
              <h3 className="text-2xl mb-8">Envoyez-nous un message</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Nom</label>
                    <input
                      type="text"
                      className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors bg-transparent text-lg"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Email</label>
                    <input
                      type="email"
                      className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors bg-transparent text-lg"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors bg-transparent text-lg"
                    placeholder="Votre numéro"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors resize-none bg-transparent text-lg"
                    placeholder="Parlez-nous de vos besoins..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-[#2D2A26] text-white px-10 py-5 rounded-full hover:scale-105 transition-transform text-lg"
                >
                  <span>Envoyer</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 px-8 lg:px-16 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <div className="flex items-center gap-2 text-3xl font-serif italic mb-2">
                <span>Suzy Sourires</span>
                <span className="text-2xl">😊</span>
              </div>
              <p className="text-sm text-black/50">Aide à domicile depuis 2024</p>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
              <a href="tel:0781324474" className="hover:text-[#E8B4A0] transition-colors">
                Téléphone
              </a>
              <a href="mailto:suzysourires31@gmail.com" className="hover:text-[#E8B4A0] transition-colors">
                Email
              </a>
              <span className="text-black/50">© 2025</span>
            </div>
          </div>
        </div>
      </footer>

      {selectedService !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={services[selectedService].image}
                alt={services[selectedService].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#E8B4A0] rounded-full"></div>
                  <span className="text-sm tracking-widest uppercase text-white/80">
                    Service {String(selectedService + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-light text-white mb-3">
                  {services[selectedService].title}
                </h2>
                <p className="text-xl text-white/90">
                  {services[selectedService].fullDesc}
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <h3 className="text-2xl mb-8 flex items-center gap-3">
                <span className="font-light">Ce qui est inclus</span>
                <div className="flex-1 h-px bg-black/10"></div>
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {services[selectedService].details.map((detail, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#E8B4A0] flex-shrink-0 mt-0.5" />
                    <p className="text-lg text-black/80 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-black/10 pt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0781324474"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-[#2D2A26] text-white px-8 py-5 rounded-full hover:scale-105 transition-transform text-lg"
                >
                  <span>Nous contacter</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    scrollToSection('contact');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-3 border-2 border-[#2D2A26] px-8 py-5 rounded-full hover:bg-[#2D2A26] hover:text-white transition-colors text-lg"
                >
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {viewingProductId && (
        <ProductPage
          productId={viewingProductId}
          onClose={() => setViewingProductId(null)}
        />
      )}
    </div>
  );
}

export default App;
