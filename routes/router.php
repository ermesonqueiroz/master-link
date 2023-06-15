<?php

require "../vendor/autoload.php";

use App\Factories\RefreshAccessTokenFactory;
use Bramus\Router\Router;
use App\Factories\CreateUserFactory;
use App\Factories\AuthUserFactory;

$router = new Router();

$router->post('/api/user/signup', function () {
    $body = json_decode(
        file_get_contents('php://input'),
        true
    );

    $controller = CreateUserFactory::execute();
    $controller->handle($body);
});

$router->post('/api/user/auth', function () {
    $body = json_decode(
        file_get_contents('php://input'),
        true
    );

    $controller = AuthUserFactory::execute();
    $controller->handle($body);
});

$router->post('/api/user/refresh-token', function () {
    $body = json_decode(
        file_get_contents('php://input'),
        true
    );

    $controller = RefreshAccessTokenFactory::execute();
    $controller->handle($body);
});
