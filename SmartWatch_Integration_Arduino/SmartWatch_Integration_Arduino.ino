#include <SoftwareSerial.h>

SoftwareSerial BT(6, 5); // RX | TX

String gelenkrktr;

int role1 = 11;
int role2 = 12;

int role1acik = 1;
int role2acik = 1;
int role1sellektor = 0;
int role2sellektor = 0;

void setup() 
{ 
  Serial.begin(9600);
  BT.begin(9600);
  pinMode(10, OUTPUT);
  digitalWrite(10, HIGH);
  pinMode(role1, OUTPUT);
  pinMode(role2, OUTPUT);
}
void loop()
{
  if(BT.available()){
    gelenkrktr = BT.readString();
    Serial.print("\nBT Komut: "+gelenkrktr);
      if(gelenkrktr.indexOf("ses") > -1){
        BT.print("ses");
      }else if(gelenkrktr.indexOf("rbirsac") > -1){
        BT.print("Role1sellektoracik");
        role1sellektor = 1;
      }else if(gelenkrktr.indexOf("rbirskapa") > -1){
        BT.print("Role1sellektorkapali");
        role1sellektor = 0;
      }else if(gelenkrktr.indexOf("rikisac") > -1){
        BT.print("Role2sellektoracik");
        role2sellektor = 1;
      }else if(gelenkrktr.indexOf("rikiskapa") > -1){
        BT.print("Role2sellektorkapali");
        role2sellektor = 0;
      }else if(gelenkrktr.indexOf("rbir") > -1){
        if(role1acik == 0){
          digitalWrite(role1, LOW);
          BT.print("r1acildi");
          role1acik = 1;
        }else{
          digitalWrite(role1, HIGH);
          BT.print("r1kapandi");
          role1acik = 0;
        }
      }else if(gelenkrktr.indexOf("riki") > -1){
        if(role2acik == 0){
          digitalWrite(role2, LOW);
          BT.print("r2acildi");
          role2acik = 1;
        }else{
          digitalWrite(role2, HIGH);
          BT.print("r2kapandi");
          role2acik = 0;
        }
      }else{
        BT.print(gelenkrktr + " komutu yok!");
      }
  }

  if(Serial.available()){
    BT.print(Serial.readString());
  }
  
  if(role1sellektor == 1){
      digitalWrite(role1, LOW);
      delay(20);
      digitalWrite(role1, HIGH);
      delay(100);
      digitalWrite(role1, LOW);
      delay(100);
  }
  if(role2sellektor == 1){
      digitalWrite(role2, LOW);
      delay(20);
      digitalWrite(role2, HIGH);
      delay(100);
      digitalWrite(role2, LOW);
      delay(100);
  }
}
