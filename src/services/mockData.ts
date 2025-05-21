
import { Product } from '@/components/marketplace/ProductCard';
import { Device } from '@/components/dashboard/DeviceCard';
import { Thread } from '@/components/forum/ThreadCard';
import { Project } from '@/components/projects/ProjectCard';
import { Category } from '@/components/forum/CategoryList';
import { SensorData } from '@/components/dashboard/SensorChart';
import React from 'react';

// Mock product data
export const mockProducts: Product[] = [
  {
    id: "smart-soil-sensor",
    title: "Smart Soil Moisture & Nutrient Sensor",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1687477850274-819a02796d0b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Soil Sensors",
    rating: 4.8,
    reviewCount: 124,
    is3D: true,
    hasIoT: true,
    isNew: true
  },
  {
    id: "automated-irrigation",
    title: "Automated Precision Irrigation System",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Irrigation Systems",
    rating: 4.6,
    reviewCount: 87,
    is3D: true,
    hasIoT: true
  },
  {
    id: "crop-monitoring-drone",
    title: "Agricultural Drone with Multispectral Camera",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1626354511623-1710258738d1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Drones & Robotics",
    rating: 4.9,
    reviewCount: 42,
    is3D: true
  },
  {
    id: "greenhouse-controller",
    title: "Smart Greenhouse Climate Controller",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1700022371343-e8b23949d014?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Smart Greenhouses",
    rating: 4.7,
    reviewCount: 63,
    hasIoT: true
  },
  {
    id: "livestock-tracker",
    title: "Livestock Health Monitoring System",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1625497110777-3438c08f7821?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fExpdmVzdG9jayUyMEhlYWx0aCUyME1vbml0b3JpbmclMjBTeXN0ZW18ZW58MHx8MHx8fDA%3D",
    category: "Livestock Monitoring",
    rating: 4.5,
    reviewCount: 31,
    hasIoT: true
  },
  {
    id: "harvest-robot",
    title: "Autonomous Harvesting Robot Platform",
    price: 4999.99,
    image: "https://www.parvalux.com/app/uploads/fly-images/17652/Robots_Motors_in_Agriculture-1500x830-f50_50.jpg",
    category: "Drones & Robotics",
    rating: 4.3,
    reviewCount: 12,
    is3D: true
  },
  {
    id: "weather-station",
    title: "Professional Farm Weather Station",
    price: 349.99,
    image: "https://www.renkeer.com/wp-content/uploads/2021/06/weather-station-3.jpg",
    category: "Weather Stations",
    rating: 4.7,
    reviewCount: 89,
    hasIoT: true
  },
  {
    id: "solar-pump",
    title: "Solar-Powered Water Pump System",
    price: 599.99,
    image: "https://static.wixstatic.com/media/b7b329_2a51aecc989f4e3285a6ad54ebb3cdeb~mv2.jpg/v1/fill/w_718,h_432,al_c,lg_1,q_80,enc_avif,quality_auto/b7b329_2a51aecc989f4e3285a6ad54ebb3cdeb~mv2.jpg",
    category: "Energy Solutions",
    rating: 4.6,
    reviewCount: 34
  }
];

// Get a single product by ID
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

// Mock device data for IoT dashboard
export const mockDevices: Device[] = [
  {
    id: "soil-sensor-1",
    name: "Field Sector A Soil Monitor",
    type: "soil",
    status: "online",
    lastUpdated: "2 mins ago",
    readings: [
      { type: "Moisture", value: 42, unit: "%" },
      { type: "Temperature", value: 23.5, unit: "°C" },
      { type: "Nitrogen", value: 64, unit: "ppm" },
      { type: "pH", value: 6.8, unit: "" }
    ],
    location: "North Field",
    battery: 78,
    notifications: true
  },
  {
    id: "weather-station-1",
    name: "Main Weather Station",
    type: "weather",
    status: "online",
    lastUpdated: "1 min ago",
    readings: [
      { type: "Temperature", value: 26.2, unit: "°C" },
      { type: "Humidity", value: 68, unit: "%" },
      { type: "Wind", value: 12, unit: "km/h" },
      { type: "Rain", value: 0, unit: "mm" }
    ],
    location: "Central Hub",
    battery: 92,
    notifications: true
  },
  {
    id: "irrigation-system-1",
    name: "Zone 2 Irrigation Controller",
    type: "irrigation",
    status: "online",
    lastUpdated: "5 mins ago",
    readings: [
      { type: "Flow Rate", value: 25.4, unit: "L/min" },
      { type: "Pressure", value: 2.8, unit: "bar" },
      { type: "Scheduled", value: 15, unit: "min" },
      { type: "Water Usage", value: 1240, unit: "L/day" }
    ],
    location: "East Field",
    battery: 65,
    notifications: true
  },
  {
    id: "greenhouse-1",
    name: "Tomato Greenhouse",
    type: "greenhouse",
    status: "warning",
    lastUpdated: "3 mins ago",
    readings: [
      { type: "Temperature", value: 29.8, unit: "°C" },
      { type: "Humidity", value: 82, unit: "%" },
      { type: "CO2", value: 920, unit: "ppm" },
      { type: "Light", value: 12400, unit: "lux" }
    ],
    location: "Greenhouse Complex",
    battery: 45,
    notifications: true
  },
  {
    id: "harvester-robot-1",
    name: "Harvester Robot 01",
    type: "robot",
    status: "offline",
    lastUpdated: "3 hours ago",
    readings: [
      { type: "Battery", value: 0, unit: "%" },
      { type: "Area Covered", value: 0.8, unit: "hectares" },
      { type: "Speed", value: 0, unit: "km/h" },
      { type: "Yield", value: 560, unit: "kg" }
    ],
    location: "Charging Station",
    battery: 5,
    notifications: false
  }
];

// Get a single device by ID
export const getDeviceById = (id: string): Device | undefined => {
  return mockDevices.find(device => device.id === id);
};

// Generate sensor data for charts
export const generateSensorData = (type: string, days: number = 7): SensorData[] => {
  const data: SensorData[] = [];
  const now = new Date();
  
  // Generate different patterns based on sensor type
  for (let i = 0; i < days * 24; i++) {
    const date = new Date(now.getTime() - (days * 24 - i) * 60 * 60 * 1000);
    const time = `${date.getHours().toString().padStart(2, '0')}:00`;
    let value: number;
    
    // Different data patterns for different sensor types
    switch (type) {
      case 'temperature':
        // Temperature follows a daily cycle with some randomness
        value = 22 + 6 * Math.sin((i % 24) / 24 * Math.PI * 2) + Math.random() * 2 - 1;
        break;
      case 'moisture':
        // Moisture decreases slowly then jumps up (irrigation)
        const dayHour = i % 24;
        const dayNumber = Math.floor(i / 24);
        value = 40 - (dayHour % 12) * 1.5;
        if (dayHour === 12 || dayHour === 0) {
          value = 42; // irrigation time
        }
        value += Math.random() * 3 - 1.5;
        break;
      case 'rainfall':
        // Rainfall happens occasionally
        value = 0;
        if (Math.random() > 0.9) {
          value = Math.random() * 8;
        }
        break;
      case 'ph':
        // pH is relatively stable with small fluctuations
        value = 6.8 + Math.sin(i / 20) * 0.2 + Math.random() * 0.1 - 0.05;
        break;
      case 'nitrogen':
        // Nitrogen decreases slowly over time with small fluctuations
        value = 75 - (i * 0.1) % 20 + Math.random() * 3 - 1.5;
        break;
      default:
        value = 50 + Math.random() * 10 - 5;
    }
    
    data.push({ time, value: Number(value.toFixed(1)) });
  }
  
  // Only return one data point per day if more than 7 days
  if (days > 7) {
    const reducedData = [];
    for (let i = 0; i < data.length; i += 24) {
      reducedData.push(data[i]);
    }
    return reducedData;
  }
  
  return data;
};

// Mock forum data

// Categories for the forum
export const mockForumCategories: Category[] = [
  {
    id: "soil-sensors",
    name: "Soil Sensors",
    description: "Discuss soil monitoring technology and best practices",
    icon: "🌱",
    threadCount: 43,
    color: "bg-soil-100 text-soil-800"
  },
  {
    id: "irrigation",
    name: "Irrigation Systems",
    description: "Water management and irrigation technology discussions",
    icon: "💧",
    threadCount: 67,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "drones-robotics",
    name: "Drones & Robotics",
    description: "Autonomous farming equipment and aerial imaging",
    icon: "🤖",
    threadCount: 89,
    color: "bg-tech-100 text-tech-800"
  },
  {
    id: "greenhouses",
    name: "Smart Greenhouses",
    description: "Climate-controlled growing environment technologies",
    icon: "🏡",
    threadCount: 32,
    color: "bg-eco-100 text-eco-800"
  },
  {
    id: "livestock",
    name: "Livestock Monitoring",
    description: "Health tracking and management systems for animals",
    icon: "🐄",
    threadCount: 24,
    color: "bg-amber-100 text-amber-800"
  },
  {
    id: "beginner-questions",
    name: "Beginner Questions",
    description: "New to AgTech? Ask your questions here",
    icon: "❓",
    threadCount: 118,
    color: "bg-purple-100 text-purple-800"
  }
];

// Mock threads for the forum
export const mockThreads: Thread[] = [
  {
    id: "soil-moisture-calibration",
    title: "How to properly calibrate soil moisture sensors?",
    content: "I've been having trouble getting consistent readings from my soil moisture sensors. I've placed them at different depths and locations, but the readings seem off compared to manual measurements. Any suggestions for proper calibration techniques or recommended models that are more reliable?",
    author: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    category: "Soil Sensors",
    tags: ["calibration", "moisture", "sensors", "troubleshooting"],
    createdAt: "2025-04-25T10:15:00Z",
    likes: 24,
    replies: 18,
    isSticky: true
  },
  {
    id: "drone-mapping-software",
    title: "Best drone mapping software for small farms?",
    content: "I recently purchased a drone with a multispectral camera for my 20-acre farm, but I'm overwhelmed by the software options available for processing the imagery data. Looking for recommendations on user-friendly software that won't break the bank but still provides useful insights for crop monitoring.",
    author: {
      id: "user-2",
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    category: "Drones & Robotics",
    tags: ["drones", "mapping", "software", "small farms"],
    createdAt: "2025-05-02T14:32:00Z",
    likes: 37,
    replies: 29,
    isHot: true
  },
  {
    id: "solar-irrigation-system",
    title: "DIY Solar-powered irrigation controller project",
    content: "I've completed a DIY solar-powered irrigation controller using a Raspberry Pi, soil moisture sensors, and solenoid valves. Total cost was under $200 and it's been running perfectly for 3 months now. I've documented the entire build process and code if anyone is interested in replicating it.",
    author: {
      id: "user-3",
      name: "Mike Chen",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    category: "Irrigation Systems",
    tags: ["solar", "DIY", "raspberry pi", "irrigation", "project"],
    createdAt: "2025-05-08T09:47:00Z",
    likes: 82,
    replies: 45
  },
  {
    id: "greenhouse-automation",
    title: "Greenhouse automation system recommendations",
    content: "I'm planning to set up a new 10,000 sq ft greenhouse and want to implement a comprehensive automation system for climate control, irrigation, and monitoring. Has anyone here implemented something similar? Looking for recommendations on commercial systems or components for a custom solution.",
    author: {
      id: "user-4",
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    category: "Smart Greenhouses",
    tags: ["greenhouse", "automation", "climate control", "commercial"],
    createdAt: "2025-05-10T16:22:00Z",
    likes: 19,
    replies: 23
  },
  {
    id: "cattle-health-sensors",
    title: "Experience with wearable cattle health monitors?",
    content: "We're considering implementing wearable health monitors for our dairy herd of about 120 cows. There are several options on the market with varying price points and features. Has anyone had practical experience with these systems and can share insights on reliability, battery life, and actual benefits realized?",
    author: {
      id: "user-5",
      name: "Robert Wilson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    category: "Livestock Monitoring",
    tags: ["cattle", "health monitoring", "wearables", "dairy"],
    createdAt: "2025-05-12T08:15:00Z",
    likes: 14,
    replies: 11
  }
];

// Mock projects for open source sharing
export const mockProjects: Project[] = [
  {
    id: "farm-sensor-network",
    title: "Open Farm Sensor Network",
    description: "A comprehensive system for deploying wireless sensor networks across farms using LoRaWAN and inexpensive sensors. Includes hardware designs, firmware, and data visualization tools.",
    author: {
      id: "user-3",
      name: "Mike Chen",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    category: "Sensor Networks",
    tags: ["LoRaWAN", "Arduino", "sensors", "wireless", "open hardware"],
    createdAt: "2025-02-15T10:20:00Z",
    updatedAt: "2025-05-01T14:35:00Z",
    stars: 156,
    forks: 48,
    likes: 92,
    license: "MIT",
    thumbnail: "https://images.unsplash.com/photo-1714588862918-1490f23f3e56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fE9wZW4lMjBGYXJtJTIwU2Vuc29yJTIwTmV0d29ya3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "aquaponics-controller",
    title: "Aquaponics Monitoring System",
    description: "ESP32-based controller for aquaponics systems that monitors water quality, temperature, pump operation, and fish feeding schedules. Includes web interface and mobile app.",
    author: {
      id: "user-6",
      name: "Jessica Park",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    category: "Aquaponics",
    tags: ["ESP32", "water quality", "automation", "fish", "hydroponics"],
    createdAt: "2025-01-20T08:45:00Z",
    updatedAt: "2025-04-28T11:12:00Z",
    stars: 98,
    forks: 32,
    likes: 67,
    license: "GPL-3.0",
    thumbnail: "https://cdn.shopify.com/s/files/1/2307/4917/files/Water-Temperature.Monitor-in-Aquaponics.jpg?v=1738413079"
  },
  {
    id: "greenhouse-controller",
    title: "Raspberry Pi Greenhouse Controller",
    description: "Complete greenhouse control system using Raspberry Pi. Controls ventilation, irrigation, lighting, and monitors climate conditions with a user-friendly web dashboard.",
    author: {
      id: "user-7",
      name: "David Kumar",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    category: "Climate Control",
    tags: ["Raspberry Pi", "greenhouse", "climate control", "Python", "dashboard"],
    createdAt: "2024-12-10T15:30:00Z",
    updatedAt: "2025-05-05T09:22:00Z",
    stars: 214,
    forks: 76,
    likes: 129,
    license: "Apache-2.0",
    thumbnail: "https://www.raspberry-pi-geek.com/var/rpi/storage/images/archive/2014/07/building-a-raspberry-pi-greenhouse/figure-2/13036-1-eng-US/Figure-2_large.png"
  },
  {
    id: "field-mapping-drone",
    title: "Field Mapping Drone Toolkit",
    description: "Software toolkit for autonomous drones to create NDVI maps of agricultural fields. Includes mission planning, image processing, and visualization tools.",
    author: {
      id: "user-2",
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    category: "Drones & Mapping",
    tags: ["drones", "NDVI", "mapping", "Python", "image processing"],
    createdAt: "2025-03-05T11:45:00Z",
    updatedAt: "2025-05-13T16:40:00Z",
    stars: 178,
    forks: 42,
    likes: 103,
    license: "MIT",
    thumbnail: "https://pilotinstitute.com/wp-content/uploads/2020/09/drone-mapping.jpeg"
  },
  {
    id: "soil-analysis-kit",
    title: "DIY Soil Analysis Kit",
    description: "Design files and software for building low-cost soil analysis tools for measuring pH, NPK, and moisture content using affordable sensors and Arduino.",
    author: {
      id: "user-8",
      name: "Thomas Wright",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    category: "Soil Monitoring",
    tags: ["Arduino", "soil analysis", "DIY", "sensors", "hardware"],
    createdAt: "2025-02-28T13:15:00Z",
    updatedAt: "2025-04-30T10:05:00Z",
    stars: 123,
    forks: 54,
    likes: 89,
    license: "CC-BY-SA",
    thumbnail: "https://cdn11.bigcommerce.com/s-j602wc6a/images/stencil/1280x1280/products/6724/23234/N883gehHkyqCIH5H7jeoT2zk4cYDIXj3ZBGFIngACuHtLV7R7LkelVbhgUATD3Z1__47708.1712267676.jpg?c=2"
  },
  {
    id: "cattle-tracker",
    title: "Open Livestock Tracking System",
    description: "GPS-based cattle tracking system with long-range LoRa communication and solar-powered tags. Includes collar designs, base station plans, and monitoring software.",
    author: {
      id: "user-9",
      name: "Anna Kowalski",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    category: "Livestock Monitoring",
    tags: ["GPS", "tracking", "cattle", "LoRa", "solar"],
    createdAt: "2025-01-15T09:30:00Z",
    updatedAt: "2025-04-12T14:50:00Z",
    stars: 87,
    forks: 23,
    likes: 62,
    license: "MIT",
    thumbnail: "https://www.mokolora.com/wp-content/uploads/2022/06/How-LoRaWAN-Powers-Ranch-Livestock-Tracking-System.webp"
  }
];

// Get a single project by ID
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

// Get threads by category
export const getThreadsByCategory = (categoryId: string): Thread[] => {
  return mockThreads.filter(thread => 
    thread.category.toLowerCase().replace(/\s+/g, '-') === categoryId
  );
};

// Get a single thread by ID
export const getThreadById = (id: string): Thread | undefined => {
  return mockThreads.find(thread => thread.id === id);
};
