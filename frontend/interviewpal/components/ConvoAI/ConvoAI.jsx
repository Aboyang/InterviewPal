import { useEffect, useRef, useState } from "react";
import "../../src/index.css"
import "./ConvoAI.css"
import VoiceIndicator from "./VoiceIndicator";
import { useSelector } from "react-redux";

function ConvoAI() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [dataChannel, setDataChannel] = useState(null);
  const peerConnection = useRef(null);
  const audioElement = useRef(null);
  const { questions } = useSelector((state) => state.onboarding)

  // Start Realtime Session
  async function startSession() {
    console.log("frontend get token")
    // Get ephemeral token
    const tokenResponse = await fetch("http://localhost:8000/interview/token");
    console.log(tokenResponse)
    const data = await tokenResponse.json();
    console.log(data)
    const EPHEMERAL_KEY = data.value;

    // Create WebRTC peer connection
    const pc = new RTCPeerConnection();

    // Setup remote audio playback
    audioElement.current = document.createElement("audio");
    audioElement.current.autoplay = true;
    pc.ontrack = (e) => (audioElement.current.srcObject = e.streams[0]);

    // Add local microphone
    const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
    pc.addTrack(ms.getTracks()[0]);

    // Setup data channel
    const dc = pc.createDataChannel("oai-events");
    setDataChannel(dc);

    dc.onopen = () => {
      console.log("Data channel open — configuring session");

      // Configure session: always listen + interrupt
      dc.send(
        JSON.stringify({
          type: "session.update",
          session: {
            turn_detection: {
              type: "always_listen",
              threshold: 0.5,
              min_speech_duration_ms: 50,
              max_silence_duration_ms: 200
            },
            interrupt_response: true,
            input_audio_noise_reduction: { type: "near_field" }
          }
        })
      );

      const formattedQuestions = Object.entries(questions)
        .map(([category, qList]) => `${category}:\n${qList.map(q => `- ${q}`).join("\n")}`)
        .join("\n\n");

      console.log(formattedQuestions);

      const systemMessage = {
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "system",
          content: [
            {
              type: "input_text",
              text: `You are an interviewer. Your task is to ask the user the following questions one by one, in order. 
                    But, whenever necessary, follow up with their response.

                    Start with getting the candidate to introduce himself, 
                    and his motivation to join this company first, 
                    then carry on with the quesions

                    Questions:
                    ${formattedQuestions}`
            }
          ]
        }
      };

      // Send system message + kickstart first question
      dc.send(JSON.stringify(systemMessage));
      dc.send(JSON.stringify({ type: "response.create" }));
    };

    // Start WebRTC SDP handshake
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const sdpResponse = await fetch(
      `https://api.openai.com/v1/realtime/calls?model=gpt-realtime`,
      {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        }
      }
    );

    const sdp = await sdpResponse.text();
    await pc.setRemoteDescription({ type: "answer", sdp });

    peerConnection.current = pc;
  }

  // Stop session
  function stopSession() {
    if (dataChannel) dataChannel.close();

    if (peerConnection.current) {
      peerConnection.current.getSenders().forEach((s) => s.track?.stop());
      peerConnection.current.close();
    }

    setIsSessionActive(false);
    setDataChannel(null);
    peerConnection.current = null;
  }

  // Send event to model
  function sendClientEvent(message) {
    if (!dataChannel) return console.error("No data channel", message);

    const timestamp = new Date().toLocaleTimeString();
    message.event_id = message.event_id || crypto.randomUUID();
    if (!message.timestamp) message.timestamp = timestamp;

    dataChannel.send(JSON.stringify(message));
    // setEvents((prev) => [message, ...prev]);
  }

  // Send text message
  function sendTextMessage(message) {
    const event = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: message }]
      }
    };
    sendClientEvent(event);
    sendClientEvent({ type: "response.create" }); // triggers response immediately
  }

  // Handle incoming events
  useEffect(() => {
    if (!dataChannel) return;

    // Log all events
    dataChannel.addEventListener("message", (e) => {
      const event = JSON.parse(e.data);
      if (!event.timestamp) event.timestamp = new Date().toLocaleTimeString();
      // setEvents((prev) => [event, ...prev]);
    });

    // Automatically trigger response after user speech
    dataChannel.addEventListener("message", (e) => {
      const evt = JSON.parse(e.data);
      if (evt.type === "input_audio_buffer.processed") {
        sendClientEvent({ type: "response.create" });
      }
    });

    // Activate session
    dataChannel.addEventListener("open", () => {
      setIsSessionActive(true);
      // setEvents([]);
    });
  }, [dataChannel]);

return (
  <div className="flex-col centerer-flex voice-container">
    {isSessionActive && <VoiceIndicator />}
    <button
      onClick={() => {
        if (isSessionActive) {
          stopSession();
        } else {
          startSession();
        }
      }}
      className={isSessionActive ? "" : "btn-primary btn-large"}
    >
      {isSessionActive ? "Stop Session" : "Launch Session"}
    </button>
  </div>
);

}

export default ConvoAI