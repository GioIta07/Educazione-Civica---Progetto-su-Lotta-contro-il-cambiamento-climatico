import webview, os
script_dir = os.path.dirname(os.path.abspath(__file__))
webview.create_window("Gioco", os.path.join(script_dir, "prova.html"))
webview.start()