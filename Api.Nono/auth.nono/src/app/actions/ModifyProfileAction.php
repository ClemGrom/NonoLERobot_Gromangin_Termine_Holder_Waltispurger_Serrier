<?php

namespace nono\auth\api\app\actions;

use nono\auth\api\domain\exceptions\CredentialsException;
use nono\auth\api\domain\exceptions\UserException;
use nono\auth\api\domain\service\classes\JWTAuthService;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class ModifyProfileAction extends AbstractAction
{
    private JWTAuthService $JWTAuthService;

    public function __construct(ContainerInterface $container)
    {
        $this->JWTAuthService = $container->get('jwtauth.service');
    }

    public function __invoke(Request $request, Response $response, array $args)
    {
        // TODO : later, dont' enable to get parsed body with a patch request

        $h = $request->getHeader('Authorization')[0];
        $tokenstring = sscanf($h, "Basic %s")[0];
        $tokenstring = base64_decode($tokenstring);
        $tokenstring = explode(':', $tokenstring);
        $email = $tokenstring[0];
        $password = $tokenstring[1];
        if (is_null($email) || is_null($password)) {
            $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }

        $parsedBody = $request->getParsedBody();

        if (!empty($parsedBody)) {
            return $parsedBody;
        }
        $username = $parsedBody['username'];
        $email = $parsedBody['email'];
        $password = $parsedBody['password'];

        if (isset($username) && isset($email) && isset($password)) {
            {
                try {
                    $response->getBody()->write(json_encode($this->JWTAuthService->updateProfile($username, $email, $password)));
                    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
                } catch (CredentialsException) {
                    $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
                    return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
                } catch (UserException $e) {
                    $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                    return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
                }
            }
        }
        $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
    }
}