import webview, os
script_dir = os.path.dirname(os.path.abspath(__file__))
webview.create_window("Introduzione", os.path.join(script_dir, "index.html"))
webview.start()