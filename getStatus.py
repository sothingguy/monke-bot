import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json

# setting up json
data = {}
data["current"] = "0"
data["total"] = "0"
data["queue"] = "0"

response = requests.get('https://www.battlemetrics.com/servers/rust/1830848') # the url for the server
html = response.text
soup = BeautifulSoup(html, 'lxml') #makes readable

players = soup.find_all('dd') # finds all <dd> tags
players = str(players[1]) # gets the one with the amount of players


if (len(players) > 50):
    #sorts to find the specific numbers
    players = players[10:]

    for x in range(len(players)):
        if (players[x] == "<"):
            data["current"] = players[:x] # current players
            players = players[x:]
            break

    players = players[17:]

    for x in range(len(players)):
        if (players[x] == "<"):
            data["total"] = players[:x] # total players
            players = players[x:]
            break

    players = players[39:]

    for x in range(len(players)):
        if (players[x] == "<"):
            data["queue"] = players[:x] # players in the queue
            players = players[x:]
            break
else:
    players = players[4:]
    for x in range(len(players)):
        if (players[x] == "/"):
            data["current"] = players[:x] # players in the queue
            players = players[x:]
            break
    
    players = players[1:]
    for x in range(len(players)):
        if (players[x] == "<"):
            data["total"] = players[:x] # players in the queue
            players = players[x:]
            break

now = datetime.now()

current_time = now.strftime("%H:%M:%S")

print("current", data["current"], "total", data["total"], "queue", data["queue"], "Last cheecked at:", current_time)

with open('commands/rustStatus.json', 'w') as outfile:
    json.dump(data, outfile)