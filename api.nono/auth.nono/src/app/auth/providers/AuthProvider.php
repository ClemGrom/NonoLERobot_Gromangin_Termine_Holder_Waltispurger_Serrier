<?php

namespace nono\auth\api\app\auth\providers;


use DateTime;
use DateTimeZone;
use Exception;
use nono\auth\api\app\auth\managers\JwtManager;
use nono\auth\api\domain\DTO\TokenDTO;
use nono\auth\api\domain\entities\Users;
use nono\auth\api\domain\exceptions\AuthServiceInvalidDataException;
use nono\auth\api\domain\exceptions\CredentialsException;
use nono\auth\api\domain\exceptions\RefreshTokenInvalidException;
use nono\auth\api\domain\exceptions\RefreshUserException;
use nono\auth\api\domain\exceptions\RegisterExistException;
use nono\auth\api\domain\exceptions\RegisterValueException;
use nono\auth\api\domain\exceptions\SignInException;
use Random\RandomException;

class AuthProvider
{
    private Users $currentAuthenticatedUser;

    public function checkCredentials(string $email, string $pass): void
    {
        try {
            $user = Users::where('email', $email)->firstOrFail();

            if (!password_verify($pass, $user->password)) {
                throw new CredentialsException();
            }
        } catch (Exception $e) {
            throw new CredentialsException();
        }
    }

    public function activate(string $token): void
    {
        $t = new TokenDTO($token);
        try {
            $this->authService->activate_signup($t);
        } catch (Exception $e) {
            throw new AuthServiceInvalidDataException();
        }
    }

    public function getAuthenticatedUser(): array
    {
        return [
            'username' => $this->currentAuthenticatedUser->username,
            'email' => $this->currentAuthenticatedUser->email,
            'refresh_token' => $this->currentAuthenticatedUser->refresh_token,
        ];
    }


    /**
     * Vérifie si un token est présent dans la bd pour un utilisateur
     *
     * @param string $token le token à vérifier
     * @return void
     * @throws RefreshTokenInvalidException si le token est introuvable en bd ou dépassé
     */
    public function checkToken(string $token)
    {
        try {
            $user = Users::where('refresh_token', $token)->firstOrFail();
            $tokenExpDate = new DateTime($user->refresh_token_expiration_date);
            $now = new DateTime('now', new DateTimeZone('Europe/Paris'));

            if ($tokenExpDate->getTimestamp() < $now->getTimestamp()) {
                throw new RefreshTokenInvalidException();
            }
        } catch (Exception $e) {
            throw new RefreshTokenInvalidException();
        }
    }


    public function genToken(Users $user, JwtManager $jwtManager): TokenDTO
    {
        $newRefreshToken = bin2hex(random_bytes(32));
        $now = new DateTime('now', new DateTimeZone('Europe/Paris'));
        $refreshTokenExpDate = $now->modify('+1 hour');

        $user->refresh_token = $newRefreshToken;
        $user->refresh_token_expiration_date = $refreshTokenExpDate->format('Y-m-d H:i:s');
        $user->save();

        $token = $jwtManager->create(['username' => $user->username, 'email' => $user->email]);
        return new TokenDTO($newRefreshToken, $token);
    }

    public function getUser(string $email, string $token): Users
    {
        if ($email == '') {
            try {
                return Users::where('refresh_token', $token)->firstOrFail();
            } catch (Exception $e) {
                throw new RefreshUserException();
            }
        } else {
            try {
                return Users::where('email', $email)->firstOrFail();
            } catch (Exception $e) {
                throw new SignInException();
            }
        }

    }

    /**
     * @throws RegisterExistException
     * @throws RegisterValueException
     * @throws RandomException
     */
    public function register(string $email, string $mdp, string $pseudo): void {
        if (Users::where('email', $email)->exists()) {
            throw new RegisterExistException();
        } else {
            $now = new DateTime('now', new DateTimeZone('Europe/Paris'));
            $refreshTokenExpDate = $now->modify('+1 hour');

            $utilisateur = new Users();
            $utilisateur->email = $email;
            $utilisateur->password = password_hash($mdp, PASSWORD_BCRYPT);
            $utilisateur->username = $pseudo;
            $utilisateur->refresh_token = bin2hex(random_bytes(32));
            $utilisateur->refresh_token_expiration_date = $refreshTokenExpDate->format('Y-m-d H:i:s');
            $utilisateur->save();
        }
    }

}