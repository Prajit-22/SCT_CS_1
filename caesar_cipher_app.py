import tkinter as tk
from tkinter import messagebox

# Caesar cipher logic
def caesar_cipher(text, shift, mode):
    result = ""
    shift = int(shift)
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            if mode == "encrypt":
                result += chr((ord(char) - base + shift) % 26 + base)
            else:
                result += chr((ord(char) - base - shift) % 26 + base)
        else:
            result += char
    return result

# Event functions
def encrypt_text():
    text = input_text.get("1.0", tk.END).strip()
    shift = entry_shift.get()
    if not shift.isdigit():
        messagebox.showerror("Invalid Input", "Shift must be a number.")
        return
    output_text.delete("1.0", tk.END)
    output_text.insert(tk.END, caesar_cipher(text, shift, "encrypt"))

def decrypt_text():
    text = input_text.get("1.0", tk.END).strip()
    shift = entry_shift.get()
    if not shift.isdigit():
        messagebox.showerror("Invalid Input", "Shift must be a number.")
        return
    output_text.delete("1.0", tk.END)
    output_text.insert(tk.END, caesar_cipher(text, shift, "decrypt"))

def clear_fields():
    input_text.delete("1.0", tk.END)
    output_text.delete("1.0", tk.END)
    entry_shift.delete(0, tk.END)

def swap_texts():
    message = input_text.get("1.0", tk.END)
    result = output_text.get("1.0", tk.END)
    input_text.delete("1.0", tk.END)
    output_text.delete("1.0", tk.END)
    input_text.insert(tk.END, result.strip())
    output_text.insert(tk.END, message.strip())

# GUI setup
root = tk.Tk()
root.title("Caesar Cipher App")
root.geometry("600x400")
root.resizable(False, False)

# Labels
tk.Label(root, text="Enter Message:", font=("Arial", 12)).grid(row=0, column=0, padx=10, pady=10, sticky="w")
tk.Label(root, text="Enter Shift:", font=("Arial", 12)).grid(row=1, column=0, padx=10, pady=10, sticky="w")
tk.Label(root, text="Output:", font=("Arial", 12)).grid(row=3, column=0, padx=10, pady=10, sticky="w")

# Input area
input_text = tk.Text(root, height=5, width=60)
input_text.grid(row=0, column=1, padx=10, pady=10)

entry_shift = tk.Entry(root, width=10)
entry_shift.grid(row=1, column=1, padx=10, pady=10, sticky="w")

# Buttons
btn_encrypt = tk.Button(root, text="Encrypt", command=encrypt_text, width=10)
btn_encrypt.grid(row=2, column=0, padx=10, pady=5)

btn_decrypt = tk.Button(root, text="Decrypt", command=decrypt_text, width=10)
btn_decrypt.grid(row=2, column=1, padx=10, pady=5, sticky="w")

btn_clear = tk.Button(root, text="Clear", command=clear_fields, width=10)
btn_clear.grid(row=4, column=0, padx=10, pady=5)

btn_swap = tk.Button(root, text="Swap", command=swap_texts, width=10)
btn_swap.grid(row=4, column=1, padx=10, pady=5, sticky="w")

# Output area
output_text = tk.Text(root, height=5, width=60, state='normal')
output_text.grid(row=3, column=1, padx=10, pady=10)

# Run the app
root.mainloop()
