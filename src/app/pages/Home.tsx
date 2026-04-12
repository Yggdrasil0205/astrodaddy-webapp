import { CookieSettingsButton } from '../components/CookieSettingsButton';
import { products } from '../data/products';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AnimatedDNA } from '../components/AnimatedDNA';
import { 
  Heart, 
  Brain, 
  Activity, 
  Star, 
  ArrowRight, 
  ShoppingCart, 
  CheckCircle,
  Sparkles,
  TrendingUp,
  Mountain,
  Leaf,
  Sunrise,
  AlertCircle,
  Flame,
  Dumbbell,
  Quote
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function Home() {
  // First 3 products as recommendations (100-Tage-Basiskur first)
  const bestsellerProducts = products.slice(0, 3);

  const testimonials = [
    {
      name: 'Maria S.',
      age: '58 Jahre',
      text: 'Seit ich Markus\' Programm folge, fühle ich mich 10 Jahre jünger. Vor allem die Erkenntnisse über Entzündungen und Krafttraining haben mein Leben verändert.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1758691737587-7630b4d31d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjB3b21hbiUyMHBvcnRyYWl0JTIwc21pbGluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMxNDc2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Thomas K.',
      age: '62 Jahre',
      text: 'Endlich verstehe ich, wie gesundes Altern wirklich funktioniert – und was ich konkret tun kann. Das Wissen in der Community ist unbezahlbar.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1707854881046-ece47011d695?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGRlciUyMG1hbiUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzczMTQ3NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Petra L.',
      age: '55 Jahre',
      text: 'Die besten Tipps für Longevity und Lebensfreude. Ich bin beweglicher, schlafe besser und fühle mich mental klarer als mit 45. Absolute Empfehlung!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1758686254593-7c4cd55b2621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjB3b21hbiUyMHBvcnRyYWl0JTIwY29uZmlkZW50JTIwc21pbGluZ3xlbnwxfHx8fDE3NzMxNDc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const longevityStats = [
    {
      icon: Heart,
      stat: '20 %',
      description: 'Regelmäßiges Krafttraining reduziert das Risiko von Herzerkrankungen um bis zu 20 % und stabilisiert dauerhaft den Blutdruck',
      color: '#1b2a23'
    },
    {
      icon: TrendingUp,
      stat: 'bis zu 30 %',
      description: 'Muskelmasse, die wir zwischen dem 40. und 70. Lebensjahr verlieren – wenn wir nichts dagegen tun',
      color: '#2D5953'
    },
    {
      icon: Mountain,
      stat: '400 m²',
      description: 'So groß ist die Schleimhautfläche unseres Körpers – Hauptschauplatz stiller Entzündungen, die das Altern beschleunigen',
      color: '#8268AB'
    },
    {
      icon: Leaf,
      stat: '24 %',
      description: 'Pflanzenreiche Kost reduziert das Risiko für Stoffwechsel-\nerkrankungen wie Typ-2-Diabetes um bis zu 24 %',
      color: '#BFADD5'
    },
    {
      icon: Sunrise,
      stat: '15 %',
      description: 'Optimismus kann die Lebenserwartung um bis zu 15 % erhöhen – belegt durch Studien',
      color: '#F9C4B5'
    },
    {
      icon: Heart,
      stat: '100 Jahre',
      description: 'Durch ihre besondere Lebensweise gibt es in den „Bluezones" überdurchschnittlich viele 90-100 Jahre alte Menschen, die sich bester Gesundheit erfreuen.',
      color: '#2D5953'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#1b2a23]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 -left-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#8268AB]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.45, 0.25],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 right-1/4 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#F9C4B5]/20 to-transparent blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-[#8268AB]" />
                <span className="text-sm">Dein Weg zu gesundem Altern</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
                  Glücklich
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">älter werden</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Entdecke mit Markus Miersbe die Geheimnisse der Longevity. 
                Wie du deine Bonusjahre mit Energie, Gesundheit und Freude füllst – statt mit 
                Einschränkungen. Ganz natürlich, wissenschaftlich fundiert, alltagstauglich.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/community">
                  <Button size="lg" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white px-8">
                    Zur Community
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-[#1b2a23] hover:bg-[#1b2a23]/10">
                  Mehr erfahren
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <GlassCard className="rounded-3xl overflow-hidden p-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758274531664-6f340855f3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbmF0dXJlJTIwcGVhY2VmdWwlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc3MTc3NTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Yoga und Meditation in der Natur"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D5953]/50 to-transparent" />
                </div>
              </GlassCard>
              
              {/* Floating Yin Yang inspired element */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#1b2a23] to-[#8B7B9E] opacity-80 blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Über Markus Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src="https://i.imgur.com/MKGxW6v.jpeg"
                      alt="Markus Miersbe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <AnimatedDNA className="absolute -bottom-4 -right-4 w-20 h-20 opacity-80" />
                </div>
                
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8268AB]/20 backdrop-blur-sm mb-4">
                    <span className="text-sm text-[#8268AB] font-medium">Über Markus</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">
                    Dein Guide für<br />
                    <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
                      gesundes Altern
                    </span>
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Als Faszienexperte, Körpertherapeut und Ernährungscoach verbinde ich östliche Weisheit 
                    mit modernster Wissenschaft. Meine Mission: Menschen zu zeigen, 
                    dass gesundes Altern keine Frage des Glücks ist – sondern des richtigen 
                    Wissens und der richtigen Gewohnheiten. Die Menschen, die weltweit am 
                    längsten und gesündesten leben, in den sogenannten Blauen Zonen, folgen 
                    denselben einfachen Prinzipien: tägliche Bewegung, pflanzenreiche 
                    Ernährung, tiefe soziale Bindungen und ein klarer Lebenssinn. Genau
                    dieses Wissen lebe ich und mache ich für dich alltagstauglich.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#F9C4B5]/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-[#F9C4B5]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">25+ Jahre Erfahrung in Longevity & Wellness Coaching – von Ernährung und Krafttraining bis zur mentalen Gesundheit</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#8268AB]/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <Heart className="w-4 h-4 text-[#8268AB]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">2.000+ Menschen haben mit mir aktiv vorgesorgt – und leben heute unabhängiger, vitaler und glücklicher</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Warum Longevity - Jetzt Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8268AB]/20 backdrop-blur-sm mb-4">
                  <AlertCircle className="w-4 h-4 mr-2 text-[#8268AB]" />
                  <span className="text-sm text-[#8268AB] font-medium">Warum jetzt?</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Deine Bonusjahre –<br />
                  <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">nur bei guter Gesundheit erlebenswert</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                  Wir werden alle älter. Gleichzeitig wird eine ganze Generation – die 
                  Babyboomer – auf einmal alt und viele davon pflegebedürftig. Das Gesundheitssystem kommt an 
                  seine Grenzen. Wer jetzt nicht vorsorgt, riskiert Abhängigkeit genau 
                  dann, wenn das Leben am schönsten sein könnte: Reisen, Zeit mit der 
                  Familie, neue Erlebnisse. Die Frage ist nicht ob du vorsorgen solltest – 
                  sondern womit du heute anfängst.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F9C4B5]/10 to-transparent h-full relative overflow-hidden">
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1638328740227-1c4b1627614d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbnV0cml0aW9uJTIwdmVnZXRhYmxlcyUyMGNvbG9yZnVsJTIwZm9vZHxlbnwxfHx8fDE3NzMxNDc2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Gesunde Ernährung"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold mb-2 text-lg">Stille Killer</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Fehlernährung, Bewegungsmangel und chronischer Stress sind die 
                      größten Longevity-Killer – und alle vermeidbar
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#8268AB]/10 to-transparent h-full relative overflow-hidden">
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1658314755911-c9b6ae54459c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZWxkZXJseSUyMGV4ZXJjaXNlJTIwZ3ltfGVufDF8fHx8MTc3MzE0NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Krafttraining"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold mb-2 text-lg">Muskelabbau stoppen</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Zwischen dem 40. und 70. Lebensjahr verliert der Körper bis zu 30 % 
                      Muskelmasse – wenn man nicht gezielt gegensteuert
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b2a23]/10 to-transparent h-full relative overflow-hidden">
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1729392195221-be832ed5554e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwc2hhbWFuJTIwanVuZ2xlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzczMTU2NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Blue Zones"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold mb-2 text-lg">Blue Zone Prinzipien</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In den Blue Zones leben Menschen nach einfachen Prinzipien – Markus 
                      zeigt dir, wie du sie in deinen Alltag überträgst
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="text-center mt-10">
                <Link to="/login?tab=register">
                  <Button size="lg" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white">
                    Werde Teil der HappyAger Community
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Die drei Säulen Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHZlZ2V0YWJsZSUyMHZhcmlldHklMjBtaXglMjBmcmVzaHxlbnwxfHx8fDE3NzUxMTQ5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fresh Vegetables Mix"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a23]/40 via-[#1b2a23]/30 to-[#1b2a23]/40" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8268AB]/20 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-white" />
              <span className="text-sm text-white font-medium">Was dich erwartet</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Drei Bausteine.<br />
              <span className="text-white">Ein längeres, gesünderes Leben.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Säule 1: Inflammaging */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="rounded-3xl p-8 h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F9C4B5] to-[#F9C4B5]/60 flex items-center justify-center mb-6">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Säule 1: Anti-Inflammaging
                </h3>
                <p className="text-white/90 leading-relaxed mb-6 flex-grow">
                  "Altern ist eine chronische Entzündung." Stille, schleichende 
                  Entzündungen im Körper – im Darm, in den Gefäßen, im viszeralen Fettgewebe – sind 
                  der häufigste, am meisten unterschätzte Faktor für ein schnelleres Altern. Wer sie 
                  versteht, kann aktiv gegensteuern.
                </p>
                <Link to="/community">
                  <Button className="w-full bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white whitespace-normal h-auto py-3">
                    Jetzt Community beitreten & mehr erfahren
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>

            {/* Säule 2: Kraft & Bewegung */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="rounded-3xl p-8 h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1b2a23] to-[#2D5953] flex items-center justify-center mb-6">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Säule 2: Kraft & Bewegung
                </h3>
                <p className="text-white/90 leading-relaxed mb-6 flex-grow">
                  Spazierengehen reicht nicht. Krafttraining ist der effektivste Hebel 
                  gegen Muskelabbau, Übergewicht und Pflegebedürftigkeit – und 
                  funktioniert in jedem Alter. Mit der richtigen Methode erzielst du schon 
                  mit 2–3 Stunden pro Woche messbare Ergebnisse.
                </p>
                <Link to="/community">
                  <Button className="w-full bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white whitespace-normal h-auto py-3">
                    Jetzt Community beitreten & mehr erfahren
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>

            {/* Säule 3: Mentale Bestform */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="rounded-3xl p-8 h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8268AB] to-[#BFADD5] flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Säule 3: Mentale Bestform
                </h3>
                <p className="text-white/90 leading-relaxed mb-6 flex-grow">
                  Körperliche Bewegung schützt auch das Gehirn: Sie fördert die
                  Ausschüttung von BDNF, einem Schutzprotein für Nervenzellen, das
                  Gedächtnis und Lernfähigkeit stärkt. Dazu kommen Schlaf, Ernährung und
                  soziale Kontakte – alles, was dich geistig fit hält.
                </p>
                <Link to="/community">
                  <Button className="w-full bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white whitespace-normal h-auto py-3">
                    Jetzt Community beitreten & mehr erfahren
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          </div>

          {/* Nutrition Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <GlassCard className="rounded-2xl p-8 md:p-10 text-center">
              <p className="text-white text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'henriette, serif' }}>
                Und bei allen drei Bausteinen spielt die richtige Ernährung eine wesentliche Rolle. Die Deutsche Gesellschaft für Ernährung empfiehlt 5 Portionen Obst und Gemüse. Das entspricht je nach Körpergewicht zwischen 800 und 1200 g – und das pro Person und Tag. Wenn du wissen willst, wie das ganz natürlich und einfach geht, tritt der Community bei.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Bestseller Products */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8268AB]/20 backdrop-blur-sm mb-4">
              <Star className="w-4 h-4 mr-2 text-[#8268AB]" />
              <span className="text-sm text-[#8268AB] font-medium">Unsere Empfehlung</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Unsere <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">Top Lebensmittel</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sorgfältig ausgewählte Premium-Lebensmittel für deine Longevity-Reise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {bestsellerProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full ${product.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    />
                    {product.bestseller && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F9C4B5] text-white text-xs font-semibold">
                        Bestseller
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[#8268AB] bg-[#8268AB]/10 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      <div />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#1b2a23]">€{product.price}</span>
                      <div className="flex gap-2">
                        <Link to={`/product/${product.id}`}>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </Link>
                        {product.affiliateUrl && product.affiliateUrl !== '#' && (
                          <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white">
                              Kaufen
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/shop">
              <Button size="lg" variant="outline" className="text-[#1b2a23]">
                Alle Produkte ansehen
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Free Webinar CTA Band */}
      <section className="relative py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1b2a23] via-[#2d4a3e] to-[#8268AB] p-8 md:p-10">
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#F9C4B5]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#BFADD5]/20 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left */}
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-[#F9C4B5]" />
                  </div>
                  <div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F9C4B5]/20 mb-2">
                      <span className="text-[#F9C4B5] text-xs font-semibold uppercase tracking-wide">Kostenlos</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      Free Webinar: Die 4 Säulen der Longevity
                    </h2>
                    <p className="text-white/70 text-sm mt-1">
                      Mit Markus Miersbe – live & kostenlos. Sichere dir deinen Platz.
                    </p>
                  </div>
                </div>

                {/* Right */}
                <Link to="/webinar" className="flex-shrink-0">
                  <Button
                    size="lg"
                    className="bg-[#F9C4B5] hover:bg-[#F9C4B5]/90 text-[#1b2a23] font-bold px-8 whitespace-nowrap"
                  >
                    Jetzt kostenlos anmelden
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Longevity Facts */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Fakten über <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">Longevity</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Was die Wissenschaft weiß – und wie du es heute nutzt
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {longevityStats.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="rounded-2xl p-6 h-full hover:scale-105 transition-transform duration-300">
                    <div 
                      className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${fact.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: fact.color }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{fact.stat}</h3>
                    <p className="text-sm text-muted-foreground">{fact.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b2a23]/10 via-[#8268AB]/10 to-[#F9C4B5]/10" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">Bereit für deine Transformation?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Starte jetzt deine Reise zu mehr Energie, Gesundheit und Lebensfreude.
                  Werde Teil der HappyAger Community und erhalte Zugang zu Markus'
                  Longevity-Wissen, exklusiven Webinaren und einem Shop mit sorgfältig
                  ausgewählten Premium-Lebensmitteln.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/community">
                    <Button size="lg" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white px-8">
                      Jetzt beitreten
                    </Button>
                  </Link>
                  <Link to="/shop">
                    <Button size="lg" variant="outline" className="text-[#1b2a23]">
                      Zum Shop
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer mit Logo */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <img 
              src="/logo.png" 
              alt="HappyAger - mit Markus Miersbe" 
              className="h-20 w-auto"
            />
            <div className="flex gap-4 text-sm text-[#1b2a23]/70">
              <Link to="/impressum" className="hover:text-[#8268AB] transition-colors">
                Impressum
              </Link>
              <span>|</span>
              <Link to="/datenschutz" className="hover:text-[#8268AB] transition-colors">
                Datenschutz
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 HappyAger. Alle Rechte vorbehalten.
            </p>
            <CookieSettingsButton />
          </div>
        </div>
      </footer>
    </div>
  );
}