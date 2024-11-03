import React, { useState } from "react";
import MeasureCard from "./MeasureCard";
import MeasureDetailsModal from "./MeasureDetailsModal";

// Define types for props
interface Measure {
  title: string;
  sector: string;
  priority: number;
  code: string;
  description: string;
}

interface MeasuresGridProps {
  selectedPriorities: number[];
  selectedSectors: string[];
}

const MeasuresGrid: React.FC<MeasuresGridProps> = ({
  selectedPriorities,
  selectedSectors,
}) => {
  const measures: Measure[] = [
    {
      title: "Bau von Windenergieanlagen ermöglichen und unterstützen",
      sector: "Strom",
      priority: 3,
      code: "TOP001",
      description: `
      Meistens sind die überkommunalen Regionalverbände für die Ausweisung der Windkraftstandorten
      zuständig. Jedes Bundesland hat aus dem 2%-Bundesziel eigene Ausbauziele. [NEWLINE]

      • Kommunen können Windenergieflächen in den Flächennutzungsplänen ausweisen, wenn der
      Raumordnungsplan das nicht verbietet. Sie können Positivflächen für die Windenergienutzung durch die
      Bauleitplanung ausweisen und so den Ausbau beschleunigen. [NEWLINE]

      • Der Gemeinderat kann auf den jeweiligen Regionalverband einwirken, um den Regionalplan für die
      Windenergie neu aufzustellen, um regionaler Potenziale (über regionale FNP) auszuweisen.
      `,
    },
    {
      title: "Bau von PV-Flächenanlagen ermöglichen und unterstützen",
      sector: "Strom",
      priority: 3,
      code: "TOP002",
      description: `
      Die Verwaltung und Kommunalpolitik kann den Ausbau von Freiflächen-PV ermöglichen und beschleunigen: [NEWLINE]

      • Durchführung einer Solarpotenzialanalyse für Freiflächen-Solaranlagen und Ausweisung von
      Vorzugsflächen. Durch die Solarpotenzialanalyse wird der Bau beschleunigt, wenn die Bauleitplanungen
      der jeweiligen Anlagen planungsrechtlich Vorrang gegenüber anderen Vorhaben bekommen. Somit
      entsteht eine Planungssicherheit z.B. ggü. Investoren. [NEWLINE]

      • Unterschiedliche Finanzierungsmöglichkeiten aufzeigen: Durch die Gründung / Unterstützung von
      BürgerEnergiegenossenschaften Gewinn-Beteiligung der Bürger:innen vor Ort ermöglichen [NEWLINE]

      • Naturverträgliche Gestaltung der Solarparks [NEWLINE]

      • Kontaktierung und Aktivierung der Eigentümer:innen der Flächen / als Eigentümerin der Freiflächen den
      Ausbau von Freiflächen-PV selbst voran bringen.
      `,
    },
    {
      title: "Belegung aller Kommunen-eigenen Dachflächen mit PV-Anlagen",
      sector: "Strom",
      priority: 3,
      code: "TOP003",
      description: `
      Die Verwaltung prüft, welche kommunalen Dächer mit PV-Anlagen belegt werden können und verbaut auf
      allen Potenzialflächen PV-Anlagen. Dazu gehört [NEWLINE]

      • Prüfpflicht bei Neubau und Sanierung zur Nutzung von PV oder Solarthermie (Gebäude-Energie-Gesetz)
      und generelle Eignungsprüfung der kommunalen Dachflächen (teils in Bundesländern bereits
      verpflichtend) [NEWLINE]

      • Investitionen in PV-Anlagen, z.B. durch aktive Vermarktung der kommunalen Flächen (Aufbau und Pflege
      eines Katasters) bzw. eigene Investitionen, Initiierung von Energiegenossenschaften oder Contracting
      `,
    },
    {
      title:
        "Kommune bezieht für alle eigenen Liegenschaften nur noch qualifizierten Ökostrom",
      sector: "Strom",
      priority: 3,
      code: "TOP004",
      description: `
      Die Verwaltung stellt ihren Strombezug zum nächstmöglichen Zeitpunkt auf die Nutzung von qualifiziertem
      Ökostrom um. [NEWLINE]

      • Die Kommune schreibt die Strommenge ca. alle 2 – 4 Jahre aus. Mit der nächsten Ausschreibung wird
      ein Anbieter für (qualifizierten) Ökostrom gesucht. [NEWLINE]

      • Die ausgewählten Anbieter müssen mindestens folgende Kriterien erfüllen: Neuanlagenquote oder
      Reinvest eines Gewinnanteils in Neuanlagen (beides dient dem Ausbau von EE-Anlagen), kein Einkauf von
      fossil erzeugtem Strom.
      `,
    },
    {
      title: "Förderprogramme für PV-Ausbau",
      sector: "Strom",
      priority: 3,
      code: "TOP005",
      description: `
      Die Kommune legt Förderprogramme für PV-Anlagen auf, die mind. folgende Punkte umfassen: [NEWLINE]

      • Vorbereitung: Die Einrichtung eines PV-Katasters, um Solarpotenziale im Vorfeld abzuschätzen (oftmals
      auf Bundeslandebene schon vorhanden, siehe Quellen) [NEWLINE]

      • Förderung von PV-Dach-Anlagen für private Haushalte und Unternehmen. Besonders wichtig: Förderung
      nichtwirtschaftlicher Anlagen(-teile), damit größtmögliche PV-Potenziale genutzt werden [NEWLINE]

      • Förderung von Mini-PV-Anlagen („Balkonkraftwerken“) [NEWLINE]

      • Förderung von Mieter:innen-Strom-Projekten [NEWLINE]
      `,
    },
    {
      title:
        "Beratungs- und Unterstützungsangebote für Private und Unternehmen",
      sector: "Strom",
      priority: 3,
      code: "TOP006",
      description: `
      Nicht nur die finanzielle Förderung für den Ausbau von Solaranlagen ist wichtig. Private und KMU (kleine und
      mittlere Unternehmen) brauchen Beratung und Unterstützung bei dem PV-Ausbau: [NEWLINE]

      • PV-Ausbau-Beratung durch Energiemanagement/ Stadtwerke/ Wirtschaftsförderung, besonders zu
      Fördermitteln [NEWLINE]

      • Paket-Angebote: PV-Leasing, Heizungsleasing/ Energiecontracting/ Förderabwicklung für Unternehmen
      etc. [NEWLINE]

      • Beratung zu Mieter:innen-Strom-Projekten [NEWLINE]

      • Energieberatung für Unternehmen
      `,
    },
    {
      title: "100 Prozent qualifizierter Ökostrom als Angebot der Stadtwerke",
      sector: "Strom",
      priority: 2,
      code: "TOP007",
      description: `
      Die Kommune erwirkt als Eigentümerin oder Anteilseignerin die Umstellung des Stromangebots der
      Stadtwerke auf 100 % qualifizierten Ökostrom.
      `,
    },
    {
      title: "Einrichtung eines kommunalen Energiemanagements",
      sector: "Strom",
      priority: 2,
      code: "TOP008",
      description: `
      Das kommunale Energiemanagement ermöglicht es, den Energieverbrauch in kommunalen Liegenschaften
      zu überwachen und strategische Energiesparpläne für den Gebäudebestand zu entwickeln. Diese Maßnahme
      wird durch die Nationale Klimaschutzinitiative (NKI) gefördert. [NEWLINE]

      • Die Kommune bestimmt (oder stellt ein) eine:n Energiebeautragte:n [NEWLINE]

      • Vor Ort muss in den Liegenschaften Einfluss auf den optimierten technischen Anlagenbetrieb genommen
      werden (in Schulen, Verwaltungsgebäuden etc.)
      `,
    },
    {
      title: "Start von wirksamen Kampagnen",
      sector: "Strom",
      priority: 2,
      code: "TOP009",
      description: `
      Die Kommune kann durch verschieden Kampagnen den Ausbau der erneuerbaren Energien und die Rate der
      energetischen Sanierung beschleunigen. Dazu zählen z.B. [NEWLINE]

      • kommunale Teilnahme am „Wattbewerb“ [NEWLINE]

      • Unterstützung bei Solarparties und Solarselbstbauworkshops (z.B. durch Bereitstellung von
      Räumlichkeiten) [NEWLINE]

      • Fachkräftekampagne zusammen mit IHK/HWK für Beschleunigung Ausbau EE
      `,
    },
    {
      title:
        "Unterstützung/ Aufbau von oder Zusammenarbeit mit Energiegenossenschaften",
      sector: "Strom",
      priority: 2,
      code: "TOP010",
      description: `
      Energiegenossenschaften können wichtige Akteure für den Bau und Betrieb von erneuerbaren Strom- und
      Wärmeanlagen sein. Außerdem fördert die (finanzielle) Beteiligung der Bevölkerung die Akzeptanz für
      Energiewendeprojekte. [NEWLINE]

      • Die Kommune (z.B. in Form der Stadtwerke) kann den Aufbau einer Energiegenossenschaft mit initiieren,
      begleiten oder bestehende Genossenschaften unterstützen, z.B. bei der Flächensuche und -
      entwicklung
      `,
    },
    {
      title: "Bau von Agri-PV ermöglichen und unterstützen",
      sector: "Strom",
      priority: 2,
      code: "TOP011",
      description: `
      • Potenzielle Ausbauflächen identifizieren (kommunale oder private landwirtschaftliche Flächen)
      • Flächenausweisung ermöglichen bzw. direkt ausweisen (Flächennutzungsplan, Bebauungsplan) zur
      Privilegierung des Ausbaus [NEWLINE]

      • Ausbau unterstützen [NEWLINE]

      • Informieren [NEWLINE]

      • Unterstützung bei Bundesförderung [NEWLINE]

      • Begleitung eines Pilot- oder Forschungsprojekts
      `,
    },
    {
      title: "Solarpflicht bei Neubau",
      sector: "Strom",
      priority: 2,
      code: "TOP012",
      description: `
      Die Kommune kann über städtebauliche Verträge und im Bebauungsplan für alle Neubauten (Wohn- und
      Nichtwohngebäude) ein Solar-Nutzungsgebot festlegen.
      Dies kann PV-Module und die Nutzung von Solarthermie umfassen
      `,
    },
    {
      title: "Wärmeplanung beauftragen bzw. erstellen",
      sector: "Wärme",
      priority: 3,
      code: "TOP001",
      description: `
      Bis Mitte 2026 (>100.000) bzw. 2028 (<100.000) müssen Kommunen eine Wärmeplanung vorlegen. Kleinere
      Kommunen wird ein vereinfachtes Verfahren ermöglicht. GEG greift dann, wenn konkrete, gesonderte
      Ausführungsgenehmigung kommt. Oder ab spätestens 2026/28 [NEWLINE]

      • ab 2035 dürfen keine Emissionen mehr durch die Wärmeerzeugung entstehen [NEWLINE]

      • betroffene Sektoren mitdenken: [NEWLINE]

      • gesteigerter Strombedarf (durch große und kleinere Wärmepumpen) muss mitberücksichtigt werden
      und erneuerbar sowie lokal/regional erzeugt werden [NEWLINE]

      • Flankierung mit Maßnahmen im Gebäudebereich nötig: Annahmen über Sanierungsraten müssen in
      kommunalen Konzepten hinterlegt werden: Wird eine gesteigerte Sanierungsquote durch kommunale
      Aktivitäten plausibilisiert? [NEWLINE]

      • nach der Wärmeplanung: Aufteilung und Ausweisung von Wärmeversorgungsgebieten

      `,
    },
    {
      title:
        "Dekarbonisierung bestehender Fernwärmenetze und Ausbau grüner Wärmenetze durch Erschließung erneuerbarer Wärmequellen",
      sector: "Wärme",
      priority: 3,
      code: "TOP002",
      description: `
      Umsetzung des kommunalen Wärmeplans durch Umbau bestehender Wärmeproduktion hin zu grüner Wärme
      und Erschließung neuer grüner Wärmequellen. [NEWLINE]

      • Vollständiger Umbau und Ausbau grüner Wärme [NEWLINE]

      • Harmonisierung von Wärmebedarfen und der Produktion erneuerbarer Wärme (Sanierung mit Wärme Ausund Umbau harmonisieren) [NEWLINE]

      • in Fernwärmenetzen, v.a. Temperaturreduzierung, hydraulische Optimierung (Schaffung technisUmsetzung
      von Effizienzmaßnahmen cher Voraussetzungen für die Nutzung erneuerbarer Energien in den Wärmenetzen)
      `,
    },
    {
      title:
        "Umsetzung von Effizienzmaßnahmen in Wärmenetzen (u.a. Temperaturreduzierung, hydraulische Optimierung)",
      sector: "Wärme",
      priority: 2,
      code: "TOP003",
      description: `
      Erneuerbar betriebene Wärmenetze haben in der Regel ein niedrigeres Temperaturniveau, weil die
      Umweltwärme nicht ähnlich leicht wie fossil erzeugte Wärme genutzt werden kann. Daher müssen die
      Wärmesysteme so umgebaut werden, dass sie mit niedrigeren Temperauren (< 70 Grad) betrieben werden
      können.
      `,
    },
    {
      title:
        "Beratung und Motivation zur Verdichtung und Erweiterung von Wärmenetzen in bestehenden Wohngebieten bzw. Anschluss- und Benutzungszwang",
      sector: "Wärme",
      priority: 3,
      code: "TOP004",
      description: `
      Wärmenetze können effizienter sein als die Umstellung der individuellen Heizung. Daher kann es sinnvoll sein,
      die Abnahmebasis der Fernwärme zu erhöhen. [NEWLINE]

      • klare Ziele über Erhöhung der Anschlussquote und Wärmeabnahme [NEWLINE]

      • Informationsangebot über Stadtwerke bzw. kommunale Kanäle streuen; [NEWLINE]

      • mit bestehenden kommunalen Beratungsangeboten (Energieberatung, Sanierungskonzepten etc.) verzahnen; [NEWLINE]

      • Nach §13 Kommunalverfassungsgesetz ist die Festsetzung eines Anschlusszwanges an ein neu zu
      errichtendes Nahwärmenetz grundsätzlich auf Basis der Ergebnisse der Quartierskonzepte möglich
      (Achtung potenziell konfliktive Maßnahme! Achtung vor hohen Wärmekosten für Verbraucher:innen!)
      `,
    },
    {
      title:
        "Energetische Sanierung der kommunalen Liegenschaften und der kommunalen Wohnungsbaugesellschaften",
      sector: "Gebäude",
      priority: 3,
      code: "TOP001",
      description: `
      • Sanierungsfahrplan erstellen und durchführen: [NEWLINE]

      • Hüllflächen (Außenhaut eines Gebäudes): Zielniveau für Hüllflächensanierung definieren, nachhaltige
      Baumaterialien verpflichtend einführen [NEWLINE]

      • Energie: Wärmeplanung, Heizungssanierung, Nahwärmenetze, PV-Strategie und Heizungstypen abstimmen [NEWLINE]

      • Priorisierung der Gebäude nach Einsparungspotenzial und Zeitplan festlegen [NEWLINE]

      • Fördermaßnahmen beantragen: Bundesförderung (Nationale Klimaschutzinitiative), KfW und weitere [NEWLINE]

      • Allgemeine Planung: Optionen für serielles Sanieren prüfen, Planungspersonal und Budget bereitstellen [NEWLINE]

      → Energiemanagement, siehe Informationen zur Maßnahme unter dem Sektor Strom
      `,
    },
    {
      title: "Beratung von Eigentümer:innen zu Gebäude- und Heizungssanierung",
      sector: "Gebäude",
      priority: 3,
      code: "TOP002",
      description: `
      • Beratung zu energetischer Gebäudesanierung und Heizungstausch von Ein-/ Zwei- oder Mehrfamilienhäusern
      (Eigentümergemeinschaften) [NEWLINE]

      • Kostenneutrale Beratung z.B. über Verbraucherzentralen [NEWLINE]

      • Privatwirtschaftliche Energieberatung fördern [NEWLINE]

      • Ziele der Beratung: [NEWLINE]

      • Wärmeleitplanung und PV-Strategie veröffentlichen [NEWLINE]

      • Quartiersziele und Konzepte kommunizieren [NEWLINE]

      • Serielles sanieren bewerben und ggf. organisieren [NEWLINE]

      • Fördermittelberatung (Auswahl): [NEWLINE]

      • Bundesförderung für effiziente Gebäude bewerben [NEWLINE]

      • Mittel aus Städtebauförderung z.B. über Ausweisung von Sanierungsgebieten nutzen [NEWLINE]

      • Städtische Fördermittel, die additiv z.B. zu einer KfW Förderung vergeben werden
      `,
    },
    {
      title: "Energetische Quartierssanierung",
      sector: "Gebäude",
      priority: 3,
      code: "TOP003",
      description: `
      • Quartierssanierung lenkt den Blick vom Einzelgebäude auf ein Quartier [NEWLINE]

      • Kommunale und private Gebäude zusammen betrachten [NEWLINE]

      • Verschiedene Akteure an einen Tisch holen [NEWLINE]

      • Nutzung von Synergien: [NEWLINE]

      • Nahwärmenetz planen [NEWLINE]

      • Abwärme eines Gebäudes (Industrie) zur Heizung eines anderen Gebäudes nutzen [NEWLINE]

      • Serielles / gebündeltes Sanieren, z.B. viele ähnliche Gebäude auf einmal sanieren und gleichzeitig mit PVModulen ausstatten [NEWLINE]

      • Umsetzungsschritte / Konzept erarbeiten: [NEWLINE]

      • Ausgangssituation definieren , Potenziale ableiten [NEWLINE]

      • Fördermittel beantragen [NEWLINE]

      • Die ehemalige KfW Förderung für energetische Quartierskonzepte wird derzeit nicht fortgeführt
      `,
    },
    {
      title:
        "Kommunales Förderprogramm für energetische Sanierung und erneuerbare Heizungen",
      sector: "Gebäude",
      priority: 3,
      code: "TOP004",
      description: `
      Förderung: [NEWLINE]

      • Aufstockende Förderung zur Bundesförderung im BEG (Bundesförderung für effiziente Gebäude); mittels einer
      Richtlinie wird zusätzliche Förderung nach Vorlage eines staatlichen Förderbescheides ermöglicht (geringer
      Prüfaufwand): [NEWLINE]

      • Dämmung der Gebäudehülle / Heizungsoptimierung [NEWLINE]

      • Heizungstausch mit Fokus auf Wärmepumpe [NEWLINE]

      • Nutzung nachwachsender Rohstoffe [NEWLINE]

      • Beispiele für Richtlinien: [NEWLINE]

      • https://www.neuburg-donau.de/rathaus/aufgaben-und-dienstleistungen/foerderungwaermepumpe_id3302 [NEWLINE]

      • https://stadt.muenchen.de/infos/foerderprogramm-klimaneutrale-gebaeude.html
      `,
    },
    {
      title:
        "Klimaneutrale Energieversorgung durch Bauleitplanung und städtebauliche Verträge",
      sector: "Gebäude",
      priority: 3,
      code: "TOP005",
      description: `
      Kommunen können die Bauleitplanung und bei der Verabschiedung von städtebaulichen Verträgen mit Investor:innen
      den Ausbau mit erneuerbaren Energien voran bringen. Dazu gehören z.B. [NEWLINE]

      • Installationspflicht von PV auf/an Gebäuden, Entwicklung von Solarparks [NEWLINE]

      • Vorgaben zur Nutzung geeigneter Flächen für Windenergieanlagen innerhalb des Entwicklungsgebiets [NEWLINE]

      • Festlegung hohe Energieeffizienzstandards im Gebäudebereich [NEWLINE]

      • Planung und Ausbau von Stromnetzen, Ermöglichung von Speichersystemen und dezentralen [NEWLINE]

      Energieerzeugungsanlagen inkl. Ausweisung der Flächen dafür [NEWLINE]

      • Verpflichtung zur Verwendung von Nachhaltigen Baustoffen [NEWLINE]

      → Neue Baugebiete müssen im Allgemeinen ihren Energiebedarf aus erneuerbaren Energien decken (Nutzungsrechte)
      `,
    },
    {
      title: "Ambitionierte Leitlinien für kommunale Neubauten und Sanierung",
      sector: "Gebäude",
      priority: 2,
      code: "TOP006",
      description: `
      • Ambitionierte Leitlinien für Neubauten und Sanierung von kommunalen Gebäuden als verbindlichen Standard
      festlegen [NEWLINE]

      • z.B.: Nullenergiehäuser im Neubau und erhöhter Effizienzhaus-Standard bei Sanierung [NEWLINE]

      • Baumaterialien nachhaltig und recyclebar [NEWLINE]

      • Lebenszyklus in der Wirtschaftlichkeitsberechnung einbeziehen (also die Abbruch- und Recyclingkosten
      mitbetrachten)

      `,
    },
    {
      title:
        "Mobilitätsplanung mit Fokus auf Ausbau Rad- und Fußinfrastruktur und ÖPNV-Entwicklung",
      sector: "Verkehr",
      priority: 3,
      code: "TOP001",
      description: `
      Grundlage für eine koordinierte Verkehrswende ist eine gesamtheitliche Mobilitätsplanung, in der der Ausbau
      von Fuß- und Radverkehr sowie der Ausbau des ÖPNV inkl. der überregionalen Verkehrsplanung koordiniert
      wird. Die Planung kümmert sich um die Ermöglichung und Verbesserung der Mobilität bei gleichzeitiger
      Reduktion der Emissionen. Zur Planung gehören auch [NEWLINE]

      • die Anbindung an und Verzahnung mit Nachbargemeinden und Städten (überregionaler (Pendel-)Verkehr) [NEWLINE]

      • die Finanzierung der investiven Maßnahmen über den Haushalt (inkl. Maßnahmen zur Erhöhung der Mittel, z.B.
      über Parkraumbewirtschaftung s.u.)
      `,
    },
    {
      title: "Einführung von Geschwindigkeitsbegrenzungen",
      sector: "Verkehr",
      priority: 3,
      code: "TOP002",
      description: `
      Die Reduktion der innerstädtischen Höchstgeschwindigkeit kann teilweise von der Kommune auf Tempo 20
      bzw. 30 reduziert werden. Bei reduziertem Tempo entstehen deutlich weniger Emissionen. [NEWLINE]

      • Wo möglich: Tempo 20 bzw. 30 Zonen weiträumig ausweisen [NEWLINE]

      • Beitritt zur bundesweiten Initiative „Lebenswerte Städte durch angemessene Geschwindigkeiten“ für eine
      flächendeckende Ermöglichung der Tempo-Zonen
      `,
    },
    {
      title: "Ausbau Radverkehr",
      sector: "Verkehr",
      priority: 3,
      code: "TOP003",
      description: `
      Ausbau Radverkehr als Teil der Mobilitätsplanung. Zu einem konsequenten Radausbau gehören z.B. diese
      Maßnahmen: [NEWLINE]

      • Sicherheit bestehender Radwege erhöhen [NEWLINE]

      • Ausbau eines sicheren zusammenhängenden Radnetzes und von Radschnellwegen (ggf. auch Kommune
      übergreifend) [NEWLINE]

      • verbesserte und vermehrte Abstellanlagen [NEWLINE]

      • Aufwertung des Winterdienstes für Radwege [NEWLINE]

      • Öffnung von Einbahnstraßen für Radverkehr und Einrichtung von Fahrradstraßen (Bevorzugung vor
      Autoverkehr)
      `,
    },
    {
      title: "Ausbau und Attraktivierung des ÖPNV-Angebots",
      sector: "Verkehr",
      priority: 3,
      code: "TOP004",
      description: `
      Ausbau ÖPNV als Teil der Mobilitätsplanung. Zu einem konsequenten Ausbau und einer besseren Qualität
      gehören z.B. diese Maßnahmen: [NEWLINE]

      • Streckenausbau des ÖPNV: konsequenter Ausbau kommuneneigener Linien und Einsatz für eine
      Erweiterung des Angebots beim Land bzw. beim regionalen Verkehrsverbund [NEWLINE]

      • verstärkte und integrierte Taktung des bestehenden ÖPNV: Abstimmung mit regionalem und
      überregionalem Mobilitätsangebot [NEWLINE]

      • Einrichtung und Ausbau von mobility hubs und Sharing Systemen für schnellere Mobilität über MIV hinaus
      `,
    },
    {
      title: "Einkauf Elektrobusse für den ÖPNV ",
      sector: "Verkehr",
      priority: 3,
      code: "TOP005",
      description: `
      Ausarbeitung eines Elektrifizierungsfahrplans des öffentlichen Bus- und Bahnangebots inkl. etwaiger
      Akquirierung von Landes- und Bundes-Fördergeldern. Neben der Umstellung auf nichtfossil betriebene Busse
      (v.a. e-Motoren, ggf. auch Wasserstoff) bedarf es einem zeitigen Ausbau der Ladeinfrastruktur.
      `,
    },
    {
      title: "Reduktion der Flächen für den Individualverkehr",
      sector: "Verkehr",
      priority: 3,
      code: "TOP006",
      description: `
      Die Verkehrswende gelingt durch die Kombination von sogenannten push- und pull-Maßnahmen. Ohne die
      Einschränkung des motorisierten Individualverkehrs wird es nicht gehen. Daher braucht es konsequente
      Maßnahmen, um dessen Attraktivität zu reduzieren. Dazu gehört z.B. [NEWLINE]

      • Einrichtung eines flächendeckendes Parkraummanagements [NEWLINE]

      • Änderung des Stellplatzschlüssels je Wohneinheit [NEWLINE]

      • Reduktion des Straßenraums für MIV, z.B. Einrichtung von Einbahnstraßen, Verlagerung von Autospuren zum
      Umweltverbund verlagern [NEWLINE]

      • Einrichtung von autofreien bzw. autoarmen Quartieren, z.B. nach dem Superblocks-System oder durch die
      Einführung einer Umweltzone

      `,
    },
    {
      title:
        "Umstellung kommunaler Fuhrpark und Angebote für Mitarbeiter:innen",
      sector: "Verkehr",
      priority: 3,
      code: "TOP007",
      description: `
      Die Verwaltung sollte Vorbild für andere Akteure der Stadtgesellschaft sein und ihr Mobilitätsverhalten nach den
      Prinzipien der Verkehrswende – verringern, verlagern, verbessern – umstellen. [NEWLINE]

      • Verringerung von Dienstfahrten der Verwaltungsmitarbeitenden, z.B. durch Ermöglichung von Home Office [NEWLINE]

      • Verlagerung von Dienstfahrten auf den Umweltverbund durch Monatstickets für den ÖPNV bzw. betriebliche
      Nutzung des ÖPNV und Bereitstellung z.B. von e-Bikes und Lastenrädern [NEWLINE]

      • Verbesserung durch Umstieg der kommunalen Flotte auf e-Mobilität inkl. Umstieg der kommunalen (Tochter-
      )Angebote wie Abfallfahrzeuge
      `,
    },
    {
      title:
        "Unterstützung und Begleitung des betrieblichen Mobilitätsmanagements",
      sector: "Verkehr",
      priority: 2,
      code: "TOP008",
      description: `
      Unternehmen und Arbeitgeber:innen haben großen Einfluss darauf, wie die Angestellten zur Arbeit kommen. Die
      Verwaltung kann einen umweltfreundlichen Arbeitsweg unterstützen, indem sie die Unternehmen beim
      betrieblichen Mobilitätsmanagement unterstützt. Dazu gehört z.B. [NEWLINE]

      • Erstellung einer Mobilitätsanalyse der Mitarbeiter:innen [NEWLINE]

      • Definition von Zielen und Maßnahmen und Wirkungstestung [NEWLINE]

      • Einrichtung von Optionen zum Umstieg bzw. Verkehrsreduktion: Betriebsräder, CarPooling, Jobtickets,
      Ermöglichung von Home Office etc.
      `,
    },
    {
      title: "Schaffung von Anreizen für reduzierte PKW-Nutzung",
      sector: "Verkehr",
      priority: 2,
      code: "TOP009",
      description: `
      Das eigene Auto ist und bleibt ein sehr attraktives Verkehrsmittel. Daher kann die Kommune zusätzlich den
      Verzicht aufs eigene Auto belohnen, z.B. durch [NEWLINE]

      • eine Abwrackprämie oder Umstiegsprämie auf ÖPNV [NEWLINE]

      • vergünstigte ÖPNV-Angebote für unterschiedliche einkommensschwache Bevölkerungsgruppen
      `,
    },
    {
      title: "Ausbau e-Ladestruktur",
      sector: "Verkehr",
      priority: 2,
      code: "TOP010",
      description: `
      Nicht nur der kommunale Verkehr muss elektrifiziert werden. Um einen privaten flächendeckenden Umstieg auf
      e-Mobilität zu ermöglichen, kann die Kommune den Ausbau der e-Ladestruktur voranbringen. Dazu gehört
      z.B. [NEWLINE]

      • Aufbau öffentlicher Infrastruktur nach Analyse von Potenzialen und Bedarfen [NEWLINE]

      • Informationskampagne und Serviceangebot der Stadtwerke zu privaten Wallboxen
      `,
    },
    {
      title:
        "Umstellung des Verpflegungsangebots in Kantinen mit öffentlicher Trägerschaft",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP001",
      description: `
      • Die Kommune kann für Nahrungsmittel bestimmte prozentuale Mindestanteile festlegen, die z.B. aus
      biologischer Landwirtschaft stammen müssen. [NEWLINE]

      • sowohl für den Direkteinkauf als auch für die Vergabe von Catering-Aufträgen. [NEWLINE]

      • Die öffentliche Gemeinschaftsverpflegung hat einen hohen Versorgungsgrat und daher einen Hebel zur
      Veränderung der Essroutinen
      `,
    },
    {
      title:
        "Aufbau einer Wissensplattform für Landwirt:innen über klimaschonende Praktiken",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP002",
      description: `
      • Schaffung einer umfangreichen Wissenssammlung zu klimaschonenden Praktiken in der LW (Düngen,
      Bodenerosion, etc.) [NEWLINE]

      • idealerweise konkrete Verknüpfung von neusten Forschungserkenntnissen mit (regionalen)
      Realerfahrungen [NEWLINE]

      • Übersetzung der konzentrierten Informationen in umsetzbare Maßnahmen [NEWLINE]

      • Verzahnung zwischen Wissensangebot und Beratungsangebot (s. nächste Folie)
      `,
    },
    {
      title:
        "Beratungs- und Förderangebote zur Umstellung auf ökologische und regenerative Landwirtschaft",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP003",
      description: `
      • konkrete Maßnahmenfeststellung und -umsetzungsberatung zur Treibhausgaseinsparung
      • finanzielle Förderung für die Umsetzung von Projekten gemäß Einsparungspotenzial

      • Ergänzung zur bisherigen Förderkulisse [NEWLINE]

      • in Abstimmung mit Landkreis [NEWLINE]

      • Bereitstellung von Expertise zur Beantragung von Fördermöglichkeiten auf allen Ebenen (EU bis Kommune) [NEWLINE]

      • wenn vorhanden: Verweis auf Landes- und Landkreisberatungsdienste
      `,
    },
    {
      title:
        "Aufbau eines Dialogforums zwischen Landwirtschaft und Stadtgesellschaft",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP004",
      description: `
      • Ansprache und Sensibilisierung von Landwirt:innen, Stadtgesellschaft und Entscheidungsträger:innen aus
      Wirtschaft und Verwaltung zu Treibhausgas-Einsparmöglichkeiten in der Landwirtschaft [NEWLINE]

      • Organisation und Ausrichtung von Kommunikationsforen für Interessierte durch kompetenten Partner
      (Stiftung, Verein etc.) in Kollaboration mit z.B. Landwirtschaftsamt [NEWLINE]

      • Inputs und Austausch zu ökologischer bzw. regenerativer Landwirtschaft [NEWLINE]

      • Vernetzung mit anderen Klimaallianzen aus anderen Sektoren oder aber auf anderer Ebene [NEWLINE]

      • auf lokales Wissen und Strukturen zurückgreifen, z.B. Ernährungsräte
      `,
    },
    {
      title: "Ökologische (Weiter-)Erschließung von Pachtflächen",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP005",
      description: `
      • Einbeziehung von Ökolandbau bzw. regenerativer Praktiken in Vergabe von landwirtschaftlichen
      Pachtflächen [NEWLINE]

      • Anpassung der Vergabekriterien kommunaler landwirtschaftlicher Flächen [NEWLINE]

      • Herantreten an Großverpächter:innen wie bspw. die Kirche (katholische + evangelische Kirche ca. 500.000
      Hektar)
      `,
    },
    {
      title:
        "Kommune fördert urbane Landwirtschaft und zivilgesellschaftliche Initiativen",
      sector: "Landwirtschaft",
      priority: 2,
      code: "TOP006",
      description: `
      • Aktivierung der Stadtgesellschaft zur Sensibilisierung von landwirtschaftlicher Praxis , z.B. durch Umsetzung
      von Maßnahmen zur Förderung einer „essbaren Stadt“ (Anlegen öffentlicher Hochbeete, Obststreuwiesen
      etc.) [NEWLINE]

      • Förderung von urbanen Gärten und Kampagnen [NEWLINE]

      • Kombination mit Sichtbarmachung von regionalen bäuerlichen Strukturen möglich: Unterstützung von z.B.
      Regionalläden
      `,
    },
    {
      title: "Aufforstung als Klimawald ermöglichen und unterstützen",
      sector: "LULUCF",
      priority: 3,
      code: "TOP001",
      description: `
    Kernaufgabe: Erhaltung und Wiederherstellung von klimaangepassten, multifunktionalen Wäldern zum Ausbau
    des Senkenpotentials. [NEWLINE]

    Waldmanagement durch Förster:innen in kommunalen Forstbetrieben [NEWLINE]
    • Waldumbau hin zu klimaresilienten Mischwäldern [NEWLINE]
    • Analyse des Baum- und Walbestands in Absprache mit unterer Forstbehörde [NEWLINE]

    Vermittlung und Koordination durch Kommune zum Waldumbau [NEWLINE]
    • Stellenschaffung für Umwelt- und Naturschutzangelegenheiten [NEWLINE]
    • Beantragen von Fördermitteln durch die Kommune (z.B. Förderrichtlinie für Natürlichen Klimaschutz in
    kommunalen Gebieten im ländlichen Raum) [NEWLINE]

    • Regelmäßige Gesprächsrunde mit Nachbarkommunen oder innerhalb des Landkreises [NEWLINE]
    • Koordination von Flächentausch und Flächenkauf (als technische Maßnahme oder als Tauschflächen) [NEWLINE]
    • Nutzung von Landschafts- und Flächennutzungsplänen [NEWLINE]
    • Einbeziehen der Zivilgesellschaft [NEWLINE]
      `,
    },
    {
      title:
        "Unterstützung bei der Wiedervernässung von Mooren und organischen Böden",
      sector: "LULUCF",
      priority: 3,
      code: "TOP002",
      description: `
      Koordinierende Rolle der Kommune: Koordination von Flächentausch und Flächenkauf, z.B. über [NEWLINE]
      • Stellenschaffung: Klima- und Moorschutzmannager:innen [NEWLINE]
      • Beantragen von Fördermitteln durch die Kommune (z.B. Förderrichtlinie für Natürlichen Klimaschutz in
      kommunalen Gebieten im ländlichen Raum) [NEWLINE]
      • Einbindung von Behörden, v.a. untere Wasser-, Naturschutz, und Forstbehörde als wichtigste Behörde und
      Landrät:innen [NEWLINE]
      • Gutachten in Auftrag geben, Fortbildungen anbieten, Handreichungen entwickeln [NEWLINE]

      Förderung von Paludikultur [NEWLINE]
      • Schaffung von Kooperationsstrukturen zwischen Landwirtschaft, Produktentwicklung, Produktvermarktung,
      Tourismus und Naturschutz [NEWLINE]
      • Einbindung der Bevölkerung auf Grund von Veränderungen der Landschaft [NEWLINE]

      Kooperation mit Landes- und Entwicklungsgesellschaften [NEWLINE]
      • Aufkauf und Vermittlung von landwirtschaftlich genutzter Fläche > Flächenpool
      `,
    },
    {
      title: "Flächenschonende Stadtentwicklung",
      sector: "LULUCF",
      priority: 3,
      code: "TOP003",
      description: `
      Nutzung formelle und informelle Instrumente der Stadtplanung [NEWLINE]
      • Die Flächenneuinanspruchnahme kann sehr gut im Rahmen der Bauleitplanung beeinflusst werden. Das BauGB
      bildet dabei die Grundlage, dort werden die formellen städteplanerischen Instrumente festgelegt. [NEWLINE]
      • Entwicklung von städtebaulichen Entwicklungskonzepten zur Flächensparpolitik [NEWLINE]

      Verhinderung von Versiegelung über städteplanerische Instrumente, z.B. [NEWLINE]
      • keine Ausweitung von neuen Siedlungs- und Vehrkehrsflächen (insbesondere im Außenbereich) [NEWLINE]
      • Beeinflussung baulicher Dichte, Nachverdichtung (Umbau/ Ausbau des Dachgeschosses oder Ausbauten im
      Bestand) [NEWLINE]
      • städtebauliche Verträge mit privaten Investoren od. Bauherren für positive Stadtentwicklung (bspw. Umbau von
      Parkfläche zu multifunktionalen Grünzonen) [NEWLINE]
      • konsequente Umsetzung von Ausgleichsfläche in BLP
      `,
    },
    {
      title: "Schaffung von Biotopverbünden",
      sector: "LULUCF",
      priority: 2,
      code: "TOP004",
      description: `
      • Konkrete Umsetzung und Sicherung der landesweiten Biotopverbundkonzepte: Ausgestaltung der
      überregionalen Planungsinstrumente (v.a. Landschaftsrahmenplan) auf lokaler Ebene sowie deren
      Integration in die kommunale Planung. [NEWLINE]

      • Durchführung aktueller Erhebungen, v.a. Biotopkartierungen, Artenschutzprogramme und
      Managementplanungen in FFH-Gebieten zur Identifikation und Priorisierung naturschutzfachlich
      bedeutsamer Arten und Lebensräume. [NEWLINE]

      • Entwicklung und Implementierung konkreter Maßnahmen: Basierend auf den erhobenen Daten müssen
      Maßnahmen zur Verbesserung der Landschaftsdurchlässigkeit sowie zur Aufwertung und Entwicklung neuer
      Habitate und Lebensräume umgesetzt werden.
      `,
    },
    {
      title: "Beschluss Baumschutzkonzept",
      sector: "LULUCF",
      priority: 2,
      code: "TOP005",
      description: `
      Baumschutzkonzepte sollen helfen, den Baumbestand zu schützen und auszubauen. Intakte Bäume spielen eine
      wesentliche Rolle bei der Bindung von Kohlenstoff, der Reduktion des städtischen Wärmeinseleffekts und der
      Verbesserung der Luftqualität. [NEWLINE]

      Viele städtische Bäume sind jedoch in einem schlechten Zustand, leiden z.B. an Hitzestress. [NEWLINE]

      Ein Baumschutzkonzept analysiert den Bestand und definiert Ausbaupfade. Gleichzeitig enthält er Maßnahmen
      zum akuten Baumschutz.
      `,
    },
    {
      title: "Energieautarker Betrieb der Kläranlagen",
      sector: "Abfallwirtschaft",
      priority: 3,
      code: "TOP001",
      description: `
      Kommunen können den Betrieb von Kläranlagen auf vielseitige Weise energetisch optimieren: [NEWLINE]

      • Energieeffizienz: Reduktion des Energieverbrauchs durch effizientere Technologien und
      Prozessoptimierung. [NEWLINE]

      • Erneuerbare Energien: Installation von Solaranlagen zur Stromerzeugung [NEWLINE]

      • Biogasproduktion: Gewinnung von Biogas durch anaerobe Behandlung von Klärschlamm, das zur Stromund Wärmeerzeugung genutzt wird. [NEWLINE]

      • Wärmerückgewinnung: Verwendung der bei der Abwasserbehandlung entstehenden Abwärme.
      Für die Aktivitäten können Kommunen Fördergelder des Bundes beantragen.
      `,
    },
    {
      title: "Optimierte Deponieerfassung",
      sector: "Abfallwirtschaft",
      priority: 3,
      code: "TOP002",
      description: `
      Deponiegas, bestehend aus Methan (CH4) und Kohlenstoffdioxid (CO2), entsteht hauptsächlich durch den
      Abbau von organischen Inhaltsstoffen im Abfall bzw. Hausmüll. [NEWLINE]

      Die Ausgasung erstreckt sich über viele Jahre. Kommunen können über unterschiedliche öffentlich geförderte
      Maßnahmen wie Gasreinigung und -aufbereitung oder eine verbesserte Fassung und Behandlung der Gase, die
      Emissionen deutlich reduzieren.
      `,
    },
    {
      title:
        "Verbesserte Nutzung von Grünschnitt und Bioabfall zur Erzeugung von erneuerbaren Energien und bei der Abfallbehandlung",
      sector: "Abfallwirtschaft",
      priority: 3,
      code: "TOP003",
      description: `
      Je nachdem wie effizient die in der Biomasse gespeicherte Energie im Abfall genutzt wird, trägt die
      Bioabfallbehandlung mehr oder weniger zum Klimaschutz bei. [NEWLINE]

      • > 50% der Bioabfälle werden derzeit einfach kompostiert, wobei die enthaltene Energie nicht genutzt wird [NEWLINE]

      • die Kommunen sollten den Anteil der Vergärung durch Biogasgewinnung erhöhen, v.a. für Bioabfälle aus
      Haushalten
      `,
    },
    {
      title: "Herstellung von Pflanzenkohle durch Pyrolyse",
      sector: "Abfallwirtschaft",
      priority: 3,
      code: "TOP004",
      description: `
      Bei der Pyrolyse werden Grünabfälle wie Gartenabfälle, Holzreste etc. verkohlt. Der Kohlenstoff wird dabei
      langfristig in der Biomasse gespeichert und fungiert so als Kohlenstoffsenke. Gleichzeitig kann die bei der
      Verkohlung entstehende Wärme z.B. für ein Wärmenetz genutzt werden. [NEWLINE]

      • Kommunaler und privater Grünschnitt kann für die Herstellung von Pflanzenkohle gesammelt werden. Dafür
      muss im ersten Schritt eine Bestandsaufnahme (Monitoring) der kommunal verfügbaren Biomasse-Abfälle
      erfolgen. [NEWLINE]

      • Die Kommune kann gemeinsam mit dem Abfallbetrieb den Aufbau einer Pyrolyseanlage prüfen, ggf. eignet
      sich auch eine Anlage auf Landkreisebene. [NEWLINE]

      • Die Pflanzenkohle kann im Stadtgebiet als Dünger eingesetzt werden, sie eignet sich außerdem zur
      Speicherung von Wasser und Nährstoffen.
      `,
    },
    {
      title: "Aufbau lokaler Klimaschutz-Allianzen",
      sector: "Industrie/Wirtschaft",
      priority: 3,
      code: "TOP001",
      description: `
      • Lokales Unternehmensnetzwerk von Unternehmen zum Thema Klimaschutz gründen, z.B. Unternehmensnetzwerk
      für Klimaneutralität 2030. [NEWLINE]

      • Durch gute lokale Vernetzung werden Potentiale sichtbar, die Unternehmen gemeinsam heben können (z.B. kann
      die Abwärme des einen Betriebs im anderen Betrieb genutzt werden, etc.) [NEWLINE]

      • Austausch über korrekte CO2 Bilanzierung und Tools für Monitoring [NEWLINE]

      • Gemeinsame Lobbyarbeit: Was brauchen die Unternehmen vom Stadtrat / Gemeinderat, damit Sie klimaneutral
      werden können? [NEWLINE]

      • Auch eine vertrauliche Runde, in der Unternehmensvertreter sich vertraulich austauschen können, kann hilfreich
      sein (Beispiel Mannheim)
      `,
    },
    {
      title:
        "Energieverbrauch kommunaler Krankenhäuser (oder anderer kommunaler Liegenschaften) senken",
      sector: "Industrie/Wirtschaft",
      priority: 3,
      code: "TOP002",
      description: `
      • Krankenhäuser werden teilweise von den Kommunen selbst betrieben, die Kommune und die entsprechende
      Verwaltung hat hier großen Einfluss und Gestaltungsspielraum. [NEWLINE]

      • Klimaschutzmanagement und Energiemanagement einführen, damit relevante Maßnahmen erkannt und priorisiert
      werden können [NEWLINE]

      • Energieverbrauch senken durch effizientere Geräte (z.B. Waschmaschinen und Wäschetrockner),
      Gebäudemodernisierung (Dämmung) oder intelligentere Steuerungen (Lichter und andere Geräte ausschalten)
      `,
    },
    {
      title: "Koordinierte Beratung für Unternehmen und Industrie",
      sector: "Industrie/Wirtschaft",
      priority: 3,
      code: "TOP003",
      description: `
      • Eine von der Kommune angebotene "offizielle" Energieberatung genießt ein hohes Vertrauen in Industrie und
      Betrieben [NEWLINE]

      • Energieberatung gezielt für Unternehmen anbieten [NEWLINE]

      • Auf entsprechende Fördermöglichkeiten aus Bundesmitteln hinweisen/ diese konsequent nutzen [NEWLINE]

      • Bildungsarbeit leisten, um Hemmnisse für Investitionen in Energiesparmaßnahmen und Klimaschutzmaßnahmen zu
      reduzieren
      `,
    },
    {
      title: "Kreislaufwirtschaft und nachhaltige Baustoffe im Baubereich",
      sector: "Industrie/Wirtschaft",
      priority: 2,
      code: "TOP004",
      description: `
      Der Bausektor gehört zu den ressourcenintensivsten Wirtschaftssektoren: 2018 fielen etwa 219 Millionen Tonnen
      Bauabfälle an – und machten damit mehr als die Hälfte des Gesamtabfallaufkommens in Deutschland aus. [NEWLINE]

      • Anpassung kommunaler Vergabeverfahren [NEWLINE]

      • Einführung ökologischer Richtlinien für Baustoffe [NEWLINE]

      • Dokumentation der Lebenszyklen von in Gebäuden verbauten Materialien bei großen öffentlichen
      Neubauvorhaben und bei selektivem Rückbau, zum Beispiel in einem Gebäudepass
      `,
    },
    {
      title:
        "Einrichtung von Materiallagern und Bauteilkatalogen für gebrauchte Bauteile",
      sector: "Industrie/Wirtschaft",
      priority: 2,
      code: "TOP005",
      description: `
      Der Bausektor gehört zu den ressourcenintensivsten Wirtschaftssektoren: 2018 fielen etwa 219 Millionen Tonnen
      Bauabfälle an – und machten damit mehr als die Hälfte des Gesamtabfallaufkommens in Deutschland aus. [NEWLINE]

      • Einrichtung von Materiallagern und Bauteilkatalogen für gebrauchte Bauteile (aus dem Bausektor) [NEWLINE]

      • Kommune richtet Lager für Stahlträger etc. ein [NEWLINE]

      • Durch wiederholtes einsetzen der Bauteile werden Ressourcen und Emissionen gespart [NEWLINE]

      • Bauteile, die normal neu produziert werden müssten, können wiederverwendet werden
      `,
    },
  ];

  const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(null);
  const [visibleCount, setVisibleCount] = useState(9); // Number of measures to show

  // Initial number of measures to display (for reset purposes)
  const INITIAL_VISIBLE_COUNT = 9;

  // Filter measures based on selected priorities and sectors
  const filteredMeasures = measures.filter((measure) => {
    const priorityMatch = selectedPriorities.length
      ? selectedPriorities.includes(measure.priority)
      : true;

    const sectorMatch = selectedSectors.length
      ? selectedSectors.includes(measure.sector)
      : true;

    return priorityMatch && sectorMatch;
  });

  // Load more measures
  const loadMoreMeasures = () => {
    setVisibleCount((prevCount) => prevCount + 9); // Increase visible count by 9
  };

  // Hide measures to initial count
  const hideMeasures = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT); // Reset to initial visible count
  };

  return (
    <div className="measures-grid">
      {/* Display only the visible measures */}
      {filteredMeasures.slice(0, visibleCount).map((measure, index) => (
        <MeasureCard
          key={index}
          title={measure.title}
          sector={measure.sector}
          priority={measure.priority}
          code={measure.code}
          onOpenDetails={() => setSelectedMeasure(measure)} // Open the modal with this measure's details
        />
      ))}

      {/* Button container to position in the bottom center */}
      <div className="button-container">
        {visibleCount > INITIAL_VISIBLE_COUNT && (
          <button className="hide-button" onClick={hideMeasures}>
            <img src="/images/arrow_up.png" alt="Hide" className="arrow-icon" />
          </button>
        )}
        {visibleCount < filteredMeasures.length && (
          <button className="load-more-button" onClick={loadMoreMeasures}>
            <img
              src="/images/arrow_down.png"
              alt="Load More"
              className="arrow-icon"
            />
          </button>
        )}
      </div>

      {/* Modal to show measure details */}
      {selectedMeasure && (
        <MeasureDetailsModal
          measure={selectedMeasure}
          onClose={() => setSelectedMeasure(null)} // Close modal
        />
      )}
    </div>
  );
};

export default MeasuresGrid;
