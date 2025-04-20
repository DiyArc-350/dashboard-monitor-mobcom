
import { useEffect, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';

const clientRef = { current: null as MqttClient | null }; // shared client instance

export function useMqtt(topic: string, onMessage: (msg: string) => void) {
  useEffect(() => {
    const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER as string;

    if (!clientRef.current || clientRef.current?.connected === false) {
      clientRef.current = mqtt.connect(brokerUrl, {
        username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
        password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
        protocol: 'wss',
      });

      clientRef.current.on('connect', () => {
        // console.log(`✅ Connected to MQTT broker: ${brokerUrl}`);
      });

      clientRef.current.on('error', (err) => {
        // console.error('❌ MQTT connection error:', err);
      });
    }

    const client = clientRef.current;

    const subscribeToTopic = () => {
      if (client.connected) {
        client.subscribe(topic, (err) => {
          // if (err) console.error('❌ Subscription error:', err);
          // else console.log(`📡 Subscribed to topic: ${topic}`);
        });
      } else {
        // console.warn('⚠️ Client not connected yet. Waiting...');
        // client.once('connect', subscribeToTopic); // subscribe once connected
      }
    };

    subscribeToTopic();

    client.on('message', (receivedTopic, payload) => {
      if (receivedTopic === topic) {
        onMessage(payload.toString());
      }
    });

    return () => {
      client.unsubscribe(topic);
    };
  }, [topic, onMessage]);

  const publish = (topic: string, message: string) => {
    const client = clientRef.current;
    if (client && client.connected) {
      client.publish(topic, message);
    } else {
      // console.warn('🚫 MQTT client is not connected. Cannot publish.');
    }
  };

  return { publish };
}
