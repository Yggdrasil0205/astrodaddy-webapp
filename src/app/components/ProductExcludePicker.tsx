import React from 'react';
import { products } from '../data/products';

// Chip multi-select of products to EXCLUDE from a discount code.
// Red + struck-through = excluded; click to toggle.
export function ProductExcludePicker({ selected, onChange }: { selected: number[]; onChange: (ids: number[]) => void }) {
  const toggle = (id: number) =>
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  return (
    <div className="flex flex-wrap gap-1.5">
      {products.map((p) => {
        const on = selected.includes(p.id);
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => toggle(p.id)}
            title={on ? 'ausgeschlossen – klicken zum Einschließen' : 'klicken zum Ausschließen'}
            className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${
              on
                ? 'bg-red-400/15 border-red-400/40 text-red-300 line-through'
                : 'bg-white/5 border-white/10 text-[#F0E6C8]/60 hover:border-white/25'
            }`}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
