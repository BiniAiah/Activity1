# JohnMac's Hospital — 8-Minute Video Pitch Script (Taglish)

**Course:** AP6 — Activity 1  
**Format:** Recorded video presentation  
**Presenter:** [Your Name] — BSIT 4-A  
**Professor:** Professor [Surname]  
**Target runtime:** 7:45–7:55 (buffer before 8:00)  
**Speaking pace:** 145–150 words per minute  
**Project files:** `index.html`, `css/` (5 modules), `js/` (ES modules), `sw.js`, `manifest.webmanifest`

> Replace `[Your Name]` and `[Surname]` before recording. The spoken lines total around 1,000 words. Rehearse with a timer, and if you run long, cut the optional validation beat and trim the code segment.

---

## Before Recording

- [ ] Test the microphone and record a 10-second sample. Play it back.
- [ ] Set the browser to 100–110% zoom. Hide the bookmarks bar.
- [ ] Close unrelated tabs, notifications, and messaging apps.
- [ ] Refresh the page so the patient count resets to **0**.
- [ ] Open VS Code with `js/app.js`, `js/patterns/singleton.js`, `js/patterns/factory.js`, and `index.html` ready in separate tabs.
- [ ] Prepare the two test patients:
  - Maria Dela Cruz, 28, Fever
  - Juan Santos, 45, Follow-up check-up
- [ ] Keep a timer visible on a second monitor or phone.
- [ ] Prepare backup screenshots of the doctors, registration, and services sections in case the live demo fails.
- [ ] Record in 1080p. Use a clean background and good lighting if you appear on camera.
- [ ] Do a complete rehearsal once. Mark the parts where you naturally pause.

---

## Timing Map

| Time | Segment | Screen | Spoken words |
|---|---|---|---|
| 0:00–0:35 | Hook and introduction | Camera or title card | 77 |
| 0:35–1:25 | The hospital story | Homepage hero | 108 |
| 1:25–2:10 | Homepage tour | Hero, emergency card, hours | 110 |
| 2:10–3:10 | Doctors demo | Doctor cards | 133 |
| 3:10–4:50 | Patient registration demo | Form and patient list | 166 |
| 4:50–5:40 | Services and pricing | Service cards | 105 |
| 5:40–6:50 | Code behind the website | VS Code | 128 |
| 6:50–7:32 | Learning objectives | Objectives section | 97 |
| 7:32–8:00 | Closing | Homepage or end card | 69 |

**Total:** 993 spoken words. At 145–150 wpm, the lines run about 6:35–6:50; demo actions add roughly 1:05. If you run long, cut the optional validation beat and shorten the code highlights.

---

## The Script

### 0:00–0:35 — Hook and Introduction

**On screen:** Camera shot of you, or a title card with your name, course, and project title.  
**Action:** Smile, look at the camera, and speak slowly.

**Say:**

> Magandang araw po, Professor [Surname], at sa lahat ng manonood. Ako po si [Your Name], fourth-year BSIT student. Tanong lang: paano kung ang pagpapatingin sa ospital ay kasing simple ng pag-order ng pagkain online? Isang search, isang click, at may appointment ka na. Sa video na ito, ipapakilala ko ang JohnMac's Hospital — isang website na hindi lang maganda tingnan, kundi gumagana. At ipapakita ko rin kung paano ko ito binuo gamit ang HTML, CSS, at JavaScript.

---

### 0:35–1:25 — The Hospital Story

**On screen:** Homepage hero section.  
**Action:** Slowly scroll from the top bar to the hero headline.

**Say:**

> Alam natin ang problema. Mahaba ang pila, minsan hindi malinaw ang presyo, at hindi mo alam kung kanino ka lalapit. Ang JohnMac's Hospital ay nagsimula noong 1998. Mahigit 25 years na kaming nagseserbisyo, may 40-plus specialists, 24/7 emergency hotline, at walk-ins are welcome. Ang promise namin ay simple: compassionate care, modern medicine, at fair prices para sa buong pamilya. At bawat detalye sa page, dinisenyo para mabawasan ang pag-aalala ng pasyente. Sa website na ito, gusto kong maramdaman ng pasyente na priority siya bago pa man siya pumasok sa ospital. Kaya ang buong experience — mula sa unang tingin hanggang sa registration — dapat malinaw, mabilis, at maaasahan.

---

### 1:25–2:10 — Homepage Tour

**On screen:** Hero section, then the emergency card.  
**Action:** Point to the phone number, the two call-to-action buttons, and the visiting hours.

**Say:**

> Ito ang homepage. Sa taas, makikita ninyo ang phone number, email, at ang 24/7 emergency notice. May dalawang malinaw na call to action: Register as Patient, at Meet Our Doctors. May Book Appointment button din sa navigation na dumadiretso sa registration form. Sa emergency card, nandiyan ang hotline at visiting hours, kaya hindi ka na maghahanap. Kahit saan ka mag-scroll, naka-sticky ang navigation, kaya hindi ka mawawala. Light blue at white ang palette — malinis, calming, at trustworthy. Ang pula ay para sa emergency, para agad mapansin. At responsive ang layout: kapag pinaliit mo ang browser, nag-a-adjust ang cards at navigation. Sa isang tingin, alam mo kung saan ka pupunta.

**Action (optional, 5 seconds):** Resize the browser window narrower to show the responsive layout, then restore it.

---

### 2:10–3:10 — Doctors Demo

**On screen:** Doctors section.  
**Action:** Click the **Doctors** navigation link to show the smooth scroll. Then point to the four doctor cards, their initials, and schedules.

**Say:**

> Ngayon, pag-usapan natin ang doctors section. Makikita ninyo ang apat sa aming featured specialists: General Medicine, Pediatrics, Cardiology, at Dermatology. Bawat card may pangalan, specialty, schedule, at initials sa avatar. Pero heto ang importanteng part: hindi ko ito manually na tinype isa-isa. Nanggaling ang lahat sa isang array of objects sa JavaScript. Bawat object may name, specialty, at schedule. Gumawa ako ng renderDoctors() function na naglo-loop sa array, at UICardFactory na gumagawa ng card gamit ang createElement(), tapos ini-append sa page. May helper function din na getInitials() para makuha ang initials mula sa pangalan. Makikita rin ninyo ang schedule ng bawat isa, kaya alam agad ng pasyente kung kailan siya puwedeng pumunta. Kapag nagdagdag ako ng bagong doctor sa array, automatic na lalabas siya sa page. Data-driven ang design, kaya madaling i-maintain at i-expand.

---

### 3:10–4:50 — Patient Registration Demo

**On screen:** Registration section with the form and the patient list.  
**Action:** Start with the form empty and the count at **0**.

**Say:**

> Next, ang patient registration — ito ang interactive na bahagi ng site. May form para sa full name, age, at reason for visit. May basic validation: kapag may kulang, may warning message.

**Action (optional — cut if time is tight):** Leave one field empty and click **Register Patient**. The browser blocks the submission with its required-field prompt. Then continue.

**Say:**

> Tingnan ninyo, hindi tumuloy ang form. Ngayon, mag-register tayo. Full name: Maria Dela Cruz; age: 28; reason: Fever.

**Action:** Type the details slowly enough for the viewer to read. Click **Register Patient**.

**Say:**

> May confirmation message, at ang count ay naging 1. Dagdag pa tayo: Juan Santos, 45, Follow-up check-up.

**Action:** Type the second patient. Click **Register Patient**.

**Say:**

> Ngayon, count ay 2.

**Action:** Click **Display All Patients**.

**Say:**

> At heto ang listahan. Hiwalay ang button para sa display, kaya hindi kailangang mag-reload ng page para makita ang buong listahan. Sa code, tatlong hakbang lang ito: kinukuha ko ang values mula sa inputs; gumagawa ako ng bagong patient object; at ini-push ko siya sa patients array. Pagkatapos, ina-update ko ang count at nililinis ang form. Ang event listener sa form ang tumatawag sa registerPatient(), at ang preventDefault() ang pumipigil sa page reload. Importante po: prototype lang ito, kaya nasa browser lang ang data at mawawala kapag nag-refresh. Sa production, ikokonekta natin ito sa database.

---

### 4:50–5:40 — Services and Pricing

**On screen:** Services section.  
**Action:** Scroll to the services cards. Point to each price, then to the hospital info banner.

**Say:**

> Sa services section, makikita ninyo ang apat na pangunahing serbisyo: General Check-up for 500 pesos, Pediatric Consultation for 600, Heart Screening for 1,500, at Laboratory and X-Ray for 800. Bawat card may description at presyo, para transparent at walang gulatan. Sa taas, may hospital info banner na galing sa isang object: name, address, at phone. Pareho ang pattern: array of objects, loop, tapos DOM manipulation. Ang mga presyo at serbisyo ay nasa JavaScript, kaya madaling i-update kapag nagbago ang rates. Para sa akin, hindi lang ito listahan ng serbisyo; ito ang promise ng transparency. Alam ng pasyente kung ano ang babayaran bago pa siya magdesisyon.

---

### 5:40–6:50 — Code Behind the Website

**On screen:** VS Code with the project tree open (`index.html`, `css/`, `js/`).  
**Action:** Cut to VS Code. Show `js/app.js`, then briefly `js/patterns/singleton.js`, `js/patterns/factory.js`, and the CSS modules.

**Say:**

> Ngayon, tingnan natin ang code sa likod ng website. Naka-modular ang project: index.html, limang CSS files sa css folder, at ES modules sa js folder — walang framework. Sa JavaScript, may doctors at services data, at dalawang design pattern. Una, Singleton: ang HospitalConfig at AppStore na may getInstance(), kaya isa lang ang instance at doon naka-store ang patients. Pangalawa, Factory: ang AppointmentFactory at UICardFactory ang gumagawa ng bagong object at card, kaya hindi paulit-ulit ang code. May api service din na may fallback sa local data, at event handling gamit ang addEventListener(). May service worker at manifest din para maging PWA. Malinis ang structure at descriptive ang names, kaya madaling i-maintain.

**Action:** Highlight `js/patterns/singleton.js` (`HospitalConfig`, `AppStore`), `js/patterns/factory.js` (`AppointmentFactory`, `UICardFactory`), `js/app.js` (`handleSubmit`), and `js/services/api.js`. Keep each highlight brief.

---

### 6:50–7:32 — Learning Objectives

**On screen:** Objectives section.  
**Action:** Scroll to the six objective cards. Point to each one as you mention it.

**Say:**

> Balikan natin ang anim na learning objectives, isang variation bawat isa. First, variables: gumamit ako ng const at let para sa strings, numbers, at booleans. Second, arrays: array literal, push(), at for loop para sa doctors, services, at patients. Third, objects: object literal na may properties at describe() method. Fourth, functions: named function declarations na may parameters at return, tulad ng renderDoctors(). Fifth, factory: ang AppointmentFactory na gumagawa ng bagong patient object. At sixth, singleton: ang AppStore na may getInstance() para isang instance lang ang buong app. Hindi lang ito concepts sa notes — nakita ninyo kung paano sila gumagana nang sabay-sabay sa isang actual na website.

---

### 7:32–8:00 — Closing

**On screen:** Return to the homepage, or show a simple end card.  
**Action:** Look at the camera if possible. Slow down for the final lines.

**Say:**

> Sa pagbuo ng project na ito, natutunan ko na ang magandang website ay hindi lang tungkol sa design. Tungkol din ito sa malinaw na data, maayos na functions, at maaasahang interaction. Next steps ko: database at backend para hindi mawala ang patient data, appointment scheduling, at doctor availability. Maraming salamat po, Professor [Surname], at sa lahat ng manonood. Ito po ang JohnMac's Hospital — care na mauunawaan, serbisyong maaasahan.

**End card text (display only, not spoken):**

**JohnMac's Hospital**  
Quality Care for Every Family  
[Your Name] — BSIT 4-A — AP6 Activity 1

---

## If the Live Demo Fails

Stay calm, keep talking, and cut to a backup screenshot. Use a line like:

> Habang naglo-load ang page, ipapakita ko na lang ang screenshot ng section na ito. Dito ninyo makikita ang parehong layout at functionality.

Then continue with the same demo lines. The explanation matters more than the live click.

---

## Delivery Notes

- Pause for one second after each major point. Do not rush the technical terms.
- Pronounce the JavaScript methods clearly: `createElement`, `appendChild`, `addEventListener`, `preventDefault`.
- Keep the mouse movements slow and deliberate. Avoid circling the cursor.
- Do not read the script word-for-word if it sounds stiff. Use it as a guide and keep the timing.
- If you record in sections, clap or pause for two seconds before each cut so editing is easier.
- Aim to finish the closing line by **7:55**. The last few seconds are your buffer.
- If you naturally speak faster than 150 wpm, add a one-second pause after each major section.

---

## Appendix: Possible Professor Questions

**Bakit walang database?**  
Prototype po ito para sa JavaScript basics. Nasa client-side array lang ang patient data, kaya nawawala kapag nag-refresh. Ang next step ay backend at database.

**Paano mo na-ensure ang responsiveness?**  
Gumamit po ako ng flexbox, grid, at media queries. May breakpoints sa 900px at 640px para mag-adjust ang layout sa tablet at mobile.

**Bakit JavaScript ang ginamit, at walang framework?**  
Para po maipakita ang fundamentals: arrays, objects, functions, DOM manipulation, at event handling. Mas madaling maintindihan ang core concepts kapag walang framework.

**Paano mo hahandle ang totoong patient data?**  
Kailangan po ng secure backend, authentication, at compliance sa Data Privacy Act. Hindi po ito ang scope ng prototype, pero alam ko ang next steps.

**Apat lang ang doctors, pero 40-plus ang claim. Bakit?**  
Featured specialists lang po ang nasa demo. Puwede pong magdagdag ng entries sa doctors array, at automatic na lalabas sila sa page.

**Ano ang pinakamahirap na part?**  
Ang pag-link ng form sa array at pag-update ng DOM nang walang page reload. Naintindihan ko ito sa pamamagitan ng paghiwa-hiwalay ng function sa maliliit na steps.

**Ano ang factory function?**  
Isang function na gumagawa at nagbabalik ng bagong object. Sa project, ang `AppointmentFactory.create()` ang tumatanggap ng name, age, at condition, tapos nagre-return ng bagong patient object. Mas malinis ito kaysa mag-type ng object literal sa bawat registration.

**Ano ang singleton at bakit ginamit?**  
Isang design pattern na nagsisiguro na isa lang ang instance ng isang object. Ginamit ko ang static private field at `getInstance()` sa `HospitalConfig` at `AppStore`, kaya isang shared instance lang ang may hawak ng patients array at consistent ang data sa buong app.

**Bakit Font Awesome ang ginamit para sa icons?**  
Standard at consistent ang itsura ng icons kaysa emoji, at may libreng solid at regular styles. Naka-pin ang version at may SRI hash para sa integrity, at may `aria-hidden` ang decorative icons para hindi ito basahin ng screen readers.
