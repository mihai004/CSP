<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1c1def15e3522c04ed3f64738b6139fe
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1c1def15e3522c04ed3f64738b6139fe::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1c1def15e3522c04ed3f64738b6139fe::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}