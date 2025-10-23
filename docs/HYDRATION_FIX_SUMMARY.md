# Hydration Error Fixes - Summary

## Problem
React hydration errors occur when the server-rendered HTML doesn't match what React expects to render on the client side. This commonly happens when:
- Using browser-only APIs (window, document, localStorage) during initial render
- State that differs between server and client
- Random values or timestamps that change between renders
- Media queries and window.matchMedia before the component is mounted

## Solution Implemented

### 1. Created Custom Hooks (`lib/hooks.ts`)

Created two reusable hooks to safely handle client-side operations:

#### `useIsClient()`
- Returns `false` during SSR (server-side rendering)
- Returns `true` only after the component mounts on the client
- Prevents any browser API calls during server rendering

#### `useMediaQuery()`
- Safely checks media queries without causing hydration mismatches
- Returns a default value during SSR
- Only starts listening to media query changes after client mount

### 2. Fixed Components

#### **HeroSimple Component** (`components/shared/HeroSimple.tsx`)
**Issues:**
- Used `window.matchMedia` immediately in useEffect
- Framer Motion animations initialized before client mount

**Fixes:**
- Added `useIsClient()` and `useMediaQuery()` hooks
- Wrapped Motion components with conditional rendering based on `isClient`
- Provides fallback non-animated content during SSR

#### **WorkGallery Component** (`components/WorkGallery.tsx`)
**Issues:**
- Direct `window.matchMedia` call in useEffect
- Duplicate state management for `prefersReducedMotion`

**Fixes:**
- Replaced manual media query detection with `useMediaQuery()` hook
- Added `useIsClient()` check
- Removed duplicate useEffect and state

#### **ShapeBlur Component** (`components/ShapeBlur.tsx`)
**Issues:**
- Three.js initialization uses browser APIs (document, window)
- WebGL rendering requires client-side context

**Fixes:**
- Added `useIsClient()` check at the start of useEffect
- Prevents Three.js initialization during SSR
- Added `isClient` to useEffect dependencies

#### **Navbar Component** (`components/Navbar.tsx`)
**Issues:**
- Multiple direct document and window API calls
- IntersectionObserver created before client mount
- DOM manipulation without client check

**Fixes:**
- Added `useIsClient()` hook
- All browser API calls now gated behind `isClient` check
- Added `isClient` to useEffect dependencies

## Key Principles Applied

1. **Defer Client-Only Code**: All browser API usage is deferred until after component mounts
2. **Consistent SSR/Client Rendering**: Initial render matches between server and client
3. **Progressive Enhancement**: Static content renders first, then enhances with interactivity
4. **Conditional Rendering**: Use `isClient` flag to conditionally render client-only features

## Testing Checklist

- [ ] No hydration errors in browser console
- [ ] Initial page load shows content correctly
- [ ] Animations appear after page loads
- [ ] Media queries work correctly
- [ ] Scroll effects function properly
- [ ] Mobile menu works
- [ ] Video gallery interactivity works

## Best Practices for Future Development

1. **Always check for client-side before using browser APIs:**
   ```tsx
   const isClient = useIsClient()
   
   useEffect(() => {
     if (!isClient) return
     // Safe to use window, document, etc.
   }, [isClient])
   ```

2. **Use conditional rendering for client-only components:**
   ```tsx
   {isClient ? (
     <ClientOnlyComponent />
   ) : (
     <StaticFallback />
   )}
   ```

3. **Avoid random values or timestamps in initial render**
4. **Test with React StrictMode enabled** (already enabled in next.config.js)
5. **Check console for hydration warnings during development**

## Files Modified

1. `lib/hooks.ts` - Created (new utility hooks)
2. `components/shared/HeroSimple.tsx` - Updated
3. `components/WorkGallery.tsx` - Updated
4. `components/ShapeBlur.tsx` - Updated
5. `components/Navbar.tsx` - Updated

## Performance Impact

✅ **Positive:**
- Faster initial page load (less JS executed on server)
- Better SEO (clean HTML without hydration warnings)
- Smoother user experience (no layout shifts from hydration errors)

⚠️ **Minor:**
- Very slight delay before animations start (by design)
- Content visible immediately, enhancements load progressively

## References

- [Next.js Hydration Error Docs](https://nextjs.org/docs/messages/react-hydration-error)
- [React Hydration Guide](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Understanding SSR vs CSR](https://nextjs.org/docs/app/building-your-application/rendering)
