import {useEffect, useMemo, useState} from 'react';
import {Space, Tag, Typography} from 'antd';
import {heroSlides} from '../../data/heroSlides';
import heroImage from '../../assets/hero.png';

const {Text, Title} = Typography;

function HeroGameShowcase() {
    const slides = useMemo(() => heroSlides, []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (slides.length <= 1) {
            return;
        }

        const interval = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 3500);

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

    return (
        <div className="hero-showcase">
            {!hasImageError ? (
                <img
                    key={currentSlide.appId}
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="hero-showcase-image"
                    onError={handleImageError}
                />
            ) : (
                <img
                    src={heroImage}
                    alt="AI game review illustration"
                    className="hero-showcase-fallback"
                />
            )}

            <div className="hero-showcase-overlay" />

            <div className="hero-showcase-content">
                <Space orientation="vertical" size={10} style={{width: '100%'}}>
                    <Tag
                        style={{
                            width: 'fit-content',
                            marginInlineEnd: 0,
                            borderRadius: 999,
                            padding: '6px 12px',
                            border: '1px solid rgba(103,232,249,0.20)',
                            background: 'rgba(34,211,238,0.10)',
                            color: '#cffafe',
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
                        <button
                            key={slide.appId}
                            type="button"
                            className={`hero-showcase-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Show ${slide.title}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HeroGameShowcase;
