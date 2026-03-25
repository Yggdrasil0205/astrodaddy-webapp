import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Plugin to handle figma:asset imports for production builds
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        // Return a placeholder module for figma:asset imports
        return '\0figma-asset:' + id.replace('figma:asset/', '')
      }
      return null
    },
    load(id: string) {
      if (id.startsWith('\0figma-asset:')) {
        // Return a placeholder image or empty module
        // This prevents build errors while allowing the app to deploy
        return 'export default ""'
      }
      return null
    }
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})