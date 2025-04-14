import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Make sure this is imported if using React

export default defineConfig({
  plugins: [
    react(), // Include this if you're using React
  ],
  
})