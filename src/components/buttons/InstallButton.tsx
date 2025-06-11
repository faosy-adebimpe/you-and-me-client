'use client';

// components/InstallButton.tsx
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        };

        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt
        );

        return () =>
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt
            );
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            setDeferredPrompt(null);
            setIsInstallable(false);
            console.log(`User response to the install prompt: ${outcome}`);
        }
    };

    return (
        <>
            {isInstallable && (
                <button onClick={handleInstallClick} className='install-button'>
                    Install App
                </button>
            )}
        </>
    );
};

export default InstallButton;
