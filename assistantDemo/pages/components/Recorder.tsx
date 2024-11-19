import Image from "next/image";
import activeAssistant from "../../public/img/recording.gif";
import notActiveAssistant from "../../public/img/microphone.png";
import { useEffect, useRef, useState } from "react";

export const mimeType = "audio/webm";

function Recorder({ uploadAudio }) {
    const mediaRecorder = useRef(null);
    const [pending, setPending] = useState(false);
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);

    // Runs when component mounts and checks for permission
    useEffect(() => {
        getMicPermission();
    }, []);

    const getMicPermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({ 
                    audio: true, 
                    video: false, 
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser");
        }
    };

    const startRecording = async () => {
        if (stream === null || pending) return;
        setRecordingStatus("recording");

        // Create new media recorder using stream
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();

        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            // Checks for null input when button is pressed 
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;

            localAudioChunks.push(event.data);
        };

        setAudioChunks(localAudioChunks);
        console.log("Audio chunks are loaded");
    };

    // Stop recording function
    const stopRecording = async () => {
        if (mediaRecorder.current === null || pending) return;
        setRecordingStatus("inactive");
        setPending(true);
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            uploadAudio(audioBlob);
            // Reset audio chunks for next use
            setAudioChunks([]);
            setPending(false);
        };
    };

    return (
        <div className="flex items-center justify-center text-white">
            {/* Ensures permission before displaying button */}
            {!permission && (
                <button onClick={getMicPermission}>Get Mic</button>  
            )}

            {pending && (
                <Image 
                    src={activeAssistant}
                    height={35}
                    width={35}
                    priority
                    alt="Recording"
                    className="assistant grayscale"
                />
            )}

            {permission && recordingStatus === "inactive" && !pending && (
                <Image 
                    src={notActiveAssistant}
                    height={35}
                    width={35}
                    onClick={startRecording}
                    priority={true}
                    alt="Not Recording"
                    className="assistant cursor-pointer hover:scale-110 
                    duration-150 transition-all ease-in-out"
                />
            )}

            {recordingStatus === "recording" && (
                <Image 
                    src={activeAssistant}
                    height={35}
                    width={35}
                    onClick={stopRecording}
                    priority={true}
                    alt="Recording"
                    className="assistant cursor-pointer hover:scale-110 
                    duration-150 transition-all ease-in-out"
                />
            )}
        </div>
    );
}

export default Recorder;
