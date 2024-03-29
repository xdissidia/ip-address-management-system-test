# IP Address Management System (TEST)

## Getting Started

Follow these steps to set up the environment:

1. Clone repository:
    ```
    https://github.com/xdissidia/ip-address-management-system-test.git
    ```
2. Navigate to project directory:
    ```
    cd ip-address-management-system-test
    ```
3. Start the Docker containers:
    ```
    docker-compose up -d
    ```
5. Access IPAMS at `http://localhost:3000`.
    ```
    user: admin
    pass: admin
    ```

## Features

- Add a new IP address to the database and attach a small label/comment to it.
- Modify an IP address to change the label.
- View an audit log of which changes have been made.