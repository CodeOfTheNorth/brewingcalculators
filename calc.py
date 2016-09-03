from flask import Flask, request, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("input.html")

@app.route('/', methods=['POST'])
def output():
    text = request.form['text']
    return text

app.run(debug=True, port=80, host="0.0.0.0")
