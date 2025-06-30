import React, { useState, useCallback, useRef } from 'react';

const App: React.FC = () => {
  const [text, setText] = useState<string>('Welcome to JHN TTS! Type your message here and experience retro voice synthesis.');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = useCallback(async () => {
    if (!text.trim()) return;

    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsSpeaking(false);
      return;
    }

    setIsLoading(true);
    try {
      const backendUrl = (import.meta as any).env.VITE_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/synthesize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          normalize_text: true
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.onplay = () => setIsSpeaking(true);
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        audioRef.current.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
    } finally {
      setIsLoading(false);
    }
  }, [text, isSpeaking]);

  return (
    <div 
      className="min-h-screen flex flex-col p-4" 
      style={{ 
        background: 'linear-gradient(135deg, #1A0C2B 0%, #0F051A 100%)',
        fontFamily: "'Press Start 2P', monospace"
      }}
    >
      {/* Navigation Bar */}
      <div className="w-full flex justify-center mb-8 pt-4">
        <button
          onClick={() => window.open('https://jhn-n-juice.duckdns.org/', '_blank')}
          className="px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
          style={{
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            border: '2px solid #FFD700',
            borderRadius: '4px',
            color: '#1A0C2B',
            boxShadow: '0 0 10px #FFD700, 0 0 20px rgba(255, 215, 0, 0.5)',
            cursor: 'pointer',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px #FFD700, 0 0 30px rgba(255, 215, 0, 0.7)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 10px #FFD700, 0 0 20px rgba(255, 215, 0, 0.5)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Jhn's Main Page
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
      {/* Main Container */}
      <div 
        className="p-8 w-full max-w-2xl relative"
        style={{
          background: 'rgba(26, 12, 43, 0.8)',
          border: '2px solid #00FFFF',
          borderRadius: '8px',
          boxShadow: `
            0 0 10px #00FFFF,
            0 0 20px rgba(0, 255, 255, 0.5),
            0 0 30px rgba(0, 255, 255, 0.3),
            inset 0 0 10px rgba(255, 255, 255, 0.1)
          `
        }}
      >
        {/* Header */}
        <h1 
          className="text-center mb-8 text-2xl sm:text-3xl"
          style={{
            color: '#00FFFF',
            textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
            letterSpacing: '2px'
          }}
        >
          JHN TTS
        </h1>

        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <label 
              className="block text-sm mb-2"
              style={{ color: '#FFD700' }}
            >
              Your Message:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message here..."
              rows={5}
              className="w-full p-4 text-sm resize-none"
              style={{
                background: 'rgba(15, 5, 26, 0.8)',
                border: '2px solid #8A2BE2',
                borderRadius: '4px',
                color: '#FFFFFF',
                fontFamily: "'Press Start 2P', monospace",
                boxShadow: 'inset 0 0 10px rgba(138, 43, 226, 0.3)',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#D900FF';
                e.target.style.boxShadow = 'inset 0 0 10px rgba(217, 0, 255, 0.5), 0 0 5px #D900FF';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#8A2BE2';
                e.target.style.boxShadow = 'inset 0 0 10px rgba(138, 43, 226, 0.3)';
              }}
            />
          </div>


          {/* Speak Button */}
          <button
            onClick={handleSpeak}
            disabled={(!text.trim() && !isSpeaking) || isLoading}
            className="w-full p-4 text-sm font-bold uppercase tracking-wider transition-all duration-200"
            style={{
              background: isLoading || (!text.trim() && !isSpeaking) 
                ? 'rgba(75, 75, 75, 0.5)' 
                : 'linear-gradient(45deg, #D900FF, #8A2BE2)',
              border: '2px solid #D900FF',
              borderRadius: '4px',
              color: isLoading || (!text.trim() && !isSpeaking) ? '#666' : '#FFFFFF',
              boxShadow: isLoading || (!text.trim() && !isSpeaking) 
                ? 'none' 
                : '0 0 10px #D900FF, 0 0 20px rgba(217, 0, 255, 0.5)',
              cursor: isLoading || (!text.trim() && !isSpeaking) ? 'not-allowed' : 'pointer',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (!isLoading && (text.trim() || isSpeaking)) {
                e.currentTarget.style.boxShadow = '0 0 15px #D900FF, 0 0 30px rgba(217, 0, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && (text.trim() || isSpeaking)) {
                e.currentTarget.style.boxShadow = '0 0 10px #D900FF, 0 0 20px rgba(217, 0, 255, 0.5)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-pulse mr-2">●</span>
                Synthesizing...
              </span>
            ) : isSpeaking ? (
              '■ Stop Speaking'
            ) : (
              '▶ Speak Text'
            )}
          </button>
        </div>
      </div>
      </div>

      <audio ref={audioRef} style={{ display: 'none' }} />

      {/* Footer */}
      <footer className="mt-8 text-center text-xs" style={{ color: '#8A2BE2' }}>
        <p>&copy; {new Date().getFullYear()} JHN • Retro Voice Synthesis 🎮</p>
        <p>Powered by Piper TTS • 80s Synthwave Vibes ✨</p>
      </footer>
    </div>
  );
};

export default App;