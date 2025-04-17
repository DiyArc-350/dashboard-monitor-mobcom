// src/hooks/useMqtt.ts
import { useEffect, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';

export function useMqtt(topic: string, onMessage: (msg: string) => void) {
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER as string;

    const client = mqtt.connect(brokerUrl, {
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      protocol: 'wss',
    });

    clientRef.current = client;

    client.on('connect', () => {
      console.log(`Connected to MQTT broker: ${brokerUrl}`);
      client.subscribe(topic, (err) => {
        if (err) console.error('Subscription error:', err);
        else console.log(`Subscribed to topic: ${topic}`);
      });
    });

    client.on('message', (receivedTopic, payload) => {
      if (receivedTopic === topic) {
        onMessage(payload.toString());
      }
    });

    return () => {
      client.end();
    };
  }, [topic, onMessage]);


  const publish = (topic: string, message: string) => {
    clientRef.current?.publish(topic, message);
  };

  return { publish };
}

export default useMqtt;