FROM php:7.4-apache
COPY ./php.ini /usr/local/etc/php/

RUN a2enmod rewrite
RUN apt-get update
RUN apt upgrade -y

RUN apt-get install -q -y --no-install-recommends \
    apt-utils \
    default-mysql-client \
    libxml2-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng-dev \
    libwebp-dev \
    openssl \
    libzip-dev \
    libmagickwand-dev \
    imagemagick \
    optipng \
    pngquant \
    gifsicle \
    webp \
    libjpeg-progs \
    libc-client-dev \
    libkrb5-dev \
    exim4-daemon-light \
    mailutils \
    msmtp

RUN docker-php-ext-configure gd \
    --with-freetype=/usr/include/ \
    --with-jpeg=/usr/include/ \
    --with-webp=/usr/include/

RUN docker-php-ext-configure imap \
    --with-kerberos \
    --with-imap-ssl

RUN docker-php-ext-install \
    pdo_mysql \
    mysqli \
    zip \
    exif \
    gd \
    bcmath \
    intl \
    sockets \
    imap \
    opcache

RUN pecl install \
    xdebug \
    imagick \
    mcrypt \
    && docker-php-ext-enable \
    xdebug \
    imagick \
    mcrypt

RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

COPY ./sendmail.ini /usr/local/etc/php/conf.d/
COPY ./update-exim4.conf /etc/exim4/update-exim4.conf.conf
RUN service exim4 reload
