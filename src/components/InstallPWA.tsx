"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Only prevent default if we're going to show our custom UI
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    globalThis.addEventListener("beforeinstallprompt", handler);

    return () => {
      globalThis.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
          setDeferredPrompt(null);
          setIsInstallable(false);
        }
      } catch (error) {
        console.error("Error showing install prompt:", error);
        // Fall back to manual instructions
        setShowManualInstructions(true);
      }
    } else {
      // No prompt available, show manual instructions
      setShowManualInstructions(true);
    }
  };

  const closeInstructions = () => {
    setShowManualInstructions(false);
  };

  // Don't show anything if not installable and no manual instructions
  if (!isInstallable && !showManualInstructions) {
    return null;
  }

  return (
    <>
      {/* Install Button */}
      {isInstallable && !showManualInstructions && (
        <button
          onClick={handleInstall}
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 z-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Install App
        </button>
      )}

      {/* Manual Installation Instructions */}
      {showManualInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Install App
              </h3>
              <button
                onClick={closeInstructions}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="text-sm">To install this app on your device:</p>

              <div className="space-y-2">
                <div>
                  <strong className="text-gray-900">
                    Desktop (Chrome/Edge):
                  </strong>
                  <p className="text-sm">
                    Look for the install icon in your address bar and click it.
                  </p>
                </div>

                <div>
                  <strong className="text-gray-900">iPhone (Safari):</strong>
                  <p className="text-sm">
                    Tap the Share button, then "Add to Home Screen".
                  </p>
                </div>

                <div>
                  <strong className="text-gray-900">Android (Chrome):</strong>
                  <p className="text-sm">
                    Tap the menu (⋮), then "Add to Home screen".
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={closeInstructions}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
