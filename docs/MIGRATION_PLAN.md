# Plan de Migración: Plan Maynas a React + TypeScript + Tailwind

## Resumen del Proyecto

Migración del sitio vanilla HTML/CSS/JS actual a una aplicación React con TypeScript y Tailwind CSS, manteniendo toda la funcionalidad existente.

**Stack tecnológico elegido:**
- Build Tool: Vite
- Framework: React 18
- Lenguaje: TypeScript
- Routing: React Router v6
- Estado Global: React Context + Hooks
- Estilos: Tailwind CSS + CSS Variables
- Package Manager: npm

---

## 1. Estructura del Proyecto

```
plan-maynas/
├── src/
│   ├── assets/
│   │   ├── img/
│   │   │   ├── aliados/          # 20+ logos de aliados
│   │   │   ├── actualizaciones/   # 14 imágenes de noticias
│   │   │   ├── consulta_publica/
│   │   │   ├── pdm/              # 15+ imágenes de documentos
│   │   │   ├── slider/           # 19 imágenes del slider
│   │   │   └── tallerista/       # 3 imágenes de talleristas
│   │   └── pdf/
│   │       └── ANEXO_ORDENANZA_PDM_CON_SELLOS/
│   │           ├── ANEXO_1_Reglamentos/
│   │           ├── ANEXO_2_Secciones_viales/
│   │           ├── ANEXO_3_Cartografía_Mapas_regulatorios/
│   │           ├── ANEXO_4_Programa_de_inversiones/
│   │           ├── ANEXO_5_Informe_de_Participación_Ciudadana_Efectiva/
│   │           ├── ANEXO_6_Metodologías/
│   │           ├── Resumen_ejecutivo/
│   │           ├── TOMO_I_Diagnostico/
│   │           └── TOMO_II_Lineamientos_Generales_y_Especificos/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ImageSlider.tsx
│   │   │   ├── ReadingProgress.tsx
│   │   │   └── VisitorCounter.tsx
│   │   │
│   │   ├── cards/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── PlanCard.tsx
│   │   │   ├── NoticiaCard.tsx
│   │   │   ├── AliadoCard.tsx
│   │   │   ├── SmartCard.tsx
│   │   │   └── TimelineItem.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProjectsGrid.tsx
│   │   │   ├── AliadosSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── MuestraSection.tsx
│   │   │   ├── ParticipamosSection.tsx
│   │   │   ├── PatMaynasSection.tsx
│   │   │   ├── PdmSection.tsx
│   │   │   ├── PlanesSection.tsx
│   │   │   ├── PublicacionesSection.tsx
│   │   │   ├── RecursosSection.tsx
│   │   │   └── GaleriaGrid.tsx
│   │   │
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       ├── SearchInput.tsx
│   │       └── FilterButtons.tsx
│   │
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── AppProvider.tsx
│   │
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useReadingProgress.ts
│   │   ├── useScrollSpy.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Aliados.tsx
│   │   ├── Contacto.tsx
│   │   ├── MuestraVirtual.tsx
│   │   ├── Participamos.tsx
│   │   ├── PatMaynas.tsx
│   │   ├── PdmIquitos.tsx
│   │   ├── PlanesTerritoriales.tsx
│   │   ├── Publicaciones.tsx
│   │   └── Recursos.tsx
│   │
│   ├── data/
│   │   ├── menuItems.ts
│   │   ├── aliados.ts
│   │   ├── publicaciones.ts
│   │   ├── planes.ts
│   │   ├── documentos.ts
│   │   ├── sliderImages.ts
│   │   ├── talleristas.ts
│   │   └── equipo.ts
│   │
│   ├── types/
│   │   ├── theme.ts
│   │   ├── components.ts
│   │   └── content.ts
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
│
├── public/
│   └── index.html
│
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
└── package.json
```

---

## 2. Paleta de Colores (CSS Variables → Tailwind)

### Light Mode

```css
/* :root (original shared.css) */
--primary-color: #4ABC81;
--primary-dark: #3A9A68;
--primary-light: #6DD49E;
--accent-color: #E16C49;
--accent-light: #F6E2A3;
--secondary-color: #468AC4;
--secondary-dark: #3A7AA8;
--secondary-light: #6A9FD4;
--text-color: #171b46;
--light-text: #5A5D6E;
--text-muted: #8A8D9A;
--bg-color: #FFFFFF;
--bg-alt: #ffffff;
--bg-soft: #ffffff;
--border-color: rgba(53, 55, 77, 0.1);
--shadow-color: rgba(53, 55, 77, 0.06);
```

### Dark Mode

```css
/* .dark-mode */
--primary-color: #6DD49E;
--primary-dark: #4ABC81;
--accent-color: #F6E2A3;
--secondary-color: #6A9FD4;
--text-color: #F0F0F5;
--light-text: #C8C8D0;
--bg-color: #35374D;
--bg-alt: #2D2F3D;
--bg-soft: #3D3F51;
--border-color: rgba(255, 255, 255, 0.08);
--shadow-color: rgba(0, 0, 0, 0.2);
```

### Tailwind Config

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: 'var(--accent-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-color)',
          dark: 'var(--secondary-dark)',
          light: 'var(--secondary-light)',
        },
        text: {
          DEFAULT: 'var(--text-color)',
          light: 'var(--light-text)',
          muted: 'var(--text-muted)',
        },
        bg: {
          DEFAULT: 'var(--bg-color)',
          alt: 'var(--bg-alt)',
          soft: 'var(--bg-soft)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
          light: 'var(--border-light)',
        },
      },
      boxShadow: {
        sm: 'var(--shadow-color)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        lg: '20px',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.75rem',
        md: '1.25rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      maxWidth: {
        container: '1400px',
      },
      height: {
        header: '90px',
      },
    },
  },
  plugins: [],
}
```

---

## 3. Theme Context

```typescript
// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary-color: #4ABC81;
    --primary-dark: #3A9A68;
    --primary-light: #6DD49E;
    --accent-color: #E16C49;
    --accent-light: #F6E2A3;
    --secondary-color: #468AC4;
    --secondary-dark: #3A7AA8;
    --secondary-light: #6A9FD4;
    --text-color: #171b46;
    --light-text: #5A5D6E;
    --text-muted: #8A8D9A;
    --bg-color: #FFFFFF;
    --bg-alt: #ffffff;
    --bg-soft: #ffffff;
    --border-color: rgba(53, 55, 77, 0.1);
    --border-light: rgba(53, 55, 77, 0.05);
    --shadow-color: rgba(53, 55, 77, 0.06);
    --shadow-md: rgba(53, 55, 77, 0.1);
    --shadow-lg: rgba(53, 55, 77, 0.14);
    --gradient-hero: linear-gradient(135deg, #35374D 0%, #4ABC81 50%, #468AC4 100%);
    --gradient-accent: linear-gradient(135deg, #E16C49 0%, #F6E2A3 100%);
    --gradient-green: linear-gradient(135deg, #4ABC81 0%, #3A9A68 100%);
    --gradient-blue: linear-gradient(135deg, #468AC4 0%, #3A7AA8 100%);
    --transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dark {
    --primary-color: #6DD49E;
    --primary-dark: #4ABC81;
    --accent-color: #F6E2A3;
    --secondary-color: #6A9FD4;
    --text-color: #F0F0F5;
    --light-text: #C8C8D0;
    --bg-color: #35374D;
    --bg-alt: #2D2F3D;
    --bg-soft: #3D3F51;
    --border-color: rgba(255, 255, 255, 0.08);
    --shadow-color: rgba(0, 0, 0, 0.2);
    --shadow-md: rgba(0, 0, 0, 0.25);
    --shadow-lg: rgba(0, 0, 0, 0.35);
  }

  * {
    @apply box-border m-0 p-0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans text-text bg-bg min-h-screen transition-all duration-300;
  }
}
```

---

## 4. Tipos TypeScript

```typescript
// src/types/theme.ts
export interface ThemeColors {
  primary: string;
  primaryDark: string;
  accent: string;
  secondary: string;
  text: string;
  lightText: string;
  bg: string;
  bgAlt: string;
  border: string;
}

// src/types/content.ts
export interface MenuItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface Aliado {
  id: string;
  name: string;
  logo: string;
}

export interface Noticia {
  id: string;
  title: string;
  content: string;
  fullContent: string;
  date: string;
  image: string;
  category: NoticiaCategory;
}

export type NoticiaCategory =
  | 'Todas'
  | 'Consulta Pública'
  | 'Audiencias'
  | 'Participación'
  | 'Reconocimiento'
  | 'Proyectos';

export interface Plan {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export interface SmartDocument {
  title: string;
  image: string;
  dropdownId: string;
  pdfs: { name: string; url: string }[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface SliderImage {
  id: string;
  src: string;
  alt: string;
}

export interface Tallerista {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

// src/types/components.ts
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onHover?: () => void;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'carpeta' | 'visor' | 'pat' | 'publica' | 'download';
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}
```

---

## 5. Rutas

```typescript
// src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Aliados from './pages/Aliados';
import Contacto from './pages/Contacto';
import MuestraVirtual from './pages/MuestraVirtual';
import Participamos from './pages/Participamos';
import PatMaynas from './pages/PatMaynas';
import PdmIquitos from './pages/PdmIquitos';
import PlanesTerritoriales from './pages/PlanesTerritoriales';
import Publicaciones from './pages/Publicaciones';
import Recursos from './pages/Recursos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'aliados', element: <Aliados /> },
      { path: 'contacto', element: <Contacto /> },
      { path: 'muestra-virtual', element: <MuestraVirtual /> },
      { path: 'participamos', element: <Participamos /> },
      { path: 'pat-maynas', element: <PatMaynas /> },
      { path: 'pdm-iquitos', element: <PdmIquitos /> },
      { path: 'planes-territoriales', element: <PlanesTerritoriales /> },
      { path: 'publicaciones', element: <Publicaciones /> },
      { path: 'recursos', element: <Recursos /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
```

---

## 6. Componentes Principales

### Layout

```typescript
// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ReadingProgress from '../ui/ReadingProgress';
import ThemeToggle from '../ui/ThemeToggle';

export default function Layout() {
  return (
    <>
      <ReadingProgress />
      <ThemeToggle />
      <Header />
      <main className="pt-[90px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

### Header

```typescript
// src/components/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { menuItems } from '../../data/menuItems';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-border/10">
      <div className="max-w-container mx-auto px-5 flex items-center justify-between h-header">
        <Link to="/" className="flex items-center">
          <img src="/docs/logo-plan.png" alt="Plan Maynas" className="w-[250px]" />
        </Link>

        <nav className="nav-menu text-center text-sm" aria-label="Navegación principal">
          <button
            className="menu-toggle flex flex-col gap-1.5 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            <span className="w-6 h-0.5 bg-text" />
            <span className="w-6 h-0.5 bg-text" />
            <span className="w-6 h-0.5 bg-text" />
          </button>

          <ul className={`menu flex gap-5 justify-evenly ${isMenuOpen ? 'flex-col absolute top-full left-0 w-full bg-white' : 'hidden lg:flex'}`}>
            {menuItems.map(item => (
              <li key={item.id}>
                <Link
                  to={item.href}
                  className={`relative py-2 px-3 transition-all duration-300 hover:text-secondary ${
                    location.pathname === item.href ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

### Footer

```typescript
// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-accent text-white py-8">
      <div className="max-w-container mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-4">
          <p>&copy; 2026 OSTI. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Visitas:</span>
            <a
              href="https://www.hitwebcounter.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Contador de visitas"
            >
              <img
                src="https://hitwebcounter.com/counter/counter.php?page=20729038&style=0018&nbdigits=6&type=page&initCount=0"
                alt="Contador de visitas"
                className="h-5 border-0"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### ThemeToggle

```typescript
// src/components/ui/ThemeToggle.tsx
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="fixed top-[90px] right-5 w-14 h-14 rounded-full bg-primary flex items-center justify-center cursor-pointer z-[999] border-2 border-white/20 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:rotate-[15deg] transition-all duration-300"
    >
      {isDark ? (
        <svg className="w-6 h-6 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg className="w-6 h-6 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

### ReadingProgress

```typescript
// src/components/ui/ReadingProgress.tsx
import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, progress));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 z-[10000] bg-transparent"
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

### Button

```typescript
// src/components/ui/Button.tsx
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'carpeta' | 'visor' | 'pat' | 'publica' | 'download';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: '_blank';
  download?: boolean;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
  carpeta: 'bg-[#c64402] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
  visor: 'bg-[#0092FF] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
  pat: 'bg-[#ffae00] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
  publica: 'bg-[#37cf18] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
  download: 'bg-[#acbe07] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
};

export default function Button({
  variant = 'primary',
  children,
  className = '',
  href,
  target,
  download,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold
    transition-all duration-300 cursor-pointer no-underline
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
  `.replace(/\s+/g, ' ').trim();

  const variantClass = variantStyles[variant];

  if (href) {
    return (
      <a
        href={href}
        target={target}
        download={download}
        className={`${baseClasses} ${variantClass} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## 7. Datos

```typescript
// src/data/menuItems.ts
import { MenuItem } from '../types/content';

export const menuItems: MenuItem[] = [
  { id: 'inicio', label: 'INICIO', href: '/' },
  { id: 'planes', label: 'PLANES TERRITORIALES', href: '/planes-territoriales' },
  { id: 'participamos', label: 'PARTICIPAMOS', href: '/participamos' },
  { id: 'aliados', label: 'NUESTROS ALIADOS', href: '/aliados' },
  { id: 'recursos', label: 'RECURSOS', href: '/recursos' },
  { id: 'publicaciones', label: 'NOTICIAS Y ACTUALIZACIONES', href: '/publicaciones' },
  { id: 'muestra', label: 'MUESTRA VIRTUAL', href: '/muestra-virtual' },
  { id: 'pdm', label: 'PDM IQUITOS', href: '/pdm-iquitos' },
  { id: 'pat', label: 'PAT MAYNAS', href: '/pat-maynas' },
  { id: 'contacto', label: 'CONTACTO', href: '/contacto' },
];
```

```typescript
// src/data/aliados.ts
import { Aliado } from '../types/content';

export const aliados: Aliado[] = [
  { id: '1', name: 'Municipalidad Provincial de Maynas', logo: '/docs/img/aliados/maynas.png' },
  { id: '2', name: 'Municipalidad Distrital de Punchana', logo: '/docs/img/aliados/punchana.png' },
  { id: '3', name: 'Municipalidad Distrital de Belén', logo: '/docs/img/aliados/belen.png' },
  { id: '4', name: 'Municipalidad Distrital de San Juan', logo: '/docs/img/aliados/sanjuan.png' },
  { id: '5', name: 'Colegio de Economistas', logo: '/docs/img/aliados/economista.png' },
  { id: '6', name: 'Colegio de Arquitectos', logo: '/docs/img/aliados/arquitectos.png' },
  { id: '7', name: 'CENEPRED', logo: '/docs/img/aliados/cenepred.png' },
  { id: '8', name: 'Plan Binacional', logo: '/docs/img/aliados/planbinacional.png' },
  // ... 16 aliados totales
];
```

```typescript
// src/data/publicaciones.ts
import { Noticia } from '../types/content';

export const publicaciones: Noticia[] = [
  {
    id: '1',
    title: 'Inauguración del proceso de planificación',
    content: 'El pasado 15 de noviembre se dio inicio al proceso...',
    fullContent: 'El pasado 15 de noviembre se dio inicio al proceso de planificación territorial...',
    date: '15 Nov 2024',
    image: '/docs/img/actualizaciones/img_1.jpg',
    category: 'Proyectos',
  },
  // ... 15 publicaciones
];

export const categories: NoticiaCategory[] = [
  'Todas',
  'Consulta Pública',
  'Audiencias',
  'Participación',
  'Reconocimiento',
  'Proyectos',
];
```

---

## 8. Hooks Personalizados

```typescript
// src/hooks/useReadingProgress.ts
import { useState, useEffect } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, progress));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}
```

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.warn(`Error saving to localStorage key "${key}"`);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

---

## 9. Estilos Específicos por Página

### Homepage (Hero)

```typescript
// src/pages/Home.tsx - Hero Section Styling
/*
 * Hero background: url('/docs/pruebafoto.png')
 * Gradient overlay: linear-gradient(145deg, rgba(53,55,77,0.92), rgba(53,55,77,0.75), rgba(74,188,129,0.65), rgba(70,138,196,0.6))
 * Animations: pulse (20s infinite), typing text (3.5s)
 */
```

```css
/* Hero animation */
.hero {
  @apply min-h-screen flex items-center relative pt-header bg-cover bg-center bg-fixed overflow-hidden;
  background-image: url('/docs/pruebafoto.png');
}

.hero::before {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(145deg, rgba(53,55,77,0.92) 0%, rgba(53,55,77,0.75) 30%, rgba(74,188,129,0.65) 70%, rgba(70,138,196,0.6) 100%);
  z-index: 1;
}

.hero::after {
  content: '';
  @apply absolute inset-0 animate-pulse;
  background: radial-gradient(ellipse at 20% 30%, rgba(225,108,73,0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(70,138,196,0.2) 0%, transparent 50%);
  z-index: 2;
  animation: pulse 20s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
```

### Aliados Page

```css
/* .aliados-div (from aliados.css) */
.aliados-div {
  @apply w-full bg-white;
}

/* Dark mode */
.dark .aliados-div {
  @apply bg-bg-alt;
}
```

### Muestra Virtual Page

```css
/* .muestra-div (from muestra-virtual.css) */
.muestra-div {
  @apply w-full bg-secondary; /* #468AC4 */
}

/* Dark mode overrides */
.dark .muestra-div p,
.dark .muestra-div h2,
.dark .muestra-div h3 {
  @apply text-white;
}
```

### Participamos Page

```css
/* .participamos-div (from participamos.css) */
.participamos-div {
  @apply w-full bg-[#4888C8];
}

.dark .participamos-div {
  @apply bg-bg-alt;
}
```

### Planes Territoriales Page

```css
/* .proyecto-destacado (from planes-territoriales.css) */
.proyecto-destacado {
  @apply w-full bg-[#E5D3c1];
}

/* .instrumentos-pilares-wrapper */
.instrumentos-pilares-wrapper {
  @apply w-full bg-white;
}

.dark .proyecto-destacado,
.dark .instrumentos-pilares-wrapper {
  @apply bg-bg-alt;
}
```

### PAT Maynas Page (Dark Mode Cards)

```css
/* Dark mode overrides for cards (from pat-maynas.css) */
.dark #consulta-pat {
  @apply bg-[#2D2F3D];
}

.dark .consulta-header {
  @apply bg-[#35374D] rounded-lg;
}

.dark .consulta-header .section-title {
  @apply text-white;
}

.dark .consulta-info {
  @apply text-[#C8C8D0];
}

.dark .consulta-info h2 {
  @apply text-white;
}

.dark .consulta-detalles {
  @apply bg-[#2D2F3D] rounded-lg;
}

.dark .detalle-item {
  @apply bg-[#35374D] border border-white/10;
}

.dark .detalle-item strong {
  @apply text-white;
}

.dark .detalle-item p {
  @apply text-[#C8C8D0];
}
```

---

## 10. Páginas - Detalle de Componentes

### Home.tsx

```typescript
// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import Popup from '../components/Popup';
import ReadingProgress from '../ui/ReadingProgress';
import ThemeToggle from '../ui/ThemeToggle';
import HeroSection from '../components/sections/HeroSection';
import ProjectsGrid from '../components/sections/ProjectsGrid';

export default function Home() {
  return (
    <>
      <Popup />
      <ReadingProgress />
      <ThemeToggle />
      <Header />
      <main>
        <HeroSection />
        <ProjectsGrid />
      </main>
      <Footer />
    </>
  );
}
```

### Publicaciones.tsx

```typescript
// src/pages/Publicaciones.tsx - Complex page with search, filters, modal
import { useState, useMemo } from 'react';
import { publicaciones, categories } from '../data/publicaciones';
import { Noticia, NoticiaCategory } from '../types/content';
import PublicacionesSidebar from '../components/sections/PublicacionesSidebar';
import NoticiaCard from '../components/cards/NoticiaCard';
import PublicationModal from '../components/forms/PublicationModal';

const ITEMS_PER_PAGE = 4;

export default function Publicaciones() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoticiaCategory>('Todas');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);

  const filteredPublicaciones = useMemo(() => {
    return publicaciones.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const visiblePublicaciones = filteredPublicaciones.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPublicaciones.length;

  const handleLoadMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Noticias y Actualizaciones</h1>

        <div className="publicaciones-layout">
          <PublicacionesSidebar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            resultCount={filteredPublicaciones.length}
          />

          <div className="noticias-grid">
            {visiblePublicaciones.map(noticia => (
              <NoticiaCard
                key={noticia.id}
                noticia={noticia}
                onClick={() => setSelectedNoticia(noticia)}
              />
            ))}
          </div>
        </div>

        {hasMore && (
          <button onClick={handleLoadMore} className="btn-carpeta mx-auto block mt-8">
            Ver más
          </button>
        )}
      </div>

      {selectedNoticia && (
        <PublicationModal
          isOpen={!!selectedNoticia}
          onClose={() => setSelectedNoticia(null)}
          noticia={selectedNoticia}
        />
      )}
    </section>
  );
}
```

### MuestraVirtual.tsx

```typescript
// src/pages/MuestraVirtual.tsx - Image slider with 19 slides
import ImageSlider from '../components/ui/ImageSlider';
import { sliderImages } from '../data/sliderImages';
import GaleriaGrid from '../components/sections/GaleriaGrid';

export default function MuestraVirtual() {
  return (
    <>
      {/* Slider Section */}
      <section className="muestra-div py-16">
        <div className="container">
          <h2 className="text-white text-center mb-8">La Ciudad de mis Sueños</h2>
          <ImageSlider images={sliderImages} />
        </div>
      </section>

      {/* Galería */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Galería</h2>
          <GaleriaGrid />
        </div>
      </section>

      {/* Videos */}
      <section className="section bg-alt">
        <div className="container">
          <h2 className="section-title">Videos</h2>
          <div className="videos-grid">
            <video controls className="w-full rounded-lg">
              <source src="/docs/videos/video_1.mp4" type="video/mp4" />
            </video>
            <video controls className="w-full rounded-lg">
              <source src="/docs/videos/video_2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Equipo</h2>
          {/* Team list */}
        </div>
      </section>
    </>
  );
}
```

---

## 11. Fases de Implementación

### Fase 1: Setup (2-3 horas)
- [ ] `npm create vite@latest plan-maynas -- --template react-ts`
- [ ] Instalar dependencias: `react-router-dom tailwindcss postcss autoprefixer`
- [ ] Configurar `tailwind.config.js` con CSS variables
- [ ] Configurar `postcss.config.js`
- [ ] Crear `globals.css` con variables y directivas Tailwind
- [ ] Crear ThemeContext
- [ ] Crear Layout (Header + Footer + Outlet)
- [ ] Configurar React Router

### Fase 2: Componentes UI Core (4-6 horas)
- [ ] Button (todas las variantes)
- [ ] Card (base)
- [ ] Section
- [ ] ReadingProgress
- [ ] ThemeToggle
- [ ] MobileMenu
- [ ] Modal

### Fase 3: Homepage (2-3 horas)
- [ ] HeroSection
- [ ] TypingText animation
- [ ] ProjectsGrid
- [ ] Popup con localStorage
- [ ] VisitCounter

### Fase 4: Aliados + Contacto (2-3 horas)
- [ ] AliadosPage
- [ ] ContactoPage con validación

### Fase 5: Muestra Virtual (3-4 horas)
- [ ] ImageSlider (19 slides)
- [ ] GaleriaGrid
- [ ] VideosSection
- [ ] Equipo

### Fase 6: Participamos + Timeline (1-2 horas)
- [ ] Timeline component
- [ ] ParticipamosPage

### Fase 7: Planes Territoriales (2-3 horas)
- [ ] PlanCard
- [ ] InstrumentosPilares
- [ ] PlanesTerritorialesPage

### Fase 8: PAT Maynas (2-3 horas)
- [ ] DetalleItem
- [ ] ConsultaContent
- [ ] MapaImagen
- [ ] PatMaynasPage (dark mode cards)

### Fase 9: PDM Iquitos (2-3 horas)
- [ ] SmartCard con dropdown
- [ ] PdmIquitosPage

### Fase 10: Publicaciones (3-4 horas)
- [ ] Sidebar con search
- [ ] FilterButtons
- [ ] NoticiaCard
- [ ] PublicationModal
- [ ] Pagination
- [ ] PublicacionesPage

### Fase 11: Recursos (1 hora)
- [ ] RecursosPage

### Fase 12: Testing y Polish (2-3 horas)
- [ ] Responsive mobile
- [ ] Dark mode en todas las páginas
- [ ] SEO meta tags
- [ ] Animaciones
- [ ] Build optimization

---

## 12. Estimación Total

| Fase | Horas |
|------|-------|
| Setup | 2-3 |
| UI Core | 4-6 |
| Homepage | 2-3 |
| Aliados + Contacto | 2-3 |
| Muestra Virtual | 3-4 |
| Participamos + Timeline | 1-2 |
| Planes Territoriales | 2-3 |
| PAT Maynas | 2-3 |
| PDM Iquitos | 2-3 |
| Publicaciones | 3-4 |
| Recursos | 1 |
| Testing y Polish | 2-3 |
| **Total** | **26-38 horas** |

---

## 13. Comandos de Inicio

```bash
# Crear proyecto
npm create vite@latest plan-maynas -- --template react-ts

# Instalar dependencias
cd plan-maynas
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Desarrollo
npm run dev

# Build producción
npm run build
```

---

## 14. Notas Importantes

### Assets a Migrar
- Todos los archivos de `src/docs/` deben copiarse a `/public/docs/`
- Rutas de imágenes cambiarán de `../docs/` a `/docs/`

### Visit Counter
- Mantener el mismo iframe de hitwebcounter.com
- URL: `https://hitwebcounter.com/counter/counter.php?page=20729038&style=0018&nbdigits=6&type=page&initCount=0`

### Fuentes
- El sitio usa fuentes de sistema: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- No requiere Google Fonts

###第三方脚本
- `https://cdn.gpteng.co/gptengineer.js` - mantener si es necesario

### Responsive Breakpoints
- Mobile: max-width 768px
- Tablet: 769px - 1024px
- Desktop: 1024px+