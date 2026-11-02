import os
import sys
from src.audio_processor import process_input_to_sop

def main():
    if len(sys.argv) < 2:
        print("Usage: python -m src.main <path_to_file>")
        print("Supported inputs: .m4a, .mp3, .wav, .txt, .vtt, .srt, .pdf")
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    # Verify file exists before sending to API
    if not os.path.exists(input_file):
        print(f"Error: Target file '{input_file}' not found.")
        sys.exit(1)
        
    print(f"Processing input file: {input_file}...")
    
    try:
        sop_result = process_input_to_sop(input_file)
        
        # Ensure outputs directory exists
        os.makedirs("outputs", exist_ok=True)
        
        # Save output with dynamic filename based on input file name
        base_name = os.path.splitext(os.path.basename(input_file))[0]
        output_path = os.path.join("outputs", f"{base_name}_sop.md")
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(sop_result)
            
        print(f"Success! SOP generated and saved to: {output_path}")
        
    except Exception as e:
        print(f"Processing failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()