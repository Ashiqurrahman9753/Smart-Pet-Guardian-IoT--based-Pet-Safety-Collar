#include <ESP32Servo.h>
#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiManager.h>

#define SS_PIN 5
#define RST_PIN 0
#define SERVO_PIN 33

const char *ssid = "spgdoorid";
const char *password = "spgdoorpw";
const char *lambdaEndpoint = "https://nqiqf86db3.execute-api.eu-north-1.amazonaws.com/initial/IoT_Door";

Servo myservo;
MFRC522 rfid(SS_PIN, RST_PIN);

String idString;
int lock = 0;
int unlock = 90;
String open_door = "False";

void setup() { 
  Serial.begin(9600);
  // WiFiManager wifiManager;
  Serial.println("Before connecting...");
  WiFiManager wifiManager;
  wifiManager.autoConnect(ssid, password);
  Serial.println("Connected to WiFi");
  Serial.println("Connected to the WiFi network");
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522 
  myservo.attach(SERVO_PIN);
  char ssid[14];
  snprintf(ssid, 14, "%llX", ESP.getEfuseMac());
  Serial.println(ssid);
}

String triggerLambdaFunction(String rfid_string) {
  HTTPClient http;
  String lambdaURL = String(lambdaEndpoint);
  char ssid[14];
  snprintf(ssid, 14, "%llX", ESP.getEfuseMac());
  const char* uid = ssid;
  String postPayload = "SerialNumber="+String(uid)+"&rfID=" + rfid_string;
  http.begin(lambdaURL);
  int httpResponseCode = http.POST(postPayload);
  String response;

  if (httpResponseCode > 0) {
    Serial.print("AWS Lambda HTTP Response Code: ");
    Serial.println(httpResponseCode);
    response = http.getString(); // Get the response from the server
    Serial.println(response);
  } else {
    Serial.print("AWS Lambda HTTP Request failed. Error: ");
    Serial.println(http.errorToString(httpResponseCode).c_str());
    response = "False";
  }
  
  http.end();
  return response;
}
 
void loop() {

  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if ( ! rfid.PICC_IsNewCardPresent())
    return;

  // Verify if the NUID has been readed
  if ( ! rfid.PICC_ReadCardSerial())
    return;

  for (byte i = 0; i < 4; i++) {
    Serial.println("RFID");
    Serial.print(rfid.uid.uidByte[i]);
    idString += String(rfid.uid.uidByte[i], HEX);  // Hex
  }
  Serial.println("break here");
  Serial.println("ID String: " + idString);
  Serial.println("break here");

  open_door = triggerLambdaFunction(idString);
  Serial.print("Open Door Value: ");
  Serial.println(open_door);
  if (open_door == "True"){
    Serial.println("Opening Door");
    myservo.write(unlock);
    delay(5000);
    Serial.println("Closing Door");
    myservo.write(lock);
  }
  else{
    Serial.println("Closing Door");
    myservo.write(lock);
  }

  idString = "";

  // Halt PICC
  rfid.PICC_HaltA();

  // Stop encryption on PCD
  rfid.PCD_StopCrypto1();
}