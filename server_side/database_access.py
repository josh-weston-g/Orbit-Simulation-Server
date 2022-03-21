import sqlite3

conn = sqlite3.connect("Orbit-Simulation-Server\server_side\planets&moons.db")

c = conn.cursor()

#c.execute("SELECT * FROM moons WHERE moonName='Io'")

def closeDatabase():
    conn.close()

def getPlanets():
    c.execute("SELECT planetName FROM planets")
    return c.fetchall()

def getPlanetProperties(planet):
    c.execute("SELECT orbitRadius, diameter, bodyType FROM planets WHERE planetName='{}'".format(planet))
    return c.fetchall()

def getMoons():
    c.execute("SELECT moonName, orbits FROM moons")
    return c.fetchall()

def getPlanetMoons(planet):
    c.execute("SELECT moonName FROM moons WHERE orbits='{}'".format(planet))
    return c.fetchall()

def getMoonProperties(moon):
    c.execute("SELECT orbitRadius, diameter FROM moons WHERE moonName='{}'".format(moon))
    return c.fetchall()

end = False

while end == False:
    user = input("""Pick a function:
    Get all planets in Solar System (get planets)
    Get properties of an individual planet (get planet properties)
    Get all moons in Solar System and their planet (get moons)
    Get all moons for a specific planet (get planet moons)
    Get properties of an individual moon (get moon properties)
    End program (end)
    """)

    if user == "get planets":
        print(getPlanets())
    elif user == "get planet properties":
        planet = input("Select planet: ")
        print(getPlanetProperties(planet.capitalize()))
    elif user == "get moons":
        print(getMoons())
    elif user == "get planet moons":
        planet = input("Select planet: ")
        print(getPlanetMoons(planet.capitalize()))
    elif user == "get moon properties":
        moon = input("Select moon: ")
        print(getMoonProperties(moon.capitalize()))
    elif user == "end":
        closeDatabase()
        end = True
    else:
        print("Invalid input")
    