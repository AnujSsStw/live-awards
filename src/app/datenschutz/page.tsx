import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen scroll-smooth pt-24">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-foreground">
          Datenschutzerklärung
        </h1>
        <Card>
          <CardContent className="prose dark:prose-invert max-w-none p-6">
            <div className="space-y-6 text-foreground">
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  I. Informationen über die Verarbeitung Ihrer Daten gemäß Art.
                  13 der Datenschutz-Grundverordnung (DS-GVO)
                </h2>

                <section className="mt-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    1. Verantwortlicher und Datenschutzbeauftragter
                  </h3>
                  <p className="text-foreground">
                    Verantwortlich für diese Website ist:
                  </p>
                  <p className="mt-2 text-foreground">
                    Digital Popcorn
                    <br />
                    Kai Bothstede
                    <br />
                    Dorfstrasse 15
                    <br />
                    21514 Fitzen
                    <br />
                    Deutschland
                    <br />
                    E-Mail: info@live-stream-awards.de
                  </p>

                  <p className="mt-4 text-foreground">
                    Den Datenschutzbeauftragten erreichen Sie per E-Mail unter:
                    <br />
                    info@live-stream-awards.de
                  </p>
                </section>

                <section className="mt-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    2. Daten, die für die Bereitstellung der Website und die
                    Erstellung der Protokolldateien verarbeitet werden
                  </h3>

                  <h4 className="mb-2 text-base font-semibold text-foreground">
                    a. Welche Daten werden für welchen Zweck verarbeitet?
                  </h4>
                  <p className="text-foreground">
                    Bei jedem Zugriff auf Inhalte der Website werden
                    vorübergehend Daten gespeichert, die möglicherweise eine
                    Identifizierung zulassen. Die folgenden Daten werden hierbei
                    erhoben:
                  </p>
                  <ul className="mt-2 list-disc pl-6 text-foreground">
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>IP-Adresse</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Website, von der aus die Website aufgerufen wurde</li>
                    <li>Websites, die über die Website aufgerufen werden</li>
                    <li>Besuchte Seite auf unserer Website</li>
                    <li>Meldung, ob der Abruf erfolgreich war</li>
                    <li>Übertragene Datenmenge</li>
                    <li>
                      Informationen über den Browsertyp und die verwendete
                      Version
                    </li>
                    <li>Betriebssystem</li>
                  </ul>

                  <h4 className="mb-2 mt-4 text-base font-semibold text-foreground">
                    b. Rechtsgrundlage der Verarbeitung
                  </h4>
                  <p className="text-foreground">
                    Die Daten werden auf der Grundlage des Art. 6 Abs. 1
                    Buchstabe f DS-GVO verarbeitet, wobei unser berechtigtes
                    Interesse in der Bereitstellung und Optimierung unserer
                    Website sowie der Sicherstellung der IT-Sicherheit liegt.
                  </p>

                  <h4 className="mb-2 mt-4 text-base font-semibold text-foreground">
                    c. Weitere Empfänger der personenbezogenen Daten
                  </h4>
                  <p className="text-foreground">
                    Die Website wird bei Replit gehostet. Der Hoster empfängt
                    die oben genannten Daten als Auftragsverarbeiter.
                  </p>
                  <p className="mt-2 text-foreground">
                    Zusätzlich wird Google Analytics genutzt, um die Nutzung der
                    Website zu analysieren. Google LLC ist in diesem
                    Zusammenhang ein weiterer Empfänger der Daten.
                  </p>

                  <h4 className="mb-2 mt-4 text-base font-semibold text-foreground">
                    d. Speicherdauer
                  </h4>
                  <p className="text-foreground">
                    Die Daten werden gelöscht, sobald sie für die Erreichung des
                    Zwecks ihrer Erhebung nicht mehr erforderlich sind. Bei der
                    Bereitstellung der Website ist dies der Fall, wenn die
                    jeweilige Sitzung beendet ist. Protokolldateien werden
                    maximal bis zu 24 Stunden direkt und ausschließlich für
                    Administratoren zugänglich aufbewahrt und danach gelöscht.
                  </p>
                </section>

                <section className="mt-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    3. Google Analytics
                  </h3>
                  <p className="text-foreground">
                    Diese Website verwendet Google Analytics, einen
                    Webanalysedienst der Google LLC (&quot;Google&quot;). Google
                    Analytics verwendet Cookies, die eine Analyse der Benutzung
                    der Website durch Sie ermöglichen. Die durch den Cookie
                    erzeugten Informationen über Ihre Nutzung dieser Website
                    werden in der Regel an einen Server von Google in den USA
                    übertragen und dort gespeichert.
                  </p>
                  <p className="mt-2 text-foreground">
                    Im Falle der Aktivierung der IP-Anonymisierung auf dieser
                    Website wird Ihre IP-Adresse von Google innerhalb von
                    Mitgliedstaaten der Europäischen Union oder in anderen
                    Vertragsstaaten des Abkommens über den Europäischen
                    Wirtschaftsraum zuvor gekürzt.
                  </p>
                </section>

                <section className="mt-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    4. TikTok Login
                  </h3>
                  <p className="text-foreground">
                    Wir bieten Ihnen die Möglichkeit, sich über den TikTok-Login
                    auf unserer Website anzumelden. Wenn Sie sich über TikTok
                    einloggen, wird TikTok bestimmte personenbezogene Daten von
                    Ihrem TikTok-Konto an uns übermitteln. Diese Daten umfassen
                    in der Regel Ihren Nutzernamen, Ihre Profilbilder und Ihre
                    öffentlich zugänglichen TikTok-Daten.
                  </p>
                </section>

                <section className="mt-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    5. Betroffenenrechte
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        a. Recht auf Auskunft
                      </h4>
                      <p className="text-foreground">
                        Sie können nach Art. 15 DS-GVO Auskunft über Ihre
                        personenbezogenen Daten verlangen, die wir verarbeiten.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        b. Recht auf Widerspruch
                      </h4>
                      <p className="text-foreground">
                        Sie haben das Recht, aus besonderen Gründen jederzeit
                        gegen die Verarbeitung Ihrer personenbezogenen Daten,
                        die aufgrund von Art. 6 Abs. 1 Buchstabe f DS-GVO
                        erfolgt, Widerspruch einzulegen.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        c. Recht auf Berichtigung
                      </h4>
                      <p className="text-foreground">
                        Sollten die Sie betreffenden Angaben nicht (mehr)
                        zutreffend sein, können Sie nach Art. 16 DS-GVO eine
                        Berichtigung verlangen.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        d. Recht auf Löschung
                      </h4>
                      <p className="text-foreground">
                        Sie können nach Art. 17 DS-GVO die Löschung Ihrer
                        personenbezogenen Daten verlangen.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        e. Recht auf Einschränkung der Verarbeitung
                      </h4>
                      <p className="text-foreground">
                        Sie haben nach Art. 18 DS-GVO das Recht, eine
                        Einschränkung der Verarbeitung Ihrer personenbezogenen
                        Daten zu verlangen.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        f. Recht auf Beschwerde
                      </h4>
                      <p className="text-foreground">
                        Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
                        personenbezogenen Daten gegen Datenschutzrecht verstößt,
                        haben Sie nach Art. 77 Abs. 1 DS-GVO das Recht, sich bei
                        einer Datenschutzaufsichtsbehörde eigener Wahl zu
                        beschweren.
                      </p>
                    </div>
                  </div>
                </section>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  II. Recht auf Widerspruch gemäß Art. 21 Abs. 1 DS-GVO
                </h2>
                <p className="text-foreground">
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer
                  besonderen Situation ergeben, jederzeit gegen die Verarbeitung
                  Ihrer personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1
                  Buchstabe f DS-GVO erfolgt, Widerspruch einzulegen. Der
                  Verantwortliche verarbeitet die personenbezogenen Daten dann
                  nicht mehr, es sei denn, er kann zwingende schutzwürdige
                  Gründe für die Verarbeitung nachweisen, die die Interessen,
                  Rechte und Freiheiten der betroffenen Person überwiegen, oder
                  die Verarbeitung dient der Geltendmachung, Ausübung oder
                  Verteidigung von Rechtsansprüchen.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
