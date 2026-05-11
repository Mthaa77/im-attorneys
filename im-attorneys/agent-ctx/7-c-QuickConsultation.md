---
Task ID: 7-c
Agent: Component Builder
Task: Create QuickConsultation.tsx slide-in drawer component

Work Log:
- Read worklog.md, ScrollReveal.tsx, ContactForm.tsx, use-toast.ts for patterns and context
- Verified existing WhatsApp button position (fixed bottom-6 right-6 z-50) and CookieConsent z-index (z-50)
- Confirmed existing CSS utilities: animate-pulse-gold, brand colors, font-display, font-body
- Created /src/components/im/QuickConsultation.tsx with all required features

Component Features Implemented:
1. **Floating Trigger Button:**
   - Fixed position bottom-20 right-6 z-[90], above WhatsApp button
   - Gold circular (w-14 h-14) with MessageSquare icon
   - animate-pulse-gold ring when drawer is closed
   - Framer Motion gentle float animation (translateY oscillation)
   - Transforms to X icon with rotation animation when drawer is open
   - Hover tooltip "Quick Consultation" with AnimatePresence
   - whileHover scale and whileTap scale effects

2. **Drawer Panel:**
   - Slides from right via Framer Motion (translate-x-full → translate-x-0)
   - Full height on desktop (h-screen), 85vh on mobile (h-[85vh])
   - Width: 400px desktop, 100vw mobile
   - Glass morphism: bg-white/97 backdrop-blur-xl with gold left border
   - Z-index 90 (above content, below cookie consent z-100 intent)
   - Semi-transparent backdrop overlay (black/50 + backdrop-blur-sm), click to close

3. **Form Fields (3 fields, simplified):**
   - Name (text, required, min 2 chars)
   - Phone (tel, required, min 8 chars)
   - Brief Message (textarea, required, min 10 chars, max 500 chars)

4. **Validation:**
   - react-hook-form + zod/v4 (same pattern as ContactForm)
   - Inline error messages with AlertCircle icon
   - Live character counter for message field (color changes at 450/500)

5. **Submission:**
   - POST to /api/contact with mapped fields (name→fullName, message→description)
   - Default areaOfLaw: "Quick Consultation"
   - Loading state with Loader2 spinner
   - Success toast: "Consultation Request Sent"
   - Error toast on failure with phone number fallback
   - Form reset + drawer close on success

6. **Drawer Header:**
   - "Quick Consultation" in Playfair Display (font-display)
   - Clock icon + "We'll call you back within 2 hours" subtitle
   - Gold gradient decorative line
   - Close button (X) in top-right with aria-label

7. **Drawer Footer:**
   - POPIA notice text
   - Emergency line with phone link to 081 248 8048

8. **Accessibility:**
   - Escape key closes drawer
   - Body scroll lock (overflow: hidden, position: fixed, preserves scroll position)
   - Focus trap (Tab/Shift+Tab cycles within drawer)
   - Focus first input on open, restore previous focus on close
   - role="dialog", aria-modal="true", aria-label on drawer
   - aria-label on trigger button (dynamic based on open state)

9. **Styling:**
   - Brand colors throughout (brand-dark, brand-gold, brand-cream, etc.)
   - font-display for heading, font-body for all text
   - Gold focus accents on inputs (border-brand-gold, ring-brand-gold/20)
   - Submit button: bg-brand-gold hover:bg-brand-gold-light
   - Smooth AnimatePresence for enter/exit animations

Verification:
- ESLint: 0 errors (bun run lint passes clean)
- Dev server: compiled successfully, no errors
