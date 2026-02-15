'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Share2, Facebook, Linkedin, Twitter, MessageCircle, Link2, X } from 'lucide-react';

interface SocialShareProps {
  title: string;
  description?: string;
  baseUrl?: string;
}

export default function SocialShare({
  title,
  description = '',
  baseUrl = 'https://salairenet.ma'
}: SocialShareProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(baseUrl);
  const [pageTitle, setPageTitle] = useState(title);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href || `${baseUrl}${pathname || ''}`);
    } else {
      setCurrentUrl(`${baseUrl}${pathname || ''}`);
    }

    if (typeof document !== 'undefined') {
      setPageTitle(document.title || title);
    } else {
      setPageTitle(title);
    }

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setHasNativeShare(true);
    }
  }, [baseUrl, pathname, title]);

  if (!isMounted) {
    return null;
  }

  const shareText = description || title;

  const shareData = {
    url: currentUrl,
    title: pageTitle,
    text: shareText
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareData.url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (hasNativeShare && typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed
      }
    }
  };

  const getCopyText = () => (copied ? 'Copié!' : 'Copier le lien');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Partager"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
        </button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 min-w-48 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex flex-col space-y-3">
              {hasNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                >
                  <Share2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700 font-medium">Partager</span>
                </button>
              )}

              <button
                onClick={handleFacebookShare}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
              >
                <Facebook className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">Facebook</span>
              </button>

              <button
                onClick={handleTwitterShare}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
              >
                <Twitter className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">X</span>
              </button>

              <button
                onClick={handleLinkedInShare}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
              >
                <Linkedin className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">LinkedIn</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
              >
                <Link2 className={`w-5 h-5 ${copied ? 'text-emerald-600' : 'text-gray-600'}`} />
                <span className={`font-medium ${copied ? 'text-emerald-600' : 'text-gray-700'}`}>
                  {getCopyText()}
                </span>
              </button>
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
