// // src/hooks/useMqtt.ts
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
    const client = clientRef.current;
    if (client && client.connected) {
      client.publish(topic, message);
    } else {
      console.warn('MQTT client is not connected. Cannot publish message.');
    }
  };

  return { publish };
}

export default useMqtt;


// export function useMqtt(
//   topic: string,
//   onMessage: (msg: string) => void,
//   freezeAfterFirst: boolean = false
// ) {
//   const clientRef = useRef<MqttClient | null>(null);
//   const hasReceived = useRef(false);

//   useEffect(() => {
//     const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER as string;

//     const client = mqtt.connect(brokerUrl, {
//       username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
//       password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
//       protocol: 'wss',
//     });

//     clientRef.current = client;

//     client.on('connect', () => {
//       console.log(`Connected to MQTT broker: ${brokerUrl}`);
//       client.subscribe(topic, (err) => {
//         if (err) console.error('Subscription error:', err);
//         else console.log(`Subscribed to topic: ${topic}`);
//       });
//     });

//     client.on('message', (receivedTopic, payload) => {
//       if (receivedTopic === topic && (!freezeAfterFirst || !hasReceived.current)) {
//         const msg = payload.toString();
//         onMessage(msg);

//         if (freezeAfterFirst) {
//           hasReceived.current = true;
//           client.unsubscribe(topic);
//           console.log(`Unsubscribed from ${topic} after first message.`);
//         }
//       }
//     });

//     return () => {
//       client.end();
//     };
//   }, [topic, onMessage, freezeAfterFirst]);

//   const publish = (topic: string, message: string) => {
//     clientRef.current?.publish(topic, message);
//   };

//   return { publish };
// }

// export default useMqtt;