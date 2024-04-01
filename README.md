# IP Address Management System (TEST)

Author: Jay Fructuoso

## Getting Started

Follow these steps to set up the environment:

1. Clone repository:
    ```
    git clone https://github.com/xdissidia/ip-address-management-system-test.git
    ```
2. Navigate to project directory:
    ```
    cd ip-address-management-system-test
    ```
3. Start the Docker containers:
    ```
    docker-compose up --build
    ```
4. Configure API and FE:
    ```
    docker exec IPAMS-API cp .env.example .env
    docker exec IPAMS-API php artisan migrate:fresh --seed --force
    ```
5. Access IPAMS at `http://localhost:3000`.
    ```
    user: test@test.test
    pass: test
    ```

## API Testing (Postman)

Import ```IPAMS.postman_collection.json``` to Postman

## Features

- Add a new IP address to the database and attach a small label/comment to it.
- Modify an IP address to change the label.
- View an audit log of which changes have been made.