"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Leaf,
  Zap,
  Target,
  Users,
  Clock,
  MapPin,
  Settings,
  Wrench,
  Calculator,
  CheckSquare,
  AlertTriangle,
  Cpu,
  Cloud,
  Trash2,
  Battery,
  DollarSign,
  Globe,
  Award,
  User,
  Crown,
  Shield,
  Play,
  Code,
  TestTube,
  Rocket,
  RefreshCw,
  Building,
  Factory,
  GraduationCap,
  Landmark,
  Code2,
  Box,
  Download,
  RotateCcw,
  Smartphone,
  Server,
  MousePointer,
  HardDrive,
  TreePine,
  Home,
  BarChart3,
  ChevronUp,
  Sparkles,
  Activity,
  TrendingUp,
  Mail,
  BookOpen,
  Star,
  Trophy,
  Medal,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"

// Hook para detección de viewport y optimización de carga
const useImageOptimization = () => {
  const [viewportSize, setViewportSize] = useState({ width: 1200, height: 800 })
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast'>('fast')

  useEffect(() => {
    const updateViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
      setDevicePixelRatio(window.devicePixelRatio || 1)
    }

    // Detectar velocidad de conexión
    const connection = (navigator as any).connection
    if (connection) {
      const slowConnections = ['slow-2g', '2g', '3g']
      setConnectionSpeed(
        slowConnections.includes(connection.effectiveType) ? 'slow' : 'fast'
      )
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return { viewportSize, devicePixelRatio, connectionSpeed }
}

// Generador de blur placeholder base64
const generateBlurDataURL = (width = 10, height = 10) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // Gradiente verde/azul para placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#10b981')
    gradient.addColorStop(1, '#3b82f6')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }
  
  return canvas.toDataURL('image/jpeg', 0.1)
}

// Componente de imagen ultra-optimizada con lazy loading inteligente
const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width = 400, 
  height = 300,
  priority = false,
  quality = 80,
  placeholder = 'blur',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  sizes?: string
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [blurDataURL, setBlurDataURL] = useState<string>('')
  const { viewportSize, devicePixelRatio, connectionSpeed } = useImageOptimization()
  const [ref, isInView] = useIntersectionObserver(0.1, '50px')

  // Generar blur placeholder
  useEffect(() => {
    if (placeholder === 'blur' && typeof window !== 'undefined') {
      setBlurDataURL(generateBlurDataURL())
    }
  }, [placeholder])

  // Optimizar calidad basado en conexión y dispositivo
  const optimizedQuality = useMemo(() => {
    if (connectionSpeed === 'slow') return Math.max(quality - 20, 40)
    if (devicePixelRatio > 2) return Math.min(quality + 10, 95)
    return quality
  }, [quality, connectionSpeed, devicePixelRatio])

  // Optimizar dimensiones basado en viewport
  const optimizedDimensions = useMemo(() => {
    const maxWidth = Math.min(width, viewportSize.width)
    const maxHeight = Math.min(height, viewportSize.height)
    
    // Ajustar para dispositivos de alta densidad
    const finalWidth = Math.round(maxWidth * Math.min(devicePixelRatio, 2))
    const finalHeight = Math.round(maxHeight * Math.min(devicePixelRatio, 2))
    
    return { width: finalWidth, height: finalHeight }
  }, [width, height, viewportSize, devicePixelRatio])

  // URL optimizada - ahora simplificada para imágenes locales
  const optimizedSrc = useMemo(() => {
    // Para imágenes locales, simplemente devolvemos la src original
    // Next.js se encarga de la optimización automática
    return src
  }, [src])

  return (
    <div ref={ref} className={`group relative overflow-hidden rounded-2xl ${className}`}>
      {!hasError ? (
        <div className="relative">
          {/* Solo cargar imagen cuando esté en vista o sea priority */}
          {(isInView || priority) && (
            <Image
              src={optimizedSrc}
              alt={alt}
              width={optimizedDimensions.width}
              height={optimizedDimensions.height}
              priority={priority}
              quality={optimizedQuality}
              sizes={sizes}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              className={`transition-all duration-1000 ease-out ${
                isLoading 
                  ? 'scale-110 blur-lg opacity-0' 
                  : 'scale-100 blur-0 opacity-100 group-hover:scale-105'
              } object-cover w-full h-full`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true)
                setIsLoading(false)
              }}
            />
          )}
          
          {/* Gradient overlay for modern effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Modern glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[1px]" />
          
          {/* Performance indicator (solo en desarrollo) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {optimizedDimensions.width}×{optimizedDimensions.height} | Q{optimizedQuality}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
            </div>
          </div>
          
          <div className="text-center relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <TreePine className="h-8 w-8 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">Green Tech Visual</p>
            <p className="text-xs text-gray-500 mt-1">Sustainable Technology</p>
          </div>
        </div>
      )}
      
      {/* Loading state mejorado */}
      {isLoading && !hasError && (isInView || priority) && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-emerald-100 flex items-center justify-center">
          <div className="relative">
            {/* Modern loading spinner */}
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-600 rounded-full animate-spin-slow"></div>
          </div>
        </div>
      )}
      
      {/* Lazy loading placeholder */}
      {!isInView && !priority && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-200 rounded-full mx-auto mb-2 animate-pulse"></div>
            <p className="text-xs text-gray-500">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Modern corner accent */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

// Hook personalizado para animaciones con Intersection Observer
const useIntersectionObserver = (threshold = 0.1, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      { threshold, rootMargin }
    )
    
    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold, rootMargin, hasAnimated])
  
  return [elementRef, isVisible]
}

// Componente para animaciones de entrada con diferentes efectos
const AnimatedSection = ({ 
  children, 
  animation = "fadeUp", 
  delay = 0, 
  className = "",
  threshold = 0.1 
}) => {
  const [ref, isVisible] = useIntersectionObserver(threshold)
  
  const animations = {
    fadeUp: `transition-all duration-1000 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-10'
    }`,
    fadeDown: `transition-all duration-1000 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 -translate-y-10'
    }`,
    fadeLeft: `transition-all duration-1000 ease-out ${
      isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-10'
    }`,
    fadeRight: `transition-all duration-1000 ease-out ${
      isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 -translate-x-10'
    }`,
    scale: `transition-all duration-1000 ease-out ${
      isVisible 
        ? 'opacity-100 scale-100' 
        : 'opacity-0 scale-95'
    }`,
    slideUp: `transition-all duration-1200 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-20'
    }`
  }
  
  return (
    <div
      ref={ref}
      className={`${animations[animation] || animations.fadeUp} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Hook para efectos parallax optimizados
const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    
    const updateParallax = () => {
      if (!elementRef.current || !isVisible) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * speed
      
      setOffset(rate)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    // Intersection Observer para activar parallax solo cuando sea visible
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    if (isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [speed, isVisible])

  return [elementRef, offset]
}

// Componente de imagen de fondo optimizada con parallax
const BackgroundImage = ({ 
  src, 
  alt, 
  className = "",
  parallaxSpeed = 0.3,
  overlay = "bg-gradient-to-r from-gray-900/50 to-gray-800/50",
  quality = 70
}: {
  src: string
  alt: string
  className?: string
  parallaxSpeed?: number
  overlay?: string
  quality?: number
}) => {
  const [parallaxRef, parallaxOffset] = useParallax(parallaxSpeed)
  const { viewportSize, connectionSpeed } = useImageOptimization()
  
  // Optimización específica para fondos
  const backgroundQuality = connectionSpeed === 'slow' ? Math.max(quality - 30, 30) : quality
  
  // Dimensiones optimizadas para fondos de pantalla completa
  const backgroundDimensions = useMemo(() => {
    const width = Math.max(viewportSize.width, 1200)
    const height = Math.max(viewportSize.height, 800)
    return { width, height }
  }, [viewportSize])

  // URL optimizada para fondos - simplificada para imágenes locales
  const optimizedBackgroundSrc = useMemo(() => {
    // Para imágenes locales, Next.js maneja la optimización automáticamente
    return src
  }, [src])

  return (
    <div ref={parallaxRef} className={`absolute inset-0 ${className}`}>
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${optimizedBackgroundSrc})`,
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform'
        }}
      />
      <div className={`absolute inset-0 ${overlay}`} />
      
      {/* Performance indicator para fondos (solo desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded z-50">
          BG: {backgroundDimensions.width}×{backgroundDimensions.height} | Q{backgroundQuality} | P{parallaxSpeed}
        </div>
      )}
    </div>
  )
}

// URLs de imágenes locales optimizadas para rendimiento
const IMAGES = {
  hero: "/images/hero.jpg",
  greenTech: "/images/green-tech.jpg", // Tecnología verde
  coding: "/images/coding.jpg", // Código en pantalla
  dataCenter: "/images/data-center.jpg", // Data center moderno
  renewable: "/images/renewable.jpg", // Energías renovables
  team: "/images/team.jpg", // Equipo trabajando
  circuit: "/images/circuit.jpg", // Circuito electrónico
  cloud: "/images/cloud.jpg", // Cloud computing
  calculator: "/images/calculator.jpg", // Calculadora/analytics
  forest: "/images/forest.jpg", // Bosque verde
  sustainable: "/images/sustainable.jpg", // Desarrollo sostenible
  innovation: "/images/innovation.jpg" // Innovación tecnológica
}

// Hook especializado para el navbar con manejo optimizado de estados
const useNavbarState = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true)
    
    let ticking = false

    const updateNavbar = () => {
      const scrollY = window.scrollY
      const threshold = 50 // Aumentado el threshold para más claridad

      // Update scroll state - solo si estamos en el cliente
      if (isClient) {
        setIsScrolled(scrollY > threshold)
      }
      
      // Hide/show navbar based on scroll direction (optional enhancement)
      if (scrollY > 100) {
        if (scrollY > lastScrollY && scrollY > 200) {
          setIsVisible(false) // Hide when scrolling down
        } else {
          setIsVisible(true) // Show when scrolling up
        }
      } else {
        setIsVisible(true) // Always show near top
      }
      
      setLastScrollY(scrollY)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar)
        ticking = true
      }
    }

    // Solo hacer el check inicial después de que el cliente esté listo
    if (isClient) {
      updateNavbar()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient, lastScrollY])

  return { isScrolled: isClient ? isScrolled : false, isVisible }
}

// Hook personalizado para parallax effects optimizado

// Sistema de preload para imágenes críticas
const useImagePreloader = () => {
  useEffect(() => {
    const criticalImages = [
      IMAGES.hero,
      IMAGES.sustainable,
      IMAGES.dataCenter
    ]
    
    criticalImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
    
    return () => {
      // Cleanup preload links
      document.querySelectorAll('link[rel="preload"][as="image"]').forEach((link) => {
        if (criticalImages.includes(link.href)) {
          document.head.removeChild(link)
        }
      })
    }
  }, [])
}

// Componente de dispositivos flotantes inspirado en la portada
const FloatingDevices = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Laptop flotante */}
      <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: "0s" }}>
        <div className="relative">
          <div className="w-24 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
            <div className="w-20 h-12 bg-green-400 rounded-sm m-2 flex items-center justify-center">
              <Code className="h-6 w-6 text-green-800" />
            </div>
          </div>
          <div className="w-24 h-2 bg-gray-700 rounded-b-lg"></div>
        </div>
      </div>

      {/* Tablet flotante */}
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-16 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
          <div className="w-14 h-18 bg-blue-400 rounded-sm m-1 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-blue-800" />
          </div>
        </div>
      </div>

      {/* Smartphone flotante */}
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-8 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
          <div className="w-6 h-12 bg-purple-400 rounded-sm m-1 flex items-center justify-center">
            <Leaf className="h-3 w-3 text-purple-800" />
          </div>
        </div>
      </div>

      {/* Monitor flotante */}
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "3s" }}>
        <div className="relative">
          <div className="w-20 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
            <div className="w-18 h-10 bg-emerald-400 rounded-sm m-1 flex items-center justify-center">
              <TreePine className="h-4 w-4 text-emerald-800" />
            </div>
          </div>
          <div className="w-2 h-4 bg-gray-700 mx-auto"></div>
          <div className="w-8 h-1 bg-gray-600 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  )
}

// Componente de hojas flotantes
const FloatingLeaves = () => {
  const [leaves, setLeaves] = useState<Array<{
    left: number
    animationDelay: number
    animationDuration: number
    rotation: number
  }>>([])

  useEffect(() => {
    const leafData = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      animationDelay: Math.random() * 10,
      animationDuration: 8 + Math.random() * 4,
      rotation: Math.random() * 360,
    }))
    setLeaves(leafData)
  }, [])

  if (leaves.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {leaves.map((leaf, index) => (
        <div
          key={index}
          className="absolute w-3 h-3 opacity-60"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.animationDelay}s`,
            animationDuration: `${leaf.animationDuration}s`,
          }}
        >
          <Leaf
            className="w-full h-full text-green-500 animate-leaf-fall"
            style={{ transform: `rotate(${leaf.rotation}deg)` }}
          />
        </div>
      ))}
    </div>
  )
}

// Componente de circuitos animados
const AnimatedCircuits = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M10,10 L90,10 L90,90 L10,90 Z M30,30 L70,30 M50,10 L50,50"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <circle cx="50" cy="50" r="3" fill="#10b981" className="animate-ping" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  )
}

// Componente principal
export default function GreenSoftwareApp() {
  // Preload critical images
  useImagePreloader()
  
  // Enhanced navbar state management
  const navbarState = useNavbarState()
  
  const [activeSection, setActiveSection] = useState("inicio")
  const [carbonFootprint, setCarbonFootprint] = useState({
    users: [1000],
    sessions: [3],
    dataTransfer: [500],
  })
  const [carbonResult, setCarbonResult] = useState<{
    dailyCO2: number
    annualCO2: number
    treesEquivalent: number
    totalEnergy: number
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Helper function for consistent number formatting
  const formatNumber = (num: number) => {
    if (!isClient) return num.toString()
    return num.toLocaleString('es-ES')
  }

  const sections = [
    { id: "inicio", title: "Inicio", icon: Home },
    { id: "que-es", title: "¿Qué es?", icon: Leaf },
    { id: "por-que", title: "¿Por qué?", icon: AlertTriangle },
    { id: "para-que", title: "¿Para qué?", icon: Target },
    { id: "quien", title: "¿Quién?", icon: Users },
    { id: "cuando", title: "¿Cuándo?", icon: Clock },
    { id: "donde", title: "¿Dónde?", icon: MapPin },
    { id: "como", title: "¿Cómo?", icon: Settings },
    { id: "con-que", title: "¿Con qué?", icon: Wrench },
    { id: "calculadora", title: "Calculadora", icon: Calculator },
  ]

  const complianceItems = [
    { text: "¿Aplicas eco-coding (código eficiente y limpio)?", icon: Code2 },
    { text: "¿Utilizas lenguajes eficientes como Rust o Go?", icon: Wrench },
    { text: "¿Implementas lazy loading y carga bajo demanda?", icon: Download },
    { text: "¿Monitoras consumo con herramientas específicas?", icon: BarChart3 },
    { text: "¿Usas virtualización y contenedores?", icon: Box },
    { text: "¿Aplicas el estándar Software Carbon Intensity (SCI)?", icon: Award },
    { text: "¿Utilizas energía renovable en servidores?", icon: Leaf },
    { text: "¿Realizas análisis del ciclo de vida del software (SLCA)?", icon: RotateCcw },
    { text: "¿Optimizas tu código regularmente?", icon: Code },
    { text: "¿Evitas software innecesario o mal diseñado?", icon: Trash2 },
  ]

  // Simplified scroll handler for active sections and scroll-to-top
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const scrollPosition = scrollY + 100
          
          // Update scroll-to-top button
          setShowScrollTop(scrollY > 500)
          
          // Update active section
          for (const section of sections) {
            const element = document.getElementById(section.id)
            if (element) {
              const offsetTop = element.offsetTop - 100 // Account for navbar height
              const offsetBottom = offsetTop + element.offsetHeight

              if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                setActiveSection(section.id)
                break
              }
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    // Initial call
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const calculateCarbonFootprint = async () => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const users = carbonFootprint.users[0]
    const sessions = carbonFootprint.sessions[0]
    const dataTransfer = carbonFootprint.dataTransfer[0]

    const energyTransfer = dataTransfer * 0.006
    const energySessions = users * sessions * 0.02
    const energyDevices = users * sessions * 0.01
    const totalEnergy = (energyTransfer + energySessions + energyDevices) * 1.8

    const dailyCO2 = totalEnergy * 0.8
    const annualCO2 = (dailyCO2 * 365) / 1000
    const treesEquivalent = Math.round(annualCO2 * 40)

    setCarbonResult({
      dailyCO2,
      annualCO2,
      treesEquivalent,
      totalEnergy,
    })
    setIsCalculating(false)
  }

  const toggleCheckItem = (item: string) => {
    setCheckedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  const complianceScore = Math.round((checkedItems.length / complianceItems.length) * 100)

  return (
    <TooltipProvider>
      <div className="min-h-screen relative">
        {/* Content */}
        <div className="relative z-10">
          {/* Elementos de fondo */}
          <FloatingLeaves />
          <AnimatedCircuits />

        {/* Header Visual - Fixed with scrolled appearance */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg ${
          navbarState.isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl border-2 transition-all duration-300 bg-gradient-to-br from-green-600 to-emerald-700 border-green-200/40">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold transition-colors duration-300 text-green-700">
                    Green Software
                  </h1>
                  <p className="text-sm font-medium transition-colors duration-300 text-gray-600">Desarrollo Sostenible</p>
                </div>
              </div>
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      activeSection === section.id
                        ? "bg-green-600 text-white shadow-lg transform scale-105" 
                        : "text-gray-700 hover:bg-green-500 hover:text-white hover:shadow-md hover:scale-105"
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>


              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 rounded-lg transition-all duration-300 shadow-lg bg-green-600 text-white hover:bg-green-700">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20">
          {/* Hero Section */}
          <section id="inicio" className="relative py-32 overflow-hidden min-h-screen flex items-center">
            {/* Background Image - Extendida MUCHO más para cubrir completamente el navbar */}
            <div 
              className="absolute z-0"
              style={{
                backgroundImage: `url('${IMAGES.hero}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                top: '-120px', // Extender MÁS hacia arriba
                left: '0',
                right: '0',
                bottom: '0',
                height: 'calc(100vh + 120px)', // Altura completa + extensión
                width: '100%'
              }}
            >
              {/* Overlay MUY reducido - casi sin contraste */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center bg-white/90 backdrop-blur-md text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl border border-white/30">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Tecnología Sostenible del Futuro
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight hero-title text-white drop-shadow-2xl">
                  <span className="gradient-text animate-gradient drop-shadow-lg">
                    Green Software
                  </span>
                  <br />
                  <span className="text-white drop-shadow-xl">para un Mundo Mejor</span>
                </h2>
                
                <p className="text-xl text-white/95 mb-8 leading-relaxed drop-shadow-lg font-medium">
                  Descubre cómo el desarrollo de software sostenible puede reducir el impacto ambiental 
                  mientras mejora la eficiencia. ¡El futuro de la tecnología es verde!
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <Button 
                    onClick={() => scrollToSection("calculadora")} 
                    size="lg"
                    className="btn-modern animate-glow bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl px-8 py-3 relative overflow-hidden"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calcular mi Huella de Carbono
                  </Button>
                  <Button 
                    onClick={() => scrollToSection("que-es")} 
                    variant="outline" 
                    size="lg"
                    className="bg-white/80 text-green-700 border-green-300 hover:bg-green-100 px-8 py-3 shadow-md"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Aprender Más
                  </Button>


                </div>

                {/* Stats */}
                {/* Stats */}
                <div className="rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stats-grid">
                    {/* Card 1: Degradado Verde Suave */}
                    <div className="card-modern bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-200 float-modern hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4 mx-auto animate-glow shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-800 mb-2">30%</h3>
                      <p className="text-green-700 font-medium">Reducción promedio del consumo energético</p>
                    </div>

                    {/* Card 2: Degradado Azul Suave */}
                    <div className="card-modern bg-gradient-to-br from-blue-50 to-sky-100 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-200 float-modern hover:shadow-2xl transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl mb-4 mx-auto animate-glow shadow-lg">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-800 mb-2">50+</h3>
                      <p className="text-blue-700 font-medium">Empresas adoptando prácticas sostenibles</p>
                    </div>

                    {/* Card 3: Degradado Violeta Suave */}
                    <div className="card-modern bg-gradient-to-br from-teal-50 to-cyan-100 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-teal-200 float-modern hover:shadow-2xl transition-all duration-300" style={{ animationDelay: '0.4s' }}>
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mb-4 mx-auto animate-glow shadow-lg">
                        <TreePine className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">2M+</h3>
                      <p className="text-purple-700 font-medium">Toneladas de CO₂ evitadas anualmente</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dispositivos flotantes de fondo */}
            <FloatingDevices />
          </section>

{/* Qué es Green Software */}
<section id="que-es" className="py-24 relative overflow-hidden">
  {/* Background Image with very subtle opacity */}
  <BackgroundImage
    src={IMAGES.sustainable}
    alt="Desarrollo sostenible"
    parallaxSpeed={0}
    overlay="bg-gradient-to-br from-slate-50/95 via-white/90 to-green-50/95"
    quality={60}
    className="z-0"
  />
  
  {/* Decorative elements */}
  <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] z-10"></div>
  <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-100/20 rounded-full blur-3xl z-10"></div>
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl z-10"></div>
  
  <div className="relative z-20">
    {/* --- Título y Definición (Centrados) --- */}
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <AnimatedSection animation="fadeDown" delay={200}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100/80 text-green-700 text-sm font-medium mb-6 backdrop-blur-sm">
            <Leaf className="w-4 h-4 mr-2" />
            Desarrollo Sostenible
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="scale" delay={400}>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            ¿Qué es 
            <span className="block lg:inline lg:ml-4">
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 text-transparent bg-clip-text">
                Green Software
              </span>
              <span className="text-gray-900">?</span>
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={600}>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Es el enfoque de desarrollo que prioriza la sostenibilidad, optimizando el consumo de recursos 
            y minimizando las emisiones de carbono del software para crear un futuro más verde.
          </p>
        </AnimatedSection>
      </div>
    </div>

    {/* --- Contenido Principal (Layout Mejorado) --- */}
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        
        {/* Columna Izquierda: Imagen con efectos modernos */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-2">
            <OptimizedImage
              src="/Green-Software.webp"
              alt="Green Software - Desarrollo sostenible"
              className="w-full h-[500px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
              width={600}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent rounded-2xl"></div>
          </div>
        </div>
        
        {/* Columna Derecha: Principios modernizados */}
        <div className="space-y-8">
          
          <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Battery className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  Eficiencia Energética
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Minimizar el consumo de energía en todas las operaciones del software mediante optimizaciones inteligentes.
                </p>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Trash2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                  Reducción de Residuos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Eliminar código innecesario y optimizar recursos para alargar la vida útil del hardware.
                </p>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  Impacto Global
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Considerar el efecto ambiental a escala planetaria y en toda la cadena de valor tecnológica.
                </p>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  Medición Continua
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitorear y reportar constantemente el impacto ambiental del software con métricas precisas.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
{/* Por qué Green Software */}
<section id="por-que" className="relative py-24 overflow-hidden">
  {/* Background Image with Parallax Effect */}
  <BackgroundImage
    src={IMAGES.dataCenter}
    alt="Data center sostenible"
    parallaxSpeed={0}
    overlay="bg-gradient-to-r from-red-900/80 to-slate-900/60"
    quality={75}
  />
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-6xl mx-auto">
      {/* --- Título y Subtítulo --- */}
      <AnimatedSection animation="slideUp" className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          ¿Por qué es <span className="text-red-400">Importante</span>?
        </h2>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
          El impacto ambiental de la tecnología crece de forma exponencial. El software sostenible no es una opción, es una necesidad para un futuro responsable.
        </p>
      </AnimatedSection>

      {/* --- Grilla de Datos de Impacto --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
        
        {/* Métrica 1: Emisiones TIC */}
        <AnimatedSection animation="fadeUp" delay={200}>
          <div className="p-6">
            <div className="flex justify-center items-center mx-auto w-16 h-16 mb-4 rounded-full bg-red-100">
              <Globe className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">4%</h3>
            <p className="text-gray-200">De las emisiones globales de CO₂ provienen de las TIC, el equivalente a toda la industria de la aviación.</p>
          </div>
        </AnimatedSection>

        {/* Métrica 2: Consumo de Data Centers */}
        <AnimatedSection animation="fadeUp" delay={400}>
          <div className="p-6">
            <div className="flex justify-center items-center mx-auto w-16 h-16 mb-4 rounded-full bg-orange-100">
              <Server className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">200 TWh</h3>
            <p className="text-gray-200">Es el consumo energético anual de los centros de datos a nivel mundial, y se duplica cada 4-5 años.</p>
          </div>
        </AnimatedSection>

        {/* Métrica 3: Costos de Ineficiencia */}
        <AnimatedSection animation="fadeUp" delay={600}>
          <div className="p-6">
            <div className="flex justify-center items-center mx-auto w-16 h-16 mb-4 rounded-full bg-yellow-100">
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">+40%</h3>
            <p className="text-gray-200">Es el sobrecosto operativo que puede generar el software ineficiente en energía y uso de hardware.</p>
          </div>
        </AnimatedSection>

      </div>

      {/* --- Imagen de Impacto Visual con tamaño proporcionado --- */}
      <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
        <OptimizedImage
          src={IMAGES.dataCenter}
          alt="Centro de datos consumiendo energía"
          className="w-full h-80 object-cover"
          width={800}
          height={320}
        />
      </div>

    </div>
  </div>
</section>

          {/* Para qué Green Software */}
          <section id="para-que" className="relative py-20 overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <BackgroundImage
              src={IMAGES.renewable}
              alt="Energías renovables"
              parallaxSpeed={0}
              overlay="bg-gradient-to-br from-emerald-800/70 to-green-800/50"
              quality={80}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <AnimatedSection animation="fadeDown" className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ¿Para qué implementar <span className="text-green-400">Green Software</span>?
                  </h2>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    Los beneficios van más allá del medio ambiente: eficiencia, ahorro de costos y competitividad.
                  </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className="space-y-8">
                    <AnimatedSection animation="fadeRight" delay={200}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Reducción de Costos</h3>
                          <p className="text-gray-200">
                            Software eficiente reduce costos operativos en infraestructura, energía y mantenimiento hasta en un 40%.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                    
                    <AnimatedSection animation="fadeRight" delay={400}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Mejor Rendimiento</h3>
                          <p className="text-gray-200">
                            Aplicaciones optimizadas son más rápidas, consumen menos recursos y ofrecen mejor experiencia de usuario.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                    
                    <AnimatedSection animation="fadeRight" delay={600}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Ventaja Competitiva</h3>
                          <p className="text-gray-200">
                            Las empresas sostenibles atraen más clientes, inversores y talento, posicionándose como líderes del mercado.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                    
                    <AnimatedSection animation="fadeRight" delay={800}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Cumplimiento Regulatorio</h3>
                          <p className="text-gray-200">
                            Prepararse para regulaciones ambientales futuras y cumplir estándares internacionales actuales.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                  
                  <div>
                    <OptimizedImage
                      src={IMAGES.renewable}
                      alt="Beneficios del desarrollo sostenible"
                      className="w-full h-96"
                    />
                  </div>
                </div>

                {/* ROI del Green Software */}
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border border-green-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Retorno de Inversión Típico</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">40%</div>
                          <div className="text-xs text-gray-600">Reducción</div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Costos Operativos</h4>
                      <p className="text-sm text-gray-600">Ahorro promedio en infraestructura y energía</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">25%</div>
                          <div className="text-xs text-gray-600">Mejora</div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Eficiencia</h4>
                      <p className="text-sm text-gray-600">Incremento en productividad y rendimiento</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">18</div>
                          <div className="text-xs text-gray-600">Meses</div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Payback</h4>
                      <p className="text-sm text-gray-600">Tiempo promedio de recuperación de inversión</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quién debe implementarlo */}
          <section id="quien" className="relative py-20 overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <BackgroundImage
              src={IMAGES.team}
              alt="Equipo tech colaborando"
              parallaxSpeed={0}
              overlay="bg-gradient-to-br from-blue-900/70 to-indigo-800/60"
              quality={75}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <AnimatedSection animation="fadeUp" className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ¿<span className="text-blue-400">Quién</span> debe implementar Green Software?
                  </h2>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    Desde desarrolladores hasta CTOs, todos tienen un papel en la sostenibilidad tecnológica.
                  </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  <AnimatedSection animation="fadeUp" delay={200}>
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Code className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-center text-blue-800">Desarrolladores</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-blue-700 mb-4">
                        Implementan código eficiente, algoritmos optimizados y arquitecturas sostenibles.
                      </p>
                      <div className="text-sm text-blue-600 space-y-1">
                        <div>• Optimización de código</div>
                        <div>• Algoritmos eficientes</div>
                        <div>• Testing de performance</div>
                      </div>
                    </CardContent>
                    </Card>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeUp" delay={400}>
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <User className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-center text-purple-800">DevOps Engineers</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-purple-700 mb-4">
                        Optimizan infraestructura, automatizan procesos y monitoran el consumo energético.
                      </p>
                      <div className="text-sm text-purple-600 space-y-1">
                        <div>• Infraestructura eficiente</div>
                        <div>• Automatización verde</div>
                        <div>• Monitoreo energético</div>
                      </div>
                    </CardContent>
                    </Card>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeUp" delay={600}>
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Crown className="h-8 w-8 text-green-600" />
                      </div>
                      <CardTitle className="text-center text-green-800">CTOs & Líderes Tech</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-green-700 mb-4">
                        Definen estrategias, establecen métricas y lideran la transformación sostenible.
                      </p>
                      <div className="text-sm text-green-600 space-y-1">
                        <div>• Estrategia sostenible</div>
                        <div>• Métricas ambientales</div>
                        <div>• Cultura verde</div>
                      </div>
                    </CardContent>
                    </Card>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeUp" delay={800}>
                    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Building className="h-8 w-8 text-orange-600" />
                      </div>
                      <CardTitle className="text-center text-orange-800">Empresas</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-orange-700 mb-4">
                        Adoptan políticas sostenibles, invierten en tecnología verde y reportan su impacto.
                      </p>
                      <div className="text-sm text-orange-600 space-y-1">
                        <div>• Políticas verdes</div>
                        <div>• Inversión sostenible</div>
                        <div>• Reporte de impacto</div>
                      </div>
                    </CardContent>
                    </Card>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeUp" delay={1000}>
                    <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="h-8 w-8 text-teal-600" />
                      </div>
                      <CardTitle className="text-center text-teal-800">Universidades</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-teal-700 mb-4">
                        Integran sostenibilidad en currículos y forman la próxima generación de desarrolladores verdes.
                      </p>
                      <div className="text-sm text-teal-600 space-y-1">
                        <div>• Currículo sostenible</div>
                        <div>• Investigación verde</div>
                        <div>• Formación consciente</div>
                      </div>
                    </CardContent>
                    </Card>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeUp" delay={1200}>
                    <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Landmark className="h-8 w-8 text-yellow-600" />
                      </div>
                      <CardTitle className="text-center text-yellow-800">Sector Público</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-yellow-700 mb-4">
                        Crean regulaciones, incentivan prácticas sostenibles y lideran con el ejemplo.
                      </p>
                      <div className="text-sm text-yellow-600 space-y-1">
                        <div>• Regulaciones verdes</div>
                        <div>• Incentivos fiscales</div>
                        <div>• Liderazgo público</div>
                      </div>
                    </CardContent>
                    </Card>
                  </AnimatedSection>
                </div>

                <div className="text-center">
                  <OptimizedImage
                    src={IMAGES.team}
                    alt="Equipo diverso trabajando en sostenibilidad"
                    className="w-full h-64 mx-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Cuándo implementar */}
          <section id="cuando" className="relative py-20 overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <BackgroundImage
              src={IMAGES.circuit}
              alt="Circuitos y tecnología del futuro"
              parallaxSpeed={0}
              overlay="bg-gradient-to-br from-blue-900/70 to-indigo-800/60"
              quality={75}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ¿<span className="text-blue-400">Cuándo</span> implementar Green Software?
                  </h2>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    El momento perfecto es AHORA. Cada día cuenta en la lucha contra el cambio climático.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <OptimizedImage
                      src={IMAGES.circuit}
                      alt="Circuitos y tecnología del futuro"
                      className="w-full h-80"
                    />
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Rocket className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Nuevos Proyectos</h3>
                      </div>
                      <p className="text-gray-600">
                        Ideal para implementar desde el inicio. Diseña con sostenibilidad desde la arquitectura.
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <RefreshCw className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Refactoring Existente</h3>
                      </div>
                      <p className="text-gray-600">
                        Perfecto momento para optimizar. Identifica cuellos de botella y optimiza gradualmente.
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Ciclos de Release</h3>
                      </div>
                      <p className="text-gray-600">
                        Incorpora métricas verdes en cada release. Mejora continua es la clave del éxito.
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Crisis de Rendimiento</h3>
                      </div>
                      <p className="text-gray-600">
                        Cuando el sistema está lento o consume excesivos recursos. Optimización urgente necesaria.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline de Implementación */}
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Timeline de Implementación Recomendado</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-blue-600">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Semana 1-2</h4>
                      <p className="text-sm text-gray-600">Audit inicial y establecimiento de métricas baseline</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-green-600">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Mes 1-3</h4>
                      <p className="text-sm text-gray-600">Implementación de optimizaciones quick-wins</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-purple-600">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Mes 3-6</h4>
                      <p className="text-sm text-gray-600">Refactoring profundo y cambios arquitectónicos</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-emerald-600">4</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Mes 6+</h4>
                      <p className="text-sm text-gray-600">Monitoreo continuo y optimización iterativa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dónde implementar */}
          <section id="donde" className="relative py-20 overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <BackgroundImage
              src={IMAGES.cloud}
              alt="Representación cloud verde"
              parallaxSpeed={0}
              overlay="bg-gradient-to-br from-green-900/70 to-teal-800/60"
              quality={75}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ¿<span className="text-green-400">Dónde</span> implementar Green Software?
                  </h2>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    Desde el código hasta la infraestructura, cada capa de tu stack tecnológico puede ser optimizada.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Code className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Frontend & UI</h3>
                          <p className="text-gray-600">Optimización de JavaScript, CSS, imágenes y lazy loading.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Server className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Backend & APIs</h3>
                          <p className="text-gray-600">Algoritmos eficientes, caching inteligente y optimización de queries.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <HardDrive className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Base de Datos</h3>
                          <p className="text-gray-600">Indexación optimizada, queries eficientes y gestión de datos.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Cloud className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Cloud & DevOps</h3>
                          <p className="text-gray-600">Auto-scaling, contenedores eficientes y gestión de recursos.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Apps Móviles</h3>
                          <p className="text-gray-600">Optimización de batería, uso eficiente de datos y rendimiento.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <OptimizedImage
                      src={IMAGES.cloud}
                      alt="Arquitectura cloud sostenible"
                      className="w-full h-96"
                    />
                  </div>
                </div>

                {/* Stack Technology Diagram */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Stack Tecnológico Verde</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MousePointer className="h-10 w-10 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Frontend Layer</h4>
                      <p className="text-sm text-gray-600">React, Vue, Angular optimizados con bundle size mínimo</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Settings className="h-10 w-10 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Backend Layer</h4>
                      <p className="text-sm text-gray-600">Node.js, Python, Go con arquitecturas eficientes</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Cloud className="h-10 w-10 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Infrastructure Layer</h4>
                      <p className="text-sm text-gray-600">AWS, Azure, GCP con recursos optimizados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cómo implementar */}
          <section id="como" className="relative py-20 overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <BackgroundImage
              src={IMAGES.coding}
              alt="Desarrollador trabajando en código sostenible"
              parallaxSpeed={0}
              overlay="bg-gradient-to-br from-purple-900/70 to-indigo-900/60"
              quality={80}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ¿<span className="text-purple-400">Cómo</span> implementar Green Software?
                  </h2>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    Metodología práctica paso a paso para transformar tu desarrollo en sostenible.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <OptimizedImage
                      src={IMAGES.coding}
                      alt="Desarrollador trabajando en código sostenible"
                      className="w-full h-80"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Audit & Benchmark</h3>
                        <p className="text-gray-200">Mide el consumo actual de recursos y establece métricas baseline.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Identify Hotspots</h3>
                        <p className="text-gray-200">Encuentra los componentes que más recursos consumen en tu aplicación.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Optimize Code</h3>
                        <p className="text-gray-200">Refactoriza algoritmos, elimina código muerto y optimiza queries.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Infrastructure Tuning</h3>
                        <p className="text-gray-200">Configura auto-scaling, usa contenedores eficientes y CDNs optimizados.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                        5
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Monitor & Iterate</h3>
                        <p className="text-gray-200">Implementa métricas continuas y mejora iterativamente.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Methodologies */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <TestTube className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-blue-800">TDD Verde</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-700">
                        Test-Driven Development enfocado en eficiencia. Escribe tests que validen performance y consumo.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <RefreshCw className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-green-800">CI/CD Sostenible</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-700">
                        Pipeline que incluye métricas ambientales, tests de performance y optimización automática.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Award className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-purple-800">Métricas SCI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-700">
                        Software Carbon Intensity: mide gramos de CO₂ equivalente por unidad funcional.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Best Practices */}
                <div className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Best Practices Fundamentales</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-blue-600" />
                        Desarrollo
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Algoritmos O(n) en lugar de O(n²)</li>
                        <li>• Lazy loading y code splitting</li>
                        <li>• Minimización de DOM manipulations</li>
                        <li>• Caching inteligente</li>
                        <li>• Compresión de assets</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-green-600" />
                        Infraestructura
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Auto-scaling basado en demanda</li>
                        <li>• Contenedores optimizados</li>
                        <li>• CDN para contenido estático</li>
                        <li>• Bases de datos eficientes</li>
                        <li>• Monitoreo de recursos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Con qué herramientas */}
          <section id="con-que" className="relative py-20 overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <BackgroundImage
              src={IMAGES.innovation}
              alt="Interfaz moderna con íconos verdes"
              parallaxSpeed={0}
              overlay="bg-gradient-to-br from-purple-900/70 to-pink-900/60"
              quality={75}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ¿<span className="text-purple-400">Con qué</span> herramientas implementar?
                  </h2>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    Ecosistema completo de herramientas para medir, optimizar y monitorear tu Green Software.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {/* Herramientas de Medición */}
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-blue-800">Medición</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-blue-700">
                        <li>• Green Software Foundation SCI</li>
                        <li>• Carbon Tracker</li>
                        <li>• Lighthouse CI</li>
                        <li>• WebPageTest</li>
                        <li>• CodeCarbon</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Herramientas de Optimización */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-green-800">Optimización</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-green-700">
                        <li>• Webpack Bundle Analyzer</li>
                        <li>• Next.js Bundle Analyzer</li>
                        <li>• ImageOptim</li>
                        <li>• ESLint Performance Rules</li>
                        <li>• Critical CSS</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Herramientas de Monitoreo */}
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Activity className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-purple-800">Monitoreo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-purple-700">
                        <li>• Datadog</li>
                        <li>• New Relic</li>
                        <li>• Grafana</li>
                        <li>• Prometheus</li>
                        <li>• CloudWatch</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Frameworks Verdes */}
                  <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                        <Code2 className="h-6 w-6 text-teal-600" />
                      </div>
                      <CardTitle className="text-teal-800">Frameworks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-teal-700">
                        <li>• Svelte (bundle pequeño)</li>
                        <li>• Next.js (optimizaciones)</li>
                        <li>• Astro (static-first)</li>
                        <li>• Solid.js (eficiente)</li>
                        <li>• Remix (full-stack)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Lenguajes Eficientes */}
                  <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <Wrench className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-orange-800">Lenguajes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-orange-700">
                        <li>• Rust (máxima eficiencia)</li>
                        <li>• Go (concurrencia)</li>
                        <li>• TypeScript (optimizaciones)</li>
                        <li>• WebAssembly (performance)</li>
                        <li>• Python (con Cython)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Cloud Sostenible */}
                  <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                        <Cloud className="h-6 w-6 text-yellow-600" />
                      </div>
                      <CardTitle className="text-yellow-800">Cloud Verde</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-yellow-700">
                        <li>• Google Cloud (100% renovable)</li>
                        <li>• AWS Graviton processors</li>
                        <li>• Azure Carbon Reduction</li>
                        <li>• Vercel Edge Functions</li>
                        <li>• Cloudflare Workers</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <OptimizedImage
                    src={IMAGES.innovation}
                    alt="Herramientas de desarrollo sostenible"
                    className="w-full h-64 mx-auto"
                  />
                </div>
              </div>
            </div>
          </section>


          {/* Calculadora de Huella de Carbono */}
          <section id="calculadora" className="relative py-20 overflow-hidden border-y border-white/30">
            {/* Background Image with Parallax Effect */}
            <BackgroundImage
              src={IMAGES.calculator}
              alt="Cálculo energético en tablet"
              parallaxSpeed={0}
              overlay="bg-gradient-to-br from-green-900/70 to-emerald-800/60"
              quality={80}
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    <span className="text-green-400">Calculadora</span> de Huella de Carbono
                  </h2>
                  <p className="text-xl text-gray-200">
                    Descubre el impacto ambiental de tu aplicación y obtén recomendaciones personalizadas.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                  <div>
                    <OptimizedImage
                      src={IMAGES.calculator}
                      alt="Calculadora de carbono digital"
                      className="w-full h-80"
                    />
                  </div>

                  <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calculator className="h-6 w-6 text-green-600" />
                        <span>Parámetros de tu Aplicación</span>
                      </CardTitle>
                      <CardDescription>
                        Ingresa los datos de tu aplicación para calcular su huella de carbono.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <Label className="text-base font-medium flex items-center space-x-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span>Usuarios Activos Diarios</span>
                          </Label>
                          <div className="space-y-2">
                            <Slider
                              value={carbonFootprint.users}
                              onValueChange={(value) =>
                                setCarbonFootprint((prev) => ({ ...prev, users: value }))
                              }
                              max={100000}
                              min={100}
                              step={100}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>100</span>
                              <div className="text-center text-lg font-semibold text-blue-600">
                                {formatNumber(carbonFootprint.users[0])}
                              </div>
                              <span>100k</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-medium flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-purple-600" />
                            <span>Sesiones por Usuario</span>
                          </Label>
                          <div className="space-y-2">
                            <Slider
                              value={carbonFootprint.sessions}
                              onValueChange={(value) =>
                                setCarbonFootprint((prev) => ({ ...prev, sessions: value }))
                              }
                              max={20}
                              min={1}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>1</span>
                              <div className="text-center text-lg font-semibold text-purple-600">
                                {carbonFootprint.sessions[0]}
                              </div>
                              <span>20</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-medium flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-orange-600" />
                            <span>Datos Transferidos por Sesión (MB)</span>
                          </Label>
                          <div className="space-y-2">
                            <Slider
                              value={carbonFootprint.dataTransfer}
                              onValueChange={(value) =>
                                setCarbonFootprint((prev) => ({ ...prev, dataTransfer: value }))
                              }
                              max={2000}
                              min={10}
                              step={10}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>10 MB</span>
                              <div className="text-center text-lg font-semibold text-orange-600">
                                {carbonFootprint.dataTransfer[0]} MB
                              </div>
                              <span>2 GB</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <Button
                          onClick={calculateCarbonFootprint}
                          disabled={isCalculating}
                          size="lg"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 w-full"
                        >
                          {isCalculating ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Calculando impacto ambiental...
                            </>
                          ) : (
                            <>
                              <Calculator className="h-5 w-5 mr-2" />
                              Calcular Huella de Carbono
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {carbonResult && (
                  <div className="mt-8 p-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border border-green-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                      <Award className="h-6 w-6 mr-2 text-green-600" />
                      Resultados del Análisis Ambiental
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-blue-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {carbonResult.dailyCO2.toFixed(2)} kg
                        </div>
                        <p className="text-sm text-gray-600">CO₂ Emisiones Diarias</p>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-green-100">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Globe className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {carbonResult.annualCO2.toFixed(2)} t
                        </div>
                        <p className="text-sm text-gray-600">CO₂ Emisiones Anuales</p>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-emerald-100">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <TreePine className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                          {carbonResult.treesEquivalent}
                        </div>
                        <p className="text-sm text-gray-600">Árboles Equivalentes</p>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-yellow-100">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Zap className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-600 mb-1">
                          {carbonResult.totalEnergy.toFixed(1)} kWh
                        </div>
                        <p className="text-sm text-gray-600">Energía Diaria Consumida</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-green-600" />
                        Análisis e Impacto
                      </h4>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          <strong>Tu aplicación genera</strong> el equivalente a <strong className="text-green-600">{carbonResult.treesEquivalent} árboles</strong> 
                          de CO₂ anualmente. Esto representa <strong className="text-blue-600">{carbonResult.annualCO2.toFixed(1)} toneladas</strong> de emisiones.
                        </p>
                        <p>
                          Con <strong className="text-purple-600">{formatNumber(carbonFootprint.users[0])} usuarios</strong> realizando 
                          <strong className="text-orange-600"> {carbonFootprint.sessions[0]} sesiones</strong> diarias, 
                          tu aplicación consume <strong className="text-yellow-600">{carbonResult.totalEnergy.toFixed(1)} kWh</strong> de energía diariamente.
                        </p>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <p className="text-green-800 font-medium">
                            💡 <strong>Oportunidad:</strong> Optimizar tu código puede reducir este impacto hasta en un 40%. 
                            ¡Cada línea de código eficiente cuenta para nuestro planeta!
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => scrollToSection("cumpliendo")}
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                        >
                          <CheckSquare className="h-4 w-4 mr-2" />
                          Ver Recomendaciones Personalizadas
                        </Button>
                        <Button
                          onClick={() => scrollToSection("como")}
                          variant="outline"
                          className="border-green-600 text-green-700 hover:bg-green-50 flex-1"
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Aprender Cómo Optimizar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-green-900/95 to-emerald-900/95 backdrop-blur-xl text-white py-12 border-t border-white/20">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Mission (Izquierda) */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Green Software</h3>
              <p className="text-green-300">Desarrollo Sostenible</p>
            </div>
          </div>
          <p className="text-green-100 max-w-md">
            Promoviendo un futuro tecnológico más verde a través de la optimización y la conciencia ambiental.
          </p>
        </div>

        {/* Links & Copyright (Derecha) */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-green-300 hover:text-white hover:bg-white/10"
              onClick={() => window.open('https://greensoftware.foundation', '_blank')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Documentación
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-300 hover:text-white hover:bg-white/10"
              onClick={() => window.open('https://github.com/Green-Software-Foundation', '_blank')}
            >
              <Code className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
          <p className="text-sm text-white/70">
            © 2025 Green Software Foundation. Por un Impacto Global Positivo.
          </p>
        </div>
        
      </div>
    </div>
  </div>
</footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow-xl transition-all duration-200 hover:scale-110 z-50 flex items-center justify-center"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        )}

        {/* Floating Action Button for Quick Actions */}
        <div className="fixed bottom-8 left-8 z-50">
          <div className="flex flex-col space-y-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => scrollToSection("calculadora")}
                  size="icon"
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
                >
                  <Calculator className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Calculadora de Carbono</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => scrollToSection("cumpliendo")}
                  size="icon"
                  className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg"
                >
                  <CheckSquare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Evaluación Verde</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        </div>

        {/* Estilos CSS adicionales */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes leaf-fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.4); }
          }

          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-leaf-fall {
            animation: leaf-fall linear infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }

          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient-shift 4s ease infinite;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar with modern design */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #10b981, #059669);
            border-radius: 4px;
            box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.3);
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #059669, #047857);
          }


          /* Background effects */
          .forest-background {
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          /* Enhanced glass morphism effects */
          .glass {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          .glass-dark {
            background: rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }

          /* Section overlays for better readability */
          .section-overlay {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }


          /* Progress bar animations */
          .progress-bar {
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
            background-size: 200% 100%;
            animation: gradient-shift 3s ease infinite;
          }

          /* Enhanced button hover effects */
          .btn-modern {
            background: linear-gradient(135deg, #10b981, #059669);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .btn-modern::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
          }

          .btn-modern:hover::before {
            left: 100%;
          }

          .btn-modern:hover {
            background: linear-gradient(135deg, #059669, #047857);
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4), 0 5px 15px rgba(16, 185, 129, 0.2);
          }

            /* Card hover effects with depth */
            .card-modern {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              /* background: rgba(255, 255, 255, 0.95); YA NO ESTÁ */
              /* backdrop-filter: blur(10px);         YA NO ESTÁ */
            }

            .card-modern:hover {
              transform: translateY(-8px) rotateX(5deg);
              box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.15),
                0 15px 35px rgba(0, 0, 0, 0.1),
                0 5px 15px rgba(0, 0, 0, 0.05);
            }

          /* Text shadows for better readability over images */
          .drop-shadow-xl {
            filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.7));
          }

          .drop-shadow-2xl {
            filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.6));
          }

          .drop-shadow-lg {
            filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
          }

          /* Gradient text with animation and better contrast */
          .gradient-text {
            background: linear-gradient(135deg, #ffffff, #10b981, #3b82f6, #8b5cf6);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient-shift 4s ease infinite;
            filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
          }

          /* Pulse animations */
          .pulse-green {
            animation: pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes pulse-green {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }

          /* Modern floating animations */
          .float-modern {
            animation: float-modern 6s ease-in-out infinite;
          }

          @keyframes float-modern {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
            }
            25% { 
              transform: translateY(-10px) translateX(5px) rotate(1deg); 
            }
            50% { 
              transform: translateY(-20px) translateX(0px) rotate(0deg); 
            }
            75% { 
              transform: translateY(-10px) translateX(-5px) rotate(-1deg); 
            }
          }

          /* Responsive design improvements */
          @media (max-width: 768px) {
            .hero-title {
              font-size: 2.5rem;
              line-height: 1.2;
            }
            
            .stats-grid {
              grid-template-columns: 1fr;
            }

            .card-modern:hover {
              transform: translateY(-4px);
            }

            /* Fix background on mobile */
            .forest-background {
              background-attachment: scroll;
            }
          }

          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            ::-webkit-scrollbar-track {
              background: linear-gradient(to bottom, #1f2937, #111827);
            }
            
            .section-overlay {
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(15px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
          }
        `}</style>
      </div>
    </TooltipProvider>
  )
}
