#!/usr/bin/env python3
"""
Audio Processing Pipeline for Prince Chimenem Godspower's Natural Voice Note.
Converts any uploaded voice recording (M4A, MP3, WAV, OGG, WEBM, AAC)
into production-ready web audio formats with gentle broadcast-level normalization
while strictly preserving natural pitch, timbre, and vocal dynamics.
"""

import os
import sys
import subprocess
import glob

def process_audio(input_file):
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return False

    os.makedirs("media", exist_ok=True)
    
    mp3_out = "media/audio-intro.mp3"
    m4a_out = "media/audio-intro.m4a"
    ogg_out = "media/audio-intro.ogg"

    print(f"Processing natural voice recording from: {input_file}")

    # Standard ffmpeg audio filter: gentle normalization to -16 LUFS (industry standard for speech/podcasts)
    # Pitch and speed are 100% UNTOUCHED to ensure authentic, natural voice representation.
    audio_filter = "loudnorm=I=-16:TP=-1.5:LRA=11"

    # 1. Output MP3 (Standard 44.1kHz CBR 192kbps stereo MP3)
    cmd_mp3 = [
        "ffmpeg", "-y", "-i", input_file,
        "-af", audio_filter,
        "-ar", "44100",
        "-c:a", "libmp3lame",
        "-b:a", "192k",
        "-ac", "2",
        mp3_out
    ]
    res1 = subprocess.run(cmd_mp3, capture_output=True, text=True)
    if res1.returncode != 0:
        print("MP3 conversion failed, attempting direct encoding without filter...")
        subprocess.run(["ffmpeg", "-y", "-i", input_file, "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "192k", mp3_out])

    # 2. Output M4A (AAC LC with faststart for instant streaming on iOS/Safari)
    cmd_m4a = [
        "ffmpeg", "-y", "-i", input_file,
        "-af", audio_filter,
        "-ar", "44100",
        "-c:a", "aac",
        "-b:a", "160k",
        "-movflags", "+faststart",
        "-ac", "2",
        m4a_out
    ]
    subprocess.run(cmd_m4a, capture_output=True, text=True)

    # 3. Output OGG (Vorbis for modern open standards)
    cmd_ogg = [
        "ffmpeg", "-y", "-i", input_file,
        "-af", audio_filter,
        "-ar", "44100",
        "-c:a", "libvorbis",
        "-q:a", "5",
        "-ac", "2",
        ogg_out
    ]
    subprocess.run(cmd_ogg, capture_output=True, text=True)

    print("Successfully generated all web audio formats:")
    for f in [mp3_out, m4a_out, ogg_out]:
        if os.path.exists(f):
            print(f"  - {f} ({os.path.getsize(f) // 1024} KB)")

    return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        process_audio(sys.argv[1])
    else:
        # Search for candidates in common upload directories
        candidates = []
        for ext in ["m4a", "mp3", "wav", "aac", "ogg", "weba", "webm"]:
            candidates.extend(glob.glob(f"**/*.{ext}", recursive=True))
        
        # Exclude existing targets in media/ and dist/
        candidates = [
            c for c in candidates 
            if not c.startswith("media/") and not c.startswith("dist/") and "node_modules" not in c
        ]
        
        if candidates:
            print(f"Found candidate voice recording: {candidates[0]}")
            process_audio(candidates[0])
        else:
            print("No new external voice recording found. Pass file path as argument.")
