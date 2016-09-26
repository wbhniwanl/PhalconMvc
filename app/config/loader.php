<?php

$loader = new \Phalcon\Loader();

/**
 * We're a registering a set of directories taken from the configuration file
 */
// $loader->registerDirs(
//     [
//         $config->application->controllersDir,
//         $config->application->modelsDir,
//         $config->application->taskDir,
//     ]
// )->register();

$loader->registerNamespaces(
    [
        'MyApp\Controllers'       => __DIR__ . '/../controllers/',
        'MyApp\Controllers\Admin' => __DIR__ . '/../controllers/admin/',
        'MyApp\Models'            => __DIR__ . '/../models/',
        'MyApp\Plugins'           => __DIR__ . '/../plugins/',
        'MyApp\Library'           => __DIR__ . '/../library/',
    ]
)->register();
