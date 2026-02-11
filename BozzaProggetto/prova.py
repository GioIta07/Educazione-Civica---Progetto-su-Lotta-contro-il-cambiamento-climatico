import webview, os
webview.create_window("Gioco", os.path.abspath("index.html"))
webview.start()