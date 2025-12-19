import tkinter as tk
from tkinter import font as tkfont
import os

def launch(cmd):
    os.system(f'DISPLAY=:1 {cmd} &')

root = tk.Tk()
root.title('KuroOS')
root.attributes('-fullscreen', True)
root.configure(bg='#0a0010')

# Custom colors from Liquid Glass system
BG_BASE = '#0a0010'
BG_MID = '#1a0030'
ACCENT = '#a78bfa'
TEXT_PRIMARY = '#ffffff'
TEXT_SECONDARY = '#666666'
GLASS_BORDER = '#3d2a5c'

# Title
tk.Label(root, text='KuroOS', font=('SF Pro Display', 48, 'bold'), fg=ACCENT, bg=BG_BASE).pack(pady=(60,5))
tk.Label(root, text='alpha-0.1', font=('SF Pro Display', 12), fg=TEXT_SECONDARY, bg=BG_BASE).pack(pady=(0,40))

# Dock frame (horizontal like landing page)
dock = tk.Frame(root, bg=BG_MID, highlightbackground=GLASS_BORDER, highlightthickness=1, padx=16, pady=16)
dock.pack(pady=40)

apps = [
    ('💻', 'Terminal', 'lxterminal'),
    ('📁', 'Files', 'pcmanfm'),
    ('📝', 'Editor', 'mousepad'),
    ('🔢', 'Calc', 'galculator'),
]

for emoji, name, cmd in apps:
    btn_frame = tk.Frame(dock, bg=BG_MID)
    btn_frame.pack(side='left', padx=12)
    
    # Square button with emoji
    btn = tk.Button(btn_frame, text=emoji, font=('sans', 28), width=3, height=1,
                    fg=TEXT_PRIMARY, bg=BG_MID, activebackground='#2a1040',
                    relief='flat', cursor='hand2', bd=0,
                    highlightbackground=GLASS_BORDER, highlightthickness=1,
                    command=lambda c=cmd: launch(c))
    btn.pack()
    
    # Label below
    tk.Label(btn_frame, text=name, font=('SF Pro Display', 10), fg=TEXT_SECONDARY, bg=BG_MID).pack(pady=(4,0))

# Status bar at bottom
status = tk.Frame(root, bg=BG_BASE)
status.pack(side='bottom', fill='x', pady=20)
tk.Label(status, text='KuroGlass Environment', font=('SF Pro Display', 10), fg=TEXT_SECONDARY, bg=BG_BASE).pack()

root.mainloop()
