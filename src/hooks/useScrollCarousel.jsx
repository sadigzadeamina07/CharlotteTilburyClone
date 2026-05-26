import { useState, useEffect } from 'react';

export function useScrollCarousel(elementId, dependency) {

  // Sol oxun aktiv olub-olmayacağını saxlayırıq
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Sağ ox başlanğıcda aktiv olsun (çünki hələ sola scroll olmayıb)
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Bu funksiya elementin scroll vəziyyətini yoxlayır
  // və ox düymələrinin aktiv/deaktiv olmasına qərar verir
  const checkScroll = () => {

    // Elementin özünü tapırıq
    const el = document.getElementById(elementId);

    // Element yoxdursa heç nə etmirik
    if (!el) return;

    // Elementin scroll mövqeyini götürürük
    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;

    // Əgər sola scroll olunubsa, sol ox aktiv olsun
    setCanScrollLeft(scrollLeft > 0);

    // Əgər sağda hələ də görünməyən məzmun varsa, sağ ox aktiv olsun
    // (Math.ceil - bəzi brauzerlərin onluq ədəd qaytarması üçün)
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
  };

  useEffect(() => {

    // Komponent ilk yükləndikdə bir dəfə yoxlayırıq
    checkScroll();

    const el = document.getElementById(elementId);

    // Element tapılmasa dayandırırıq
    if (!el) return;

    // İstifadəçi scroll edəndə yoxla
    el.addEventListener('scroll', checkScroll);

    // Pəncərə ölçüsü dəyişəndə yoxla
    window.addEventListener('resize', checkScroll);

    // Elementin özü böyüyüb-kiçiləndə də yoxla (məs. şəkillər yüklənəndə)
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);

    // Komponent ekrandan silinəndə bütün dinləyiciləri təmizlə
    // (yaddaş sızdırmasının qarşısını almaq üçün)
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      resizeObserver.disconnect();
    };

  }, [elementId, dependency]);
  // dependency dəyişəndə (məs. məhsullar yüklənəndə) useEffect yenidən işləsin

  // Sol düyməyə basanda 300px sola get
  const scrollLeft = () => {
    const el = document.getElementById(elementId);
    if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Sağ düyməyə basanda 300px sağa get
  const scrollRight = () => {
    const el = document.getElementById(elementId);
    if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Bu dörd şeyi komponentin istifadəsinə veririk
  return {
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  };
}
