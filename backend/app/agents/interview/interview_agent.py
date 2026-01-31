import sounddevice as sd
import numpy as np
import simpleaudio as sa

# Parameters
duration = 5  # seconds
fs = 44100    # sample rate

print("Recording...")
# Record audio
recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='float32')
sd.wait()  # Wait until recording is finished
print("Recording finished!")

# Convert to 16-bit PCM for playback
audio = (recording * 32767).astype(np.int16)
audio = audio.flatten()  # Flatten in case of multiple channels

# Play back
play_obj = sa.play_buffer(audio, 1, 2, fs)  # 1 channel, 2 bytes per sample
play_obj.wait_done()  # Wait until playback is finished
print("Playback done!")
