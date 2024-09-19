/* pseudo code for the project

userRouter pour les routes

userController pour la logique => 
  Si user member (role_id: 2)
alors :
- possibilité de modifier son profil :
  - pouvoir changer son mot de passe (put)

- supprimer son compte (delete)

Si user asso (role_id: 3)
alors :
les mêmes possibilités + gestion des animaux à savoir :
- Création d'un animal (post)
- Editer un animal (put)
- Supprimer un animal (delete)

Si admin (role_id: 1) 
alors : 
- Supprimer un membre (delete)
- Modifier un membre + une association (put sur role_id: 2 et role_id: 3)  


*/