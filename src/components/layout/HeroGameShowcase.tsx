import {type PointerEvent, useEffect, useMemo, useRef, useState} from 'react';
import {Space, Tag, Typography} from 'antd';
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';
import {heroSlides} from '../../data/heroSlides';
import heroImage from '../../assets/hero.png';
import HudOverlay from '../motion/HudOverlay';
import {
    hoverLiftTransition,
    motionEase,
    parallaxSpring,
} from '../../motion/animations';

const {Text, Title} = Typography;

function HeroGameShowcase() {
    const slides = useMemo(() => heroSlides, []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
    const showcaseRef = useRef<HTMLDivElement | null>(null);
    const reduceMotion = useReducedMotion();
    const rotateX = useSpring(0, parallaxSpring);
    const rotateY = useSpring(0, parallaxSpring);
    const imageScale = useSpring(1.02, parallaxSpring);
    const {scrollYProgress} = useScroll({
        target: showcaseRef,
        offset: ['start end', 'end start'],
    });
    const scrollImageY = useTransform(scrollYProgress, [0, 1], [-26, 26]);
    const glowX = useMotionValue(50);
    const glowY = useMotionValue(50);
    const glowOpacity = useSpring(0, {
        stiffness: 180,
        damping: 22,
        mass: 0.8,
    });
    const glowBackground = useMotionTemplate`
        radial-gradient(circle at ${glowX}% ${glowY}%, rgba(103,232,249,0.24), transparent 24%),
        radial-gradient(circle at ${glowX}% ${glowY}%, rgba(192,132,252,0.16), transparent 42%)
    `;

    useEffect(() => {
        if (slides.length <= 1) {
            return;
        }

        const interval = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6200);

        return () => window.clearInterval(interval);
    }, [slides]);

    const currentSlide = slides[currentIndex];
    const hasImageError = imageErrorMap[currentSlide.appId];

    const handleImageError = () => {
        setImageErrorMap((prev) => ({
            ...prev,
            [currentSlide.appId]: true,
        }));
    };

    const resetParallax = () => {
        rotateX.set(0);
        rotateY.set(0);
        imageScale.set(1.02);
        glowX.set(50);
        glowY.set(50);
        glowOpacity.set(0);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion) {
            return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const relativeX = (event.clientX - bounds.left) / bounds.width;
        const relativeY = (event.clientY - bounds.top) / bounds.height;

        rotateY.set((relativeX - 0.5) * 12);
        rotateX.set((0.5 - relativeY) * 12);
        imageScale.set(1.06);
        glowX.set(relativeX * 100);
        glowY.set(relativeY * 100);
        glowOpacity.set(1);
    };

    useEffect(() => {
        rotateX.set(0);
        rotateY.set(0);
        imageScale.set(1.02);
        glowX.set(50);
        glowY.set(50);
        glowOpacity.set(0);
    }, [currentIndex, glowOpacity, glowX, glowY, imageScale, rotateX, rotateY]);

    return (
        <motion.div
            ref={showcaseRef}
            className="hero-showcase hud-angled-shell"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetParallax}
            style={
                reduceMotion
                    ? undefined
                    : {
                        rotateX,
                        rotateY,
                        transformPerspective: 1400,
                    }
            }
            whileHover={reduceMotion ? undefined : {y: -6}}
            transition={hoverLiftTransition}
        >
            <AnimatePresence mode="wait">
                {!hasImageError ? (
                    <motion.div
                        key={currentSlide.appId}
                        className="hero-showcase-frame"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.42, ease: motionEase}}
                    >
                        <motion.div
                            className="hero-showcase-kenburns"
                            animate={
                                reduceMotion
                                    ? undefined
                                    : {
                                        scale: [1.01, 1.07],
                                        x: [0, -10],
                                        y: [0, 12],
                                    }
                            }
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                        >
                            <motion.img
                                src={currentSlide.imageUrl}
                                alt={currentSlide.title}
                                className="hero-showcase-image"
                                onError={handleImageError}
                                style={
                                    reduceMotion
                                        ? undefined
                                        : {
                                            scale: imageScale,
                                            y: scrollImageY,
                                        }
                                }
                            />
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key={`fallback-${currentSlide.appId}`}
                        className="hero-showcase-frame"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.42, ease: motionEase}}
                    >
                        <motion.div
                            className="hero-showcase-kenburns"
                            animate={
                                reduceMotion
                                    ? undefined
                                    : {
                                        scale: [1.01, 1.06],
                                        x: [0, -8],
                                        y: [0, 10],
                                    }
                            }
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                        >
                            <motion.img
                                src={heroImage}
                                alt="AI game review illustration"
                                className="hero-showcase-fallback"
                                style={
                                    reduceMotion
                                        ? undefined
                                        : {
                                            scale: imageScale,
                                            y: scrollImageY,
                                        }
                                }
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hero-showcase-overlay" />
            <motion.div
                className="hero-showcase-glow"
                style={
                    reduceMotion
                        ? undefined
                        : {
                            background: glowBackground,
                            opacity: glowOpacity,
                        }
                }
            />
            <HudOverlay reticlePosition="bottom-left" scanDelay={0.55} zIndex={1} />

            <div className="hero-showcase-content">
                <Space orientation="vertical" size={10} style={{width: '100%'}}>
                    <Tag
                        className="hud-chip"
                        style={{
                            width: 'fit-content',
                            marginInlineEnd: 0,
                            borderRadius: 999,
                            padding: '6px 12px',
                            border: '1px solid rgba(255,90,54,0.24)',
                            background: 'rgba(255,90,54,0.12)',
                            color: '#ffd7c9',
                        }}
                    >
                        Featured mock game
                    </Tag>

                    <div>
                        <Title level={3} style={{margin: 0, color: '#f8fafc'}}>
                            {currentSlide.title}
                        </Title>
                        <Text style={{color: '#67e8f9'}}>
                            Steam App ID: #{currentSlide.appId}
                        </Text>
                    </div>
                </Space>

                <div className="hero-showcase-dots">
                    {slides.map((slide, index) => (
                        <motion.button
                            key={slide.appId}
                            type="button"
                            className={`hero-showcase-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Show ${slide.title}`}
                            whileHover={{scale: 1.12}}
                            whileTap={{scale: 0.92}}
                            transition={hoverLiftTransition}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default HeroGameShowcase;
