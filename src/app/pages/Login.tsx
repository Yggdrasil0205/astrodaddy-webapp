import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#1b2a23]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#8B7B9E]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[#F4A89D]/15 to-transparent blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="rounded-3xl p-8 md:p-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <img 
              src="/logo.png" 
              alt="HappyAger - mit Markus Miersbe" 
              className="h-20 w-auto mx-auto mb-4"
            />
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-3">
              <Sparkles className="w-4 h-4 mr-2 text-[#8268AB]" />
              <span className="text-sm text-[#8268AB] font-medium">Mitgliederbereich</span>
            </div>
            
            <p className="text-muted-foreground">
              {isLogin ? 'Willkommen zurück!' : 'Werde Teil der Community'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8 p-1 rounded-2xl bg-white/30 backdrop-blur-sm">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                isLogin
                  ? 'bg-[#1b2a23] text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LogIn className="w-4 h-4 inline-block mr-2" />
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                !isLogin
                  ? 'bg-[#1b2a23] text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserPlus className="w-4 h-4 inline-block mr-2" />
              Registrieren
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Dein Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 bg-white/50 backdrop-blur-sm border-white/30"
                  required={!isLogin}
                />
              </motion.div>
            )}

            <div>
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-white/50 backdrop-blur-sm border-white/30"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-white/50 backdrop-blur-sm border-white/30"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-muted-foreground">Angemeldet bleiben</span>
                </label>
                <Link to="/forgot-password" className="text-[#1b2a23] hover:underline">
                  Passwort vergessen?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#1b2a23] hover:bg-[#1b2a23]/90 text-white"
            >
              {isLogin ? (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Anmelden
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Account erstellen
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card/50 backdrop-blur-sm text-muted-foreground">
                oder
              </span>
            </div>
          </div>

          {/* Social Login (Mock) */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full border-white/30 hover:bg-white/50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Mit Google fortfahren
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full border-white/30 hover:bg-white/50"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Mit Facebook fortfahren
            </Button>
          </div>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-start space-x-3 text-sm text-muted-foreground">
              <Sparkles className="w-5 h-5 text-[#F4A89D] flex-shrink-0 mt-0.5" />
              <p>
                Als Mitglied erhältst du exklusive Rabatte, Zugang zu Premium-Inhalten 
                und persönliche Longevity-Tipps von Markus.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          <p>
            Mit der Anmeldung akzeptierst du unsere{' '}
            <a href="#" className="text-[#1b2a23] hover:underline">
              AGB
            </a>{' '}
            und{' '}
            <a href="#" className="text-[#1b2a23] hover:underline">
              Datenschutzerklärung
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}