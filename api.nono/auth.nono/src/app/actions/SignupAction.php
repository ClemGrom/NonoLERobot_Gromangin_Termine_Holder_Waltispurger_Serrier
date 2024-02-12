<?php

namespace nono\auth\api\app\actions;

use nono\auth\api\domain\exceptions\CredentialsException;
use nono\auth\api\domain\exceptions\UserException;
use nono\auth\api\domain\service\classes\JWTAuthService;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class SignupAction extends AbstractAction
{
    private JWTAuthService $JWTAuthService;

    public function __construct(ContainerInterface $container)
    {
        $this->JWTAuthService = $container->get('jwtauth.service');
    }

    public function __invoke(Request $request, Response $response, array $args)
    {
        $data = $request->getParsedBody();
        $email = $data['email'];
        echo $email;
        $password = $data['password'];
        $username = $data['username'];

        if (isset($email) && isset($password) && isset($username)) {
            try {
                $response->getBody()->write(json_encode($this->JWTAuthService->signUp($username, $email, $password)));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
            } catch (CredentialsException) {
                $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
            } catch (UserException $e) {
                $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
            }
        }
        $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
    }
}