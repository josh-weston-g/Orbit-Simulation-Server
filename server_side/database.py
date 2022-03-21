import sqlite3

conn = sqlite3.connect("Orbit-Simulation-Server\server_side\planets&moons.db")

c = conn.cursor()

c.execute("SELECT * FROM moons WHERE moonName='Io'")
print(c.fetchall())

conn.commit()
conn.close()