#!/usr/bin/env python3
"""
Generate the EN + FR CV PDFs from structured content.

The PDFs in public/ are produced here rather than hand-typeset, so a content
change (a new certification, a reworded bullet) means editing the RESUME_EN /
RESUME_FR dicts below and re-running:

    python3 scripts/generate_cv.py

Output:
    public/gershon-otinkorang-cv.pdf      (English)
    public/gershon-otinkorang-cv-fr.pdf   (French)

Layout mirrors the original: US Letter, 43pt margins, Helvetica throughout,
justified body, hanging-indent bullets, a name/page footer.
"""

from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
)

PUBLIC = Path(__file__).resolve().parent.parent / "public"
MARGIN = 43  # points (reportlab's base unit)

# --------------------------------------------------------------------------- #
#  Styles                                                                      #
# --------------------------------------------------------------------------- #

NAME = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=24, leading=27)
TITLE = ParagraphStyle("title", fontName="Helvetica", fontSize=11, leading=14,
                        spaceBefore=1)
META = ParagraphStyle("meta", fontName="Helvetica", fontSize=9, leading=12,
                      textColor="#333333")
SECTION = ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10,
                         leading=12, spaceBefore=11, spaceAfter=3.5)
BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=9, leading=12.6,
                      alignment=TA_JUSTIFY)
SKILLS = ParagraphStyle("skills", fontName="Helvetica", fontSize=9, leading=13,
                        alignment=TA_JUSTIFY)
ROLE = ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=10, leading=12,
                      spaceBefore=6)
ORG = ParagraphStyle("org", fontName="Helvetica-Oblique", fontSize=8.9,
                     leading=11, textColor="#333333")
LEDE = ParagraphStyle("lede", fontName="Helvetica", fontSize=9, leading=12,
                      spaceBefore=1, spaceAfter=1)
BULLET = ParagraphStyle("bullet", fontName="Helvetica", fontSize=9, leading=12.4,
                        alignment=TA_JUSTIFY, leftIndent=10, firstLineIndent=-10)
ENTRY = ParagraphStyle("entry", fontName="Helvetica-Bold", fontSize=9.2,
                       leading=11.5, spaceBefore=4)
ENTRY_META = ParagraphStyle("entrymeta", fontName="Helvetica", fontSize=8.9,
                            leading=11.5, textColor="#333333")
TECH = ParagraphStyle("tech", fontName="Helvetica", fontSize=8.9, leading=11.8,
                      alignment=TA_JUSTIFY, leftIndent=0, spaceBefore=1.5)


def build_story(r):
    """Turn a resume dict into a flowable list."""
    s = []
    s.append(Paragraph(r["name"], NAME))
    s.append(Paragraph(r["title"], TITLE))
    s.append(Spacer(1, 3))
    s.append(Paragraph(r["location"], META))
    s.append(Paragraph(r["contact"], META))

    s.append(Paragraph(r["profile_heading"], SECTION))
    s.append(Paragraph(r["profile"], BODY))

    s.append(Paragraph(r["coreskills_heading"], SECTION))
    s.append(Paragraph(r["coreskills"], SKILLS))

    s.append(Paragraph(r["experience_heading"], SECTION))
    for job in r["experience"]:
        s.append(Paragraph(job["role"], ROLE))
        s.append(Paragraph(job["meta"], ORG))
        if job.get("lede"):
            s.append(Paragraph(job["lede"], LEDE))
        for b in job["bullets"]:
            s.append(Paragraph(f"– {b}", BULLET))

    s.append(Paragraph(r["education_heading"], SECTION))
    for e in r["education"]:
        s.append(Paragraph(e["title"], ENTRY))
        s.append(Paragraph(e["meta"], ENTRY_META))

    s.append(Paragraph(r["cert_heading"], SECTION))
    for c in r["certs"]:
        s.append(Paragraph(c["title"], ENTRY))
        s.append(Paragraph(c["meta"], ENTRY_META))

    s.append(Paragraph(r["technical_heading"], SECTION))
    for g in r["technical"]:
        s.append(Paragraph(f"<b>{g['label']}</b> {g['items']}", TECH))

    return s


def render(r, filename):
    path = PUBLIC / filename

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 7.2)
        canvas.setFillColor("#666666")
        y = 30
        canvas.drawString(MARGIN, y, r["name"])
        canvas.drawRightString(letter[0] - MARGIN, y,
                               f"{r['page_word']} {doc.page}")
        canvas.restoreState()

    doc = BaseDocTemplate(
        str(path), pagesize=letter,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=MARGIN,
        title=f"{r['name']} — CV", author=r["name"],
    )
    frame = Frame(MARGIN, MARGIN, letter[0] - 2 * MARGIN,
                  letter[1] - 2 * MARGIN, id="body",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="cv", frames=[frame], onPage=footer)])
    doc.build(build_story(r))
    print(f"wrote {path.relative_to(PUBLIC.parent)}")


# --------------------------------------------------------------------------- #
#  Content — English                                                           #
# --------------------------------------------------------------------------- #

RESUME_EN = {
    "name": "Gershon Adjei Otinkorang",
    "title": "Information Technology Consultant",
    "location": "55 Sir Wilfred Greenfield Place, St. John's, NL, Canada",
    "contact": "+1 (709) 219-5364 &middot; contact@gershon.one &middot; gershon.one &middot; linkedin.com/in/gaotinkorang",
    "page_word": "Page",
    "profile_heading": "PROFILE",
    "profile": (
        "Information Technology Consultant and Memorial University of Newfoundland MSc Computer Science student "
        "with five years' experience keeping users, devices and enterprise infrastructure running. Currently "
        "providing remote IT consulting at Sabaoth across hardware, networks, firewalls, and Microsoft 365/Google "
        "Workspace in Canada. Previously engineered the multi-WAN satellite link and GPON fibre backbone across a "
        "1,200-acre industrial park in Ghana. AWS certified and focused on network security and intrusion detection."
    ),
    "coreskills_heading": "CORE SKILLS",
    "coreskills": (
        "IT consulting &amp; remote support &middot; Microsoft 365 &amp; Google Workspace &middot; Routers, switches &amp; firewalls &middot; "
        "MikroTik RouterOS &amp; multi-WAN &middot; Fibre / GPON distribution &middot; Starlink deployment &middot; Huawei enterprise switching &middot; "
        "Proxmox, Linux &amp; Docker &middot; Odoo and ERPNext administration &middot; Network segmentation &amp; firewall policy &middot; "
        "VPN (WireGuard, Tailscale) &middot; CCTV / IP camera systems &middot; AWS &amp; Google Cloud &middot; Technical documentation"
    ),
    "experience_heading": "EXPERIENCE",
    "experience": [
        {
            "role": "Information Technology Consultant",
            "meta": "SABAOTH &middot; Auburn Bay, AB, Canada (Remote) &middot; September 2026 – present",
            "bullets": [
                "Provided remote IT consulting and technical support for hardware, software, and network issues, ensuring seamless connectivity.",
                "Configured and troubleshot routers, switches, and firewalls, enhancing infrastructure reliability for clients.",
                "Supported Microsoft 365 and Google Workspace, managing user accounts and permissions for optimal functionality.",
                "Assisted with cybersecurity measures and system maintenance, contributing to a secure IT environment.",
            ],
        },
        {
            "role": "IT Support Officer",
            "meta": "Greenhouse International Development Group Ghana Ltd. &middot; Bright Industrial Park, Ghana &middot; October 2023 – August 2026",
            "lede": "Sole IT support for a 1,200-acre industrial park and the retail sites of its subsidiary.",
            "bullets": [
                "First and only line of IT support for staff across the park and head office: hardware, software, printers, accounts and access, from triage to resolution.",
                "Configure, deploy and support point-of-sale systems for Bright Afrimall across multiple retail locations in Ghana, including staff training and remote fault resolution.",
                "Manage the handheld PDA estate used for stock and operations — provisioning, application deployment and day-to-day fault resolution.",
                "Designed and deployed the park's fibre backbone, carrying CCTV footage and POS data from factories and remote buildings to head office, and distributing internet back out to the factories.",
                "Built site internet capacity by aggregating eight individually mounted Starlink terminals into a MikroTik router as eight WAN links, feeding a Huawei S5735 enterprise switch and a GPON distribution layer with 1:4 splitters across the fibre panel.",
                "Gated administrator access to internal systems behind a VPN on the MikroTik router, and segmented the network with VLANs and firewall policy to keep PII off the public internet.",
                "Extended coverage beyond the park boundary with point-to-point wireless links and VPN tunnels so off-site locations reach head office resources.",
                "Installed and manage indoor and outdoor access points with centralised controllers across offices, factory floors and open ground.",
                "Deploy and maintain internal services on Proxmox and Linux servers using Docker and Portainer — Odoo, OpenMAINT, Tailscale and DNS-level ad and content filtering.",
                "Run IT stores and asset control in Odoo: inventory, stock movements and equipment issue for the IT warehouse.",
                "Support the survey team by converting CAD site plans into OpenStreetMap data with JOSM, giving the park an accurate digital basemap.",
                "Act as departmental supervisor in the Engineering &amp; Design Manager's absence, and lead technical interviews for IT Officer hires.",
            ],
        },
        {
            "role": "Remote IT Consultant",
            "meta": "Nii Plants Group &middot; Ghana &middot; 2021 – present",
            "bullets": [
                "Provide remote IT administration and technical support for company digital infrastructure.",
                "Manage company websites, domains, hosting platforms, SSL certificates and business email systems.",
                "Perform website maintenance, security updates, performance optimisation and troubleshooting.",
                "Support digital platforms used across hospitality, transportation, logistics and real estate operations.",
                "Manage online services and ensure availability of critical business systems.",
            ],
        },
        {
            "role": "Information Technology Specialist",
            "meta": "Prop-Tis GH Limited &middot; Ghana &middot; April 2022 – September 2023",
            "bullets": [
                "Developed and managed the company's real estate listing platform, improving performance and user experience.",
                "Delivered IT support across the organisation for hardware, software and network issues.",
                "Implemented and maintained data backup systems, and SEO strategies that increased organic visibility.",
                "Supervised creative production teams across video, photography and graphic content.",
            ],
        },
        {
            "role": "Project Assistant",
            "meta": "Kwaaba Foundation &middot; Ghana &middot; March 2021 – February 2022",
            "bullets": [
                "Coordinated project plans, timelines and personnel allocation for health and community initiatives.",
                "Managed office operations, documentation control, meetings, and stakeholder communications.",
                "Designed and developed websites, graphic content, and social media communications for project branding.",
            ],
        },
        {
            "role": "Information Technology Specialist",
            "meta": "Origin8 Limited &middot; Ghana &middot; April 2020 – March 2021",
            "bullets": [
                "Designed and maintained websites for client and internal projects.",
                "Provided staff IT support for hardware, software, and network issues, minimizing downtime.",
                "Integrated digital tools and technical solutions into marketing campaign deliverables.",
            ],
        },
        {
            "role": "Information Technology Specialist",
            "meta": "GCB Bank Limited &middot; Amasaman, Ghana &middot; October 2019 – January 2020",
            "bullets": [
                "Provided maintenance and repair for currency counters, ensuring optimal hardware functionality across banking operations.",
                "Offered staff support for hardware, software, and network issues, minimizing service disruptions.",
                "Assisted customers with account inquiries and service requests through clear communication.",
                "Utilized Google Forms and digital tools for efficient information collection and processing.",
            ],
        },
        {
            "role": "Management Information Systems Intern",
            "meta": "Volta River Authority &middot; Aboadze, Ghana &middot; September 2017 – January 2018",
            "bullets": [
                "Resolved network connectivity issues, configured staff hardware, and installed server and client operating systems.",
            ],
        },
        {
            "role": "Sales Executive &amp; Hardware Repair Technician",
            "meta": "RichWorld Mobile Devices &middot; Ghana &middot; June 2016 – September 2017",
            "bullets": [
                "Component-level mobile hardware repair, inventory records and after-sales support.",
            ],
        },
    ],
    "education_heading": "EDUCATION",
    "education": [
        {"title": "MSc, Computer Science",
         "meta": "Memorial University of Newfoundland, St. John's, Canada &middot; September 2026 – November 2028 &middot; Course-based, network security and intrusion detection"},
        {"title": "BSc, Information Technology",
         "meta": "Kwame Nkrumah University of Science and Technology, Ghana &middot; 2022 – 2024 &middot; Second Class Honours, Upper Division"},
        {"title": "Higher National Diploma, Information Science/Studies",
         "meta": "Takoradi Technical University, Ghana &middot; 2017 – 2021 &middot; Second Class, Upper Division"},
    ],
    "cert_heading": "CERTIFICATIONS",
    "certs": [
        {"title": "Intermediate First Aid CPR C/AED (Standard)",
         "meta": "St. John Ambulance &middot; September 2026 – September 2029 &middot; Credential 1561996292"},
        {"title": "Sexual Violence Awareness and Prevention",
         "meta": "Memorial University of Newfoundland &middot; September 2026"},
        {"title": "Fire Safety, Prevention, Evacuation and Basic Firefighting",
         "meta": "Ghana National Fire Service &middot; September 2025 &middot; Amasaman Fire Station"},
        {"title": "Foundations of Cybersecurity",
         "meta": "Google (Coursera) &middot; August 2026 &middot; Credential KVMKSBBS97UR"},
        {"title": "AWS Certified Cloud Practitioner",
         "meta": "Amazon Web Services &middot; July 2024 – July 2027 &middot; Credential 22299d8c82674d9fa309d05ac2c872a6"},
        {"title": "LinkedIn Marketing Strategy &middot; Marketing Fundamentals",
         "meta": "LinkedIn &middot; 2022"},
        {"title": "Google Digital Skills",
         "meta": "Google &middot; October 2020"},
    ],
    "technical_heading": "TECHNICAL",
    "technical": [
        {"label": "Consulting & Support", "items": "Remote IT consulting &middot; Hardware diagnostics and repair &middot; Windows and Linux desktops &middot; Microsoft 365 &middot; Google Workspace &middot; Printers and peripherals &middot; User accounts and access &middot; User training"},
        {"label": "Retail / field", "items": "POS configuration and rollout &middot; PDA provisioning &middot; Multi-site deployment &middot; CCTV / IP cameras &middot; Asset and inventory control (Odoo)"},
        {"label": "Network", "items": "MikroTik RouterOS &middot; Routers and enterprise switches &middot; Multi-WAN aggregation &middot; Starlink &middot; Fibre / GPON &middot; Huawei S5735 &middot; VLANs and firewall policy &middot; Point-to-point wireless &middot; WireGuard / Tailscale &middot; APs"},
        {"label": "Security", "items": "Network segmentation (VLANs) &middot; Firewall policy and hardening &middot; VPN-gated admin access &middot; DNS content filtering &middot; PII and data protection &middot; Access and identity management &middot; SIEM fundamentals &middot; Threat analysis"},
        {"label": "Servers", "items": "Proxmox &middot; Linux administration &middot; Docker and Portainer &middot; Odoo &middot; OpenMAINT &middot; Frappe / ERPNext &middot; DNS filtering &middot; Backup and recovery"},
        {"label": "Cloud / web", "items": "AWS &middot; Google Cloud &middot; Cloudflare &middot; Domain and DNS &middot; Email hosting &middot; WordPress &middot; PHP / MySQL &middot; HTML, CSS, JavaScript &middot; Git"},
        {"label": "Other", "items": "JOSM / OpenStreetMap &middot; CAD to GIS conversion &middot; Structured cabling &middot; Technical documentation &middot; Project coordination &middot; Remote work"},
    ],
}

# --------------------------------------------------------------------------- #
#  Content — French                                                            #
# --------------------------------------------------------------------------- #

RESUME_FR = {
    "name": "Gershon Adjei Otinkorang",
    "title": "Consultant en technologies de l'information",
    "location": "55 Sir Wilfred Greenfield Place, St. John's, T.-N.-L., Canada",
    "contact": "+1 (709) 219-5364 &middot; contact@gershon.one &middot; gershon.one &middot; linkedin.com/in/gaotinkorang",
    "page_word": "Page",
    "profile_heading": "PROFIL",
    "profile": (
        "Consultant en technologies de l'information et étudiant à la maîtrise en informatique à l'Université Memorial "
        "de Terre-Neuve, comptant cinq ans d'expérience. Fournit actuellement des services de conseil et de support "
        "informatique à distance chez Sabaoth (matériel, réseaux, pare-feu, Microsoft 365/Google Workspace) au Canada. "
        "A précédemment conçu la dorsale en fibre optique et la liaison multi-WAN satellite d'un parc industriel de "
        "1 200 acres au Ghana. Certifié AWS, axé sur la sécurité réseau et la détection d'intrusion."
    ),
    "coreskills_heading": "COMPÉTENCES CLÉS",
    "coreskills": (
        "Conseil IT et support à distance &middot; Microsoft 365 et Google Workspace &middot; Routeurs, commutateurs et pare-feu &middot; "
        "MikroTik RouterOS et multi-WAN &middot; Distribution fibre / GPON &middot; Déploiement Starlink &middot; Commutation Huawei entreprise &middot; "
        "Proxmox, Linux et Docker &middot; Administration Odoo et ERPNext &middot; Segmentation réseau et pare-feu &middot; "
        "VPN (WireGuard, Tailscale) &middot; Vidéosurveillance et caméras IP &middot; AWS et Google Cloud &middot; Documentation technique"
    ),
    "experience_heading": "EXPÉRIENCE",
    "experience": [
        {
            "role": "Consultant en technologies de l'information",
            "meta": "SABAOTH &middot; Auburn Bay, AB, Canada (À distance) &middot; septembre 2026 – aujourd'hui",
            "bullets": [
                "Conseil informatique et assistance technique à distance pour les pannes matérielles, logicielles et réseau, garantissant une connectivité continue.",
                "Configuration et dépannage de routeurs, commutateurs et pare-feu, améliorant la fiabilité de l'infrastructure des clients.",
                "Support et administration de Microsoft 365 et Google Workspace, gestion des comptes utilisateurs et des permissions.",
                "Contribution aux mesures de cybersécurité et à la maintenance préventive pour un environnement informatique sécurisé.",
            ],
        },
        {
            "role": "Chargé de support informatique",
            "meta": "Greenhouse International Development Group Ghana Ltd. &middot; Bright Industrial Park, Ghana &middot; octobre 2023 – août 2026",
            "lede": "Seul responsable du support informatique pour un parc industriel de 1 200 acres et les points de vente de sa filiale.",
            "bullets": [
                "Premier et unique niveau de support informatique pour le personnel du parc et du siège : matériel, logiciels, imprimantes, comptes et accès, du diagnostic à la résolution.",
                "Configuration, déploiement et support des systèmes de point de vente de Bright Afrimall sur plusieurs sites commerciaux au Ghana, y compris la formation du personnel et le dépannage à distance.",
                "Gestion du parc de terminaux portables utilisés pour les stocks et l'exploitation — approvisionnement, déploiement d'applications et résolution des pannes.",
                "Conception et déploiement de la dorsale en fibre optique du parc, acheminant les flux de vidéosurveillance et les données de caisse depuis les usines et bâtiments distants vers le siège, et redistribuant l'accès internet vers les usines.",
                "Augmentation de la capacité internet du site en agrégeant huit terminaux Starlink installés individuellement sur un routeur MikroTik comme huit liens WAN, alimentant un commutateur Huawei S5735 puis une couche de distribution GPON avec des répartiteurs 1:4.",
                "Accès administrateur aux systèmes internes protégé par un VPN sur le routeur MikroTik, et segmentation du réseau par VLAN et pare-feu pour garder les données personnelles hors de l'internet public.",
                "Extension de la couverture au-delà du périmètre du parc par liaisons sans fil point à point et tunnels VPN.",
                "Installation et gestion de points d'accès intérieurs et extérieurs avec contrôleurs centralisés.",
                "Déploiement et maintenance des services internes sur Proxmox et serveurs Linux via Docker et Portainer — Odoo, OpenMAINT, Tailscale et filtrage DNS.",
                "Gestion du magasin informatique et du parc matériel dans Odoo : inventaire, mouvements de stock et attribution des équipements.",
                "Appui à l'équipe de géomètres par la conversion de plans CAO en données OpenStreetMap avec JOSM.",
                "Remplacement du responsable ingénierie et conception en son absence, et conduite des entretiens techniques.",
            ],
        },
        {
            "role": "Consultant informatique à distance",
            "meta": "Nii Plants Group &middot; Ghana &middot; 2021 – aujourd'hui",
            "bullets": [
                "Administration et support technique à distance de l'infrastructure numérique de l'entreprise.",
                "Gestion des sites web, des domaines, des plateformes d'hébergement, des certificats SSL et de la messagerie d'entreprise.",
                "Maintenance des sites, mises à jour de sécurité, optimisation des performances et dépannage.",
                "Support des plateformes numériques utilisées dans l'hôtellerie, le transport, la logistique et l'immobilier.",
                "Gestion des services en ligne et maintien de la disponibilité des systèmes critiques.",
            ],
        },
        {
            "role": "Spécialiste informatique",
            "meta": "Prop-Tis GH Limited &middot; Ghana &middot; avril 2022 – septembre 2023",
            "bullets": [
                "Développement et gestion de la plateforme d'annonces immobilières de l'entreprise.",
                "Support informatique à l'échelle de l'organisation pour le matériel, les logiciels et le réseau.",
                "Mise en place des sauvegardes de données et de stratégies de référencement.",
                "Encadrement des équipes de production créative en vidéo, photographie et graphisme.",
            ],
        },
        {
            "role": "Assistant de projet",
            "meta": "Kwaaba Foundation &middot; Ghana &middot; mars 2021 – février 2022",
            "bullets": [
                "Coordination des plans de projet, des échéanciers et de l'affectation du personnel.",
                "Gestion des opérations de bureau, du contrôle documentaire et des communications.",
                "Conception et développement de sites web, contenus graphiques et réseaux sociaux.",
            ],
        },
        {
            "role": "Spécialiste informatique",
            "meta": "Origin8 Limited &middot; Ghana &middot; avril 2020 – mars 2021",
            "bullets": [
                "Conception et maintenance de sites web pour des projets clients et internes.",
                "Support technique aux employés pour le matériel, les logiciels et le réseau afin de limiter les interruptions.",
                "Intégration d'outils numériques aux livrables de communication.",
            ],
        },
        {
            "role": "Spécialiste informatique",
            "meta": "GCB Bank Limited &middot; Amasaman, Ghana &middot; octobre 2019 – janvier 2020",
            "bullets": [
                "Entretien et réparation de compteuses de billets, assurant un fonctionnement matériel optimal pour les opérations bancaires.",
                "Support technique au personnel pour le matériel, les logiciels et le réseau, réduisant les interruptions de service.",
                "Assistance aux clients pour leurs demandes de renseignements sur les comptes et les services.",
                "Utilisation de Google Forms et d'outils numériques pour la collecte et le traitement efficace des données.",
            ],
        },
        {
            "role": "Stagiaire en systèmes d'information de gestion",
            "meta": "Volta River Authority &middot; Aboadze, Ghana &middot; septembre 2017 – janvier 2018",
            "bullets": [
                "Résolution de problèmes de connectivité réseau, configuration du matériel et installation de systèmes d'exploitation serveur et client.",
            ],
        },
        {
            "role": "Chargé de vente et technicien en réparation matérielle",
            "meta": "RichWorld Mobile Devices &middot; Ghana &middot; juin 2016 – septembre 2017",
            "bullets": [
                "Réparation de matériel mobile au niveau des composants, tenue des stocks et service après-vente.",
            ],
        },
    ],
    "education_heading": "FORMATION",
    "education": [
        {"title": "Maîtrise en informatique",
         "meta": "Université Memorial de Terre-Neuve, St. John's, Canada &middot; septembre 2026 – novembre 2028 &middot; Avec cours, sécurité réseau et détection d'intrusion"},
        {"title": "Baccalauréat en technologies de l'information",
         "meta": "Université des sciences et technologies Kwame Nkrumah, Ghana &middot; 2022 – 2024 &middot; Mention bien, division supérieure"},
        {"title": "Diplôme supérieur en technologies de l'information et de la communication",
         "meta": "Université technique de Takoradi, Ghana &middot; 2017 – 2021 &middot; Mention bien, division supérieure"},
    ],
    "cert_heading": "CERTIFICATIONS",
    "certs": [
        {"title": "Secourisme intermédiaire RCR niveau C / DEA (standard)",
         "meta": "Ambulance Saint-Jean &middot; septembre 2026 – septembre 2029 &middot; Identifiant 1561996292"},
        {"title": "Sensibilisation et prévention de la violence sexuelle",
         "meta": "Université Memorial de Terre-Neuve &middot; septembre 2026"},
        {"title": "Sécurité incendie, prévention, évacuation et lutte contre l'incendie",
         "meta": "Service national des incendies du Ghana &middot; septembre 2025 &middot; Caserne d'Amasaman"},
        {"title": "Fondements de la cybersécurité",
         "meta": "Google (Coursera) &middot; août 2026 &middot; Identifiant KVMKSBBS97UR"},
        {"title": "AWS Certified Cloud Practitioner",
         "meta": "Amazon Web Services &middot; juillet 2024 – juillet 2027 &middot; Identifiant 22299d8c82674d9fa309d05ac2c872a6"},
        {"title": "Stratégie et fondements du marketing LinkedIn",
         "meta": "LinkedIn &middot; 2022"},
        {"title": "Compétences numériques Google",
         "meta": "Google &middot; octobre 2020"},
    ],
    "technical_heading": "COMPÉTENCES TECHNIQUES",
    "technical": [
        {"label": "Conseil et support", "items": "Support à distance &middot; Diagnostic et réparation matériels &middot; Postes Windows et Linux &middot; Microsoft 365 &middot; Google Workspace &middot; Imprimantes et périphériques &middot; Comptes et accès &middot; Formation des utilisateurs"},
        {"label": "Vente / terrain", "items": "Configuration et déploiement de caisses &middot; Terminaux portables &middot; Déploiement multi-sites &middot; Vidéosurveillance &middot; Gestion des actifs et stocks (Odoo)"},
        {"label": "Réseau", "items": "MikroTik RouterOS &middot; Routeurs et commutateurs entreprise &middot; Agrégation multi-WAN &middot; Starlink &middot; Fibre / GPON &middot; Huawei S5735 &middot; VLAN et pare-feu &middot; Liaisons point à point &middot; WireGuard / Tailscale &middot; Points d'accès"},
        {"label": "Sécurité", "items": "Segmentation réseau (VLAN) &middot; Politique et durcissement du pare-feu &middot; Accès admin protégé par VPN &middot; Filtrage de contenu DNS &middot; Protection des données personnelles &middot; Gestion des accès et des identités &middot; Surveillance (SIEM) &middot; Analyse des menaces"},
        {"label": "Serveurs", "items": "Proxmox &middot; Administration Linux &middot; Docker et Portainer &middot; Odoo &middot; OpenMAINT &middot; Frappe / ERPNext &middot; Filtrage DNS &middot; Sauvegarde et restauration"},
        {"label": "Infonuagique / web", "items": "AWS &middot; Google Cloud &middot; Cloudflare &middot; Domaines et DNS &middot; Hébergement de messagerie &middot; WordPress &middot; PHP / MySQL &middot; HTML, CSS, JavaScript &middot; Git"},
        {"label": "Divers", "items": "JOSM / OpenStreetMap &middot; Conversion CAO vers SIG &middot; Câblage structuré &middot; Documentation technique &middot; Coordination de projets &middot; Travail à distance"},
    ],
}


if __name__ == "__main__":
    render(RESUME_EN, "gershon-otinkorang-cv.pdf")
    render(RESUME_FR, "gershon-otinkorang-cv-fr.pdf")
