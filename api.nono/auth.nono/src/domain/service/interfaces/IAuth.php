<?php

namespace nono\auth\api\domain\service\interfaces;

interface IAuth
{
    public function verifyCredentials($email, $password);
    public function verifyRefreshToken($refreshToken);
    public function getAuthenticatedUserProfile($email);
    public function register($username, $email, $password);
    public function activate($refreshToken);
}