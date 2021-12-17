#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <SocketIoClient.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
SocketIoClient webSocket;

//whether butotn is clicked
bool button_clicked = false;

//set the device id
int id = 1;

void event(const char * payload, size_t length) {
  USE_SERIAL.printf("got message: %s\n", payload);
}

void setup() {
    USE_SERIAL.begin(115200);

    USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    
    WiFiMulti.addAP("ssid", "pw");

    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }
    
    webSocket.on("alert_device", event);
    webSocket.begin("https://dry-garden-16739.herokuapp.com/", 9000, "/socket.io/?transport=websocket");
    // use HTTP Basic Authorization this is optional remove if not needed
    //webSocket.setAuthorization("username", "password");
}

void loop() {
    if(button_clicked){
      webSocket.emit("alert_client", id);
      button_clicked = false;
    }
    webSocket.loop();
}
