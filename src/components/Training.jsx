import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Cloud, Key, CheckCircle, Upload, Users, FileCheck, HelpCircle, Mail, ChevronRight, ChevronDown, Settings, Download, Folder } from 'lucide-react';
import ByghtLogo from '../assets/byght-logo.svg';
import VideoSection from './VideoSection';

const Training = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // FAQ collapse states
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Navigation states
  const [activeSection, setActiveSection] = useState('');
  
  // Refs for sections
  const sectionRefs = useRef({});
  
  // Define navigation items
  const navigationItems = [
    { id: 'einleitung', title: 'Einleitung', icon: Users },
    { id: 'teil1', title: 'Teil I: ISO 27001', icon: Upload },
    { id: 'teil2', title: 'Teil II: Customizing & Berechtigungen', icon: Settings },
    { id: 'teil3', title: 'Teil III: Aufgabenbericht', icon: FileCheck },
    { id: 'teil4', title: 'Teil IV: Die ersten 10 Aufgaben', icon: CheckCircle },
    { id: 'teil5', title: 'Teil V: Richtlinien und Dokumentenlenkung', icon: Folder },
    { id: 'teil6', title: 'Teil VI: ISO 27001 Self Assessment & Anwendbarkeitserklärung', icon: Cloud },
    { id: 'teil7', title: 'Teil VII: Fortlaufende Verbesserung und Maßnahmen', icon: Key },
    { id: 'teil8', title: 'Teil VIII: Wie geht es weiter?', icon: HelpCircle },
    { id: 'help', title: 'Hilfe benötigt?', icon: Mail },
    { id: 'faq', title: 'FAQs', icon: HelpCircle }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
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
  }, []);

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
                <h1 className="text-xl font-semibold text-byght-gray">Training</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-byght-gray hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
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
                  Logout
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
              Herzlich willkommen
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              zum Einführungstraining in das ISMS SmartKit
            </p>
          </div>

          {/* Einleitung */}
          <div id="einleitung" ref={(el) => sectionRefs.current['einleitung'] = el} className="mb-12">
            <div className="bg-gradient-to-r from-byght-turquoise/5 to-blue-50 border-l-4 border-byght-turquoise p-8 rounded-r-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="text-byght-turquoise" size={28} />
                Einleitung
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">

                <p className="mb-4">
                  Das ISMS SmartKit ist so konzipiert, dass ihr schnell und einfach ein zertifizierungsfähiges ISMS aufbauen könnt. Dabei spart ihr viel Zeit, weil alle Inhalte bereits vorhanden sind und ihr sofort loslegen könnt.
                </p>
                <p className="mb-4">
                  Damit der Start möglichst effizient gelingt, haben wir für euch eine Reihe von kurzen und leicht verständlichen Lerninhalten vorbereitet. Ziel dieses Trainings ist, dass ihr genau wisst, wie ihr loslegen könnt – und wie euch das ISMS SmartKit dabei Schritt für Schritt unterstützt.
                </p>
                <p className="mb-4">
                  <strong>Ein wichtiger Hinweis:</strong> Sollten während oder nach der Einführung Fragen auftauchen, zögert bitte nicht, uns jederzeit unter{' '}
                  <a href="mailto:fragen@byght.io" className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium">
                    fragen@byght.io
                  </a>{' '}
                  zu kontaktieren.
                </p>
                <p className="mb-4">
                  Wir freuen uns sehr, euch auf dem Weg zu einem erfolgreichen ISMS zu begleiten.
                </p>
                <p className="text-lg font-medium text-gray-800">
                  Wir wünschen euch nun viel Erfolg und gutes Gelingen bei der Arbeit mit dem ISMS SmartKit.
                </p>
              </div>
            </div>
          </div>


          {/* Teil I: ISO 27001 */}
          <div id="teil1" ref={(el) => sectionRefs.current['teil1'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Upload className="text-byght-turquoise" size={28} />
              Teil I: ISO 27001
            </h2>
            <VideoSection />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      ISO 27001 Struktur
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Managementrahmen (Kapitel 4-10):</strong> Obligatorisch für alle Unternehmen, zu 100% im ISMS SmartKit abgedeckt.<br/>
                      <strong>Anhang A:</strong> 93 risikobasierte Maßnahmen, die angemessen umgesetzt werden können.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Kernprozesse
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Kontinuierliche Verbesserung</strong> ist das Herzstück. Die wichtigsten Kernprozesse: Risikomanagement, Interne Audits, Umgang mit Sicherheitsvorfällen, Schulung & Bewusstsein, Ziele & Kennzahlen.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Hauptaufwandstreiber
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Richtlinien anpassen und kommunizieren, Risikobewertung durchführen, ISO 27001 Self-Assessment im Compliance-Modul. Diese Bereiche brauchen Zeit – lasst euch nicht entmutigen.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Realistische Zeitschätzung
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>6-8 Monate</strong> von Tool-Einführung bis zertifizierungsfähiges ISMS. Wichtig: Einfach anfangen – mit jedem Schritt wird das Bild klarer. Das ISMS SmartKit als roten Faden nutzen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil II: Customizing & Berechtigungen */}
          <div id="teil2" ref={(el) => sectionRefs.current['teil2'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Settings className="text-byght-turquoise" size={28} />
              Teil II: Customizing & Berechtigungen
            </h2>
            <VideoSection videoId="6xWxsVrqZpc" title="ISMS SmartKit Training - Customizing & Berechtigungen" />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Anpassung ohne Risiko
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Mut zum Customizing:</strong> Das ISMS SmartKit kann nach euren Bedürfnissen angepasst werden – Logo einfügen, Bereichsnamen ändern. Keine Sorge: Ihr könnt kaum etwas kaputt machen. Bei Problemen: Seitenhistorie nutzen oder Support kontaktieren.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Template-Anpassung
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Vollständig anpassbar:</strong> Alle Templates sind über Buttons wie "Neue Maßnahme erstellen" aufrufbar und können in den Bereichseinstellungen angepasst werden. Tabellenfelder hinzufügen oder entfernen – nur Administrationsrechte erforderlich.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Berechtigungsstruktur
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Klare Rollenverteilung:</strong> ISMS-Kernteam erhält Änderungsrechte, Rest des Unternehmens Leseberechtigungen. Zusätzlich Seitenberechtigungen über Schlosssymbol nutzen. So werden unbeabsichtigte Änderungen an Richtlinien verhindert.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Lizenz-Compliance
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Nutzungsbeschränkung beachten:</strong> Compliance-Modul ist an vereinbarte Nutzeranzahl gebunden (ISO 27001 Urheberrechte). Nur vertraglich vereinbarte Anzahl Zugriff auf Compliance-Modul. Alle anderen Inhalte (Richtlinien) uneingeschränkt zugänglich.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil III: Aufgabenbericht */}
          <div id="teil3" ref={(el) => sectionRefs.current['teil3'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FileCheck className="text-byght-turquoise" size={28} />
              Teil III: Aufgabenbericht
            </h2>
            <VideoSection videoId="_EoVYcTIVVo" title="ISMS SmartKit Training - Aufgabenbericht" />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Aufgabenbericht als roter Faden
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Der Aufgabenbericht führt Schritt für Schritt von Aufgabe 1 bis 48 durch das System und aggregiert alle Aufgaben im ISMS SmartKit in einer kompakten Übersicht. Er ist der rote Faden, der euch in den nächsten Wochen und Monaten an die Hand nimmt.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Organisations-Modul als Startpunkt
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Die ersten Aufgaben befinden sich alle im Organisations-Modul. Dort wird der Rahmen für das Managementsystem festgelegt: Geltungsbereich, Verantwortlichkeiten, Ressourcen und Ziele der Informationssicherheit.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Verantwortlichkeiten und Zieldaten festlegen
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Über das User-Icon oben rechts können alle zugewiesenen Aufgaben eingesehen werden. Für die ersten 10 Aufgaben sollten Verantwortlichkeiten und Zieldaten festgelegt werden. Mit @ Personen erwähnen und mit // Zieldaten aus dem Date-Picker wählen.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Automatische Benachrichtigungen
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Durch das Erwähnen von Personen mit @ wird automatisch die Glocke aktiviert, E-Mails verschickt und die Aufgaben erscheinen unter den eigenen Aufgaben. Unteraufgaben können definiert werden, um vordefinierte Aufgaben an die eigene Struktur anzupassen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil IV: Die ersten 10 Aufgaben */}
          <div id="teil4" ref={(el) => sectionRefs.current['teil4'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle className="text-byght-turquoise" size={28} />
              Teil IV: Die ersten 10 Aufgaben
            </h2>
            <VideoSection />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Vorlagen als lebende Dokumente
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Anpassung ist erwünscht:</strong> Alle Vorlagen sind bewusst anpassbar und müssen auf den Unternehmenskontext zugeschnitten werden. Sie sind lebende Dokumente, die Jahr für Jahr mit Erfahrungen und Alltagserkenntnissen weiterentwickelt werden.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Organisationsdiagramm flexibel handhaben
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Upload oder Verlinkung:</strong> Das Organisationsdiagramm kann direkt hochgeladen und eingebettet oder einfach verlinkt werden. Wichtig: Rollen und Verantwortlichkeiten im ISMS und Datenschutz müssen dargestellt sein.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Bestellungsurkunden als Nachweis
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Audit-Nachweis:</strong> Die Bestellungsurkunde für den Informationssicherheitsbeauftragten ist meist ein wichtiger Nachweis in Zertifizierungsaudits. Wichtig: Von Geschäftsführung und ISB unterschreiben lassen und im ISMS SmartKit ablegen.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Geltungsbereich prägnant formulieren
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Klare Definition:</strong> Der Geltungsbereich definiert, welche Teile des Unternehmens und welche Tätigkeiten vom ISMS erfasst werden. Formulierung prägnant halten und an Beispielen orientieren. Wird oft mehrmals angepasst, bis die finale Version steht.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil V: Richtlinien und Dokumentenlenkung */}
          <div id="teil5" ref={(el) => sectionRefs.current['teil5'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Folder className="text-byght-turquoise" size={28} />
              Teil V: Richtlinien und Dokumentenlenkung
            </h2>
            <VideoSection />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Lorem Ipsum Dolor
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Consectetur Adipiscing
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Sed Do Eiusmod
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Tempor Incididunt
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil VI: ISO 27001 Self Assessment & Anwendbarkeitserklärung */}
          <div id="teil6" ref={(el) => sectionRefs.current['teil6'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Cloud className="text-byght-turquoise" size={28} />
              Teil VI: ISO 27001 Self Assessment & Anwendbarkeitserklärung
            </h2>
            <VideoSection />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Lorem Ipsum Dolor
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Consectetur Adipiscing
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Sed Do Eiusmod
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Tempor Incididunt
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil VII: Fortlaufende Verbesserung und Maßnahmen */}
          <div id="teil7" ref={(el) => sectionRefs.current['teil7'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Key className="text-byght-turquoise" size={28} />
              Teil VII: Fortlaufende Verbesserung und Maßnahmen
            </h2>
            <VideoSection />
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Lorem Ipsum Dolor
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Consectetur Adipiscing
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Sed Do Eiusmod
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Tempor Incididunt
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teil VIII: Wie geht es weiter? */}
          <div id="teil8" ref={(el) => sectionRefs.current['teil8'] = el} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <HelpCircle className="text-byght-turquoise" size={28} />
              Teil VIII: Wie geht es weiter?
            </h2>
            <VideoSection />
            
            {/* Wissensbereich Link */}
            <div className="mt-8 bg-gradient-to-r from-byght-turquoise/5 to-blue-50 border-l-4 border-byght-turquoise p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="text-byght-turquoise" size={20} />
                Weitere Lerninhalte
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Vertiefe dein Wissen mit zusätzlichen Lerninhalten zum ISMS-Aufbau:
              </p>
              <a 
                href="https://byght.io/iso_27001_wissen/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-byght-turquoise hover:text-byght-turquoise/80 font-medium text-sm transition-colors"
              >
                <span>ISO 27001 Wissen</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            {/* Lessons Learned */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Lessons Learned
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Support bei Fragen
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Kostenloser Support:</strong> Bei Fragen zum Produkt oder ISO-Themen steht der Support unter{' '}
                      <a href="mailto:fragen@byght.io" className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium">
                        fragen@byght.io
                      </a>{' '}
                      zur Verfügung. Für Mietkunden ist dieser Support inklusive.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      ISMS Coaching nach Aufgabe 10
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Kostenfreies Coaching:</strong> Nach den ersten 10 Aufgaben des Aufgabenberichts sollte das kostenfreie ISMS Coaching mit Byght gebucht werden. Agenda: offene Fragen, Feedback zum Erarbeiteten und Abstimmung der nächsten Schritte.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Weitere Lerninhalte
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Wissensbereich:</strong> Zusätzliche Lerninhalte zum ISMS-Aufbau finden sich im Wissensbereich auf byght.io. Der Link ist unter dem Video verfügbar.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      ISO 27001 Vertiefungskurs
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Spezialisierung:</strong> Für Informationssicherheitsbeauftragte gibt es den ISO 27001 Vertiefungskurs (2,5h, 550€, inkl. Zertifikat). Vertieft praktische Anwendung des ISO-Standards und Risikomanagement-Prozess.
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
              Hilfe benötigt?
            </h2>
            <p className="text-gray-600">
              Wir helfen gerne weiter.
            </p>
            <p className="mt-3">
              <strong className="text-gray-800">📧 Kontakt:</strong>{' '}
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
              FAQs
            </h2>
            
            <div className="space-y-3">
              {/* Sample Question 1 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample1')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Beispiel-Frage 1
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample1' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample1' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Beispiel-Antwort 1
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Question 2 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample2')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Beispiel-Frage 2
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample2' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample2' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Beispiel-Antwort 2
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Question 3 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample3')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Beispiel-Frage 3
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample3' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample3' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Beispiel-Antwort 3
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Question 4 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample4')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Beispiel-Frage 4
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample4' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample4' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Beispiel-Antwort 4
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Menu size={20} />
                  Navigation
                </h3>
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
                        <Icon size={16} />
                        <span className="text-sm font-medium">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Training;
