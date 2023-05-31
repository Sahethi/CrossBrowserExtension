import subprocess
import re

def xsrfprobe(url):
    # Execute a shell command
    command = "xsrfprobe -u " + url + " -l 2"
    # Store the output as a byte string
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    parsed = result.stdout

    not_vulnerable_count = len(re.findall(r'\bNOT VULNERABLE\b', parsed))
    vulnerable_count = len(re.findall(r'\b(?<!NOT )VULNERABLE\b', parsed))
    return(vulnerable_count)
