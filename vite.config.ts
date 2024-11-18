import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // הוספת הכתובת להאזנה לכל הממשקים
    port: process.env.PORT || 3000, // שימוש בפורט דינמי
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  preview: {
    host: '0.0.0.0', // הוספת הכתובת להאזנה לכל הממשקים גם עבור תצוגה מקדימה
    port: process.env.PORT || 3000 // שימוש בפורט דינמי עבור תצוגה מקדימה
  }
});
