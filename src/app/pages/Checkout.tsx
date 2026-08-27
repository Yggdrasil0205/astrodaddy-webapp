import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { StarField } from '../components/StarField';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import {
  ArrowRight, ArrowLeft, Calendar, Clock,
  MapPin, Globe, User, Trash2, Mail, Phone, Lock, Sparkles, Users,
} from 'lucide-react';
import { SKOOL_MEMBERSHIP_ID } from '../data/products';

// ── Types ─────────────────────────────────────────────────────────────────────

interface BirthData {
  birthday: string;
  birthtime: string;
  birthplace: string;
  birthcountry: string;
}

const emptyBirthData = (): BirthData => ({ birthday: '', birthtime: '', birthplace: '', birthcountry: '' });
const isPartnerProduct = (name: string) => name.toLowerCase().includes('partner');
const isMembership = (id: number) => id === SKOOL_MEMBERSHIP_ID;

// ── Birth data form ───────────────────────────────────────────────────────────

function BirthDataForm({ label, data, onChange }: { label: string; data: BirthData; onChange: (d: BirthData) => void }) {
  const set = (field: keyof BirthData) => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...data, [field]: e.target.value });
  const fields = [
    { icon: Calendar, label: 'Geburtstag *',  key: 'birthday'    as keyof BirthData, type: 'date', placeholder: '' },
    { icon: Clock,    label: 'Geburtszeit',   key: 'birthtime'   as keyof BirthData, type: 'time', placeholder: '12:30' },
    { icon: MapPin,   label: 'Geburtsort *',  key: 'birthplace'  as keyof BirthData, type: 'text', placeholder: 'Berlin' },
    { icon: Globe,    label: 'Geburtsland *', key: 'birthcountry'as keyof BirthData, type: 'text', placeholder: 'Deutschland' },
  ];
  return (
    <div>
      {label && (
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-[#C9A84C]" />
          <span className="text-[#C9A84C] text-sm font-semibold tracking-wide uppercase"
            style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>{label}</span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-[#F0E6C8]/60 text-xs mb-1.5 tracking-wide">{f.label}</label>
            <div className="relative">
              <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B5FD4]/70 pointer-events-none" />
              <input type={f.type} value={data[f.key]} onChange={set(f.key)} placeholder={f.placeholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm placeholder-[#F0E6C8]/25 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/8 transition-all [color-scheme:dark]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Redirect loading screen ───────────────────────────────────────────────────

function RedirectScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-[#1B1040] flex flex-col items-center justify-center px-6"
    >
      <StarField noConnect />
      <div className="relative z-10 text-center">
        {/* Pulsing orb */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-[#C9A84C]"
          />
          <div className="absolute inset-3 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#C9A84C]" />
          </div>
        </div>

        <h2 className="text-2xl text-[#F0E6C8] mb-3"
          style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
          Sie werden weitergeleitet …
        </h2>
        <p className="text-[#F0E6C8]/45 text-sm max-w-xs mx-auto leading-relaxed">
          Du wirst jetzt sicher zu unserem Zahlungsanbieter Mollie weitergeleitet, um die Zahlung abzuschließen.
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              className="w-2 h-2 rounded-full bg-[#C9A84C]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Checkout() {
  const { items, totalPrice, removeFromCart, clearCart, spinReward } = useCart();

  // Birth data
  const [birthData, setBirthData]     = useState<Record<number, BirthData>>({});
  const [partnerData, setPartnerData] = useState<Record<number, BirthData>>({});
  const getItem    = (id: number) => birthData[id]   ?? emptyBirthData();
  const getPartner = (id: number) => partnerData[id] ?? emptyBirthData();
  const setItem    = (id: number, d: BirthData) => setBirthData(p   => ({ ...p, [id]: d }));
  const setPartner = (id: number, d: BirthData) => setPartnerData(p => ({ ...p, [id]: d }));

  const birthComplete = items.every(item => {
    if (isMembership(item.id)) return true; // Mitgliedschaft braucht keine Geburtsdaten
    const d = getItem(item.id);
    const base = d.birthday && d.birthplace && d.birthcountry;
    if (isPartnerProduct(item.name)) {
      const p = getPartner(item.id);
      return base && p.birthday && p.birthplace && p.birthcountry;
    }
    return base;
  });

  const hasMembership = items.some(item => isMembership(item.id));
  const onlyMembership = items.length > 0 && items.every(item => isMembership(item.id));

  // Contact
  const [email, setEmail] = useState('');
  const emailValid = email.includes('@') && email.includes('.');
  const [phone, setPhone] = useState('');
  const phoneValid = phone.replace(/\D/g, '').length >= 6;

  // Discount — validated server-side against the DB (never trust a client price)
  const [discountInput, setDiscountInput]   = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; label: string; finalAmount: number } | null>(null);
  const [discountError, setDiscountError]   = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);
  const applyDiscount = async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed || discountLoading) return;
    setDiscountLoading(true);
    setDiscountError('');
    try {
      const res = await fetch('/api/validate-voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed, items: items.map(i => ({ id: i.id, quantity: i.quantity })) }),
      });
      const data = await res.json();
      if (data.valid) {
        const label = data.type === 'percent'
          ? `${data.value}% Rabatt`
          : `${Number(data.value).toFixed(2).replace('.', ',')} € Rabatt`;
        setAppliedDiscount({ code: data.code, label, finalAmount: data.finalAmount });
      } else {
        setDiscountError(data.error ?? 'Ungültiger Rabattcode');
      }
    } catch {
      setDiscountError('Prüfung fehlgeschlagen. Bitte nochmal versuchen.');
    } finally {
      setDiscountLoading(false);
    }
  };
  const finalPrice = appliedDiscount ? appliedDiscount.finalAmount : totalPrice;

  // Auto-apply the cosmic-wheel bonus once, if the customer won one.
  const autoApplied = useRef(false);
  useEffect(() => {
    if (spinReward?.code && !appliedDiscount && !autoApplied.current && items.length > 0) {
      autoApplied.current = true;
      applyDiscount(spinReward.code);
    }
  }, [spinReward, appliedDiscount, items.length]);

  // Payment state
  const [redirecting, setRedirecting] = useState(false);
  const [payError, setPayError]       = useState('');

  const canPay = birthComplete && emailValid && phoneValid;

  const handlePay = async () => {
    if (!canPay || redirecting) return;
    setRedirecting(true);
    setPayError('');
    try {
      // Build birth data payload per item (membership has none)
      const birthDataItems = items
        .filter(item => !isMembership(item.id))
        .map(item => ({
          itemId: item.id,
          itemName: item.name,
          person1: getItem(item.id),
          ...(isPartnerProduct(item.name) ? { person2: getPartner(item.id) } : {}),
        }));

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, quantity: i.quantity })),
          discountCode: appliedDiscount?.code ?? null,
          customerEmail: email,
          customerName: email,
          customerPhone: phone,
          birthDataItems,
          skoolMembership: hasMembership,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Fehler beim Erstellen der Zahlung');
      clearCart();
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      setPayError(err.message ?? 'Verbindungsfehler. Bitte versuch es nochmal.');
      setRedirecting(false);
    }
  };

  // ── Empty cart ──
  if (items.length === 0 && !redirecting) {
    return (
      <div className="min-h-screen bg-[#1B1040] flex items-center justify-center px-6">
        <StarField noConnect />
        <div className="relative z-10 text-center">
          <div className="text-[#C9A84C]/30 text-6xl mb-6">✦</div>
          <h2 className="text-2xl text-[#F0E6C8] mb-3">Dein Warenkorb ist leer</h2>
          <p className="text-[#F0E6C8]/50 mb-8">Füge Produkte hinzu, um fortzufahren.</p>
          <Link to="/angebote"><Button variant="gold">Zum Shop <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </div>
    );
  }

  // ── Redirect screen ──
  if (redirecting) return <RedirectScreen />;

  // ── Checkout form ──
  return (
    <div className="min-h-screen bg-[#1B1040]">
      <StarField noConnect />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-24">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-6 mb-6">
            <Link to="/angebote" className="inline-flex items-center gap-2 text-[#F0E6C8]/40 hover:text-[#F0E6C8] text-sm transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Zurück zum Shop
            </Link>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase"
              style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Bestellung abschließen
            </div>
          </div>
          <h1 className="text-4xl text-[#F0E6C8]"
            style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
            Deine Angaben
          </h1>
          <p className="text-[#F0E6C8]/50 mt-2 text-sm">
            {onlyMembership
              ? 'Wir benötigen nur deine E-Mail-Adresse für die Einladung. Die Zahlung erfolgt sicher über Mollie.'
              : 'Für deine Analyse benötigen wir deine Geburtsdaten. Die Zahlung erfolgt sicher über Mollie.'}
          </p>
        </motion.div>

        <div className="space-y-5">

          {/* Birth data per item */}
          {items.map(item => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="rounded-xl p-6 border-white/8">
                {/* Product row */}
                <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-white/8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-[#F0E6C8] font-semibold text-sm">{item.name}</h3>
                      <div className="text-[#C9A84C] font-bold text-lg mt-0.5">{item.priceFormatted}</div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-white/8 rounded-lg transition-colors text-[#F0E6C8]/30 hover:text-red-400 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Membership: no birth data, just an info note */}
                {isMembership(item.id) ? (
                  <div className="flex items-start gap-3 rounded-lg bg-[#C9A84C]/8 border border-[#C9A84C]/20 p-4">
                    <Users className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <p className="text-[#F0E6C8]/65 text-sm leading-relaxed">
                      Direkt nach der Zahlung erhältst du eine Einladung per E-Mail und kannst der Astroversity Academy auf Skool sofort beitreten. Für die Einladung brauchen wir nur deine E-Mail-Adresse.
                    </p>
                  </div>
                ) : (
                  <>
                    <BirthDataForm
                      label={isPartnerProduct(item.name) ? 'Deine Daten' : ''}
                      data={getItem(item.id)}
                      onChange={d => setItem(item.id, d)}
                    />
                    {isPartnerProduct(item.name) && (
                      <div className="mt-6 pt-6 border-t border-white/8">
                        <BirthDataForm
                          label="Daten deines Partners / deiner Partnerin"
                          data={getPartner(item.id)}
                          onChange={d => setPartner(item.id, d)}
                        />
                      </div>
                    )}
                  </>
                )}
              </GlassCard>
            </motion.div>
          ))}

          {/* Email */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <GlassCard className="rounded-xl p-6 border-white/8">
              <h2 className="text-[#F0E6C8] font-semibold text-base mb-5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A84C]" /> Deine Kontaktdaten
              </h2>
              <label className="block text-[#F0E6C8]/60 text-xs mb-1.5 tracking-wide">
                E-Mail <span className="text-[#C9A84C]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B5FD4]/70 pointer-events-none" />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm placeholder-[#F0E6C8]/25 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/8 transition-all"
                />
              </div>
              <p className="text-[#F0E6C8]/30 text-xs mt-2">
                Für deine Auftragsbestätigung und Rechnung.
              </p>

              <label className="block text-[#F0E6C8]/60 text-xs mb-1.5 mt-5 tracking-wide">
                Handynummer <span className="text-[#C9A84C]">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B5FD4]/70 pointer-events-none" />
                <input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="+49 170 1234567"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm placeholder-[#F0E6C8]/25 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/8 transition-all"
                />
              </div>
              <p className="text-[#F0E6C8]/30 text-xs mt-2">
                Für Rückfragen &amp; Terminabsprache.
              </p>
            </GlassCard>
          </motion.div>

          {/* Total + discount */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="rounded-xl p-5 border-white/8">
              {/* Discount */}
              <div className="mb-4">
                <p className="text-[#F0E6C8]/50 text-xs mb-2">Rabattcode (optional)</p>
                {appliedDiscount ? (
                  <div className="flex items-center justify-between bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-lg px-4 py-2.5">
                    <span className="text-[#C9A84C] text-sm font-semibold">{appliedDiscount.code} – {appliedDiscount.label}</span>
                    <button onClick={() => setAppliedDiscount(null)} className="text-[#F0E6C8]/30 hover:text-[#F0E6C8] text-xs ml-3 transition-colors">✕</button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input type="text" value={discountInput}
                        onChange={e => { setDiscountInput(e.target.value); setDiscountError(''); }}
                        onKeyDown={e => e.key === 'Enter' && applyDiscount(discountInput)}
                        placeholder="Code eingeben"
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm placeholder-[#F0E6C8]/25 focus:outline-none focus:border-[#C9A84C]/50 transition-all" />
                      <button onClick={() => applyDiscount(discountInput)}
                        disabled={discountLoading}
                        className="px-4 py-2 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium hover:bg-[#C9A84C]/25 transition-colors disabled:opacity-50">
                        {discountLoading ? 'Prüfe…' : 'Einlösen'}
                      </button>
                    </div>
                    {discountError && <p className="text-red-400/80 text-xs mt-1.5">{discountError}</p>}
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                <span className="text-[#F0E6C8]/60 text-sm">Gesamtbetrag</span>
                <div className="text-right">
                  {appliedDiscount && (
                    <div className="text-[#F0E6C8]/30 text-sm line-through">{totalPrice.toFixed(2).replace('.', ',')} €</div>
                  )}
                  <span className="text-[#C9A84C] font-bold text-2xl">{finalPrice.toFixed(2).replace('.', ',')} €</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Pay button */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="space-y-3">
            <button
              onClick={handlePay}
              disabled={!canPay}
              className="w-full py-4 rounded-xl bg-[#C9A84C] text-[#1B1040] font-bold text-base flex items-center justify-center gap-2 hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              Jetzt zahlen – {finalPrice.toFixed(2).replace('.', ',')} €
              <ArrowRight className="w-4 h-4" />
            </button>

            {!canPay && (
              <p className="text-[#F0E6C8]/30 text-xs text-center">
                {[
                  !birthComplete && 'Geburtsdaten ausfüllen',
                  !emailValid && 'E-Mail-Adresse eingeben',
                  !phoneValid && 'Handynummer eingeben',
                ].filter(Boolean).join(' · ')}
              </p>
            )}
            {payError && <p className="text-red-400/80 text-xs text-center">{payError}</p>}

            <div className="flex items-center justify-center gap-2">
              <Lock className="w-3 h-3 text-[#F0E6C8]/25" />
              <span className="text-[#F0E6C8]/25 text-xs">SSL-verschlüsselt · Zahlung über Mollie</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
