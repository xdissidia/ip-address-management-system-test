FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite

ENV API_PUBLIC_PATH /var/www/html/public

COPY ./storage/config/ipams.local.conf /etc/apache2/sites-available/ipams.local.conf

RUN rm /etc/apache2/sites-available/000-default.conf -rf
RUN ln -s /etc/apache2/sites-available/ipams.local.conf /etc/apache2/sites-enabled/ipams.local.conf

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-interaction --optimize-autoloader

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]
