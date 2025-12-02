"use client";
import React, { useEffect, useState } from "react";

const words = [
    "Welcome to Saurabh Online Cafe ☕",
    "Fast & Secure Digital Services.",
    "Printouts • Scans • Online Forms • Tickets",
    "High-Speed Browsing & Professional Support.",
    "Experience Hassle-Free Online Work."
];

export default function TypingEffect() {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        const speed = isDeleting ? 30 : 60;

        const timeout = setTimeout(() => {
            const updatedText = isDeleting
                ? current.substring(0, text.length - 1)
                : current.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === current) {
                setTimeout(() => setIsDeleting(true), 1200);
            } else if (isDeleting && updatedText === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text font-semibold drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
            {text}
            <span className="animate-pulse">|</span>
        </span>
    );
}
