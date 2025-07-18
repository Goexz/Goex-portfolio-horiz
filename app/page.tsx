"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Code, Database, Wrench, Sparkles, Award, Github } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, easeInOut } from "framer-motion"
import { useRef } from "react"

const skillCategories = [
  {
    title: "Blockchain & Web3",
    icon: <Sparkles className="w-4 h-4" />,
    average: 58,
    certifications: 0,
    skills: [
      { name: "Solidity", level: "Beginner", percentage: 55 },
      { name: "Layer 1/2 Protocols", level: "Beginner", percentage: 50 },
      { name: "Vyper", level: "Advanced", percentage: 70 },
    ],
  },
  {
    title: "Frontend Development",
    icon: <Code className="w-4 h-4" />,
    average: 76,
    certifications: 2,
    skills: [
      { name: "React", level: "Intermediate", percentage: 65 },
      { name: "JavaScript", level: "Intermediate", percentage: 60 },
      { name: "HTML", level: "Expert", percentage: 95 },
    ],
  },
  {
    title: "Backend Development",
    icon: <Database className="w-4 h-4" />,
    average: 69,
    certifications: 1,
    skills: [
      { name: "Firebase", level: "Advanced", percentage: 80 },
      { name: "PHP", level: "Intermediate", percentage: 60 },
      { name: "MySQL", level: "Advanced", percentage: 80 },
    ],
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="w-4 h-4" />,
    average: 68,
    certifications: 2,
    skills: [
      { name: "G-Developer", level: "Advanced", percentage: 75 },
      { name: "Construct 2", level: "Intermediate", percentage: 65 },
      { name: "Photoshop", level: "Intermediate", percentage: 65 },
    ],
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-gradient-to-r from-pink-500 to-rose-500"
    case "Advanced":
      return "bg-gradient-to-r from-purple-500 to-violet-500"
    case "Intermediate":
      return "bg-gradient-to-r from-orange-500 to-amber-500"
    case "Beginner":
      return "bg-gradient-to-r from-green-500 to-emerald-500"
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-500"
  }
}

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-pink-100 text-pink-800 border-pink-200"
    case "Advanced":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Intermediate":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Beginner":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  const sections = ["hero", "skills", "stats", "footer"]
  const totalSections = sections.length

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Prevent multiple rapid scrolls
      if (isScrollingRef.current) return
      isScrollingRef.current = true

      if (e.deltaY > 0) {
        // Scroll down - move to next section
        setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1))
      } else {
        // Scroll up - move to previous section
        setCurrentSection((prev) => Math.max(prev - 1, 0))
      }

      // Reset scroll lock after animation
      setTimeout(() => {
        isScrollingRef.current = false
      }, 800)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        isScrollingRef.current = true
        setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1))
        setTimeout(() => {
          isScrollingRef.current = false
        }, 800)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        isScrollingRef.current = true
        setCurrentSection((prev) => Math.max(prev - 1, 0))
        setTimeout(() => {
          isScrollingRef.current = false
        }, 800)
      }
    }

    // Touch handling for mobile
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY

      // Determine if it's a horizontal or vertical swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > 50) {
          isScrollingRef.current = true
          if (deltaX > 0) {
            // Swipe right - go to previous section
            setCurrentSection((prev) => Math.max(prev - 1, 0))
          } else {
            // Swipe left - go to next section
            setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1))
          }
          setTimeout(() => {
            isScrollingRef.current = false
          }, 800)
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > 50) {
          isScrollingRef.current = true
          if (deltaY > 0) {
            // Swipe down - go to previous section
            setCurrentSection((prev) => Math.max(prev - 1, 0))
          } else {
            // Swipe up - go to next section
            setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1))
          }
          setTimeout(() => {
            isScrollingRef.current = false
          }, 800)
        }
      }
    }

    // Add event listeners to document
    document.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("wheel", handleWheel)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [totalSections])

  // Cute animation variants
  const floatVariants = {
    animate: {
      y: [-15, 15, -15],
      x: [-5, 5, -5],
    },
  }
  const bounceVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: easeInOut,
      },
    },
  }
  
  // ...existing code...

  const wiggleVariants = {
    animate: {
      rotate: [-3, 3, -3],
    },
  }

  const sparkleVariants = {
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
    },
  }

  const heartbeatVariants = {
    animate: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: easeInOut,
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeInOut,
        type: "spring" as const,
        bounce: 0.4,
      },
    },
  }

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeInOut,
        type: "spring" as const,
        bounce: 0.4,
      },
    },
  }

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeInOut,
        type: "spring" as const,
        bounce: 0.4,
      },
    },
  }

  const skillCardVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut,
        type: "spring" as const,
        bounce: 0.6,
      },
    },
  }

  const progressVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: easeInOut,
        delay: 0.5,
      },
    }),
  }

  if (!mounted) return null

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      {/* Fixed Floating Decorative Elements - Hidden on mobile */}
      <motion.div
        className="fixed top-4 left-4 md:top-10 md:left-10 text-pink-300 text-lg md:text-2xl z-10 hidden sm:block"
        variants={floatVariants}
        animate="animate"
        initial="animate"
      >
        🌸
      </motion.div>
      <motion.div
        className="fixed top-8 right-8 md:top-20 md:right-20 text-purple-300 text-base md:text-xl z-10 hidden sm:block"
        variants={sparkleVariants}
        animate="animate"
        transition={{ type: "keyframes", duration: 2, repeat: Number.POSITIVE_INFINITY, ease: easeInOut }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="fixed bottom-8 left-8 md:bottom-20 md:left-20 text-orange-300 text-xl md:text-3xl z-10 hidden sm:block"
        variants={bounceVariants}
        animate="animate"
        transition={{ type: "keyframes", duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: easeInOut }}
      >
        🎨
      </motion.div>
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-10 md:right-10 text-pink-300 text-lg md:text-2xl z-10 hidden sm:block"
        variants={wiggleVariants}
        animate="animate"
        initial="animate"
      >
        💖
      </motion.div>

      {/* Additional fixed floating elements - Hidden on mobile */}
      <motion.div
        className="fixed top-1/2 left-2 md:left-5 text-purple-300 text-sm md:text-lg z-10 hidden md:block"
        animate={{
          rotate: [0, 360],
          scale: [0.8, 1.2, 0.8],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: easeInOut,
        }}
      >
        🚀
      </motion.div>
      <motion.div
        className="fixed top-1/3 right-2 md:right-5 text-orange-300 text-sm md:text-lg z-10 hidden md:block"
        animate={{
          x: [-15, 15, -15],
          rotate: [0, -360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: easeInOut,
        }}
      >
        💡
      </motion.div>

      {/* Section Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrollingRef.current) {
                isScrollingRef.current = true
                setCurrentSection(index)
                setTimeout(() => {
                  isScrollingRef.current = false
                }, 800)
              }
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          />
        ))}
      </div>

      {/* Main Container with Horizontal Scroll */}
      <motion.div
        className="flex h-full"
        animate={{ x: -currentSection * 100 + "vw" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.8,
        }}
        style={{ width: `${totalSections * 100}vw` }}
      >
        {/* Hero Section */}
        <section className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Additional floating elements for more loop animations - Hidden on mobile */}
          <motion.div
            className="absolute top-32 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-40 hidden sm:block"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: easeInOut,
            }}
          />
          <motion.div
            className="absolute bottom-32 right-1/4 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-50 hidden sm:block"
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: easeInOut,
            }}
          />

          <motion.div
            className="relative max-w-6xl mx-auto h-full flex items-center px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate={currentSection === 0 ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
              {/* Left side - Text content */}
              <motion.div className="text-center lg:text-left order-2 lg:order-1" variants={slideInFromLeft}>
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-4 md:mb-6"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  Hi, I'm ReWest! 👋
                </motion.h1>

                <motion.div className="space-y-3 md:space-y-4 mb-6 md:mb-8" variants={itemVariants}>
                  <p className="text-lg md:text-xl text-gray-700 font-medium">
                    Full-Stack Developer & Blockchain Enthusiast
                  </p>
                  <p className=" text-xs md:text-md text-gray-600 leading-relaxed">
                    Driven by a passion for innovation, I expanded my skillset beyond web development and began focusing on blockchain technology. I have studied platforms like Ethereum and Hathor, as well as smart contract development and related decentralized technologies. This shift represents my commitment to evolving as a developer and embracing cutting-edge solutions in the tech landscape.
                  </p>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                    🚀 Currently exploring Web3 technologies and smart contract development
                    <br />💡 Building secure and decentralized experiences
                    <br />🎨 smart contracts, blockchain protocols
                    <br />✨ Web3 technologies. Passionate about transparency, clean architecture, and pushing the boundaries of innovation.
                  </p>
                </motion.div>

                <motion.div className="flex justify-center lg:justify-start" variants={itemVariants}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, 1, -1, 0] }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "keyframes", stiffness: 400, damping: 17 }}
                  >
                     <a
                      href="https://github.com/Goexz"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outline"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50 px-6 md:px-8 py-3 md:py-4 rounded-full bg-transparent text-base md:text-lg font-medium"
                      >
                        <Github className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        View My Work
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right side - Profile photo and decorative elements */}
              <motion.div
                className="relative flex justify-center lg:justify-end order-1 lg:order-2"
                variants={slideInFromRight}
              >
                <div className="relative">
                  {/* Modern gradient border effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 rounded-3xl blur-sm opacity-75"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: easeInOut,
                    }}
                  />

                  {/* Secondary gradient border */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 rounded-3xl blur-md opacity-50"
                    animate={{
                      rotate: [360, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  {/* Outer glow effect */}
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-orange-200 rounded-3xl blur-xl opacity-30"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: easeInOut,
                    }}
                  />

                  {/* Profile photo */}
                  <motion.div
                    className="relative w-60 h-72 md:w-80 md:h-96 rounded-3xl bg-gradient-to-br from-pink-100 to-purple-100 border-4 md:border-6 border-white shadow-2xl overflow-hidden z-10"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      y: [-5, 5, -5],
                    }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <img
                      src="/placeholder.svg?height=400&width=320"
                      alt="Alex - Full Stack Developer"
                      className="w-full h-full object-cover"
                    />

                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
                  </motion.div>

                  {/* Floating particles around the photo - Hidden on mobile */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full hidden md:block"
                      style={{
                        top: `${30 + Math.sin((i * 60 * Math.PI) / 180) * 140}px`,
                        left: `${30 + Math.cos((i * 60 * Math.PI) / 180) * 140}px`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-purple-50 via-orange-50 to-pink-50 relative overflow-hidden">
          <div className="w-full h-full flex flex-col justify-center px-4 md:px-6 py-4 md:py-6">
            <motion.div
              className="text-center mb-4 md:mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={currentSection === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3"
                whileHover={{ scale: 1.05, color: "#ec4899" }}
              >
                My Skills & Expertise
              </motion.h2>
              <p className="text-gray-600 text-sm md:text-base">Here's what I bring to the table</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto w-full px-2 md:px-0"
              variants={containerVariants}
              initial="hidden"
              animate={currentSection === 1 ? "visible" : "hidden"}
            >
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={skillCardVariants}
                  whileHover={{
                     scale: 1.02,
                     rotate: [0, 1],
                     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                  <Card className="group border-0 bg-white/80 backdrop-blur-sm h-auto">
                    <CardHeader className="pb-1 md:pb-2 px-3 md:px-4 pt-2 md:pt-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-1.5 md:gap-2 text-sm md:text-lg">
                          <motion.div
                            className="p-1 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100"
                            whileHover={{
                              rotate: 360,
                              scale: 1.2,
                              background: "linear-gradient(45deg, #fce7f3, #e0e7ff)",
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            {category.icon}
                          </motion.div>
                          <motion.span whileHover={{ color: "#8b5cf6" }} className="text-sm md:text-base font-medium">
                            {category.title}
                          </motion.span>
                        </CardTitle>
                        <div className="flex items-center gap-1 md:gap-2">
                          {category.certifications > 0 && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={currentSection === 1 ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                              transition={{
                                delay: 0.5 + categoryIndex * 0.1,
                                duration: 0.6,
                                type: "spring",
                                bounce: 0.6,
                              }}
                              whileHover={{ scale: 1.1, rotate: [0, -10] }}
                            >
                              <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-orange-200 text-xs px-1.5 py-0.5">
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                  <Award className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                </motion.div>
                                {category.certifications}
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-600">Overall</span>
                            <motion.span
                              className="text-xs font-bold text-gray-800"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={currentSection === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                              transition={{ delay: 1 + categoryIndex * 0.1, type: "spring", bounce: 0.6 }}
                            >
                              {category.average}%
                            </motion.span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <motion.div
                              className="h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                              variants={progressVariants}
                              initial="hidden"
                              animate={currentSection === 1 ? "visible" : "hidden"}
                              custom={category.average}
                              whileHover={{ scale: 1.05 }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-1 md:space-y-2 px-3 md:px-4 pb-2 md:pb-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          className="group/skill"
                          initial={{ opacity: 0, x: -50, scale: 0.8 }}
                          animate={
                            currentSection === 1 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.8 }
                          }
                          transition={{
                            delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.1,
                            type: "spring",
                            bounce: 0.4,
                          }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="flex justify-between items-center mb-0.5">
                            <div className="flex items-center gap-1 flex-1 min-w-0">
                              <motion.span
                                className="font-medium text-gray-800 text-xs md:text-sm truncate"
                                whileHover={{ color: "#8b5cf6" }}
                              >
                                {skill.name}
                              </motion.span>
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={currentSection === 1 ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                transition={{
                                  delay: 1 + categoryIndex * 0.1 + skillIndex * 0.05,
                                  type: "spring",
                                  bounce: 0.6,
                                }}
                                whileHover={{ scale: 1.1, rotate: [0, -5] }}
                              >
                                <Badge className={`text-xs px-1 py-0 ${getLevelBadgeColor(skill.level)}`}>
                                  {skill.level}
                                </Badge>
                              </motion.div>
                            </div>
                            <motion.span
                              className="text-xs font-semibold text-gray-600 ml-1"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={currentSection === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                              transition={{
                                delay: 1.2 + categoryIndex * 0.1 + skillIndex * 0.05,
                                type: "spring",
                                bounce: 0.6,
                              }}
                            >
                              {skill.percentage}%
                            </motion.span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <motion.div
                              className={`h-1 rounded-full ${getLevelColor(skill.level)}`}
                              variants={progressVariants}
                              initial="hidden"
                              animate={currentSection === 1 ? "visible" : "hidden"}
                              custom={skill.percentage}
                              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
          <div className="max-w-4xl mx-auto h-full flex items-center px-4 md:px-6">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center w-full"
              variants={containerVariants}
              initial="hidden"
              animate={currentSection === 2 ? "visible" : "hidden"}
            >
              {[
                { value: "5+", label: "Certifications", color: "text-pink-600", emoji: "🏆" },
                { value: "15+", label: "Technologies", color: "text-purple-600", emoji: "⚡" },
                { value: "68%", label: "Avg Proficiency", color: "text-orange-600", emoji: "📊" },
                { value: "4", label: "Skill Categories", color: "text-rose-600", emoji: "🎯" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5],
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div className="text-2xl md:text-4xl mb-1 md:mb-2" variants={bounceVariants} animate="animate">
                    {stat.emoji}
                  </motion.div>
                  <motion.div
                    className={`text-xl md:text-3xl font-bold ${stat.color} mb-1 md:mb-2`}
                    initial={{ scale: 0 }}
                    animate={currentSection === 2 ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.6,
                      type: "spring",
                      bounce: 0.6,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 relative overflow-hidden">
          <div className="max-w-2xl mx-auto h-full flex items-center px-4 md:px-6">
            <motion.div
              className="text-center w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={currentSection === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <motion.h3
                className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4"
                whileHover={{ scale: 1.05, color: "#ec4899" }}
              >
                Goex
              </motion.h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Contact me to discuss your next project or collaboration.
              </p>
              <motion.div
                className="flex justify-center gap-3 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate={currentSection === 3 ? "visible" : "hidden"}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.3,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                  whileTap={{ scale: 0.8 }}
                >
                  <a
                      href="https://github.com/Goexz"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-pink-200 hover:bg-pink-50 bg-transparent w-12 h-12 md:w-14 md:h-14"
                  >
                    <Github href="https://github.com/Goexz" className="w-5 h-5 md:w-6 md:h-6" />
                  </Button></a>
                </motion.div>
              </motion.div>
              <motion.div
                className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={currentSection === 3 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="text-gray-500 text-xs md:text-sm flex items-center justify-center gap-1">
                  <span>© {new Date().getFullYear()} ReWest. All rights reserved.</span>
                  <span className="hidden md:inline">|</span>
                  <span className="hidden md:inline">Goex</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
