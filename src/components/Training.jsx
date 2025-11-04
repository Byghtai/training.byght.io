import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Cloud, Key, CheckCircle, Upload, Users, FileCheck, HelpCircle, Mail, ChevronRight, ChevronDown, Settings, Download, Folder, PlayCircle, Video, BookOpen, Play, Rocket } from 'lucide-react';
import ByghtLogo from '../assets/byght-logo.svg';
import VideoSection from './VideoSection';

const Training = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Load language from localStorage or default to 'de'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('training-language');
    return savedLanguage || 'de';
  });
  
  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('training-language', language);
  }, [language]);
  
  // FAQ collapse states
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Navigation states
  const [activeSection, setActiveSection] = useState('');
  
  // Refs for quote section
  const quoteRef = useRef(null);
  
  // Refs for sections
  const sectionRefs = useRef({});
  
  // Translations
  const translations = {
    de: {
      training: 'Training',
      logout: 'Logout',
      welcome: 'Herzlich willkommen',
      welcomeSubtitle: 'zum Einführungstraining in das ISMS SmartKit',
      einleitung: 'Einleitung',
      teil1: 'Teil I: ISO 27001',
      teil2: 'Teil II: Customizing & Berechtigungen',
      teil3: 'Teil III: Aufgabenbericht',
      teil4: 'Teil IV: Die ersten 10 Aufgaben',
      teil5: 'Teil V: Richtlinien und Dokumentenlenkung',
      teil6: 'Teil VI: ISO 27001 Self Assessment & Anwendbarkeitserklärung',
      teil7: 'Teil VII: Wie geht es weiter?',
      help: 'Hilfe benötigt?',
      faq: 'FAQs',
      navigation: 'Navigation',
      einleitungText1: 'Das ISMS SmartKit ist so konzipiert, dass ihr schnell und einfach ein zertifizierungsfähiges ISMS aufbauen könnt. Dabei spart ihr viel Zeit, weil alle Inhalte bereits vorhanden sind und ihr sofort loslegen könnt.',
      einleitungText2: 'Damit der Start möglichst effizient gelingt, haben wir für euch eine Reihe von kurzen und leicht verständlichen Lerninhalten vorbereitet. Ziel dieses Trainings ist, dass ihr genau wisst, wie ihr loslegen könnt – und wie euch das ISMS SmartKit dabei Schritt für Schritt unterstützt.',
      einleitungText3: 'Ein wichtiger Hinweis: Sollten während oder nach der Einführung Fragen auftauchen, zögert bitte nicht, uns jederzeit unter',
      einleitungText4: 'zu kontaktieren.',
      einleitungText5: 'Wir freuen uns sehr, euch auf dem Weg zu einem erfolgreichen ISMS zu begleiten.',
      einleitungText6: 'Wir wünschen euch nun viel Erfolg und gutes Gelingen bei der Arbeit mit dem ISMS SmartKit.',
      lessonsLearned: 'Lessons Learned',
      helpText: 'Wir helfen gerne weiter.',
      contact: '📧 Kontakt:',
      fullQuote: `„Man darf nie an die ganze Straße auf einmal denken, verstehst du? Man muss nur an den nächsten Schritt denken, an den nächsten Atemzug, an den nächsten Besenstrich. Und immer wieder nur an den nächsten." Wieder hielt er inne und überlegte, ehe er hinzufügte: „Dann macht es Freude; das ist wichtig, dann macht man seine Sache gut. Und so soll es sein."

Und abermals nach einer langen Pause fuhr er fort: „Auf einmal merkt man, dass man Schritt für Schritt die ganze Straße gemacht hat. Man hat gar nicht gemerkt wie, und man ist nicht außer Puste."

Er nickte vor sich hin und sagte abschließend: „Das ist wichtig."`,
      quoteAuthor: 'Beppo der Straßenkehrer',
      quoteSource: 'aus „Momo" von Michael Ende',
      quoteNote: 'Ein kleiner Moment der Besinnung nach dem Training'
    },
    en: {
      training: 'Training',
      logout: 'Logout',
      welcome: 'Welcome',
      welcomeSubtitle: 'to the ISMS SmartKit Introduction Training',
      einleitung: 'Introduction',
      teil1: 'Part I: ISO 27001',
      teil2: 'Part II: Customizing & Permissions',
      teil3: 'Part III: Task Report',
      teil4: 'Part IV: The First 10 Tasks',
      teil5: 'Part V: Policies and Document Control',
      teil6: 'Part VI: ISO 27001 Self Assessment & Statement of Applicability',
      teil7: 'Part VII: What\'s Next?',
      help: 'Need Help?',
      faq: 'FAQs',
      navigation: 'Navigation',
      einleitungText1: 'The ISMS SmartKit is designed so you can quickly and easily build a certifiable ISMS. This saves you a lot of time because all content is already available and you can start immediately.',
      einleitungText2: 'To ensure the start is as efficient as possible, we have prepared a series of short and easy-to-understand learning materials for you. The goal of this training is that you know exactly how to get started – and how the ISMS SmartKit supports you step by step.',
      einleitungText3: 'An important note: If questions arise during or after the introduction, please do not hesitate to contact us at any time at',
      einleitungText4: '.',
      einleitungText5: 'We are very happy to accompany you on your way to a successful ISMS.',
      einleitungText6: 'We wish you success and good luck in working with the ISMS SmartKit.',
      lessonsLearned: 'Lessons Learned',
      helpText: 'We are happy to help.',
      contact: '📧 Contact:',
      fullQuote: `"You must never think of the whole street at once, understand? You must only concentrate on the next step, the next breath, the next stroke of the broom." He paused again and reflected before adding: "That makes it fun; that's important, then you do your job well. And so it should be."

And after another long pause he continued: "Suddenly you notice that you've done the whole street step by step. You didn't notice how, and you're not out of breath."

He nodded to himself and said finally: "That's important."`,
      quoteAuthor: 'Beppo the Street Sweeper',
      quoteSource: 'from "Momo" by Michael Ende',
      quoteNote: 'A small moment of reflection after training'
    }
  };
  
  const t = translations[language];
  
  // Helper function for Lessons Learned translations
  const getLessonsLearned = (part) => {
    const lessons = {
      teil1: {
        de: {
          title: 'Lessons Learned',
          items: [
            {
              title: 'ISO 27001 Struktur',
              content: '<strong>Managementrahmen (Kapitel 4-10):</strong> Obligatorisch für alle Unternehmen, zu 100% im ISMS SmartKit abgedeckt.<br/><strong>Anhang A:</strong> 93 risikobasierte Maßnahmen, die angemessen umgesetzt werden können.'
            },
            {
              title: 'Kernprozesse',
              content: '<strong>Kontinuierliche Verbesserung</strong> ist das Herzstück. Die wichtigsten Kernprozesse: Risikomanagement, Interne Audits, Umgang mit Sicherheitsvorfällen, Schulung & Bewusstsein, Ziele & Kennzahlen.'
            },
            {
              title: 'Hauptaufwandstreiber',
              content: 'Richtlinien anpassen und kommunizieren, Risikobewertung durchführen, ISO 27001 Self-Assessment im Compliance-Modul. Diese Bereiche brauchen Zeit – lasst euch nicht entmutigen.'
            },
            {
              title: 'Realistische Zeitschätzung',
              content: '<strong>6-8 Monate</strong> von Tool-Einführung bis zertifizierungsfähiges ISMS. Wichtig: Einfach anfangen – mit jedem Schritt wird das Bild klarer. Das ISMS SmartKit als roten Faden nutzen.'
            }
          ]
        },
        en: {
          title: 'Lessons Learned',
          items: [
            {
              title: 'ISO 27001 Structure',
              content: '<strong>Management Framework (Chapters 4-10):</strong> Mandatory for all companies, 100% covered in ISMS SmartKit.<br/><strong>Annex A:</strong> 93 risk-based measures that can be appropriately implemented.'
            },
            {
              title: 'Core Processes',
              content: '<strong>Continuous Improvement</strong> is the heart. The most important core processes: Risk Management, Internal Audits, Handling Security Incidents, Training & Awareness, Objectives & Metrics.'
            },
            {
              title: 'Main Effort Drivers',
              content: 'Adapting and communicating policies, conducting risk assessments, ISO 27001 Self-Assessment in the Compliance module. These areas take time – don\'t be discouraged.'
            },
            {
              title: 'Realistic Time Estimate',
              content: '<strong>6-8 months</strong> from tool introduction to certifiable ISMS. Important: Just start – with each step the picture becomes clearer. Use ISMS SmartKit as a guide.'
            }
          ]
        }
      }
    };
    return lessons[part]?.[language] || lessons[part]?.de;
  };
  
  // Full quote text for typewriter animation (split into words)
  const fullQuote = t.fullQuote;
  const words = fullQuote.split(/(\s+)/);
  
  // Define navigation items
  const navigationItems = [
    { id: 'einleitung', title: t.einleitung, icon: Rocket },
    { id: 'teil1', title: t.teil1, icon: PlayCircle },
    { id: 'teil2', title: t.teil2, icon: PlayCircle },
    { id: 'teil3', title: t.teil3, icon: PlayCircle },
    { id: 'teil4', title: t.teil4, icon: PlayCircle },
    { id: 'teil5', title: t.teil5, icon: PlayCircle },
    { id: 'teil6', title: t.teil6, icon: PlayCircle },
    { id: 'teil7', title: t.teil7, icon: PlayCircle },
    { id: 'help', title: t.help, icon: Mail },
    { id: 'faq', title: t.faq, icon: HelpCircle }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      // Check which section is currently in view
      for (const item of navigationItems) {
        const element = sectionRefs.current[item.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);


  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src={ByghtLogo} alt="Byght Logo" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-byght-gray">{t.training}</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-byght-gray hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span>{t.logout}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-byght-gray p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-byght-gray hover:text-red-500 transition-colors py-2"
                >
                  <LogOut size={18} />
                  {t.logout}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - ISMS SmartKit Training */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t.welcome}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.welcomeSubtitle}
            </p>
          </div>

          {/* Einleitung */}
          <div id="einleitung" ref={(el) => sectionRefs.current['einleitung'] = el} className="mb-12">
            <div className="bg-gradient-to-r from-byght-turquoise/5 to-blue-50 border-l-4 border-byght-turquoise p-8 rounded-r-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Rocket className="text-byght-turquoise" size={28} />
                {t.einleitung}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">

                <p className="mb-4">
                  {t.einleitungText1}
                </p>
                <p className="mb-4">
                  {t.einleitungText2}
                </p>
                <p className="mb-4">
                  {language === 'de' ? (
                    <>
                      <strong>Ein wichtiger Hinweis:</strong> {t.einleitungText3}{' '}
                      <a href="mailto:fragen@byght.io" className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium">
                        fragen@byght.io
                      </a>{' '}
                      {t.einleitungText4}
                    </>
                  ) : (
                    <>
                      <strong>An important note:</strong> {t.einleitungText3}{' '}
                      <a href="mailto:fragen@byght.io" className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium">
                        fragen@byght.io
                      </a>
                      {t.einleitungText4}
                    </>
                  )}
                </p>
                <p className="mb-4">
                  {t.einleitungText5}
                </p>
                <p className="text-lg font-medium text-gray-800">
                  {t.einleitungText6}
                </p>
              </div>
            </div>
          </div>


          {/* Teil I: ISO 27001 */}
          <div id="teil1" ref={(el) => sectionRefs.current['teil1'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="text-byght-turquoise" size={28} />
              {t.teil1}
            </h2>
            <VideoSection videoId="NmJzswjKuWY" title={`ISMS SmartKit Training - ${t.teil1}`} language={language} />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                {t.lessonsLearned}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {language === 'de' ? 'ISO 27001 Struktur' : 'ISO 27001 Structure'}
                    </h4>
                    <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{
                      __html: language === 'de' 
                        ? '<strong>Managementrahmen (Kapitel 4-10):</strong> Obligatorisch für alle Unternehmen, zu 100% im ISMS SmartKit abgedeckt.<br/><strong>Anhang A:</strong> 93 risikobasierte Maßnahmen, die angemessen umgesetzt werden können.'
                        : '<strong>Management Framework (Chapters 4-10):</strong> Mandatory for all companies, 100% covered in ISMS SmartKit.<br/><strong>Annex A:</strong> 93 risk-based measures that can be appropriately implemented.'
                    }} />
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {language === 'de' ? 'Kernprozesse' : 'Core Processes'}
                    </h4>
                    <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{
                      __html: language === 'de'
                        ? '<strong>Kontinuierliche Verbesserung</strong> ist das Herzstück. Die wichtigsten Kernprozesse: Risikomanagement, Interne Audits, Umgang mit Sicherheitsvorfällen, Schulung & Bewusstsein, Ziele & Kennzahlen.'
                        : '<strong>Continuous Improvement</strong> is the heart. The most important core processes: Risk Management, Internal Audits, Handling Security Incidents, Training & Awareness, Objectives & Metrics.'
                    }} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {language === 'de' ? 'Hauptaufwandstreiber' : 'Main Effort Drivers'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'de'
                        ? 'Richtlinien anpassen und kommunizieren, Risikobewertung durchführen, ISO 27001 Self-Assessment im Compliance-Modul. Diese Bereiche brauchen Zeit – lasst euch nicht entmutigen.'
                        : 'Adapting and communicating policies, conducting risk assessments, ISO 27001 Self-Assessment in the Compliance module. These areas take time – don\'t be discouraged.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      {language === 'de' ? 'Realistische Zeitschätzung' : 'Realistic Time Estimate'}
                    </h4>
                    <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{
                      __html: language === 'de'
                        ? '<strong>6-8 Monate</strong> von Tool-Einführung bis zertifizierungsfähiges ISMS. Wichtig: Einfach anfangen – mit jedem Schritt wird das Bild klarer. Das ISMS SmartKit als roten Faden nutzen.'
                        : '<strong>6-8 months</strong> from tool introduction to certifiable ISMS. Important: Just start – with each step the picture becomes clearer. Use ISMS SmartKit as a guide.'
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil II: Customizing & Berechtigungen */}
          <div id="teil2" ref={(el) => sectionRefs.current['teil2'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="text-byght-turquoise" size={28} />
              {t.teil2}
            </h2>
            <VideoSection videoId="6xWxsVrqZpc" title={`ISMS SmartKit Training - ${t.teil2}`} language={language} />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                {t.lessonsLearned}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {language === 'de' ? 'Anpassung ohne Risiko' : 'Customization Without Risk'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Mut zum Customizing:' : 'Courage to Customize:'}</strong> {language === 'de' ? 'Das ISMS SmartKit kann nach euren Bedürfnissen angepasst werden – Logo einfügen, Bereichsnamen ändern. Keine Sorge: Ihr könnt kaum etwas kaputt machen. Bei Problemen: Seitenhistorie nutzen oder Support kontaktieren.' : 'The ISMS SmartKit can be adapted to your needs – add logo, change area names. Don\'t worry: You can hardly break anything. If problems occur: use page history or contact support.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {language === 'de' ? 'Template-Anpassung' : 'Template Customization'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Vollständig anpassbar:' : 'Fully customizable:'}</strong> {language === 'de' ? 'Alle Templates sind über Buttons wie "Neue Maßnahme erstellen" aufrufbar und können in den Bereichseinstellungen angepasst werden. Tabellenfelder hinzufügen oder entfernen – nur Administrationsrechte erforderlich.' : 'All templates are accessible via buttons like "Create new measure" and can be customized in area settings. Add or remove table fields – only administration rights required.'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {language === 'de' ? 'Berechtigungsstruktur' : 'Permission Structure'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Klare Rollenverteilung:' : 'Clear role distribution:'}</strong> {language === 'de' ? 'ISMS-Kernteam erhält Änderungsrechte, Rest des Unternehmens Leseberechtigungen. Zusätzlich Seitenberechtigungen über Schlosssymbol nutzen. So werden unbeabsichtigte Änderungen an Richtlinien verhindert.' : 'ISMS core team receives edit rights, rest of the company gets read permissions. Additionally use page permissions via lock symbol. This prevents unintended changes to policies.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      {language === 'de' ? 'Lizenz-Compliance' : 'License Compliance'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Nutzungsbeschränkung beachten:' : 'Note usage restrictions:'}</strong> {language === 'de' ? 'Compliance-Modul ist an vereinbarte Nutzeranzahl gebunden (ISO 27001 Urheberrechte). Nur vertraglich vereinbarte Anzahl Zugriff auf Compliance-Modul. Alle anderen Inhalte (Richtlinien) uneingeschränkt zugänglich.' : 'Compliance module is bound to agreed number of users (ISO 27001 copyrights). Only contractually agreed number has access to Compliance module. All other content (policies) is accessible without restrictions.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil III: Aufgabenbericht */}
          <div id="teil3" ref={(el) => sectionRefs.current['teil3'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="text-byght-turquoise" size={28} />
              {t.teil3}
            </h2>
            <VideoSection videoId="_EoVYcTIVVo" title={`ISMS SmartKit Training - ${t.teil3}`} language={language} />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                {t.lessonsLearned}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {language === 'de' ? 'Aufgabenbericht als roter Faden' : 'Task Report as a Guide'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'de' ? 'Der Aufgabenbericht führt Schritt für Schritt von Aufgabe 1 bis 48 durch das System und aggregiert alle Aufgaben im ISMS SmartKit in einer kompakten Übersicht. Er ist der rote Faden, der euch in den nächsten Wochen und Monaten an die Hand nimmt.' : 'The task report guides you step by step from task 1 to 48 through the system and aggregates all tasks in ISMS SmartKit in a compact overview. It is the guide that will accompany you in the coming weeks and months.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {language === 'de' ? 'Organisations-Modul als Startpunkt' : 'Organization Module as Starting Point'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'de' ? 'Die ersten Aufgaben befinden sich alle im Organisations-Modul. Dort wird der Rahmen für das Managementsystem festgelegt: Geltungsbereich, Verantwortlichkeiten, Ressourcen und Ziele der Informationssicherheit.' : 'The first tasks are all in the Organization module. There, the framework for the management system is established: scope, responsibilities, resources and objectives of information security.'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {language === 'de' ? 'Verantwortlichkeiten und Zieldaten festlegen' : 'Set Responsibilities and Target Dates'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'de' ? 'Über das User-Icon oben rechts können alle zugewiesenen Aufgaben eingesehen werden. Für die ersten 10 Aufgaben sollten Verantwortlichkeiten und Zieldaten festgelegt werden. Mit @ Personen erwähnen und mit // Zieldaten aus dem Date-Picker wählen.' : 'Via the user icon in the top right, all assigned tasks can be viewed. For the first 10 tasks, responsibilities and target dates should be set. Mention people with @ and select target dates with // from the date picker.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      {language === 'de' ? 'Automatische Benachrichtigungen' : 'Automatic Notifications'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'de' ? 'Durch das Erwähnen von Personen mit @ wird automatisch die Glocke aktiviert, E-Mails verschickt und die Aufgaben erscheinen unter den eigenen Aufgaben. Unteraufgaben können definiert werden, um vordefinierte Aufgaben an die eigene Struktur anzupassen.' : 'By mentioning people with @, the bell is automatically activated, emails are sent and tasks appear under your own tasks. Sub-tasks can be defined to adapt predefined tasks to your own structure.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil IV: Die ersten 10 Aufgaben */}
          <div id="teil4" ref={(el) => sectionRefs.current['teil4'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="text-byght-turquoise" size={28} />
              {t.teil4}
            </h2>
            <VideoSection videoId="nws-G0BABrE" title={`ISMS SmartKit Training - ${t.teil4}`} language={language} />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                {t.lessonsLearned}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {language === 'de' ? 'Viel lernen mit den ersten 10 Aufgaben' : 'Learn a Lot with the First 10 Tasks'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'de' ? 'Mit den ersten 10 Aufgaben lernt ihr bereits viel über euer ISMS, indem ihr Rollen und Verantwortlichkeiten festlegt und den Geltungsbereich definiert.' : 'With the first 10 tasks, you already learn a lot about your ISMS by setting roles and responsibilities and defining the scope.'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {language === 'de' ? 'Kostenfreies ISMS-Coaching' : 'Free ISMS Coaching'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'de' ? (
                        <>
                          Am besten bucht ihr nach Abschluss der ersten 10 Aufgaben unser kostenfreies ISMS-Coaching. In diesem klären wir offene Fragen, geben Feedback und stimmen die nächsten Schritte mit euch ab. Am Ende des Trainings findet ihr den Link dazu{' '}
                          <a 
                            href="#todo-terminbuchung" 
                            className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium underline"
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById('todo-terminbuchung');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                          >
                            (→ hier)
                          </a>.
                        </>
                      ) : (
                        <>
                          It's best to book our free ISMS coaching after completing the first 10 tasks. In this, we clarify open questions, provide feedback and coordinate the next steps with you. At the end of the training you'll find the link{' '}
                          <a 
                            href="#todo-terminbuchung" 
                            className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium underline"
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById('todo-terminbuchung');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                          >
                            (→ here)
                          </a>.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil V: Richtlinien und Dokumentenlenkung */}
          <div id="teil5" ref={(el) => sectionRefs.current['teil5'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="text-byght-turquoise" size={28} />
              {t.teil5}
            </h2>
            <VideoSection videoId="pzs09t-Aooo" title={`ISMS SmartKit Training - ${t.teil5}`} language={language} />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                {t.lessonsLearned}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {language === 'de' ? 'Richtlinien-Anpassung unterschiedlicher Komplexität' : 'Policy Adaptation of Different Complexity'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Unterschiedlicher Aufwand:' : 'Different effort:'}</strong> {language === 'de' ? 'Einige Richtlinien erfordern mehr Aufwand – besonders bei Reviews und Anpassungen an den Unternehmenskontext. Andere beziehen sich direkt auf ISMS-Module (z.B. Risikomanagement, Audits, Organisation) – hier kommt ihr schneller voran.' : 'Some policies require more effort – especially during reviews and adaptations to the company context. Others relate directly to ISMS modules (e.g., risk management, audits, organization) – here you make faster progress.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {language === 'de' ? 'Richtlinien an Realität anpassen' : 'Adapt Policies to Reality'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Gelebte Praxis statt Perfektion:' : 'Lived practice instead of perfection:'}</strong> {language === 'de' ? 'Richtlinien sollten immer an die Realität eures Unternehmens angepasst werden. Mit gesundem Menschenverstand ist es in Ordnung, wenn das Sicherheitsniveau etwas unter den Standardformulierungen liegt. Entscheidend: Die Dokumente müssen gelebte Praxis widerspiegeln – lieber Verbesserungsvorschläge von Auditoren als perfekte Richtlinien, die nicht zur täglichen Arbeit passen.' : 'Policies should always be adapted to your company\'s reality. With common sense, it\'s okay if the security level is somewhat below the standard formulations. Key point: Documents must reflect lived practice – better improvement suggestions from auditors than perfect policies that don\'t fit daily work.'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {language === 'de' ? 'Confluence Funktionen und Versionshistorie' : 'Confluence Functions and Version History'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Ansichts- und Edit-Modus:' : 'View and Edit mode:'}</strong> {language === 'de' ? 'Im Ansichtsmodus Kommentare abgeben (Inline oder am Seitenende), im Edit-Modus Inhalte wie in Word bearbeiten. Über die Seitenhistorie Änderungen nachvollziehen, Versionen vergleichen und wiederherstellen. ' : 'In view mode, add comments (inline or at page end), in edit mode, edit content like in Word. Use page history to track changes, compare versions and restore. '}
                      <strong>{language === 'de' ? 'Tipp:' : 'Tip:'}</strong> {language === 'de' ? 'Versionshistorie bei erstmaliger Erstellung ignorieren, später bereinigen.' : 'Ignore version history during initial creation, clean up later.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      {language === 'de' ? 'Änderungskommentare und Kommunikation' : 'Change Comments and Communication'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Änderungskommentare verwenden:' : 'Use change comments:'}</strong> {language === 'de' ? 'Bei Anpassungen und Freigaben immer Kommentare hinterlassen (z.B. "Freigabe durch Geschäftsführung" oder "Kapitel Passwortsicherheit angepasst"). Richtlinien müssen kommuniziert und geschult werden – für bestehende Mitarbeitende ebenso wie für neue. Onboarding-Prozess entsprechend anpassen.' : 'Always leave comments for adjustments and approvals (e.g., "Approval by management" or "Password security chapter adapted"). Policies must be communicated and trained – for existing employees as well as new ones. Adapt onboarding process accordingly.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil VI: ISO 27001 Self Assessment & Anwendbarkeitserklärung */}
          <div id="teil6" ref={(el) => sectionRefs.current['teil6'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="text-byght-turquoise" size={28} />
              {t.teil6}
            </h2>
            <VideoSection videoId="Tfoo0Smrx5E" title={`ISMS SmartKit Training - ${t.teil6}`} language={language} />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                {t.lessonsLearned}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {language === 'de' ? 'Timing des Self-Assessments' : 'Timing of Self-Assessment'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Optimale Zeit:' : 'Optimal time:'}</strong> {language === 'de' ? 'Beste Vorbereitung auf ein Zertifizierungsaudit. Nicht ganz am Anfang machen (fehlender Kontext), aber auch nicht erst kurz vor dem Audit (daraus entstehen meist noch konkrete Maßnahmen). Im ISMS SmartKit daher etwa in der Mitte der Implementierungsphase vorgesehen.' : 'Best preparation for a certification audit. Don\'t do it right at the beginning (missing context), but also not just before the audit (this usually leads to concrete measures). In ISMS SmartKit therefore planned around the middle of the implementation phase.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {language === 'de' ? 'SPICE-Reifegradmodell' : 'SPICE Maturity Model'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Bewertungsskala 0-5:' : 'Rating scale 0-5:'}</strong> {language === 'de' ? 'Orientierung am SPICE-Reifegradmodell (0 = "Unvollständig" bis 5 = "Optimierend"). Typisch bei Erstzertifizierung: Viele Bereiche auf Reifegrad 2 (Gesteuert), gute Praxis auf 3, Entwicklungsbedarf auch auf 1 in Ordnung. Entscheidend: nachhaltige Verbesserung, nicht Höchstwerte.' : 'Orientation on SPICE maturity model (0 = "Incomplete" to 5 = "Optimizing"). Typical for first certification: Many areas at maturity level 2 (Managed), good practice at 3, development needs at 1 are also fine. Key: sustainable improvement, not maximum values.'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {language === 'de' ? 'Anwendbarkeitserklärung (SoA)' : 'Statement of Applicability (SoA)'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Automatische Erstellung:' : 'Automatic creation:'}</strong> {language === 'de' ? 'Die Anwendbarkeitserklärung (Statement of Applicability, SoA) wird automatisch aus dem Self-Assessment erzeugt. Sie zeigt angewendete/nicht angewendete Controls und deren Begründung. Zentrales Dokument im Zertifizierungsaudit.' : 'The Statement of Applicability (SoA) is automatically generated from the self-assessment. It shows applied/non-applied controls and their justification. Central document in the certification audit.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      {language === 'de' ? 'Aufwand und Nutzen' : 'Effort and Benefit'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Lohnt sich:' : 'Worth it:'}</strong> {language === 'de' ? 'Neben Richtlinien und Risikomanagement gehört das Self-Assessment zu den größeren Aufwandstreibern. Aber es lohnt sich: Ihr bekommt ein klares, objektives Bild eures Umsetzungsstands und könnt gezielt priorisieren. In vielen Controls sind bereits Nachweise verlinkt, eigene können ergänzt werden.' : 'Along with policies and risk management, self-assessment is one of the larger effort drivers. But it\'s worth it: You get a clear, objective picture of your implementation status and can prioritize strategically. In many controls, evidence is already linked, your own can be added.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Teil VII: Wie geht es weiter? */}
          <div id="teil7" ref={(el) => sectionRefs.current['teil7'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="text-byght-turquoise" size={28} />
              {t.teil7}
            </h2>
            <VideoSection videoId="UwfbpFQUibw" title={`ISMS SmartKit Training - ${t.teil7}`} language={language} />
            
            {/* Calendly Link - ToDo */}
            <div id="todo-terminbuchung" className="mt-8 mb-8 bg-white border-2 border-dashed border-orange-400 p-6 rounded-lg shadow-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📋</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-3 text-lg">
                    {language === 'de' ? 'ToDo: Terminbuchung' : 'ToDo: Booking'}
                  </h4>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {language === 'de' ? 'Du bist etwa mit den ersten 10 Aufgaben durch? Dann bucht das kostenfreie ISMS Coaching mit Byght.' : 'Have you completed the first 10 tasks? Then book the free ISMS coaching with Byght.'}
                  </p>
                  <a 
                    href="https://calendly.com/d/cmt4-tx9-fqf/einfuhrung-follow-up" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors shadow-md hover:shadow-lg"
                  >
                    <span>{language === 'de' ? 'ISMS Coaching buchen' : 'Book ISMS Coaching'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Wissensbereich Link */}
            <div className="mt-6 bg-gradient-to-r from-byght-turquoise/5 to-blue-50 border-l-4 border-byght-turquoise p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="text-byght-turquoise" size={20} />
                {language === 'de' ? 'Weitere Lerninhalte' : 'Additional Learning Content'}
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                {language === 'de' ? 'Vertiefe dein Wissen mit zusätzlichen Lerninhalten zum ISMS-Aufbau:' : 'Deepen your knowledge with additional learning content on ISMS development:'}
              </p>
              <a 
                href="https://byght.io/iso_27001_wissen/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-byght-turquoise hover:text-byght-turquoise/80 font-medium text-sm transition-colors"
              >
                <span>{language === 'de' ? 'ISO 27001 Wissen' : 'ISO 27001 Knowledge'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                {t.lessonsLearned}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {language === 'de' ? 'Support bei Fragen' : 'Support for Questions'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Kostenloser Support:' : 'Free Support:'}</strong> {language === 'de' ? 'Bei Fragen zum Produkt oder ISO-Themen steht der Support unter' : 'For questions about the product or ISO topics, support is available at'}{' '}
                      <a href="mailto:fragen@byght.io" className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium">
                        fragen@byght.io
                      </a>
                      {language === 'de' ? ' zur Verfügung. Für Mietkunden ist dieser Support inklusive.' : '. For rental customers, this support is included.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {language === 'de' ? 'ISMS Coaching nach Aufgabe 10' : 'ISMS Coaching After Task 10'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Kostenfreies Coaching:' : 'Free Coaching:'}</strong> {language === 'de' ? 'Nach den ersten 10 Aufgaben des Aufgabenberichts sollte das kostenfreie ISMS Coaching mit Byght gebucht werden. Agenda: offene Fragen, Feedback zum Erarbeiteten und Abstimmung der nächsten Schritte.' : 'After the first 10 tasks of the task report, the free ISMS coaching with Byght should be booked. Agenda: open questions, feedback on what has been worked on and coordination of next steps.'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {language === 'de' ? 'Weitere Lerninhalte' : 'Additional Learning Content'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Wissensbereich:' : 'Knowledge Base:'}</strong> {language === 'de' ? 'Zusätzliche Lerninhalte zum ISMS-Aufbau finden sich im Wissensbereich auf byght.io. Der Link ist unter dem Video verfügbar.' : 'Additional learning content on ISMS development can be found in the knowledge base on byght.io. The link is available below the video.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      {language === 'de' ? 'ISO 27001 Vertiefungskurs' : 'ISO 27001 Advanced Course'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>{language === 'de' ? 'Spezialisierung:' : 'Specialization:'}</strong> {language === 'de' ? 'Für Informationssicherheitsbeauftragte gibt es den ISO 27001 Vertiefungskurs (2,5h, 550€, inkl. Zertifikat). Vertieft praktische Anwendung des ISO-Standards und Risikomanagement-Prozess.' : 'For information security officers, there is the ISO 27001 Advanced Course (2.5h, 550€, incl. certificate). Deepens practical application of the ISO standard and risk management process.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Hilfe benötigt? */}
          <div id="help" ref={(el) => sectionRefs.current['help'] = el} className="mb-8 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-byght-turquoise" size={24} />
              {t.help}
            </h2>
            <p className="text-gray-600">
              {t.helpText}
            </p>
            <p className="mt-3">
              <strong className="text-gray-800">{t.contact}</strong>{' '}
              <a href="mailto:Fragen@byght.io" className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium">
                Fragen@byght.io
              </a>
            </p>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mb-8"></div>

          {/* FAQs */}
          <div id="faq" ref={(el) => sectionRefs.current['faq'] = el} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-500" size={24} />
              {t.faq}
            </h2>
            
            <div className="space-y-3">
              {/* ISO 27001 Frage */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('iso27001')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    {language === 'de' ? 'Sollte ich selber eine Version der ISO 27001 besitzen?' : 'Should I own a copy of ISO 27001?'}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'iso27001' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'iso27001' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      {language === 'de' ? 'Ja. Solltet ihr eine Zertifizierung anstreben, solltet ihr eine mindestens eine Version der ISO 27001 selber besitzen.' : 'Yes. If you are aiming for certification, you should own at least one version of ISO 27001 yourself.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
          
          {/* Right Navigation */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Menu size={20} />
                    {t.navigation}
                  </h3>
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 text-byght-gray hover:text-byght-turquoise transition-colors p-1"
                    title={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
                  >
                    <span className="text-xl">{language === 'de' ? '🇬🇧' : '🇩🇪'}</span>
                  </button>
                </div>
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                          activeSection === item.id
                            ? 'bg-byght-turquoise text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        {/* Easter Egg - Beppo der Straßenkehrer Zitat im Hintergrund */}
        <div className="mt-20 text-center" ref={quoteRef}>
          <style>{`
            @keyframes fadeInWord {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .quote-word {
              display: inline;
              opacity: 0;
              animation: fadeInWord 0.6s ease-out forwards;
            }
          `}</style>
          
          <div className="max-w-3xl mx-auto">
            <div className="text-gray-600 text-base font-medium mb-2 tracking-wide">
              {t.quoteAuthor}
            </div>
            <div className="text-gray-400 text-xs mb-8 italic">
              {t.quoteSource}
            </div>
            <div className="text-gray-600 text-lg italic leading-relaxed mb-8 whitespace-pre-line">
              {fullQuote.split(/(\s+)/).map((word, index) => (
                <span 
                  key={index} 
                  className="quote-word"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="text-gray-400 text-xs mt-6 flex items-center justify-center gap-2">
              <span className="text-lg">🧹</span>
              <span>{t.quoteNote}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Training;
