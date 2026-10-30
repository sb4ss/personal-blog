export interface ArticleTranslation {
  title: string;
  content: string;
  tags?: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  isoDate: string;
  img: string;
  url: string;
  published: boolean;
  tags?: string[];
  likes?: number;
  translations?: {
    en?: ArticleTranslation;
    ru?: ArticleTranslation;
    pl?: ArticleTranslation;
    de?: ArticleTranslation;
    fr?: ArticleTranslation;
  };
}

export const articles: Article[] = [
  {
    id: "react-router-animaciones",
    title: "React Router con animaciones",
    content: "La forma más facil de añadir transisiones a tu aplicación React",
    date: "23 feb 2025",
    isoDate: "2025-02-23",
    img: "img1.png",
    url: "article-react-router-animaciones",
    published: true,
    tags: ["React", "Framer Motion", "Router"],
    likes: 0,
    translations: {
      en: {
        title: "React Router with Animations",
        content: "The easiest way to add fluid transitions to your React application.",
        tags: ["React", "Framer Motion", "Router"],
      },
      ru: {
        title: "React Router с анимациями",
        content: "Самый простой способ добавить плавные переходы в приложение React.",
        tags: ["React", "Framer Motion", "Router"],
      },
      pl: {
        title: "React Router z animacjami",
        content: "Najprostszy sposób na dodanie płynnych przejść do aplikacji React.",
        tags: ["React", "Framer Motion", "Router"],
      },
      de: {
        title: "React Router mit Animationen",
        content: "Der einfachste Weg, flüssige Übergänge zu deiner React-App hinzuzufügen.",
        tags: ["React", "Framer Motion", "Router"],
      },
      fr: {
        title: "React Router avec animations",
        content: "La façon la plus simple d'ajouter des transitions fluides à votre application React.",
        tags: ["React", "Framer Motion", "Router"],
      },
    },
  },
  {
    id: "organizar-api-node-express",
    title: "Cómo organizar una API con Node.js y Express",
    content: "Estructura limpia con rutas, controladores, servicios y manejo centralizado de errores con un ejemplo práctico.",
    date: "23 mar 2025",
    isoDate: "2025-03-23",
    img: "node-express-orden-img.jpg",
    url: "article-organizar-api-node-express",
    published: true,
    tags: ["Node.js", "Express", "Backend", "Clean Architecture"],
    likes: 0,
    translations: {
      en: {
        title: "How to Structure an API with Node.js & Express",
        content: "Clean architecture with routes, controllers, services, and centralized error handling with a practical example.",
        tags: ["Node.js", "Express", "Backend", "Clean Architecture"],
      },
      ru: {
        title: "Как организовать API на Node.js и Express",
        content: "Чистая архитектура с маршрутами, контроллерами, сервисами и централизованной обработкой ошибок.",
        tags: ["Node.js", "Express", "Backend", "Clean Architecture"],
      },
      pl: {
        title: "Jak zorganizować API w Node.js i Express",
        content: "Czysta architektura z trasami, kontrolerami, serwisami i scentralizowaną obsługą błędów.",
        tags: ["Node.js", "Express", "Backend", "Clean Architecture"],
      },
      de: {
        title: "Strukturierung einer API mit Node.js & Express",
        content: "Saubere Architektur mit Routen, Controllern, Services und zentraler Fehlerbehandlung.",
        tags: ["Node.js", "Express", "Backend", "Clean Architecture"],
      },
      fr: {
        title: "Comment structurer une API avec Node.js et Express",
        content: "Architecture propre avec routes, contrôleurs, services et gestion centralisée des erreurs.",
        tags: ["Node.js", "Express", "Backend", "Clean Architecture"],
      },
    },
  },
  {
    id: "typescript-sin-complicarse",
    title: "TypeScript sin complicarse: tipos que sí ayudan",
    content: "Aprende a tipar respuestas de APIs, formularios y componentes React sin ahogarte en genéricos complejos.",
    date: "23 may 2025",
    isoDate: "2025-05-23",
    img: "typescript-img.jpg",
    url: "article-typescript-sin-complicarse",
    published: true,
    tags: ["TypeScript", "React", "Frontend"],
    likes: 0,
    translations: {
      en: {
        title: "TypeScript Without Headaches: Types That Actually Help",
        content: "Learn to type API responses, forms, and React components without drowning in complex generics.",
        tags: ["TypeScript", "React", "Frontend"],
      },
      ru: {
        title: "TypeScript без сложностей: типы, которые реально помогают",
        content: "Научитесь типизировать ответы API, формы и компоненты React без сложных дженериков.",
        tags: ["TypeScript", "React", "Frontend"],
      },
      pl: {
        title: "TypeScript bez komplikacji: typy, które naprawdę pomagają",
        content: "Naucz się typować odpowiedzi API, formularze i komponenty React bez tonięcia w generykach.",
        tags: ["TypeScript", "React", "Frontend"],
      },
      de: {
        title: "TypeScript unkompliziert: Typen, die wirklich helfen",
        content: "Lerne API-Antworten, Formulare und React-Komponenten zu typisieren, ohne in komplexen Generics zu ertrinken.",
        tags: ["TypeScript", "React", "Frontend"],
      },
      fr: {
        title: "TypeScript sans complication : les types qui aident vraiment",
        content: "Apprenez à typer les réponses d'API, formulaires et composants React sans génériques complexes.",
        tags: ["TypeScript", "React", "Frontend"],
      },
    },
  },
  {
    id: "automatizar-tareas-python-windows",
    title: "Automatizar tareas con Python y el Programador de tareas de Windows",
    content: "Guía práctica para ejecutar scripts desatendidos con .bat, guardar logs estructurados y alertar ante fallos.",
    date: "23 jul 2025",
    isoDate: "2025-07-23",
    img: "python-automation.png",
    url: "article-automatizar-tareas-python-windows",
    published: true,
    tags: ["Python", "Windows", "Automation", "DevOps"],
    likes: 0,
    translations: {
      en: {
        title: "Automating Tasks with Python and Windows Task Scheduler",
        content: "Practical guide to running unattended scripts with .bat, structured logs, and alerting on failure.",
        tags: ["Python", "Windows", "Automation", "DevOps"],
      },
      ru: {
        title: "Автоматизация задач с Python и планировщиком Windows",
        content: "Практическое руководство по запуску фоновых скриптов с .bat, логированием и оповещением об ошибках.",
        tags: ["Python", "Windows", "Automation", "DevOps"],
      },
      pl: {
        title: "Automatyzacja zadań z Pythonem i Harmonogramem Windows",
        content: "Praktyczny przewodnik po uruchamianiu skryptów w tle za pomocą .bat ze strukturyzowanymi logami.",
        tags: ["Python", "Windows", "Automation", "DevOps"],
      },
      de: {
        title: "Aufgaben automatisieren mit Python und der Windows-Aufgabenplanung",
        content: "Praxisleitfaden zur Ausführung unbeaufsichtigter Skripte mit .bat und strukturierten Protokollen.",
        tags: ["Python", "Windows", "Automation", "DevOps"],
      },
      fr: {
        title: "Automatiser des tâches avec Python et le Planificateur Windows",
        content: "Guide pratique pour exécuter des scripts en arrière-plan avec .bat et des journaux structurés.",
        tags: ["Python", "Windows", "Automation", "DevOps"],
      },
    },
  },
  {
    id: "supabase-autenticacion-permisos",
    title: "Supabase en una aplicación real: autenticación y permisos",
    content: "Conectar React con Supabase, gestionar sesiones y proteger datos con Row Level Security (RLS).",
    date: "23 sep 2025",
    isoDate: "2025-09-23",
    img: "supabase-react-img.jpg",
    url: "article-supabase-autenticacion-permisos",
    published: true,
    tags: ["Supabase", "React", "PostgreSQL", "Auth"],
    likes: 0,
    translations: {
      en: {
        title: "Supabase in a Real-World App: Authentication & Permissions",
        content: "Connect React with Supabase, manage user sessions, and secure data using Row Level Security (RLS).",
        tags: ["Supabase", "React", "PostgreSQL", "Auth"],
      },
      ru: {
        title: "Supabase в реальном проекте: аутентификация и права",
        content: "Подключение React к Supabase, управление сессиями и защита данных с помощью RLS.",
        tags: ["Supabase", "React", "PostgreSQL", "Auth"],
      },
      pl: {
        title: "Supabase w prawdziwej aplikacji: uwierzytelnianie i uprawnienia",
        content: "Połącz React z Supabase, zarządzaj sesjami i zabezpieczaj dane za pomocą RLS.",
        tags: ["Supabase", "React", "PostgreSQL", "Auth"],
      },
      de: {
        title: "Supabase in einer echten Anwendung: Authentifizierung und Rechte",
        content: "React mit Supabase verbinden, Sitzungen verwalten und Daten mit Row Level Security (RLS) schützen.",
        tags: ["Supabase", "React", "PostgreSQL", "Auth"],
      },
      fr: {
        title: "Supabase dans une application réelle : authentification et permissions",
        content: "Connecter React à Supabase, gérer les sessions et sécuriser les données avec Row Level Security (RLS).",
        tags: ["Supabase", "React", "PostgreSQL", "Auth"],
      },
    },
  },
  {
    id: "formulario-contacto-resend",
    title: "Un formulario de contacto que realmente funciona con Resend",
    content: "Envío seguro de emails desde el servidor, validación estricta con Zod y prevención de spam.",
    date: "23 nov 2025",
    isoDate: "2025-11-23",
    img: "resend-zod-img.jpg",
    url: "article-formulario-contacto-resend",
    published: true,
    tags: ["Resend", "Email", "Fullstack", "API"],
    likes: 0,
    translations: {
      en: {
        title: "A Contact Form That Actually Works with Resend",
        content: "Secure server-side email delivery, strict validation with Zod, and spam prevention.",
        tags: ["Resend", "Email", "Fullstack", "API"],
      },
      ru: {
        title: "Контактная форма, которая действительно работает с Resend",
        content: "Безопасная отправка писем с сервера, строгая валидация с Zod и защита от спама.",
        tags: ["Resend", "Email", "Fullstack", "API"],
      },
      pl: {
        title: "Formularz kontaktowy, który naprawdę działa z Resend",
        content: "Bezpieczne wysyłanie e-maili z serwera, ścisła walidacja za pomocą Zod i ochrona przed spamem.",
        tags: ["Resend", "Email", "Fullstack", "API"],
      },
      de: {
        title: "Ein funktionierendes Kontaktformular mit Resend",
        content: "Sicherer serverseitiger E-Mail-Versand, strikte Validierung mit Zod und Spamschutz.",
        tags: ["Resend", "Email", "Fullstack", "API"],
      },
      fr: {
        title: "Un formulaire de contact fiable avec Resend",
        content: "Envoi sécurisé d'e-mails côté serveur, validation stricte avec Zod et protection contre le spam.",
        tags: ["Resend", "Email", "Fullstack", "API"],
      },
    },
  },
  {
    id: "de-express-a-nestjs",
    title: "De Express a NestJS: cuándo vale la pena dar el salto",
    content: "Comparativa técnica entre la flexibilidad minimalista de Express y la arquitectura modular empresarial de NestJS.",
    date: "23 ene 2026",
    isoDate: "2026-01-23",
    img: "nest-express-img.jpg",
    url: "article-de-express-a-nestjs",
    published: true,
    tags: ["NestJS", "Express", "TypeScript", "Backend"],
    likes: 0,
    translations: {
      en: {
        title: "From Express to NestJS: When It Is Worth the Leap",
        content: "Technical comparison between Express's minimalist flexibility and NestJS's modular enterprise architecture.",
        tags: ["NestJS", "Express", "TypeScript", "Backend"],
      },
      ru: {
        title: "От Express к NestJS: когда стоит сделать шаг вперед",
        content: "Техническое сравнение минималистичной гибкости Express и модульной архитектуры NestJS.",
        tags: ["NestJS", "Express", "TypeScript", "Backend"],
      },
      pl: {
        title: "Z Express do NestJS: kiedy warto zrobić krok naprzód",
        content: "Porównanie techniczne pomiędzy minimalistyczną elastycznością Express a architekturą NestJS.",
        tags: ["NestJS", "Express", "TypeScript", "Backend"],
      },
      de: {
        title: "Von Express zu NestJS: Wann sich der Umstieg lohnt",
        content: "Technischer Vergleich zwischen der minimalistischen Flexibilität von Express und der modularen Architektur von NestJS.",
        tags: ["NestJS", "Express", "TypeScript", "Backend"],
      },
      fr: {
        title: "D'Express à NestJS : quand faire la transition",
        content: "Comparaison technique entre la flexibilité d'Express et l'architecture modulaire d'entreprise de NestJS.",
        tags: ["NestJS", "Express", "TypeScript", "Backend"],
      },
    },
  },
  {
    id: "automatizar-tableau-python",
    title: "Automatizar tableros de Tableau con Python",
    content: "Cómo orquestar extracciones, refrescos automáticos vía API de Tableau y control de errores en reportes.",
    date: "23 mar 2026",
    isoDate: "2026-03-23",
    img: "python-tableau-img.jpg",
    url: "article-automatizar-tableau-python",
    published: true,
    tags: ["Python", "Tableau", "Data", "Automation"],
    likes: 0,
    translations: {
      en: {
        title: "Automating Tableau Dashboards with Python",
        content: "Orchestrating data extractions, automatic refreshes via Tableau API, and error handling in reports.",
        tags: ["Python", "Tableau", "Data", "Automation"],
      },
      ru: {
        title: "Автоматизация дашбордов Tableau с помощью Python",
        content: "Оркестрация выгрузки данных, автоматическое обновление через Tableau API и обработка ошибок.",
        tags: ["Python", "Tableau", "Data", "Automation"],
      },
      pl: {
        title: "Automatyzacja dashboardów Tableau w Pythonie",
        content: "Koordynowanie ekstrakcji danych, automatyczne odświeżanie przez API Tableau i kontrola błędów.",
        tags: ["Python", "Tableau", "Data", "Automation"],
      },
      de: {
        title: "Tableau-Dashboards mit Python automatisieren",
        content: "Datenextraktionen, automatische Aktualisierungen über die Tableau-API und Fehlerkontrolle.",
        tags: ["Python", "Tableau", "Data", "Automation"],
      },
      fr: {
        title: "Automatiser les tableaux de bord Tableau avec Python",
        content: "Orchestration d'extractions de données, rafraîchissements automatiques via l'API Tableau et gestion des erreurs.",
        tags: ["Python", "Tableau", "Data", "Automation"],
      },
    },
  },
  {
    id: "flujo-cicd-github-actions",
    title: "Mi primer flujo de CI/CD con GitHub Actions",
    content: "Pipelines paso a paso para testear, compilar y desplegar automáticamente en cada push a main.",
    date: "23 may 2026",
    isoDate: "2026-05-23",
    img: "cicd-img.jpg",
    url: "article-flujo-cicd-github-actions",
    published: true,
    tags: ["CI/CD", "GitHub Actions", "DevOps"],
    likes: 0,
    translations: {
      en: {
        title: "My First CI/CD Pipeline with GitHub Actions",
        content: "Step-by-step pipelines to automatically test, build, and deploy on every push to main.",
        tags: ["CI/CD", "GitHub Actions", "DevOps"],
      },
      ru: {
        title: "Мой первый пайплайн CI/CD с GitHub Actions",
        content: "Пошаговые процессы для автоматического тестирования, сборки и деплоя при каждом пуше в main.",
        tags: ["CI/CD", "GitHub Actions", "DevOps"],
      },
      pl: {
        title: "Mój pierwszy pipeline CI/CD z GitHub Actions",
        content: "Przepływy krok po kroku do automatycznego testowania, budowania i wdrażania przy każdym pushu do main.",
        tags: ["CI/CD", "GitHub Actions", "DevOps"],
      },
      de: {
        title: "Mein erster CI/CD-Workflow mit GitHub Actions",
        content: "Schritt-für-Schritt-Pipelines zum automatischen Testen, Erstellen und Bereitstellen bei jedem Push.",
        tags: ["CI/CD", "GitHub Actions", "DevOps"],
      },
      fr: {
        title: "Mon premier pipeline CI/CD avec GitHub Actions",
        content: "Pipelines pas à pas pour tester, compiler et déployer automatiquement à chaque push sur main.",
        tags: ["CI/CD", "GitHub Actions", "DevOps"],
      },
    },
  },
  {
    id: "animaciones-gsap-interfaz",
    title: "Animaciones con GSAP que mejoran una interfaz",
    content: "Técnicas de ScrollTrigger, microinteracciones y parallax manteniendo 60fps y accesibilidad.",
    date: "23 jul 2026",
    isoDate: "2026-07-23",
    img: "gsap-img.jpg",
    url: "article-animaciones-gsap-interfaz",
    published: true,
    tags: ["GSAP", "CSS", "Animation", "Frontend"],
    likes: 0,
    translations: {
      en: {
        title: "GSAP Animations That Truly Enhance UI",
        content: "ScrollTrigger techniques, micro-interactions, and parallax while keeping 60fps and accessibility.",
        tags: ["GSAP", "CSS", "Animation", "Frontend"],
      },
      ru: {
        title: "Анимации с GSAP, улучшающие интерфейс",
        content: "Техники ScrollTrigger, микроинтеракции и параллакс с сохранением 60fps и доступности.",
        tags: ["GSAP", "CSS", "Animation", "Frontend"],
      },
      pl: {
        title: "Animacje z GSAP, które naprawdę ulepszają interfejs",
        content: "Techniki ScrollTrigger, mikrointerakcje i paralaksa przy zachowaniu 60 klatek na sekundę.",
        tags: ["GSAP", "CSS", "Animation", "Frontend"],
      },
      de: {
        title: "GSAP-Animationen, die UI wirklich verbessern",
        content: "ScrollTrigger-Techniken, Mikrointeraktionen und Parallaxe bei 60 fps und Barrierefreiheit.",
        tags: ["GSAP", "CSS", "Animation", "Frontend"],
      },
      fr: {
        title: "Animations avec GSAP qui subliment une interface",
        content: "Techniques de ScrollTrigger, micro-interactions et parallaxe en préservant 60fps et l'accessibilité.",
        tags: ["GSAP", "CSS", "Animation", "Frontend"],
      },
    },
  },
  {
    id: "tukicode-asistente-terminal",
    title: "Tukicode: construir un asistente de programación para la terminal",
    content: "Arquitectura, streaming de respuestas CLI, integración con LLMs locales o en la nube y lecciones aprendidas.",
    date: "23 sep 2026",
    isoDate: "2026-09-23",
    img: "tukicode-img.jpg",
    url: "article-tukicode-asistente-terminal",
    published: true,
    tags: ["CLI", "AI", "Python", "OpenSource"],
    likes: 0,
    translations: {
      en: {
        title: "Tukicode: Building a Terminal AI Coding Assistant",
        content: "Architecture, CLI streaming responses, local/cloud LLM integration, and lessons learned.",
        tags: ["CLI", "AI", "Python", "OpenSource"],
      },
      ru: {
        title: "Tukicode: создание терминального ИИ-ассистента",
        content: "Архитектура, потоковые ответы в CLI, интеграция локальных и облачных LLM и выводы.",
        tags: ["CLI", "AI", "Python", "OpenSource"],
      },
      pl: {
        title: "Tukicode: budowa asystenta kodowania w terminalu",
        content: "Architektura, strumieniowanie odpowiedzi w CLI, integracja lokalnych/chmurowych LLM i wnioski.",
        tags: ["CLI", "AI", "Python", "OpenSource"],
      },
      de: {
        title: "Tukicode: Einen Terminal-KI-Programmierassistenten bauen",
        content: "Architektur, CLI-Streaming-Antworten, Integration lokaler/Cloud-LLMs und Erkenntnisse.",
        tags: ["CLI", "AI", "Python", "OpenSource"],
      },
      fr: {
        title: "Tukicode : créer un assistant de code en terminal",
        content: "Architecture, streaming de réponses CLI, intégration de LLM locaux/cloud et retours d'expérience.",
        tags: ["CLI", "AI", "Python", "OpenSource"],
      },
    },
  },
];
