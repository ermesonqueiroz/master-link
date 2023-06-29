/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/**/*.jsx", "./resources/**/*.js"],
    theme: {
        extend: {
            fontFamily: {
                sans: "DM Sans",
            },
            keyframes: {
                slideUpAndFade: {
                    from: { opacity: 0, transform: "translateY(2px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                slideRightAndFade: {
                    from: { opacity: 0, transform: "translateX(-2px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                },
                slideDownAndFade: {
                    from: { opacity: 0, transform: "translateY(-2px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                slideLeftAndFade: {
                    from: { opacity: 0, transform: "translateX(2px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                },
                hide: {
                    from: { opacity: 1 },
                    to: { opacity: 0 },
                },
                slideIn: {
                    from: {
                        transform:
                            "translateX(calc(100% + var(--viewport-padding)))",
                    },
                    to: { transform: "translateX(0)" },
                },
                swipeOut: {
                    from: {
                        transform: "translateX(var(--radix-toast-swipe-end-x))",
                    },
                    to: {
                        transform:
                            "translateX(calc(100% + var(--viewport-padding)))",
                    },
                },
            },
            animation: {
                hide: "hide 100ms ease-in",
                slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
                swipeOut: "swipeOut 100ms ease-out",
                slideUpAndFade:
                    "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideRightAndFade:
                    "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideDownAndFade:
                    "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideLeftAndFade:
                    "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            },
        },
    },
    plugins: [],
};
