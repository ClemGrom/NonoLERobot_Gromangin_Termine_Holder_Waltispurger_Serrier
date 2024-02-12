<?php

namespace nono\auth\api\app\actions;

use nono\auth\api\domain\exceptions\UserException;
use nono\auth\api\domain\service\classes\AuthService;
use nono\auth\api\domain\service\classes\JWTAuthService;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Psr7\Message;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class GetProfileAction extends AbstractAction
{
    private AuthService $service;

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function __construct(ContainerInterface $container)
    {
        $this->service = $container->get('auth.service');
    }

    /**
     * @throws UserException
     */
    public function __invoke(Request $request, Response $response, array $args): Response|Message
    {
        $h = $request->getHeader('Authorization')[0];
        $tokenstring = sscanf($h, "Basic %s")[0];
        $tokenstring = base64_decode($tokenstring);
        $tokenstring = explode(':', $tokenstring);
        $email = $tokenstring[0];
        if (is_null($email)) {
            $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }

        $user = $this->service->getAuthenticatedUserProfile($email);
        $username = $user->username;
        $email = $user->email;
        $userArray = [
            'username' => $username,
            'email' => $email
        ];
        $response->getBody()->write(json_encode($userArray));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}