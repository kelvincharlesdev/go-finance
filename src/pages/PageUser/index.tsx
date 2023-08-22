import './style.css';
import { useEffect, useState } from 'react';

export const LoggedUser = () => {
  const TypingEffect = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const text = 'Parabéns você está logado ao GoFinance!';
    useEffect(() => {
      if (currentIndex === text.length) {
        return;
      }

      const typingInterval = setInterval(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);

      return () => {
        clearInterval(typingInterval);
      };
    }, [currentIndex]);

    return (
      <div>
        <p>{displayText}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <header className="header">
        <img
          className="logo-raro"
          src="src/assets/raro-png.png"
          alt="Logo Raro"
        />
      </header>
      <main className="main">
        <h1 className="title-page">{TypingEffect()}</h1>
      </main>
    </div>
  );
};
