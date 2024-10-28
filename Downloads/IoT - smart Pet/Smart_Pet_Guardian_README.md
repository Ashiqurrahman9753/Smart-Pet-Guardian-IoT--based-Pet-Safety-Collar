
# Smart Pet Guardian
An advanced IoT-based pet safety and monitoring system developed by graduate students at Trinity College Dublin, leveraging cutting-edge technologies to ensure the safety and well-being of pets.

## Project Description
The Smart Pet Guardian (SPG) system integrates IoT technologies to offer real-time pet monitoring and management capabilities, enhancing the quality of life for pets and their owners. This system utilizes GPS for location tracking, RFID for pet identification, and a sophisticated user interface developed with React for real-time monitoring and interaction.

## System Architecture
- **Hardware**: ESP32 microcontroller, GPS modules, RFID tags, and a servo motor for a pet door controlled via RFID.
- **Connectivity**: Uses HTTPS for secure data transmission to the cloud.
- **Cloud Services**: AWS Lambda, API Gateway, S3, and DynamoDB are utilized for robust data handling and storage.
- **User Interface**: A React-based interface that provides real-time location tracking, health statistics, and event alerts like geofence breaches.

## Features
- Real-time GPS tracking of pet location.
- Activity monitoring using an accelerometer.
- RFID-based pet access control.
- Live video streaming of the pet door area.
- Secure and responsive web interface for pet owners.

## Installation
This guide will walk you through setting up the Smart Pet Guardian system, including the hardware assembly, software configurations, and deployment steps. Ensure you have the required tools and accounts before beginning the installation.

### Prerequisites
- **Node.js**: Install from [nodejs.org](https://nodejs.org/).
- **AWS Account**: Create an account at [aws.amazon.com](https://aws.amazon.com/) for accessing AWS services.
- **Arduino IDE**: Install from [arduino.cc](https://www.arduino.cc/en/software).
- **ESP32 Board Definitions**: Install within the Arduino IDE via the Boards Manager.

### Hardware Setup
1. **ESP32 and Sensors**:
   - Connect the GPS module and RFID reader to the ESP32 as per the wiring diagrams in the project documentation.
   - Attach the servo motor to control the pet door mechanism.

2. **Camera Integration**:
   - Connect the ESP-EYE or a compatible camera module for live video functionality.

### Software Configuration
1. **ESP32 Programming**:
   - Open the Arduino IDE and load the provided `.ino` files from the `all_door_code` directory.
   - Update Wi-Fi credentials and configurable parameters as needed.
   - Compile and upload the program to the ESP32.

2. **AWS Configuration**:
   - Set up Lambda functions via the AWS Console to handle data processing.
   - Configure API Gateway for secure communication between the ESP32 and AWS services.
   - Establish roles and policies for accessing AWS resources securely.

3. **Database Setup**:
   - Deploy an RDS MySQL instance, and initialize it using the provided schema for data storage.

4. **Backend Configuration**:
   - In the `pet-management-backend` folder, run `npm install` to install dependencies.
   - Set up necessary environment variables for AWS and database connectivity.

5. **Frontend Installation**:
   - In the frontend directory, execute `npm install` to prepare the React application.
   - Update the `.env` file with API URLs and other settings.
   - Start the application locally with `npm start`.

### Deployment
- **Cloud Deployment**:
  - Deploy the backend to AWS Elastic Beanstalk or a similar PaaS provider.
  - Host the frontend on AWS S3, enabling it as a static website.

- **Local Testing**:
  - Verify the system's functionality by accessing the ESP32 through its local IP address in a web browser.
  - Check for proper communication across all system components and correct data display on the UI.

## Contributing
Guidelines for contributing to the project, including coding standards, pull request processes, and contact information for the lead developers.

## License
Specify the type of license under which the project is released, for example, MIT, GPL, etc.

## Authors
- **Tanay Darda**
- **Indrajeet Kumar**
- **Dila Bellik**
- **Claire Jung**
- **Shaunak Pedgaonkar**
- **Rayyan Mehmood**
- **Ashiqur Rahman**
