# Covid Stats (TDS200 eksamen, H2021)
### How to run
1. Download project .zip folder or clone repository.
2. Run `npm i`
3. Run `expo start`
4. Scan QR and run with the Expo Go app (Download for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://search.itunes.apple.com/WebObjects/MZContentLink.woa/wa/link?path=apps%2fexponent))

## 1.1 Covid Stats
Covid stats er en app som benytter seg av [Disease.sh API'et](https://disease.sh) for å fremstille data på en mer leselig måte. 
Appen gir bruker mulighet til å se ulik statistikk for både smitte og vaksine, i tillegg til å gjøre det mulig å se detaljert statistikk 
for et spesifikt land, enten ved søk eller via en liste. Appen har også en funksjon hvor man kan sammenligne data fra to forskjellige land. 

## 1.2 Funksjonell Flyt
Den funksjonelle flyten styres av ulike variabler som passeres mellom de forskjellige skjermene som et parameter for å sikre at det som vises på skjermen
stemmer over ens med det brukeren forventer å se når vedkommende eksempelvis trykker på en knapp. Gjennom hele appen har jeg prøvd å gjøre det klart for brukeren hva
som vises slik at det ikke blir noen forvirring av hvordan listene for eksempel er sortert. 

## 2.1 Arkitektoniske valg
Appen sin arkitektur baseres seg på et enkelt flytskjema hvor det ikke skal være vanskelig å finne frem til det man ønsker å finne. Bruker blir på første side presentert
for kun to knapper; infections og vaccine. Appens videre funksjonalitet bestemmes ut ifra dette første valget. Kjernefunksjonalitet er den samme for begge hvor bruker
se en sortert liste og global statistikk, se detaljert statistikk for et spesifikt land enten via listen eller ved søk og sammenligning av statistikk for to land. For
eksempel vil sammenligningen av infeksjonsdata vises som et sett med "barer" som fylles opp ved hjelp av en matematisk funksjon. For vaksinedata blir de to landene sin statistikk vist i 
form av et diagram med to grafer, da API'et gir tilbake data for tidsperioder. På grunn av disse forskjellene mener jeg det er fornuftig å skille de forskjellige 
kategoriene for å holde appen ryddig. Alt i alt mener jeg at appen er strukturert på en logisk måte med et enkelt design som gjør det lett å finne frem, uten at mer
kompleks funksjonalitet må vike. 

## 2.2 Utfordringer
Den største utfordringen i starten var å sette seg mer inn i hvordan Typescript fungerer, og det å lære at det er suboptimalt å ignorere røde streker selv om appen fungerer som den skal. 
I tillegg møtte jeg på et litt større problem mot slutten av utviklingsprosessen, og det var at prosjektet bærte preg av lite erfaring med typescript som igjen førte til at
prosjektet var ganske rotete og vanskelig å navigere seg rundt i. Dette førte til at jeg måtte sette av en del tid til refaktorering og opprydding av prosjektet generelt, selv om appen
fungerte helt fint. Jeg vil se på refaktoreringen som den største utfordringen i 
prosjektet generelt, da koden jeg hadde skrevet i utgangspunktet var noe vanskelig å dele opp og legge til rette for gjenbruk. 


## 2.3 Ville du gjort noe annerledes neste gang?
Til neste gang ønsker jeg å sette meg bedre inn i Typescript før jeg begynner å programmere noe som helst, i tillegg til å lese meg bedre opp på hva som er best practice
når det kommer til utvikling i React Native. Da appen min implementerer fremstilling av data i en graf, benyttet jeg meg av et tredjeparts bibliotek for å få tegnet disse
grafene, men fant ut midt i utviklingsprosessen at biblioteket var for simpelt til mine formål, og måtte derfor bytte grafbibliotek. Dette kunne jeg lett ha unngått dersom
jeg leste dokumentasjon bedre, og ikke bare hadde gått for først og best med en gang. En ting til jeg ville gjort annerledes var å bygge komponenter og legge til rette for
gjenbruk helt fra starten av, slik at refaktoreringsdelen ikke blir såpass omfattende mot slutten av utviklingsprosessen. 

## Kjente bugs
- Når man søker, vises ikke feilmeldingen dersom landet ikke finnes eller det er en stavefeil. Noen ganger blir bruker også tatt videre til neste siden, men uten data å vise
- I sammenligningsmodulet forsvinner ikke tastaturet før man enten trykker på "return"-knappen eller på scrollviewet. 
