import tkinter as tk
import random
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from flask import Flask, request, jsonify
import tkinter as tk

# === STATO ===
anno = 1
MAX_ANNI = 100
energia = 100
economia = 100
inquinamento = 50
temperatura = 1.0
LOL = random.randint(1, 40)
LOL2 = random.randint(0, 40)
sviluppo= 1
TEMPO_MAX = 10  # secondi
tempo_rimasto = TEMPO_MAX
timer_id = None
#
#
#
anni = []
storico_temp = []
storico_inq = []

# === EVENTI CLIMATICI ===
def evento_climatico():
    global energia, economia, inquinamento
    eventi = []
    
    if temperatura > 1.5 and LOL == 10:
        eventi.append(("🔥 Ondata di calore", -10, -15, +5))
    if temperatura > 2.0 and LOL == 20:
        eventi.append(("🌾 Siccità", -20, -25, +10))
    if inquinamento > 80 and LOL == 30:
        eventi.append(("🌊 Alluvione", -15, -30, +5))
    if temperatura > 2.5 and LOL == 40:
        eventi.append(("❄️ Tempesta estrema", -25, -20, +5))

    
    

    if not eventi:
        return ""

    if random.random() < 0.4:  # probabilità evento
        nome, e_energia, e_economia, e_inq = random.choice(eventi)
        energia += e_energia
        economia += e_economia
        inquinamento += e_inq
        return f"\n⚠️ EVENTO CLIMATICO:\n{nome}"

    return ""

def evento_rand():
    global energia, economia, inquinamento
    eventirand = []
    
    

    if not eventirand:
        return ""
# === FUNZIONI ===
def aggiorna_testo(messaggio_evento=""):
    testo.set(
        f"Anno: {anno}\n"
        f"Energia: {energia}\n"
        f"Economia: {economia}\n"
        f"Inquinamento: {inquinamento}\n"
        f"Temperatura: {temperatura:.2f} °C"
        f"{messaggio_evento}"
    )

def aggiorna_grafici():
    ax.clear()
    ax.plot(anni, storico_temp, label="Temperatura (°C)")
    ax.plot(anni, storico_inq, label="Inquinamento")
    ax.axhline(1.5, linestyle="--", label="Limite 1.5°C")
    ax.axhline(2.0, linestyle=":", label="Limite 2°C")
    ax.set_xlabel("Anno")
    ax.legend()
    canvas.draw()

def fine_gioco(msg):
    testo.set(msg)
    for b in pulsanti:
        b.config(state="disabled")

def scelta(tipo):
    global anno, energia, economia, inquinamento, temperatura,sviluppo,tempo_rimasto, timer_id
    # === Aggiungere Incidenti o eventi randomici ===
    
    
    if tipo == "carbone":
        energia += 30
        economia += 20
        inquinamento += 25

    elif tipo == "rinnovabili":
        energia += 15
        economia -= 5
        inquinamento -= 20

    elif tipo == "efficienza":
        
        energia += 0
        economia += 10
        inquinamento -= 1
        
    elif tipo == "nucleare":
        energia += 30
        economia += 5
        inquinamento += 5
        if random.random() < 0.01:
            economia -= 40
            inquinamento += 40
            aggiorna_testo("\n☢️ INCIDENTE NUCLEARE!")
            return

    if inquinamento < 0:
        inquinamento = 0
        
        temperatura += inquinamento * 0.005
        sviluppo+= 1
        



    evento = evento_climatico()

    anni.append(anno)
    storico_temp.append(temperatura)
    storico_inq.append(inquinamento)

    anno += 1
    aggiorna_grafici()

    if temperatura >= 10:
        fine_gioco("🔥 COLLASSO CLIMATICO\nLa città non è più abitabile.")
    elif anno > MAX_ANNI:
        fine_gioco("🏆 SIMULAZIONE COMPLETATA")
    elif  economia < 0 :
        fine_gioco("NON HAI PIU UN ECONOMIA")
    else:
        aggiorna_testo(evento)

# === FINESTRA ===
root = tk.Tk()
root.title("EcoCity – Eventi Climatici")
root.geometry("750x420")

frame_sx = tk.Frame(root)
frame_sx.pack(side=tk.LEFT, padx=10)

frame_dx = tk.Frame(root)
frame_dx.pack(side=tk.RIGHT)

testo = tk.StringVar()
aggiorna_testo()

label = tk.Label(frame_sx, textvariable=testo, font=("Arial", 11), justify="left")
label.pack(pady=10)

pulsanti = []

for nome, tipo in [
    ("Carbone", "carbone"),
    ("Rinnovabili", "rinnovabili"),
    ("Efficienza", "efficienza"),
    ("Nucleare", "nucleare"),
    ("FastFoward","fastfoward")
]:
    b = tk.Button(frame_sx, text=nome, width=18,
                  command=lambda t=tipo: scelta(t))
    b.pack(pady=2)
    pulsanti.append(b)

fig, ax = plt.subplots(figsize=(5, 3))
canvas = FigureCanvasTkAgg(fig, master=frame_dx)
canvas.get_tk_widget().pack()

root.mainloop()
