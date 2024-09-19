SET client_encoding TO 'UTF8';
BEGIN;

INSERT INTO "role" ("name") VALUES
('admin'),
('user'),
('association');

-- Seeding for table "user"
INSERT INTO "user" ("name", "firstname", "email", "password", "role_id") VALUES
('Dupont', 'Jean', 'jean.dupont@email.com', 'motdepasse123', 1),
('Martin', 'Sophie', 'sophie.martin@email.com', 'motdepasse456', 2),
('Dubois', 'Pierre', 'pierre.dubois@email.com', 'motdepasse789', 2),
('Lefebvre', 'Marie', 'marie.lefebvre@email.com', 'motdepasse101', 2),
('PawFriends', 'Association', 'contact@pawfriends.org', 'assoc123', 3),
('CatLove', 'Association', 'info@catlove.org', 'assoc456', 3);

-- Seeding for table "animal"
INSERT INTO "animal" ("name", "species", "description", "race", "gender", "location", "photo", "birthday", "availability", "user_id") VALUES
('Rex', 'Chien', 'Un berger allemand amical et énergique', 'Berger Allemand', 'Mâle', 'Paris', 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/0/5/f/05f0cc36e4_90376_shutterstock-asyapozniak.jpg', '2020-05-15', true, 5),
('Luna', 'Chat', 'Une chatte siamoise calme et affectueuse', 'Siamois', 'Femelle', 'Lyon', 'https://cataas.com/cat/says/Luna', '2019-08-22', true, 6),
('Max', 'Chien', 'Un labrador joueur et bon avec les enfants', 'Labrador', 'Mâle', 'Marseille', 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/a406b3ae28013771e79fd8999e093913.png', '2021-02-10', false, 5),
('Milo', 'Chat', 'Un chat persan câlin et paresseux', 'Persan', 'Mâle', 'Toulouse', 'https://cataas.com/cat/says/Milo', '2018-11-30', true, 6),
('Bella', 'Chien', 'Une golden retriever douce et obéissante', 'Golden Retriever', 'Femelle', 'Bordeaux', 'https://www.publicdomainpictures.net/pictures/40000/velka/golden-retriever-dog-1362597631o6g.jpg', '2020-09-05', true, 5);

-- Seeding for table "request"
INSERT INTO "request" ("date", "status", "user_id", "animal_id") VALUES
('2024-03-01', 'En attente', 2, 1),
('2024-03-05', 'Approuvée', 3, 2),
('2024-03-10', 'Refusée', 4, 3),
('2024-03-15', 'En attente', 2, 5);


COMMIT;