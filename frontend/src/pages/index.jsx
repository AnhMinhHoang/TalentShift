"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import styles from "./Homepage/style/index.module.css"

const carouselImages = [
  {
    src: "/asset/images/first-slide.jpg",
    alt: "Creative Workspace",
    caption: "Find Your Perfect Place",
    description: "Browse through our extensive collection of job listings from top employers worldwide.",
  },
  {
    src: "/asset/images/second-slide.jpg",
    alt: "Job Opportunities",
    caption: "Thousands of Open Positions",
    description: "Colleagues working together in a modern office environment.",
  },
  {
    src: "/asset/images/third-slide.jpg",
    alt: "Productivity Focus",
    caption: "Boost Your Career Potential",
    description: "Access resources and tools designed to enhance your productivity and professional growth.",
  },
  {
    src: "/asset/images/last-slide.jpg",
    alt: "Professional Development",
    caption: "Continuous Learning Journey",
    description: "Expand your knowledge and skills with our educational resources and career development paths.",
  },
]

const faqData = [
  {
    id: "what-is",
    title: "What is TalentShift?",
    content:
      "TalentShift is an online platform designed specifically for students and freelancers to connect with employers globally. It allows you to find freelance jobs, showcase your skills, and create professional profiles that stand out in the competitive market.",
    icon: "bi-question-circle",
  },
  {
    id: "how-to-find",
    title: "How to find a job or project?",
    content:
      "You can search for freelance opportunities by using keywords or categories that match your skills and interests. Create your profile, explore various job listings, and directly apply to the ones that best fit your expertise. Our AI-powered matching system helps connect you with the right opportunities.",
    icon: "bi-search",
  },
  {
    id: "edit-profile",
    title: "Can I edit my profile after creating it?",
    content:
      "You can update your profile anytime to reflect your latest skills, experience, or portfolio. Keeping your profile up-to-date helps you stand out to potential employers and increases your chances of landing great projects.",
    icon: "bi-person-gear",
  },
  {
    id: "payment-security",
    title: "How secure are payments?",
    content:
      "We use industry-standard encryption and secure payment gateways to ensure all transactions are safe. Our escrow system protects both freelancers and employers, releasing payments only when work is completed satisfactorily.",
    icon: "bi-shield-check",
  },
  {
    id: "support",
    title: "What kind of support do you offer?",
    content:
      "We provide 24/7 customer support through live chat, email, and phone. Our dedicated support team helps with technical issues, account management, dispute resolution, and general platform guidance.",
    icon: "bi-headset",
  },
]

const FloatingElement = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants}>
      {children}
    </motion.div>
  )
}

const ParallaxElement = ({ children, speed = 0.5 }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed])

  return <motion.div style={{ y }}>{children}</motion.div>
}

const CountUpAnimation = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

function Index() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [activeFaq, setActiveFaq] = useState(0)
  const { scrollYProgress } = useScroll()

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    // Particles loaded callback
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <main className={styles.mainContainer}>
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#80d0c7", "#13547a"],
            },
            links: {
              color: "#80d0c7",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className={styles.particlesContainer}
      />

      {/* Floating Background Elements */}
      <div className={styles.floatingBg}>
        <motion.div
          className={styles.floatingShape}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className={`${styles.floatingShape} ${styles.shape2}`}
          animate={{
            x: [0, -150, 0],
            y: [0, 150, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className={`${styles.floatingShape} ${styles.shape3}`}
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Progress Bar */}
      <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} />

      {/* Hero Section with Enhanced Carousel */}
      <section className={`${styles.heroSection} position-relative overflow-hidden`} id="section_1">
        <div className={styles.carouselContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className={`${styles.carouselSlide} ${styles.active}`}
              style={{ backgroundImage: `url(${carouselImages[currentSlide].src})` }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
            >
              <div className={styles.slideOverlay}></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Carousel Controls */}
        <motion.button
          className={`${styles.carouselBtn} ${styles.prevBtn}`}
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-chevron-left"></i>
        </motion.button>
        <motion.button
          className={`${styles.carouselBtn} ${styles.nextBtn}`}
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-chevron-right"></i>
        </motion.button>

        {/* Enhanced Carousel Indicators */}
        <div className={styles.carouselIndicators}>
          {carouselImages.map((_, index) => (
            <motion.button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ""}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Parallax Hero Content */}
        <div className="container position-relative" style={{ zIndex: 10 }}>
          <div className="row min-vh-100 align-items-center">
            <div className="col-lg-8 col-12 mx-auto text-center">
              <ParallaxElement speed={0.3}>
                <motion.div
                  className={styles.heroContent}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.h1
                    className={`text-white mb-4 ${styles.heroTitle}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {carouselImages[currentSlide].caption}
                  </motion.h1>
                  <motion.p
                    className={`text-white mb-5 ${styles.heroDescription}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    {carouselImages[currentSlide].description}
                  </motion.p>
                  <motion.div
                    className={styles.heroButtons}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/jobs" className={`btn ${styles.primaryBtn} me-3`}>
                        <span>Explore Opportunities</span>
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/register" className={`btn ${styles.secondaryBtn}`}>
                        Join TalentShift
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </ParallaxElement>
            </div>
          </div>
        </div>

        {/* Floating Stats with Enhanced Animations */}
        <motion.div
          className={styles.floatingStats}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="container">
            <div className="row">
              {[
                { number: 2500, label: "Active Jobs", icon: "bi-briefcase", delay: 0 },
                { number: 1200, label: "Companies", icon: "bi-building", delay: 0.1 },
                { number: 15000, label: "Freelancers", icon: "bi-people", delay: 0.2 },
                { number: 98, label: "Success Rate", icon: "bi-graph-up", delay: 0.3, suffix: "%" },
              ].map((stat, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-6 mb-3">
                  <FloatingElement delay={stat.delay}>
                    <motion.div
                      className={styles.statCard}
                      whileHover={{
                        scale: 1.05,
                        y: -10,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className={styles.statIcon}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <i className={stat.icon}></i>
                      </motion.div>
                      <h3>
                        <CountUpAnimation end={stat.number} />
                        {stat.suffix || "+"}
                      </h3>
                      <p>{stat.label}</p>
                    </motion.div>
                  </FloatingElement>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <i className="bi bi-chevron-down"></i>
        </motion.div>
      </section>

      {/* Enhanced Featured Section */}
      <section className={`${styles.featuredSection} py-5`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 col-12 mb-4 mb-lg-0">
              <FloatingElement delay={0.2} direction="left">
                <motion.div
                  className={`${styles.featureCard} ${styles.employerCard} h-100`}
                  whileHover={{
                    scale: 1.02,
                    y: -15,
                    rotateY: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div className={styles.cardIcon} whileHover={{ scale: 1.2, rotate: 10 }}>
                    <i className="bi bi-briefcase"></i>
                  </motion.div>
                  <div className={styles.cardContent}>
                    <h5>For Employers</h5>
                    <p>
                      Hire talented freelancers from various fields. Post your job today and connect with skilled
                      professionals who can bring your vision to life.
                    </p>
                    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/post-job" className={`btn ${styles.cardBtn}`}>
                        Post Your Job
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </motion.div>
                  </div>
                  <motion.div className={styles.cardImage} whileHover={{ scale: 1.1, rotate: 5 }}>
                    <img src="/asset/images/topics/banner-home-01 (1).svg" alt="For Employers" />
                  </motion.div>
                  <div className={styles.cardGlow}></div>
                </motion.div>
              </FloatingElement>
            </div>

            <div className="col-lg-5 col-md-6 col-12 mb-4 mb-lg-0">
              <FloatingElement delay={0.4} direction="right">
                <motion.div
                  className={`${styles.featureCard} ${styles.candidateCard} h-100`}
                  whileHover={{
                    scale: 1.02,
                    y: -15,
                    rotateY: -5,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div className={styles.cardIcon} whileHover={{ scale: 1.2, rotate: -10 }}>
                    <i className="bi bi-person-check"></i>
                  </motion.div>
                  <div className={styles.cardContent}>
                    <h5>For Candidates</h5>
                    <p>
                      Showcase your skills, connect with employers, and find freelance projects that match your
                      expertise. Build your career with confidence.
                    </p>
                    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/create-profile" className={`btn ${styles.cardBtn}`}>
                        Create Profile
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </motion.div>
                  </div>
                  <motion.div className={styles.cardImage} whileHover={{ scale: 1.1, rotate: -5 }}>
                    <img src="/asset/images/topics/banner-home-02.svg" alt="For Candidates" />
                  </motion.div>
                  <div className={styles.cardGlow}></div>
                </motion.div>
              </FloatingElement>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section with Equal Height Cards */}
      <section className={`${styles.servicesSection} section-padding`} id="section_2">
        <div className="container">
          <FloatingElement delay={0.2}>
            <div className="row mb-5">
              <div className="col-12 text-center">
                <motion.h2
                  className={styles.sectionTitle}
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  Why Choose TalentShift?
                </motion.h2>
                <p className={styles.sectionSubtitle}>
                  Discover what makes us the preferred platform for freelancers and employers
                </p>
              </div>
            </div>
          </FloatingElement>

          <div className="row">
            {[
              {
                icon: "bi-shield-check",
                image: "/asset/images/topics/undraw_Remote_design_team_re_urdx.png",
                title: "Reliable Dealings",
                description:
                  "We ensure transparent and trustworthy interactions, helping you connect with the right professionals seamlessly. Our verification system guarantees quality.",
                delay: 0.2,
              },
              {
                icon: "bi-lock",
                image: "/asset/images/topics/undraw_Redesign_feedback_re_jvm0.png",
                title: "Data Secured",
                description:
                  "Your information is protected with top-tier security measures, ensuring privacy and safeguarding your data with enterprise-grade encryption.",
                delay: 0.4,
              },
              {
                icon: "bi-headset",
                image: "/asset/images/topics/colleagues-working-cozy-office-medium-shot.png",
                title: "24/7 Live Support",
                description:
                  "Get instant assistance anytime with our 24/7 live chat support, ready to help with all your queries and technical issues around the clock.",
                delay: 0.6,
              },
            ].map((service, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                <FloatingElement delay={service.delay}>
                  <motion.div
                    className={`${styles.serviceCard} ${styles.equalHeight}`}
                    whileHover={{
                      y: -20,
                      scale: 1.03,
                      rotateX: 5,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className={styles.serviceIcon}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(128, 208, 199, 0.5)",
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={service.icon}></i>
                    </motion.div>
                    <motion.img
                      src={service.image}
                      className={styles.serviceImage}
                      alt=""
                      whileHover={{ scale: 1.1, y: -5 }}
                    />
                    <div className={styles.serviceContent}>
                      <h5>{service.title}</h5>
                      <p>{service.description}</p>
                    </div>
                    <div className={styles.serviceGlow}></div>
                  </motion.div>
                </FloatingElement>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section with Equal Height Cards */}
      <section className={`${styles.categoriesSection} section-padding`}>
        <div className="container">
          <FloatingElement delay={0.2}>
            <div className="row mb-5">
              <div className="col-lg-8 col-12">
                <h2 className={styles.sectionTitle}>Popular Categories</h2>
                <p className={styles.sectionSubtitle}>2025 jobs live - 293 added today.</p>
              </div>
              <div className="col-lg-4 col-12 text-lg-end">
                <motion.div whileHover={{ x: 10 }}>
                  <Link to="/categories" className={styles.viewAllLink}>
                    View all categories <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </motion.div>
              </div>
            </div>
          </FloatingElement>

          <div className="row">
            {[
              {
                icon: "bi-code-slash",
                title: "Development & IT",
                jobs: 18,
                description:
                  "Frontend, backend, web and app developer positions with competitive rates and flexible schedules.",
                gradient: "devIcon",
                delay: 0.2,
              },
              {
                icon: "bi-bar-chart",
                title: "Marketing & Sales",
                jobs: 8,
                description:
                  "Digital marketing and brand management roles that help businesses grow and reach new audiences.",
                gradient: "marketingIcon",
                delay: 0.3,
              },
              {
                icon: "bi-palette",
                title: "Design & Creative",
                jobs: 13,
                description:
                  "Graphic, web, and product design opportunities for creative professionals and visual storytellers.",
                gradient: "designIcon",
                delay: 0.4,
              },
              {
                icon: "bi-headset",
                title: "Customer Service",
                jobs: 9,
                description:
                  "Customer experience and support positions that focus on building lasting client relationships.",
                gradient: "supportIcon",
                delay: 0.5,
              },
            ].map((category, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-12 mb-4">
                <FloatingElement delay={category.delay}>
                  <motion.div
                    className={`${styles.categoryCard} ${styles.equalHeight}`}
                    whileHover={{
                      y: -15,
                      scale: 1.05,
                      rotateY: 10,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className={`${styles.categoryIcon} ${styles[category.gradient]}`}
                      whileHover={{
                        scale: 1.3,
                        rotate: 360,
                        boxShadow: "0 0 40px rgba(128, 208, 199, 0.6)",
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      <i className={category.icon}></i>
                    </motion.div>
                    <div className={styles.categoryContent}>
                      <h5>{category.title}</h5>
                      <p className={styles.jobCount}>
                        <CountUpAnimation end={category.jobs} /> jobs available
                      </p>
                      <p>{category.description}</p>
                    </div>
                    <div className={styles.categoryGlow}></div>
                  </motion.div>
                </FloatingElement>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section className={`${styles.timelineSection} section-padding`} id="section_3">
        <ParallaxElement speed={0.2}>
          <div className="container">
            <div className="row">
              <FloatingElement delay={0.2}>
                <div className="col-12 text-center mb-5">
                  <motion.h2
                    className="text-white mb-4"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    How TalentShift Works
                  </motion.h2>
                  <p className="text-white-50">Simple steps to get started on your freelancing journey</p>
                </div>
              </FloatingElement>

              <div className="col-lg-10 col-12 mx-auto">
                <div className={styles.timelineContainer}>
                  {[
                    {
                      icon: "bi-search",
                      title: "Search for Opportunities",
                      description:
                        "Sign up and create a professional profile to showcase your skills, education, and experience. Then, start searching for freelance projects or job listings that match your interests.",
                      delay: 0.3,
                    },
                    {
                      icon: "bi-bookmark",
                      title: "Connect & Apply",
                      description:
                        "Find exciting opportunities, message employers or clients directly, and apply for the jobs you're passionate about.",
                      delay: 0.5,
                    },
                    {
                      icon: "bi-currency-dollar",
                      title: "Work & Get Paid",
                      description:
                        "Complete projects and get paid securely through the platform. Enjoy flexible work and explore new growth opportunities.",
                      delay: 0.7,
                    },
                  ].map((item, index) => (
                    <FloatingElement key={index} delay={item.delay}>
                      <motion.div
                        className={styles.timelineItem}
                        whileHover={{ x: 20, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className={styles.timelineIcon}
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                            boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <i className={item.icon}></i>
                        </motion.div>
                        <div className={styles.timelineContent}>
                          <h4 className="text-white mb-3">{item.title}</h4>
                          <p className="text-white">{item.description}</p>
                        </div>
                      </motion.div>
                    </FloatingElement>
                  ))}
                </div>
              </div>

              <FloatingElement delay={0.9}>
                <div className="col-12 text-center mt-5">
                  <p className="text-white mb-4">Ready to get started?</p>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/register" className={`btn ${styles.ctaBtn}`}>
                      Join TalentShift Today
                      <i className="bi bi-rocket ms-2"></i>
                    </Link>
                  </motion.div>
                </div>
              </FloatingElement>
            </div>
          </div>
        </ParallaxElement>
      </section>

      {/* Horizontal FAQ Section */}
      <section className={`${styles.faqSection} section-padding`} id="section_4">
        <div className="container">
          <FloatingElement delay={0.2}>
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                <p className={styles.sectionSubtitle}>Find answers to common questions about TalentShift</p>
              </div>
            </div>
          </FloatingElement>

          <div className="row">
            <div className="col-12">
              <FloatingElement delay={0.4}>
                <div className={styles.faqContainer}>
                  {/* FAQ Navigation */}
                  <div className={styles.faqNav}>
                    {faqData.map((faq, index) => (
                      <motion.button
                        key={index}
                        className={`${styles.faqNavItem} ${activeFaq === index ? styles.active : ""}`}
                        onClick={() => setActiveFaq(index)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <i className={faq.icon}></i>
                        <span>{faq.title}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* FAQ Content */}
                  <div className={styles.faqContent}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFaq}
                        className={styles.faqAnswer}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={styles.faqIcon}>
                          <i className={faqData[activeFaq].icon}></i>
                        </div>
                        <h3>{faqData[activeFaq].title}</h3>
                        <p>{faqData[activeFaq].content}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </FloatingElement>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        className={styles.floatingActionBtn}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      >
        <Link to="/contact">
          <i className="bi bi-chat-dots"></i>
        </Link>
      </motion.div>
    </main>
  )
}

export default Index
