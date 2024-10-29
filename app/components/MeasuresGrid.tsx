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

      `,
    },
    {
      title:
        "Aufbau einer Wissensplattform für Landwirt:innen über klimaschonende Praktiken",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP002",
      description: `

      `,
    },
    {
      title:
        "Beratungs- und Förderangebote zur Umstellung auf ökologische und regenerative Landwirtschaft",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP003",
      description: `

      `,
    },
    {
      title:
        "Aufbau eines Dialogforums zwischen Landwirtschaft und Stadtgesellschaft",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP004",
      description: `

      `,
    },
    {
      title: "Ökologische (Weiter-)Erschließung von Pachtflächen",
      sector: "Landwirtschaft",
      priority: 3,
      code: "TOP005",
      description: `

      `,
    },
    {
      title:
        "Kommune fördert urbane Landwirtschaft und zivilgesellschaftliche Initiativen",
      sector: "Landwirtschaft",
      priority: 2,
      code: "TOP006",
      description: `

      `,
    },
    {
      title: "",
      sector: "",
      priority: 0,
      code: "",
      description: `

      `,
    },
    {
      title: "",
      sector: "",
      priority: 0,
      code: "",
      description: `

      `,
    },
    {
      title: "",
      sector: "",
      priority: 0,
      code: "",
      description: `

      `,
    },
    {
      title: "",
      sector: "",
      priority: 0,
      code: "",
      description: `

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
