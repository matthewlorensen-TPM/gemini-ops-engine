import os
from google.genai import types
from src.config import client

def process_input_to_sop(file_path: str) -> str:
    """Processes audio files, video recordings, or text call transcripts into a clean Markdown SOP."""
    ext = os.path.splitext(file_path)[1].lower()
    
    system_instruction = """
    You are an expert Operations Engineer. Your task is to extract operational workflows 
    from call transcripts (Zoom, Teams, Google Meet, phone notes) or audio recordings and convert 
    them into a clean, professional Standard Operating Procedure (SOP) in strict Markdown format.
    
    FILTERING INSTRUCTIONS:
    - Ignore small talk, pleasantries, interruptions, or off-topic conversation.
    - Focus strictly on actionable processes, system names, roles, and rules mentioned.
    
    OUTPUT FORMAT:
    # STANDARD OPERATING PROCEDURE
    **Document ID:** SOP-[Department]-[Number]
    **Title:** [Title]
    **Effective Date:** [Date]
    **Version:** 1.0
    **Owner:** [Role]
    
    ### 1. Purpose & Objective
    ### 2. Roles & Responsibilities
    ### 3. Prerequisites & Systems Used
    ### 4. Step-by-Step Execution Procedure
    ### 5. Exception Handling & Troubleshooting
    ### 6. Quality Control Checklist (4-6 actionable check items)
    """

    # Plain text files: Read directly to save API upload steps
    if ext in ['.txt', '.vtt', '.srt', '.md']:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            transcript_content = f.read()
        
        contents = [
            f"Here is the raw call transcript:\n\n{transcript_content}",
            "Extract the operational workflow and generate a complete Markdown SOP."
        ]
        uploaded_file = None
    else:
        # Binary files (PDF, DOCX) or Audio (MP3, M4A, WAV): Upload to Gemini Files API
        uploaded_file = client.files.upload(file=file_path)
        contents = [
            uploaded_file, 
            "Extract the operational workflow from this file and generate a complete Markdown SOP."
        ]

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.2,
        )
    )
    
    # Clean up file from Google Cloud if uploaded
    if uploaded_file:
        client.files.delete(name=uploaded_file.name)
        
    return response.text