'use client';

import { motion } from 'framer-motion';

// Reusable motion variants for consistent animations
export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

// Fade In Up on scroll - great for sections
export const FadeInUp = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

// Scale In on scroll
export const ScaleIn = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

// Interactive Card - with tap/hover feedback (mobile-friendly)
export const MotionCard = ({
    children,
    className = '',
    hoverScale = 1.02,
    tapScale = 0.98,
    ...props
}) => (
    <motion.div
        whileHover={{ scale: hoverScale, y: -8 }}
        whileTap={{ scale: tapScale }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Interactive Button - with tap feedback
export const MotionButton = ({
    children,
    className = '',
    as: Component = 'button',
    ...props
}) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="inline-block"
    >
        <Component className={className} {...props}>
            {children}
        </Component>
    </motion.div>
);

// Staggered children container - for grids/lists
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay,
                    delayChildren: 0.1
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger child item - use inside StaggerContainer
export const StaggerItem = ({ children, className = '' }) => (
    <motion.div
        variants={fadeInUp}
        className={className}
    >
        {children}
    </motion.div>
);

// Social icon with tap feedback
export const MotionSocialIcon = ({ children, className = '', ...props }) => (
    <motion.a
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={className}
        {...props}
    >
        {children}
    </motion.a>
);

// Section header animation
export const SectionHeader = ({ children, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

export default {
    FadeInUp,
    ScaleIn,
    MotionCard,
    MotionButton,
    StaggerContainer,
    StaggerItem,
    MotionSocialIcon,
    SectionHeader
};
