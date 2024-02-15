<?php

namespace nono\auth\api\app\auth\managers;

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use nono\auth\api\domain\exceptions\JwtExpiredException;
use nono\auth\api\domain\exceptions\JwtInvalidException;
use stdClass;
use UnexpectedValueException;

class JwtManager {
    /**
     * Crée un jwt à partir d'infos utilisateur : username et email
     *
     * @param array $user un tableau contenant le username et l'email de l'utilisateur
     * @return string un token jwt sous forme de string
     */
    public function create(array $user): string {
        $payload = [
            'iss' => "pizza-shop.auth.db",
            'iat' => time(),
            'exp' => time() + $_ENV['JWT_EXPIRATION'],
            'upr' => [
                'username' => $user['username'],
                'email' => $user['email'],
            ],
        ];

        return JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS512');
    }

    /**
     * Valide un jwt et retourne son payload
     *
     * @param string $token le token jwt sous forme de string
     * @return stdClass le payload du jwt sous forme d'objet PHP
     * @throws JwtInvalidException|JwtExpiredException si le token est expiré, invalide ou indéchiffrable
     */
    public function validate(string $token): stdClass {
        try {
            return JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS512'));
        } catch (ExpiredException $e) {
            throw new JwtExpiredException();
        } catch (SignatureInvalidException $e) {
            throw new JwtInvalidException('signature');
        } catch (UnexpectedValueException $e) {
            throw new JwtInvalidException('invalid');
        }
    }
}