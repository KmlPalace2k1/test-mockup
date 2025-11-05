"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWAConservative() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Store the event but don't prevent default immediately
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);

      // Only prevent default after user has interacted with the page
      if (hasInteracted) {
        e.preventDefault();
      }
    };

    const userInteractionHandler = () => {
      setHasInteracted(true);
    };

    globalThis.addEventListener("beforeinstallprompt", handler);
    globalThis.addEventListener("click", userInteractionHandler, {
      once: true,
    });
    globalThis.addEventListener("scroll", userInteractionHandler, {
      once: true,
    });
    globalThis.addEventListener("keydown", userInteractionHandler, {
      once: true,
    });

    return () => {
      globalThis.removeEventListener("beforeinstallprompt", handler);
      globalThis.removeEventListener("click", userInteractionHandler);
      globalThis.removeEventListener("scroll", userInteractionHandler);
      globalThis.removeEventListener("keydown", userInteractionHandler);
    };
  }, [hasInteracted]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
          setDeferredPrompt(null);
          setIsInstallable(false);
        }
      } catch (error) {
        console.error("Error showing install prompt:", error);
      }
    }
  };

  if (!isInstallable) {
    return null;
  }

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 z-50"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      Install App
    </button>
  );
}
