from flask import Flask, render_template
import external_script

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/run-game")
def run_game():
    result = external_script.run_game()
    return result

if __name__ == "__main__":
    app.run(debug=True)
