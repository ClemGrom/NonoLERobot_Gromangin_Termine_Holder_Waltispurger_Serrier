<?php

namespace nono\auth\api\domain\service;

use DateTime;
use DomainException;
use nono\auth\api\app\auth\managers\JwtManager;
use nono\auth\api\app\auth\providers\AuthProvider;
use nono\auth\api\domain\dto\CredentialsDTO;
use nono\auth\api\domain\dto\TokenDTO;
use nono\auth\api\domain\dto\UserDTO;
use nono\auth\api\domain\entities\Users;
use nono\auth\api\domain\exceptions\ActivationTokenExpiredException;
use nono\auth\api\domain\exceptions\AuthServiceExpiredTokenException;
use nono\auth\api\domain\exceptions\AuthServiceInvalidTokenException;
use nono\auth\api\domain\exceptions\EmailFormatException;
use nono\auth\api\domain\exceptions\InvalidActivationTokenException;
use nono\auth\api\domain\exceptions\JwtExpiredException;
use nono\auth\api\domain\exceptions\JwtInvalidException;
use nono\auth\api\domain\service\AuthServiceInterface;

class AuthService implements AuthServiceInterface {
    private JwtManager $jwtManager;
    private AuthProvider $authProvider;

    public function __construct(JwtManager $jwtManager, AuthProvider $authProvider) {
        $this->jwtManager = $jwtManager;
        $this->authProvider = $authProvider;
    }

    /**
     * @inheritDoc
     * @throws EmailFormatException
     */
    public function signup(CredentialsDTO $credentialsDTO): UserDTO {
        //sanitize
        $email = filter_var($credentialsDTO->email, FILTER_SANITIZE_EMAIL);
        //validate
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            throw new EmailFormatException();
        }


        $username = filter_var($credentialsDTO->username, FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z]+$/")));


        $this->authProvider->register($email, $credentialsDTO->password, $username);
        return new UserDTO($email,$username);
    }

    /**
     * @inheritDoc
     */
    public function signin(CredentialsDTO $credentialsDTO): TokenDTO {
        $this->authProvider->checkCredentials($credentialsDTO->email,$credentialsDTO->password);
        return $this->authProvider->genToken($this->authProvider->getUser($credentialsDTO->email,''), $this->jwtManager);
    }

    /**
     * @inheritDoc
     */
    public function validate(TokenDTO $tokenDTO): UserDTO {
        try {
            $payload = $this->jwtManager->validate($tokenDTO->jwt);
        }catch (JwtExpiredException $e){
            throw new AuthServiceExpiredTokenException;
        }catch (JwtInvalidException | DomainException $e) {
            throw new AuthServiceInvalidTokenException;
        }
        return new UserDTO($payload->upr->email, $payload->upr->username);
    }

    /**
     * @inheritDoc
     */
    public function refresh(TokenDTO $tokenDTO): TokenDTO {
        $this->authProvider->checkToken($tokenDTO->refreshToken);
        return $this->authProvider->genToken($this->authProvider->getUser('',$tokenDTO->refreshToken), $this->jwtManager);
    }

    /**
     * @inheritDoc
     */
    public function activate_signup(TokenDTO $tokenDTO): void {
        // Récupérez l'utilisateur associé au jeton d'activation
        $user = Users::where('activation_token', $tokenDTO->activationToken)->firstOrFail();

        if ($user && !$user->active) {
            $now = new DateTime();
            $tokenExpDate = new DateTime($user->activation_token_expiration_date);

            if ($tokenExpDate > $now) {
                // Le jeton d'activation est valide, activez le compte de l'utilisateur
                $user->active = true;
                $user->save();
            } else {
                throw new ActivationTokenExpiredException();
            }
        } else {
            throw new InvalidActivationTokenException();
        }
    }
}