<?php

namespace nono\auth\api\domain\service;

use nono\auth\api\domain\dto\CredentialsDTO;
use nono\auth\api\domain\dto\TokenDTO;
use nono\auth\api\domain\dto\UserDTO;

interface AuthServiceInterface {
    /**
     * Enregistre l'utilisateur
     *
     * @param CredentialsDTO $credentialsDTO les identifiants de l'utilisateur
     * @return UserDTO un objet avec les informations utilisateur
     */
    public function signup(CredentialsDTO $credentialsDTO) : UserDTO;

    /**
     * Connecte l'utilisateur
     *
     * @param CredentialsDTO $credentialsDTO les identifiants de l'utilisateur
     * @return TokenDTO un jwt avec les informations de l'utilisateur
     */
    public function signin(CredentialsDTO $credentialsDTO) : TokenDTO;

    /**
     * Valide un jwt
     *
     * @param TokenDTO $tokenDTO le jwt donné
     * @return UserDTO l'utilisateur authentifié
     */
    public function validate(TokenDTO $tokenDTO) : UserDTO;

    /**
     * Rafraichit le jwt
     *
     * @param TokenDTO $tokenDTO le token a rafraichir
     * @return TokenDTO le nouveau token
     */
    public function refresh(TokenDTO $tokenDTO) : TokenDTO;

    /**
     * Valide l'inscription
     *
     * @param TokenDTO $tokenDTO le token unique envoyé dans le mail d'inscription
     * @return void
     */
    public function activate_signup(TokenDTO $tokenDTO) : void;

}