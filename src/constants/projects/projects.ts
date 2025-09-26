import { Projects } from "@/types/projects";
import { ProjectCategory } from "../enums/ProjectCategory";

export const getAllProjects = () => {
  return PROJECT_LISTS.map((project) => project.endpoint.replace("/", ""));
};

export const PROJECT_LISTS: Projects[] = [
  // Freelance Projects
  {
    endpoint: "/memilah",
    title: "memilah",
    projectCategory: ProjectCategory.WORK,
    role: "Software Engineer (fullstack)",
    yearAccomplished: "2024 - Now",
    jobDescriptions:
      "Spearheading the development of a real-time object detection system utilising YOLOv11, decreasing waste sorting errors by 15% and improving smart bin efficiency, featured across Jakarta events. Developing a web-based Human-Machine Interface (HMI) for a waste management system and data collection using React and TypeScript, serving 1000+ wastes. Building and optimising a RESTful backend for waste database management and audit report generation utilising Golang, Firebase, PostgreSQL, Docker, and Gin. Integrating various APIs to deliver detection results while managing version control with Python, MQTT, FastAPI, and Git. Authoring comprehensive API documentation for 5 modules to support system usability and integration.",
    descriptions:
      "A comprehensive ticketing platform built for event organisers. Implemented new payment gateway integration using Xendit, automated email notification system, and revamped the website's UI/UX design. Working closely with clients to optimize workflow and ensure seamless functionality across all features.",
    techStack: [
      "YOLOv11",
      "MQTT",
      "FastAPI",
      "Golang",
      "Gin",
      "PostgreSQL",
      "Firebase",
      "Docker",
      "React.js",
      "TailwindCSS",
      "TypeScript",
      "REST API",
      "Postman",
      "Git",
    ],
    publicationLink: ["https://memilah.com"],
    imageLocation: ["/projects/memilah/memilah-1.png"],
  },
  {
    endpoint: "/karcis-biz",
    title: "Karcis.biz",
    projectCategory: ProjectCategory.WORK,
    role: "Software Engineer (fullstack)",
    yearAccomplished: "2024",
    jobDescriptions:
      "Enhanced user experience and features of a ticketing website for event organisers, implementing new payment options and automating email notifications.",
    descriptions:
      "A comprehensive ticketing platform built for event organisers. Implemented new payment gateway integration using Xendit, automated email notification system, and revamped the website's UI/UX design. Working closely with clients to optimize workflow and ensure seamless functionality across all features.",
    techStack: [
      "Supabase",
      "Next.js",
      "React.js",
      "TailwindCSS",
      "TypeScript",
      "Payment Gateway (Xendit)",
      "REST API",
      "Google API",
      "Nodemailer",
      "Postman",
      "Notion",
    ],
    publicationLink: ["https://karcis.biz"],
    imageLocation: ["/projects/karcis-biz/karcis-biz-1.png"],
  },

  // Apple Developer Academy Projects

  {
    endpoint: "/cuelink",
    title: "Cuelink",
    projectCategory: ProjectCategory.INTERNSHIP,
    role: "iOS Engineer - ML and AI",
    yearAccomplished: "2023",
    jobDescriptions:
      "Developed algorithm and object detection techniques to enhance pool (billiard) skills through innovative technology.",
    descriptions:
      "An iOS app that enhances pool (billiard) skills through innovative object detection techniques. Features cutting-edge algorithms for precise tracking and analysis of pool cues and balls in real-time, built with VIPER architecture for modular and scalable codebase.",
    techStack: [
      "VIPER",
      "UIKit",
      "AVFoundation",
      "Vision",
      "Core ML",
      "CoreML",
      "Create ML",
      "Core Graphics",
    ],
    imageLocation: [
      "/projects/cuelink/cuelink-1.png",
      "/projects/cuelink/cuelink-2.png",
    ],
  },

  {
    endpoint: "/memoria",
    title: "Memoria",
    projectCategory: ProjectCategory.INTERNSHIP,
    role: "iOS engineer - Database",
    yearAccomplished: "2023",
    jobDescriptions:
      "Implemented Clean Architecture, Reactive Programming, and Core Data for a trip destination and memory preservation app.",
    descriptions:
      "An app that suggests trip destinations and preserves memories with scrapbooks. The project implemented Clean Architecture and Reactive Programming patterns, demonstrating proficiency in Core Data, SwiftUI, and Combine frameworks.",
    techStack: [
      "SwiftUI",
      "Combine",
      "CoreData",
      "CocoaPods",
      "SwiftLint",
      "MVVM",
      "Clean Architecture",
    ],
    publicationLink: [
      "https://medium.com/@winxene/implementing-core-data-using-clean-architecture-c8df8e741a75",
      "https://github.com/Copu-Clock-Out-Pulang/Memoria",
    ],
    imageLocation: [
      "/projects/memoria/memoria-1.png",
      "/projects/memoria/memoria-2.png",
    ],
  },

  {
    endpoint: "/ohm-scanner",
    title: "OhmScanner",
    projectCategory: ProjectCategory.INTERNSHIP,
    role: "iOS Engineer + UI-UX Design",
    yearAccomplished: "2023",
    jobDescriptions:
      "Developed iOS and WatchOS app utilizing Computer Vision to identify resistor values as individual project.",
    descriptions:
      "An iOS + WatchOS app that utilizes Computer Vision to identify resistor values. Harnesses technologies like Vision, CoreML, WatchKit, and SwiftUI to simplify resistor identification process. This was my first individual project at Apple Developer Academy with full autonomy to explore new technologies.",
    techStack: [
      "SwiftUI",
      "AVFoundation",
      "Vision",
      "Core ML",
      "Create ML",
      "Watch Connectivity",
      "Watch Kit",
      "MVVM",
    ],
    publicationLink: ["github.com/winxene/OhmScanner"],
    imageLocation: [
      "/projects/ohmscanner/ohmscanner-1.png",
      "/projects/ohmscanner/ohmscanner-2.png",
    ],
  },

  {
    endpoint: "/last-woof",
    title: "Last Woof",
    projectCategory: ProjectCategory.INTERNSHIP,
    role: "iOS Engineer + Designer",
    yearAccomplished: "2023",
    jobDescriptions:
      "Contributed to programming and asset creation for a 2D game exploring themes of grief and acceptance.",
    descriptions:
      "A poignant 2D game that delves into themes of grief and acceptance through heartfelt narrative. Developed using Object-Oriented Programming, Singleton patterns, Sprite Kit, and Game Kit. Beyond programming, also contributed to drawing assets and characters for the game.",
    techStack: [
      "Sprite Kit",
      "Game Kit",
      "ECS (Entity-Component System)",
      "Object-Oriented Programming",
      "Singleton Pattern",
    ],
    imageLocation: [
      "/projects/last-woof/last-woof-1.png",
      "/projects/last-woof/last-woof-2.png",
    ],
  },

  {
    endpoint: "/security-response-system",
    title: "Security Response System (SRS)",
    projectCategory: ProjectCategory.INTERNSHIP,
    role: "Backend Engineer + iOS engineer",
    yearAccomplished: "2023",
    jobDescriptions:
      "Developed security response system for MRT Jakarta focusing on accessibility for disabled, pregnant, and elderly passengers.",
    descriptions:
      "Security Response System developed during MRT Jakarta x Apple Developer Academy Hackathon Challenge. The system improves accessibility for disabled, pregnant, and elderly passengers with real-time monitoring capabilities and seamless communication between security personnel and passengers.",
    techStack: [
      "Express",
      "Node.js",
      "SwiftUI",
      "Push Notification",
      "WebSocket",
      "REST API",
      "Core Location",
      "Socket.IO",
      "MVVM",
    ],
    imageLocation: ["/projects/srs/srs-1.png", "/projects/srs/srs-2.png"],
  },

  {
    endpoint: "/feedpal",
    title: "FeedPal",
    projectCategory: ProjectCategory.INTERNSHIP,
    role: "Tech Lead",
    yearAccomplished: "2023",
    jobDescriptions:
      "Led integration of iOS capabilities with IoT to automate fish feeding for busy pet owners.",
    descriptions:
      "An innovative solution that integrates iOS capabilities with IoT to automate fish feeding. Uses ESP32, Arduino Framework, Firebase, and SwiftUI to create a system that empowers busy individuals to effortlessly care for their pets with real-time data synchronization.",
    techStack: ["Firebase", "SwiftUI", "Arduino Framework", "ESP32"],
    imageLocation: [
      "/projects/feedpal/feedpal-1.png",
      "/projects/feedpal/feedpal-2.png",
    ],
  },
  {
    endpoint: "/meeto",
    title: "Meeto",
    projectCategory: ProjectCategory.INTERNSHIP,
    role: "Software Engineer (fullstack)",
    yearAccomplished: "2023",
    jobDescriptions:
      "Developed backend infrastructure and integrated it with iOS app for a meetup platform using CBL methodologies.",
    descriptions:
      "A platform fostering connections through inspirational meetups. Built using SwiftUI, Python, and Firebase with focus on streamlined meetup organization and user experience. Completed within a tight two-week timeline using Continuous Build and Learning methodologies.",
    techStack: ["Firebase", "Python", "Django", "SwiftUI"],
    imageLocation: [
      "/projects/meeto/meeto-1.png",
      "/projects/meeto/meeto-2.png",
    ],
  },
  // University Projects
  {
    endpoint: "/automated-fertigation-iot",
    title: "Automated Fertigation with IoT",
    projectCategory: ProjectCategory.UNIVERSITY,
    role: "Software Engineer (Fullstack) & IoT Engineer",
    yearAccomplished: "2024",
    jobDescriptions:
      "Culminating university project combining embedded systems expertise with hydroponics field for automated fertigation processes.",
    descriptions:
      "A groundbreaking thesis project that combines embedded systems with hydroponics to automate fertigation processes using IoT technology. Achieved grade A and completed ahead of schedule, demonstrating adaptability in learning new concepts and delivering innovative solutions in complex technical environments.",
    techStack: [
      "ESP32",
      "PlatformIO",
      "Firebase",
      "MQTT",
      "FreeRTOS",
      "Flutter",
      "Express.js",
      "Google Spreadsheets API",
      "REST API",
    ],
    publicationLink: [
      "https://youtu.be/hA1oPX0M67Y",
      "https://drive.google.com/file/d/1HQRL8HtZa-clbWGRtdNk-DmygwVQ8geQ/view?usp=sharing",
    ],
    imageLocation: [
      "/projects/automated-fertigation-iot/automated-fertigation-iot-1.png",
      "/projects/automated-fertigation-iot/automated-fertigation-iot-2.png",
    ],
  },

  {
    endpoint: "/smart-dispenser-drinkify",
    title: 'Smart Dispenser "Drinkify"',
    projectCategory: ProjectCategory.UNIVERSITY,
    role: "Team leader, UI-UX Designer, embedded developer",
    yearAccomplished: "2022",
    jobDescriptions:
      "Led development of smart beverage dispenser combining IoT device and mobile application programming with tight deadline constraints.",
    descriptions:
      "A smart dispenser that collaborates IoT device principles with mobile application programming to automate beverage service. Featured on BINUS University Computer Engineering innovation website and won best project in system and project engineering competition. Overcame challenges of remote collaboration and tight timeline constraints.",
    techStack: [
      "WT32-SC01",
      "ESP32",
      "PlatformIO",
      "LovyanGFX",
      "LVGL",
      "Firebase",
      "Flutter",
      "C",
      "GitHub",
    ],
    publicationLink: [
      "https://comp-eng.binus.ac.id/2023/04/05/drinkify-v2/",
      "https://comp-eng.binus.ac.id/2022/08/01/smart-dispenser-drinkify/",
      "https://www.youtube.com/watch?v=ch-9Hi277N4",
      "https://www.figma.com/file/WGLlzIiyKa3g56LrcwKARp/Mobile-Apps-proposal?node-id=0%3A1",
    ],
    imageLocation: [
      "/projects/drinkify/drinkify-1.png",
      "/projects/drinkify/drinkify-2.png",
    ],
  },

  {
    endpoint: "/simple-bmi-calculator",
    title: "Simple BMI Calculator App",
    projectCategory: ProjectCategory.UNIVERSITY,
    role: "Mobile-App Developer",
    yearAccomplished: "2022",
    jobDescriptions:
      "Developed intuitive BMI calculator app for Mobile Application Development Engineering class with focus on user experience.",
    descriptions:
      "A BMI calculator app designed for intuitive measurement experience with gender selection, height and weight inputs, and ergonomic icon design for single-hand operation. Features both dark and light mode with automatic system configuration and precise manual input options.",
    techStack: ["Flutter"],
    publicationLink: [
      "https://github.com/winxene/bmiCalculatorFlutter",
      "https://youtu.be/IePOmHQQeek",
    ],
    imageLocation: [
      "/projects/bmi-calculator/bmi-calculator-1.png",
      "/projects/bmi-calculator/bmi-calculator-2.png",
    ],
  },

  {
    endpoint: "/simple-expense-app",
    title: "Simple Expense App",
    projectCategory: ProjectCategory.UNIVERSITY,
    role: "Mobile-App Developer",
    yearAccomplished: "2022",
    jobDescriptions:
      "Created user-friendly expense tracking app utilizing CRUD operations with SQLite database under extreme time constraints.",
    descriptions:
      "A final-exam project for Mobile Application Development Engineering class focusing on user-friendly CRUD operations. Utilizes SQLite for local data storage, features automatic calendar date setting, data persistence, and both dark/light mode toggle. Completed in just one day due to family circumstances.",
    techStack: ["Flutter", "SQLite"],
    publicationLink: [
      "https://github.com/winxene/dummy-expense-app",
      "https://youtu.be/APrTS-Mzp3g",
    ],
    imageLocation: [
      "/projects/simple-expense-app/simple-expense-app-1.png",
      "/projects/simple-expense-app/simple-expense-app-2.png",
    ],
  },

  {
    endpoint: "/benang-website-ui-ux",
    title: "Benang.com Website UI-UX",
    projectCategory: ProjectCategory.UNIVERSITY,
    role: "UI-UX Designer",
    yearAccomplished: "2021",
    jobDescriptions:
      "Designed comprehensive UI-UX for e-commerce website including user flow, personas, and minimalistic design approach.",
    descriptions:
      "A comprehensive UI-UX design project for Benang.com website after completing BNCC's Learning and Training program. Created complete user experience including home page, company profile, contact section, authentication pages, shopping features, and user personas with minimalistic design approach.",
    techStack: ["Figma"],
    publicationLink: [
      "https://www.figma.com/file/fnZzGq1LtuRrA5By075b50/Tugas-LnT_Winxen-Eric-Ryandiharvin_BNCC20029?node-id=0%3A1",
    ],
    imageLocation: [
      "/projects/benang-com/benang-com-1.png",
      "/projects/benang-com/benang-com-2.png",
    ],
  },

  {
    endpoint: "/semariot-challenge",
    title: "SemarIoT Challenge - Smart Secure Box",
    projectCategory: ProjectCategory.UNIVERSITY,
    role: "Team leader and UI-UX Designer",
    yearAccomplished: "2022",
    jobDescriptions:
      "Led team in national IoT competition focusing on economic impact and Sustainable Development Goals alignment.",
    descriptions:
      "A national-level IoT competition project proposing Smart Secure Box to improve delivery service security and safety. The concept focused on economic growth impact aligned with UNICEF's Sustainable Development Goals. Successfully reached finals from 40+ candidates through comprehensive research and presentation.",
    techStack: ["Figma"],
    publicationLink: [
      "https://www.figma.com/file/Fg9V7xXK86fl0IlJCooQBn/UI-UX-IoT-Challenge-Smart-Secure-Box?node-id=0%3A1",
      "https://www.youtube.com/watch?v=FbfpKc8ifwE",
    ],
    imageLocation: [
      "/projects/semar-iot-challenge/semar-iot-challenge-1.png",
      "/projects/semar-iot-challenge/semar-iot-challenge-2.png",
    ],
  },
];
