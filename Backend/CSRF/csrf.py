import subprocess
import re


def xsrfprobe(url):
    # Execute a shell command
    command = "xsrfprobe -u " + url + " > output.txt"
    # Store the output as a byte string
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    # parsed = result.stdout
    # print(parsed)
    with open("output.txt", "r") as f:
        result = f.read()

    not_vulnerable_count = len(re.findall(r"\bNOT VULNERABLE\b", result))
    vulnerable_count = len(re.findall(r"\b(?<!NOT )VULNERABLE\b", result))
    return vulnerable_count
