"use client"

import { useState, useEffect, useRef } from "react"
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

// Componente de imagen optimizada con lazy loading
const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width = 400, 
  height = 300,
  priority = false 
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`transition-all duration-700 ${
            isLoading ? 'scale-110 blur-md opacity-0' : 'scale-100 blur-0 opacity-100'
          } object-cover w-full h-full hover:scale-105`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true)
            setIsLoading(false)
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <TreePine className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Green Tech Visual</p>
          </div>
        </div>
      )}
      
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 animate-pulse flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
    </div>
  )
}

// URLs de imágenes gratuitas (Pixabay/Pexels) relacionadas con Green Software
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
  greenTech: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
  coding: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  renewable: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  circuit: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  calculator: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
}