from flask import Flask, url_for, render_template, request, redirect

app = Flask(
    __name__,
    static_url_path="",
    static_folder="static"
)

@app.route("/")
def main():
    return render_template('index.html')
if __name__ == "__main__":
    app.run(debug=True)