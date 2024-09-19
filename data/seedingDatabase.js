import "dotenv/config";
import bcrypt from "bcrypt";
import { User, Animal, Request, Role } from "../app/models/associations.js";

const roles = [{ name: "admin" }, { name: "user" }, { name: "association" }];

const users = [
  {
    name: "admin",
    firstname: "admin",
    email: "admin@email.com",
    password: "admin123",
    role_id: 1,
  },
  {
    name: "Martin",
    firstname: "Sophie",
    email: "sophie.martin@email.com",
    password: "motdepasse456",
    role_id: 2,
  },
  {
    name: "Dubois",
    firstname: "Pierre",
    email: "pierre.dubois@email.com",
    password: "motdepasse789",
    role_id: 2,
  },
  {
    name: "Lefebvre",
    firstname: "Marie",
    email: "marie.lefebvre@email.com",
    password: "motdepasse101",
    role_id: 2,
  },
  {
    name: "PawFriends",
    firstname: "Association",
    email: "contact@pawfriends.org",
    password: "assoc123",
    role_id: 3,
  },
  {
    name: "CatLove",
    firstname: "Association",
    email: "info@catlove.org",
    password: "assoc456",
    role_id: 3,
  },
];

const animals = [
  {
    name: "Rex",
    species: "Chien",
    description: "Un berger allemand amical et énergique",
    race: "Berger Allemand",
    gender: "Mâle",
    location: "Paris",
    photo:
      "https://cdn.futura-sciences.com/buildsv6/images/wide1920/0/5/f/05f0cc36e4_90376_shutterstock-asyapozniak.jpg",
    birthday: "2020-05-15",
    availability: true,
    user_id: 5,
  },
  {
    name: "Luna",
    species: "Chat",
    description: "Une chatte siamoise calme et affectueuse",
    race: "Siamois",
    gender: "Femelle",
    location: "Lyon",
    photo:
      "https://www.woopets.fr/assets/races/000/380/bannerbig2021/siamois_2.jpg",
    birthday: "2019-08-22",
    availability: true,
    user_id: 6,
  },
  {
    name: "Max",
    species: "Chien",
    description: "Un labrador joueur et bon avec les enfants",
    race: "Labrador",
    gender: "Mâle",
    location: "Marseille",
    photo:
      "https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/a406b3ae28013771e79fd8999e093913.png",
    birthday: "2021-02-10",
    availability: false,
    user_id: 5,
  },
  {
    name: "Milo",
    species: "Chat",
    description: "Un chat persan câlin et paresseux",
    race: "Persan",
    gender: "Mâle",
    location: "Toulouse",
    photo:
      "https://image.noelshack.com/fichiers/2024/38/3/1726645136-e2ee8221-a6e6-4080-b91e-f67d17b0eec5-1.jpg",
    birthday: "2018-11-30",
    availability: true,
    user_id: 6,
  },
  {
    name: "Bella",
    species: "Chien",
    description: "Une golden retriever douce et obéissante",
    race: "Golden Retriever",
    gender: "Femelle",
    location: "Bordeaux",
    photo:
      "https://www.publicdomainpictures.net/pictures/40000/velka/golden-retriever-dog-1362597631o6g.jpg",
    birthday: "2020-09-05",
    availability: true,
    user_id: 5,
  },
];

const requests = [
  { date: "2024-03-01", status: "En attente", user_id: 2, animal_id: 1 },
  { date: "2024-03-05", status: "Approuvée", user_id: 3, animal_id: 2 },
  { date: "2024-03-10", status: "Refusée", user_id: 4, animal_id: 3 },
  { date: "2024-03-15", status: "En attente", user_id: 2, animal_id: 5 },
];

const seedRoles = async () => {
  for (const role of roles) {
    await Role.create(role);
  }
  console.log("Roles seeded successfully");
};

const seedUsers = async () => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    await User.create({
      ...user,
      password: hashedPassword,
    });
  }
  console.log("Users seeded successfully");
};

const seedAnimals = async () => {
  for (const animal of animals) {
    await Animal.create(animal);
  }
  console.log("Animals seeded successfully");
};

const seedRequests = async () => {
  for (const request of requests) {
    await Request.create(request);
  }
  console.log("Requests seeded successfully");
};

const seedDatabase = async () => {
  try {
    await seedRoles();
    await seedUsers();
    await seedAnimals();
    await seedRequests();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
