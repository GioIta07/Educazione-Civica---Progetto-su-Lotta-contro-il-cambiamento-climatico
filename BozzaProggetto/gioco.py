import webview

def apri_gioco():
    webview.create_window("Gioco", "gioco.html")
    webview.windows[0].destroy()

class Api:
    def start_game(self):
        apri_gioco()

api = Api()

webview.create_window("Intro", "storia.html", js_api=api)
webview.start()