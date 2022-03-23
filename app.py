from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text



app = Flask(__name__)

# Main page
@app.route("/")
def home():
    return render_template("index.html")


# Connecting to the database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///planets_moons.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# Initialise database
db = SQLAlchemy(app)

class Planets(db.Model):
    __tablename__ = "planets"
    planetName = db.Column(db.Text, primary_key=True)
    orbitRadius = db.Column(db.Float)
    diameter = db.Column(db.Float)
    bodyType = db.Column(db.Text)
    colour = db.Column(db.Text)

class Moons(db.Model):
    __tablename__ = "moons"
    moonName = db.Column(db.Text, primary_key=True)
    orbitRadius = db.Column(db.Float)
    diameter = db.Column(db.Float)
    bodyType = db.Column(db.Text)
    orbits = db.Column(db.Text, db.ForeignKey("Planets.planetName"))

@app.route("/planets_moons")
def planets_moons():
        planets = Planets.query.all()
        planet_text = "<h1>Planet Data</h1><ul>"
        for planet in planets:
            planet_text += "<li> {}, {}, {}, {}</li>".format(planet.planetName, planet.orbitRadius, planet.diameter, planet.bodyType)
        planet_text += "</ul>"
        return planet_text



if __name__ == "__main__":
    app.run(debug=True, port=8080)