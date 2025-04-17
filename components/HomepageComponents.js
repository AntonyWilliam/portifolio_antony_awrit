import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { ResponsiveGrid, GridItem, ResponsiveSection, ResponsiveContainer } from './ResponsiveGrid';
import { motion } from 'framer-motion';

/**
 * Hero section component with responsive sizing
 */
export function Hero({ title, subtitle, description, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, imageSrc }) {
  const { isMobileAny, isTablet } = useResponsive();
  
  return (
    <ResponsiveSection className="hero-section" maxWidth="1800px">
      <ResponsiveGrid
        minWidth={280}
        maxColumns={2}
        gap={isMobileAny ? 'clamp(2rem, 5vw, 3rem)' : 'clamp(2rem, 8vw, 6rem)'}
      >
        <GridItem colSpan={1} className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ 
              fontSize: 'var(--font-size-3xl)',
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
            }}>
              {title}
            </h1>
            
            <h2 style={{ 
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              {subtitle}
            </h2>
            
            {description && (
              <p style={{ 
                fontSize: 'var(--font-size-base)',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                maxWidth: '650px'
              }}>
                {description}
              </p>
            )}
            
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobileAny ? 'column' : 'row',
              gap: isMobileAny ? '1rem' : '1.5rem'
            }}>
              {ctaText && ctaLink && (
                <a
                  href={ctaLink}
                  className="primary-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1.2rem, 2.5vw, 1.8rem)',
                    fontSize: 'var(--font-size-base)',
                    borderRadius: '0.25rem',
                    textDecoration: 'none',
                    fontWeight: 500,
                    width: isMobileAny ? '100%' : 'auto'
                  }}
                >
                  {ctaText}
                </a>
              )}
              
              {secondaryCtaText && secondaryCtaLink && (
                <a
                  href={secondaryCtaLink}
                  className="secondary-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1.2rem, 2.5vw, 1.8rem)',
                    fontSize: 'var(--font-size-base)',
                    borderRadius: '0.25rem',
                    textDecoration: 'none',
                    fontWeight: 500,
                    width: isMobileAny ? '100%' : 'auto'
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          </motion.div>
        </GridItem>
        
        {imageSrc && (
          <GridItem colSpan={1} className="hero-image">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={{ 
                maxWidth: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <img
                  src={imageSrc}
                  alt="Hero illustration"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </motion.div>
          </GridItem>
        )}
      </ResponsiveGrid>
    </ResponsiveSection>
  );
}

/**
 * Features display with responsive grid
 */
export function FeaturesGrid({ features }) {
  const { breakpoint, isMobileAny, isTablet } = useResponsive();
  
  // Calculate optimal columns based on breakpoint and items
  const getOptimalColumns = () => {
    const itemCount = features?.length || 0;
    if (itemCount <= 3) return itemCount;
    
    switch (breakpoint) {
      case 'mobile': return 1;
      case 'largeMobile': return 2;
      case 'tablet': return 3;
      case 'desktop': 
      case 'largeDesktop':
      case 'extraLargeDesktop': return 4;
      default: return Math.min(4, itemCount);
    }
  };
  
  const columns = getOptimalColumns();
  
  return (
    <ResponsiveSection className="features-section" maxWidth="1800px">
      <ResponsiveContainer width="100%" centerContent>
        <h2 style={{ 
          fontSize: 'var(--font-size-2xl)',
          marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
          textAlign: 'center'
        }}>
          Features
        </h2>
        
        <ResponsiveGrid
          minWidth={240}
          maxColumns={columns}
          gap="clamp(1.5rem, 3vw, 2.5rem)"
        >
          {features?.map((feature, index) => (
            <GridItem key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                style={{
                  height: '100%',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.1))'
                }}
              >
                {feature.icon && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
                  </div>
                )}
                
                <h3 style={{ 
                  fontSize: 'var(--font-size-lg)',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  {feature.title}
                </h3>
                
                <p style={{ 
                  fontSize: 'var(--font-size-base)',
                  marginBottom: '1rem',
                  flexGrow: 1
                }}>
                  {feature.description}
                </p>
                
                {feature.link && feature.linkText && (
                  <a 
                    href={feature.link}
                    style={{
                      fontSize: 'var(--font-size-base)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginTop: 'auto'
                    }}
                  >
                    {feature.linkText}
                    <span style={{ marginLeft: '0.5rem' }}>&rarr;</span>
                  </a>
                )}
              </motion.div>
            </GridItem>
          ))}
        </ResponsiveGrid>
      </ResponsiveContainer>
    </ResponsiveSection>
  );
}

/**
 * Responsive skills showcase with hover effects
 */
export function SkillsShowcase({ skills }) {
  const { isMobileAny } = useResponsive();
  
  return (
    <ResponsiveSection className="skills-section" maxWidth="1800px">
      <ResponsiveContainer width="100%" centerContent>
        <h2 style={{ 
          fontSize: 'var(--font-size-2xl)',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          textAlign: 'center'
        }}>
          Skills
        </h2>
        
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 1.5vw, 1rem)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {skills?.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              style={{
                padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
                borderRadius: '100px',
                backgroundColor: 'var(--skill-bg, rgba(255,255,255,0.05))',
                fontSize: 'var(--font-size-sm)',
                margin: '0.25rem',
                cursor: 'default'
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </ResponsiveContainer>
    </ResponsiveSection>
  );
}

/**
 * Responsive grid with hoverable square items
 */
export function HoverSquaresGrid({ items }) {
  const { breakpoint, isMobileAny } = useResponsive();
  
  // Calculate appropriate square size based on breakpoint
  const getSquareSize = () => {
    switch (breakpoint) {
      case 'mobile': return 60;
      case 'largeMobile': return 70;
      case 'tablet': return 80;
      case 'desktop': return 90;
      case 'largeDesktop': 
      case 'extraLargeDesktop': return 100;
      default: return 80;
    }
  };
  
  const squareSize = getSquareSize();
  
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 2vw, 2rem) 0',
      margin: 'clamp(1rem, 2vw, 2rem) 0',
      position: 'relative'
    }}>
      <div 
        className="squares"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '10px 0',
          margin: '10px 0',
          transform: isMobileAny ? 'scale(1)' : 'scale(1.2)'
        }}
      >
        {items?.slice(0, 4).map((item, index) => (
          <motion.div
            key={index}
            className="square"
            whileHover={{ borderColor: 'rgba(255,255,255,0.8)' }}
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              transform: 'rotate(45deg)',
              margin: '0 3px',
              position: 'relative',
              overflow: 'hidden',
              zIndex: index === 1 || index === 2 ? 2 : 1,
              border: '1px solid rgba(157, 157, 157, 0.3)',
              backgroundColor: 'rgba(10, 10, 10, 0.3)',
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: '0 0 0 rgba(255, 255, 255, 0)'
            }}
          >
            {item?.icon && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                fontSize: `${squareSize / 2.5}px`,
                color: 'var(--text-color)',
                opacity: 0.7,
                transition: 'opacity 0.3s ease'
              }}>
                {item.icon}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .squares:hover .square:nth-child(1) {
          transform: translateX(-45px) rotate(45deg);
        }
        
        .squares:hover .square:nth-child(2) {
          transform: translateX(-15px) rotate(45deg);
        }
        
        .squares:hover .square:nth-child(3) {
          transform: translateX(15px) rotate(45deg);
        }
        
        .squares:hover .square:nth-child(4) {
          transform: translateX(45px) rotate(45deg);
        }
        
        .square:hover {
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .squares:hover .square:nth-child(n),
          .square {
            transition: border-color 0.3s ease !important;
            transform: rotate(45deg) !important;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Sample homepage implementation using all components
 */
export function HomepageExample() {
  // Sample data
  const heroData = {
    title: "Welcome to My Portfolio",
    subtitle: "I create professional documentation and content",
    description: "I'm a technical writer specializing in API documentation, user guides, and technical specifications.",
    ctaText: "Get in Touch",
    ctaLink: "/contact",
    secondaryCtaText: "View Samples",
    secondaryCtaLink: "/samples",
    imageSrc: "/images/hero-illustration.jpg"
  };
  
  const featuresData = [
    {
      title: "Documentation & Knowledge",
      description: "I create comprehensive technical documentation including API references, product guides, and user manuals.",
      icon: "📄",
      link: "/services",
      linkText: "Learn more"
    },
    {
      title: "AI Solutions",
      description: "I create comprehensive AI solutions encompassing prompt engineering, chatbot development, and automation systems.",
      icon: "🤖",
      link: "/services",
      linkText: "Learn more"
    },
    {
      title: "Technical Documentation",
      description: "I design and implement scalable documentation architectures that enhance findability and maintainability.",
      icon: "📚",
      link: "/services",
      linkText: "Learn more"
    },
    {
      title: "Strategic Content",
      description: "I provide expert guidance on documentation strategies, knowledge management, and content transformation.",
      icon: "🔍",
      link: "/services",
      linkText: "Learn more"
    }
  ];
  
  const skillsData = [
    "API Documentation", "Technical Writing", "UX Writing", "Content Strategy",
    "Knowledge Management", "Information Architecture", "DITA", "Markdown",
    "Swagger/OpenAPI", "Git", "JIRA", "Agile Documentation",
    "User Guides", "Tutorial Creation", "Process Documentation", "AI Prompt Engineering"
  ];
  
  const squaresData = [
    { icon: "📄" },
    { icon: "🤖" },
    { icon: "📚" },
    { icon: "🔍" }
  ];
  
  return (
    <div className="homepage">
      <Hero {...heroData} />
      
      <div style={{ padding: '2rem 0' }}>
        <HoverSquaresGrid items={squaresData} />
      </div>
      
      <FeaturesGrid features={featuresData} />
      
      <div style={{ padding: '2rem 0' }}>
        <SkillsShowcase skills={skillsData} />
      </div>
    </div>
  );
}
