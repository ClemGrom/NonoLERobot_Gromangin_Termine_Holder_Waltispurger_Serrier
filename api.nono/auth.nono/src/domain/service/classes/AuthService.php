<?php

namespace nono\auth\api\domain\service\classes;

use Carbon\Carbon;
use Exception;
use nono\auth\api\domain\entities\auth\User;
use nono\auth\api\domain\exceptions\CredentialsException;
use nono\auth\api\domain\exceptions\TokenException;
use nono\auth\api\domain\exceptions\UserException;
use nono\auth\api\domain\service\interfaces\IAuth;
use Random\RandomException;

class AuthService implements IAuth
{
    /**
     * @throws CredentialsException
     */
    public function verifyCredentials($email, $password)
    {
        $user = User::where('email', $email)->first();
        if ($user && password_verify($password, $user->password)) {
            return $user;
        }
        throw new CredentialsException();
    }

    /**
     * @throws TokenException
     */
    public function verifyRefreshToken($refreshToken) {
        $user = User::where('refresh_token', $refreshToken)
            ->where('refresh_token_expiration_date', '>', Carbon::now())
            ->first();
        return $user ?: throw new TokenException('Invalid refresh token');
    }

    /**
     * @throws UserException
     * @throws RandomException
     */
    public function createUser($username, $email, $password)
    {
        try {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $activationToken = bin2hex(random_bytes(16));

            $user = [
                'username' => $username,
                'email' => $email,
                'password' => $hashedPassword,
                'activation_token' => $activationToken,
                'activation_token_expiration_date' => Carbon::now()->addMinutes(5)->toDateTimeString(),
            ];

            return User::create($user);
        } catch (Exception $e) {
            throw new UserException("Error during user creation");
        }

    }

    /**
     * @throws TokenException
     */
    public function verifyActivationToken($activationToken)
    {
        $user = User::where('activation_token', $activationToken)
            ->where('activation_token_expiration_date', '>', Carbon::now())
            ->first();
        return $user ?: throw new TokenException('Invalid activation token');
    }

    /**
     * @throws UserException
     */
    public function activateUserAccount($email)
    {
        try {
            $user = User::find($email);
            $user->active = 1;
            $user->activation_token = null;
            $user->activation_token_expiration_date = null;
            return $user->save();
        } catch (Exception) {
            throw new UserException("Error during user activation");
        }
    }

    /**
     * @throws UserException
     */
    public function getAuthenticatedUserProfile($email): User
    {
        try {
            return $this->getUserByEmail($email);
        } catch (Exception) {
            throw new UserException("Error during user profile retrieval");
        }
    }

    public function getUserByEmail($email)
    {
        return User::where('email', $email)->first() ?: null;
    }

    public function register($username, $email, $password)
    {
        // TODO
    }

    public function activate($refreshToken)
    {
        // TODO
    }

    public function updateUser(User $user)
    {
        return User::whereId($user->email)->update($user->toArray());
    }
}