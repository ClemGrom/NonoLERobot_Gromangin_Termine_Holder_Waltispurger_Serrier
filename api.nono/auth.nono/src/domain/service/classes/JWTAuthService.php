<?php

namespace nono\auth\api\domain\service\classes;

use Carbon\Carbon;
use nono\auth\api\domain\entities\auth\User;
use nono\auth\api\domain\exceptions\CredentialsException;
use nono\auth\api\domain\exceptions\TokenException;
use nono\auth\api\domain\exceptions\UserException;
use nono\auth\api\domain\service\interfaces\IJWTAuthService;
use Random\RandomException;

class JWTAuthService implements IJWTAuthService
{
    private AuthService $authProvider;
    private JWTManager $jwtManager;
    private string|array|false $tokenLifetime;

    public function __construct($authProvider, $jwtManager)
    {
        $this->authProvider = $authProvider;
        $this->jwtManager = $jwtManager;
        $this->tokenLifetime = getenv('JWT_LIFETIME');

    }

    /**
     * @throws CredentialsException
     * @throws RandomException
     * @throws UserException
     */
    public function signIn($email, $password): ?array
    {
        $user = $this->authProvider->verifyCredentials($email, $password);
        if ($user) {
            return ['user' => $this->authProvider->getAuthenticatedUserProfile($email), 'tokens' => $this->createTokenPair($user)];
        }
        return null;
    }

    /**
     * @throws RandomException
     */
    private function createTokenPair(User $user): array
    {
        $tokenData = ['username' => $user->username, 'email' => $user->email];
        $accessToken = $this->jwtManager->createToken($tokenData);
        $refreshToken = $this->jwtManager->createToken(bin2hex(random_bytes(10)));
        $user->refresh_token = $refreshToken;
        $user->refresh_token_expiration_date = Carbon::now()->addMinutes($this->tokenLifetime)->toDateTimeString();
        $user->save();
        return ['access_token' => $accessToken, 'refresh_token' => $refreshToken];
    }

    public function validate($accessToken): ?array
    {
        return $this->jwtManager->validateToken($accessToken) ?: null;
    }

    /**
     * @throws UserException|RandomException
     */
    public function signup($username, $email, $password): User
    {
        $user = $this->authProvider->createUser($username, $email, $password);
        if ($user) {
            $this->createTokenPair($user);
            return $this->authProvider->getAuthenticatedUserProfile($user->email);
        }
        throw new UserException('Error during user creation');
    }

    /**
     * @throws UserException
     * @throws TokenException
     */
    public function activate($activationToken): bool
    {
        $user = $this->authProvider->verifyActivationToken($activationToken);
        if ($user) {
            return $this->authProvider->activateUserAccount($user->id);
        }
        return false;
    }

    /**
     * @throws TokenException|RandomException
     */
    public function refresh($refreshToken): ?array
    {
        $user = $this->authProvider->verifyRefreshToken($refreshToken);
        if ($user) {
            return $this->createTokenPair($user);
        }
        return null;
    }

    public function signOut($refreshToken): bool
    {
        $user = $this->authProvider->verifyRefreshToken($refreshToken);
        if ($user) {
            $user->refresh_token = null;
            $user->refresh_token_expiration_date = null;
            $user->save();
            return true;
        }
        return false;
    }

    /**
     * @throws UserException
     */
    public function updateProfile(string $newUsername = null, $newEmail = null, $newPassword = null): User
    {
        $user = $this->authProvider->getAuthenticatedUserProfile();
        if ($newUsername) {
            $user->username = $newUsername;
        }
        if ($newEmail) {
            $user->email = $newEmail;
        }
        if ($newPassword) {
            $user->password = password_hash($newPassword, PASSWORD_DEFAULT);
        }
        $updatedUser = $this->authProvider->updateUser($user);
        if ($updatedUser) {
            return $this->authProvider->getAuthenticatedUserProfile($updatedUser->email);
        }
        throw new UserException('Error during user profile update');
    }

}