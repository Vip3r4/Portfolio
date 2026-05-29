const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

window.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ---------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('customLogoLoop');
    const track = document.getElementById('customTrack');
    const originalList = document.getElementById('customOriginalList');
    
    if (!container || !track || !originalList) {
        console.error('Elements not found');
        return;
    }
    
    const speed = 40;
    const gap = 60;
    
    originalList.style.gap = gap + 'px';
    
    let animationId = null;
    let position = 0;
    let lastTimestamp = null;
    let isHovered = false;
    let totalWidth = 0;
    
    function setupCopies() {
        const lists = track.querySelectorAll('.custom-logo-list');
        lists.forEach((list, index) => {
            if (index > 0) list.remove();
        });
        
        originalList.style.visibility = 'visible';
        
        const listWidth = originalList.offsetWidth;
        if (listWidth === 0) {
            setTimeout(setupCopies, 100);
            return;
        }
        
        const containerWidth = container.offsetWidth;
        const copiesNeeded = Math.ceil(containerWidth / listWidth) + 4;
        
        for (let i = 1; i < copiesNeeded; i++) {
            const clone = originalList.cloneNode(true);
            clone.id = '';
            track.appendChild(clone);
        }
        
        const firstList = track.querySelector('.custom-logo-list');
        if (firstList) {
            totalWidth = firstList.offsetWidth;
        }
        
        position = 0;
        if (track) {
            track.style.transform = `translateX(0px)`;
        }
    }
    
    function animate(currentTime) {
        if (!animationId) return;
        
        if (!lastTimestamp) {
            lastTimestamp = currentTime;
            requestAnimationFrame(animate);
            return;
        }
        
        let deltaTime = Math.min(0.033, (currentTime - lastTimestamp) / 1000);
        lastTimestamp = currentTime;
        
        if (!isHovered && totalWidth > 0) {
            position -= speed * deltaTime;
            
            if (Math.abs(position) >= totalWidth) {
                position = position + totalWidth;
            }
            
            track.style.transform = `translateX(${position}px)`;
        }
        
        requestAnimationFrame(animate);
    }
    
    container.addEventListener('mouseenter', function() {
        isHovered = true;
    });
    
    container.addEventListener('mouseleave', function() {
        isHovered = false;
        lastTimestamp = null;
    });
    
    setupCopies();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            position = 0;
            setupCopies();
        }, 200);
    });
    
    animationId = true;
    lastTimestamp = null;
    requestAnimationFrame(animate);
});

/* ---------------------------------------- */

const langSwitch = document.getElementById('langSwitch');
let currentLang = 'FR';

const translations = {
    FR: {
        // Navbar
        nav_accueil: 'Accueil',
        nav_projets: 'Projets',
        nav_services: 'Services',
        nav_competences: 'Compétences',
        nav_apropos: 'À Propos',
        nav_cta: 'Me Contacter',

        // Accueil
        accueil_tag: 'Bonjour, je suis',
        accueil_h2: 'Développeur Web & C# spécialisé serveurs de jeu',
        accueil_desc: 'Je crée des sites, dashboards et plugins pour les communautés de jeu - SCP:SL, FiveM, et plus encore.',
        accueil_btn1: 'Voir mes projets',
        accueil_btn2: 'Me contacter',

        // Projets
        projets_h2: 'Mes Projets',
        projets_desc: 'Chaque projet est conçu sur mesure pour répondre aux besoins réels d\'une communauté ou des membres du staff. Voilà ce que j\'ai construit.',
        projet1_h3: 'Site Web Fondation Delta No RP',
        projet1_desc: 'Site vitrine pour mon serveur No RP sur SCP:SL - wiki, dev-logs, contact, et page à propos.',
        projet2_h3: 'Site Web Motor Co. FiveM',
        projet2_desc: 'Site vitrine pour un concessionnaire automobile sur FiveM - catalogue, contact, page à propos et panel admin avec connexion pour gérer les véhicules sans toucher au code.',
        projet3_h3: 'Plugin Site Delta DarkRP',
        projet3_desc: 'Plugin qui rajoute de nombreuses fonctionnalités pour un DarkRP, confinement de SCP, respawn contrôlés etc..',
        projet4_h3: 'Plugin Fondation Delta NoRP',
        projet4_desc: 'Plugin qui rajoute de nombreuses fonctionnalités pour un NoRP, commandes admin et joueur, custom items, custom roles, intégration PMer etc..',
        projet5_h3: 'Plugin Inferno DarkRP',
        projet5_desc: 'Plugin qui rajoute de nombreuses fonctionnalités pour un DarkRP, confinement de SCP, respawn contrôlés etc..',

        // Services
        services_h2: 'Services',
        services_desc: 'Des solutions sur mesure pour les communautés de jeu qui veulent se démarquer et offrir une vraie expérience à leurs joueurs.',
        service1_h3: 'Site Vitrine + Dashboard',
        service1_desc: 'Un site sur mesure pour présenter ta communauté avec un panel d\'administration pour gérer ton contenu sans toucher au code.',
        service1_delay: '⏱ 2 à 3 semaines',
        service2_h3: 'Plugin Exiled',
        service2_desc: 'Développement de plugins sur mesure pour ton serveur SCP:SL - rôles et items custom, commandes staff et joueurs ou tout ce dont ta communauté a besoin.',
        service2_delay: '⏱ 1 à 2 semaines',
        service3_badge: 'Populaire',
        service3_h3: 'Pack Complet',
        service3_desc: 'Site vitrine + dashboard + plugin Exiled. Une solution clé en main pour donner à ta communauté une vraie identité et des outils adaptés.',
        service3_delay: '⏱ 3 à 5 semaines',
        services_cta: 'Me contacter',

        // Compétences
        competences_h2: 'Compétences',
        competences_desc: 'Les languages et stacks que j\'utilise au quotidien pour construire des projets solides et maintenables.',
        comp_langages: 'Langages',
        comp_frameworks: 'Frameworks',
        comp_outils: 'Outils',
        comp_jeux: 'Univers jeu',

        // À Propos
        apropos_h2: 'À Propos',
        apropos1_h3: 'Qui suis-je ?',
        apropos1_desc: 'Autodidacte de 16 ans spécialisé dans les communautés de jeu. Lancé dans le code grâce à un ami, je me suis formé seul sur le web et le C# pour construire des outils concrets pour les serveurs SCP:SL et FiveM.',
        apropos2_h3: 'Paiement',
        apropos2_desc: 'Un acompte de 30% est demandé avant le début du développement pour sécuriser le temps et le travail, le reste juste avant la livraison, après la démonstration. Le prix est défini ensemble avant de commencer, pas de mauvaise surprise.',
        apropos3_h3: 'Support & Maintenance',
        apropos3_desc: 'Après la livraison, je reste disponible pour corriger les bugs et répondre à tes questions. Les mises à jour majeures ou nouvelles fonctionnalités font l\'objet d\'un nouveau devis. J\'essaye en général de créer des panels qui permettent l\'ajout de contenu supplémentaire manuellement sans repasser par mes services.',

        // Contact
        contact_h2: 'Me Contacter',
        contact_desc: 'Une idée, un projet ou une question ? Envoie moi un message et je te réponds dans les plus brefs délais.',
        contact_label_discord: 'Discord',
        contact_label_github: 'GitHub',
        contact_nom: 'Nom / Pseudo',
        contact_nom_placeholder: 'Ton nom ou pseudo',
        contact_sujet: 'Sujet',
        contact_sujet_placeholder: 'Choisir...',
        contact_opt1: 'Site vitrine + Dashboard',
        contact_opt2: 'Plugin Exiled',
        contact_opt3: 'Pack complet',
        contact_opt4: 'Autre',
        contact_discord_label: 'Tag Discord',
        contact_discord_placeholder: 'ton_tag#0000',
        contact_message: 'Message',
        contact_message_placeholder: 'Décris ton projet, tes besoins...',
        contact_submit: 'Envoyer le message',

        // Footer
        footer_desc: 'Développeur web & C# spécialisé dans les communautés de jeu.',
        footer_nav: 'Navigation',
        footer_liens: 'Liens',
        footer_credit: 'Conçu & développé par',
    },
    EN: {
        // Navbar
        nav_accueil: 'Home',
        nav_projets: 'Projects',
        nav_services: 'Services',
        nav_competences: 'Skills',
        nav_apropos: 'About',
        nav_cta: 'Contact Me',

        // Accueil
        accueil_tag: 'Hello, I am',
        accueil_h2: 'Web & C# Developer specialized in game servers',
        accueil_desc: 'I build websites, dashboards and plugins for gaming communities - SCP:SL, FiveM, and more.',
        accueil_btn1: 'See my projects',
        accueil_btn2: 'Contact me',

        // Projets
        projets_h2: 'My Projects',
        projets_desc: 'Every project is built to meet the real needs of a community or its staff. Here\'s what I\'ve built.',
        projet1_h3: 'Delta Foundation No RP Website',
        projet1_desc: 'Showcase website for my No RP server on SCP:SL - wiki, dev-logs, contact, and about page.',
        projet2_h3: 'Motor Co. FiveM Website',
        projet2_desc: 'Showcase website for a car dealership on FiveM - catalog, contact, about page and admin panel with login to manage vehicles without touching the code.',
        projet3_h3: 'Delta DarkRP Site Plugin',
        projet3_desc: 'Plugin adding many features for a DarkRP server, SCP containment, controlled respawns, etc.',
        projet4_h3: 'Delta Foundation NoRP Plugin',
        projet4_desc: 'Plugin adding many features for a NoRP server, admin and player commands, custom items, custom roles, PMer integration, etc.',
        projet5_h3: 'Inferno DarkRP Plugin',
        projet5_desc: 'Plugin adding many features for a DarkRP server, SCP containment, controlled respawns, etc.',

        // Services
        services_h2: 'Services',
        services_desc: 'Custom solutions for gaming communities that want to stand out and offer a real experience to their players.',
        service1_h3: 'Showcase Website + Dashboard',
        service1_desc: 'A custom website to present your community with an admin panel to manage your content without touching the code.',
        service1_delay: '⏱ 2 to 3 weeks',
        service2_h3: 'Exiled Plugin',
        service2_desc: 'Custom plugin development for your SCP:SL server - custom roles and items, staff and player commands or anything your community needs.',
        service2_delay: '⏱ 1 to 2 weeks',
        service3_badge: 'Popular',
        service3_h3: 'Full Package',
        service3_desc: 'Showcase website + dashboard + Exiled plugin. A turnkey solution to give your community a real identity and the right tools.',
        service3_delay: '⏱ 3 to 5 weeks',
        services_cta: 'Contact me',

        // Compétences
        competences_h2: 'Skills',
        competences_desc: 'The languages and stacks I use daily to build solid and maintainable projects.',
        comp_langages: 'Languages',
        comp_frameworks: 'Frameworks',
        comp_outils: 'Tools',
        comp_jeux: 'Gaming',

        // À Propos
        apropos_h2: 'About',
        apropos1_h3: 'Who am I?',
        apropos1_desc: 'Self-taught 16-year-old developer specialized in gaming communities. Started coding thanks to a friend, I trained myself on web and C# to build concrete tools for SCP:SL and FiveM servers.',
        apropos2_h3: 'Payment',
        apropos2_desc: 'A 30% deposit is required before development starts to secure time and work, the rest just before delivery, after the demo. The price is agreed together before starting — no bad surprises.',
        apropos3_h3: 'Support & Maintenance',
        apropos3_desc: 'After delivery, I stay available to fix bugs and answer your questions. Major updates or new features are subject to a new quote. I generally try to build panels that allow adding content manually without going through my services again.',

        // Contact
        contact_h2: 'Contact Me',
        contact_desc: 'An idea, a project or a question? Send me a message and I\'ll get back to you as soon as possible.',
        contact_label_discord: 'Discord',
        contact_label_github: 'GitHub',
        contact_nom: 'Name / Nickname',
        contact_nom_placeholder: 'Your name or nickname',
        contact_sujet: 'Subject',
        contact_sujet_placeholder: 'Choose...',
        contact_opt1: 'Showcase website + Dashboard',
        contact_opt2: 'Exiled Plugin',
        contact_opt3: 'Full package',
        contact_opt4: 'Other',
        contact_discord_label: 'Discord Tag',
        contact_discord_placeholder: 'your_tag#0000',
        contact_message: 'Message',
        contact_message_placeholder: 'Describe your project, your needs...',
        contact_submit: 'Send message',

        // Footer
        footer_desc: 'Web & C# developer specialized in gaming communities.',
        footer_nav: 'Navigation',
        footer_liens: 'Links',
        footer_credit: 'Designed & built by',
    }
};

function applyTranslations(lang) {
    const t = translations[lang];

    // Navbar
    document.querySelector('a[href="#accueil"]').textContent = t.nav_accueil;
    document.querySelector('a[href="#projets"]').textContent = t.nav_projets;
    document.querySelector('a[href="#services"]').textContent = t.nav_services;
    document.querySelector('a[href="#competences"]').textContent = t.nav_competences;
    document.querySelector('a[href="#apropos"]').textContent = t.nav_apropos;
    document.querySelector('.navbar-cta').textContent = t.nav_cta;

    // Accueil
    document.querySelector('.accueil-tag').textContent = t.accueil_tag;
    document.querySelector('.accueil h2').textContent = t.accueil_h2;
    document.querySelector('.accueil-desc').textContent = t.accueil_desc;
    document.querySelector('.btn-primary').textContent = t.accueil_btn1;
    document.querySelector('.btn-secondary').textContent = t.accueil_btn2;

    // Projets
    document.querySelector('.projets h2').textContent = t.projets_h2;
    document.querySelector('.projets-desc').textContent = t.projets_desc;
    const projCards = document.querySelectorAll('.projets-card');
    const projData = [
        { h3: t.projet1_h3, p: t.projet1_desc },
        { h3: t.projet2_h3, p: t.projet2_desc },
        { h3: t.projet3_h3, p: t.projet3_desc },
        { h3: t.projet4_h3, p: t.projet4_desc },
        { h3: t.projet5_h3, p: t.projet5_desc },
    ];
    projCards.forEach((card, i) => {
        if (projData[i]) {
            card.querySelector('h3').textContent = projData[i].h3;
            card.querySelector('p').textContent = projData[i].p;
        }
    });

    // Services
    document.querySelector('.services h2').textContent = t.services_h2;
    document.querySelector('.services-desc').textContent = t.services_desc;
    const servCards = document.querySelectorAll('.services-card');
    const servData = [
        { h3: t.service1_h3, p: t.service1_desc, delay: t.service1_delay },
        { h3: t.service2_h3, p: t.service2_desc, delay: t.service2_delay },
        { h3: t.service3_h3, p: t.service3_desc, delay: t.service3_delay },
    ];
    servCards.forEach((card, i) => {
        if (servData[i]) {
            card.querySelector('h3').textContent = servData[i].h3;
            card.querySelector('p').textContent = servData[i].p;
            card.querySelector('.services-card-delay').textContent = servData[i].delay;
            card.querySelector('.services-card-cta').textContent = t.services_cta;
        }
    });
    document.querySelector('.services-card-badge').textContent = t.service3_badge;

    // Compétences
    document.querySelector('.competences h2').textContent = t.competences_h2;
    document.querySelector('.competences-desc').textContent = t.competences_desc;
    const compCats = document.querySelectorAll('.competences-category h3');
    compCats[0].textContent = t.comp_langages;
    compCats[1].textContent = t.comp_frameworks;
    compCats[2].textContent = t.comp_outils;
    compCats[3].textContent = t.comp_jeux;

    // À Propos
    document.querySelector('.apropos h2').textContent = t.apropos_h2;
    const aproposCards = document.querySelectorAll('.apropos-card');
    const aproposData = [
        { h3: t.apropos1_h3, p: t.apropos1_desc },
        { h3: t.apropos2_h3, p: t.apropos2_desc },
        { h3: t.apropos3_h3, p: t.apropos3_desc },
    ];
    aproposCards.forEach((card, i) => {
        card.querySelector('h3').textContent = aproposData[i].h3;
        card.querySelector('p').textContent = aproposData[i].p;
    });

    // Contact
    document.querySelector('.contact h2').textContent = t.contact_h2;
    document.querySelector('.contact-desc').textContent = t.contact_desc;
    const infoLabels = document.querySelectorAll('.contact-info-label');
    infoLabels[0].textContent = t.contact_label_discord;
    infoLabels[1].textContent = t.contact_label_github;
    const formGroups = document.querySelectorAll('.contact-form-group label');
    formGroups[0].textContent = t.contact_nom;
    formGroups[1].textContent = t.contact_sujet;
    formGroups[2].textContent = t.contact_discord_label;
    formGroups[3].textContent = t.contact_message;
    document.getElementById('nom').placeholder = t.contact_nom_placeholder;
    document.getElementById('discord').placeholder = t.contact_discord_placeholder;
    document.getElementById('message').placeholder = t.contact_message_placeholder;
    const options = document.querySelectorAll('#sujet option');
    options[0].textContent = t.contact_sujet_placeholder;
    options[1].textContent = t.contact_opt1;
    options[2].textContent = t.contact_opt2;
    options[3].textContent = t.contact_opt3;
    options[4].textContent = t.contact_opt4;
    document.querySelector('.contact-submit').textContent = t.contact_submit;

    // Footer
    document.querySelector('.footer-desc').textContent = t.footer_desc;
    const footerNavTitles = document.querySelectorAll('.footer-links h3');
    footerNavTitles[0].textContent = t.footer_nav;
    footerNavTitles[1].textContent = t.footer_liens;
    const footerNavLinks = document.querySelectorAll('.footer-links ul li a');
    footerNavLinks[0].textContent = t.nav_accueil;
    footerNavLinks[1].textContent = t.nav_projets;
    footerNavLinks[2].textContent = t.nav_services;
    footerNavLinks[3].textContent = t.nav_competences;
    footerNavLinks[4].textContent = t.nav_apropos;
    footerNavLinks[5].textContent = 'Contact';
    document.querySelector('.footer-bottom p').innerHTML = `${t.footer_credit} <span>Vip3r</span>`;

    document.documentElement.lang = lang === 'FR' ? 'fr' : 'en';
}

langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'FR' ? 'EN' : 'FR';
    langSwitch.textContent = currentLang === 'FR' ? 'EN' : 'FR';
    applyTranslations(currentLang);
});

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});