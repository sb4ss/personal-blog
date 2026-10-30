declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

let scriptInjected = false;

export function initGoogleTranslateBridge() {
  if (typeof window === "undefined" || scriptInjected) return;
  scriptInjected = true;

  // Contenedor invisible para Google Translate
  let container = document.getElementById("google_translate_element");
  if (!container) {
    container = document.createElement("div");
    container.id = "google_translate_element";
    container.style.display = "none";
    document.body.appendChild(container);
  }

  window.googleTranslateElementInit = () => {
    if (window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "en,es,ru,pl,de,fr",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    }
  };

  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.head.appendChild(script);
}

export function applyLanguageToDOM(targetLang: string) {
  if (typeof window === "undefined") return;

  const currentCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("googtrans="));

  const desiredValue = targetLang === "es" ? "" : `/es/${targetLang}`;

  if (targetLang === "es") {
    // Eliminar cookie para restaurar español original
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    if (currentCookie && currentCookie !== "googtrans=") {
      window.location.reload();
    }
    return;
  }

  // Establecer cookie para el idioma deseado
  document.cookie = `googtrans=${desiredValue}; path=/;`;
  document.cookie = `googtrans=${desiredValue}; domain=${window.location.hostname}; path=/;`;

  // Intentar cambiar el elemento select si ya está disponible
  const selectElem = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (selectElem) {
    selectElem.value = targetLang;
    selectElem.dispatchEvent(new Event("change"));
  } else if (!currentCookie || currentCookie.split("=")[1] !== desiredValue) {
    // Si la cookie cambió y Google no está todavía enlazado, recargar para que Google Translate renderice el idioma
    window.location.reload();
  }
}
