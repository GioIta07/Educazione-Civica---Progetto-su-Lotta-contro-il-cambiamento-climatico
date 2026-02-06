import tkinter as tk
import random
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from flask import Flask, request, jsonify
import time

# === STATO ===
anno = 1
MAX_ANNI = 100
energia = 100
economia = 100
inquinamento = 50
temperatura = 1.0
LOL = random.randint(1, 40)
LOL2 = random.randint(0, 40)
sviluppo = 1
effetti_nucleare = 0   # 0 = nessun effetto in sospeso

anno_time = 30          # secondi per decidere
start_time = time.time()

anni = []
storico_temp = []
storico_inq = []

# === FUNZIONI DI TESTO ===
def aggiorna_testo(messaggio_evento=""):
    testo.set(
        f"Anno: {anno}\n"
        f"Energia: {energia}\n"
        f"Economia: {economia}\n"
        f"Inquinamento: {inquinamento}\n"
        f"Temperatura: {temperatura:.2f} °C"
        f"{messaggio_evento}"
    )

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

# === GRAFICI ===
def aggiorna_grafici():
    ax.clear()
    ax.plot(anni, storico_temp, label="Temperatura (°C)")
    ax.plot(anni, storico_inq, label="Inquinamento")
    ax.axhline(1.5, linestyle="--", label="Limite 1.5°C")
    ax.axhline(2.0, linestyle=":", label="Limite 2°C")
    ax.set_xlabel("Anno")
    ax.legend()
    canvas.draw()

# === FINE GIOCO ===
def fine_gioco(msg):
    testo.set(msg)
    for b in pulsanti:
        b.config(state="disabled")

# === SCELTA GIOCATORE ===
def scelta(tipo):
    global anno, energia, economia, inquinamento, temperatura, sviluppo, start_time,effetti_nucleare

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
        effetti_nucleare+= 1
    aggiorna_testo("\n ricorda di cliccare 2 volte per farlo funzionare")

    # Possibile incidente immediato
    if random.random() < 0.01:
        economia -= 40
        inquinamento += 40
        aggiorna_testo("\n☢️ INCIDENTE NUCLEARE!")
        return


    if inquinamento < 0:
        inquinamento = 0
    if effetti_nucleare==2:
        energia += 30
        economia += 5
        inquinamento += 5
        effetti_nucleare=0

    temperatura += inquinamento * 0.005
    sviluppo += 1

    evento = evento_climatico()

    anni.append(anno)
    storico_temp.append(temperatura)
    storico_inq.append(inquinamento)

    anno += 1
    aggiorna_grafici()

    # reset timer dopo una scelta
    start_time = time.time()

    if temperatura >= 10:
        fine_gioco("🔥 COLLASSO CLIMATICO\nLa città non è più abitabile.")
    elif anno > MAX_ANNI:
        fine_gioco("🏆 SIMULAZIONE COMPLETATA")
    elif economia < 0:
        fine_gioco("NON HAI PIÙ UN'ECONOMIA")
    else:
        aggiorna_testo(evento)

# === TIMER INATTIVITÀ ===
def aggiorna_timer():
    global start_time, economia, anno

    # se il gioco è finito, non continuare
    if pulsanti and pulsanti[0]["state"] == "disabled":
        return

    tempo_passato = time.time() - start_time
    rimanente = int(anno_time - tempo_passato)

    if rimanente <= 0:
        # penalità per inattività
        economia -= 10

        # avanza l'anno senza scelta
        anni.append(anno)
        storico_temp.append(temperatura)
        storico_inq.append(inquinamento)
        aggiorna_grafici()
        anno += 1
        start_time = time.time()  # reset timer

        if economia < 0:
            fine_gioco("NON HAI PIÙ UN'ECONOMIA")
            return
        if anno > MAX_ANNI:
            fine_gioco("🏆 SIMULAZIONE COMPLETATA")
            return

        aggiorna_testo("\n⚠️ Hai perso tempo! Economia -10")
    else:
        # aggiorna il testo includendo il timer
        testo.set(
            f"Anno: {anno}\n"
            f"Energia: {energia}\n"
            f"Economia: {economia}\n"
            f"Inquinamento: {inquinamento}\n"
            f"Temperatura: {temperatura:.2f} °C\n"
            f"⏳ Tempo rimanente: {rimanente}s"
        )

    root.after(1000, aggiorna_timer)

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
]:
    b = tk.Button(frame_sx, text=nome, width=18,
                command=lambda t=tipo: scelta(t))
    b.pack(pady=2)
    pulsanti.append(b)

fig, ax = plt.subplots(figsize=(5, 3))
canvas = FigureCanvasTkAgg(fig, master=frame_dx)
canvas.get_tk_widget().pack()

# avvia il timer
aggiorna_timer()

root.mainloop()
