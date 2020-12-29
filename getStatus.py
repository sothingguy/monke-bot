import requests
from bs4 import BeautifulSoup
from datetime import datetime
import schedule
import time

def getStatus():
    # setting up json
    current = 0
    total = 0
    queue = 0
    time = "null"

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
                current = players[:x] # current players
                players = players[x:]
                break

        players = players[17:]

        for x in range(len(players)):
            if (players[x] == "<"):
                total = players[:x] # total players
                players = players[x:]
                break

        players = players[39:]

        for x in range(len(players)):
            if (players[x] == "<"):
                queue = players[:x] # players in the queue
                players = players[x:]
                break
    else:
        players = players[4:]
        for x in range(len(players)):
            if (players[x] == "/"):
                current = players[:x] # players in the queue
                players = players[x:]
                break
        
        players = players[1:]
        for x in range(len(players)):
            if (players[x] == "<"):
                total = players[:x] # players in the queue
                players = players[x:]
                break

    now = datetime.now()

    current_time = now.strftime("%H:%M:%S")

    file = open('commands/rustStatus.txt', 'w')
    file.write(str("Currently there are " + current + "/" + total + " people playing with " + queue + " people waiting in the queue. This was at " + current_time))
    file.close()

schedule.every(2).minutes.do(getStatus)

while 1:
    schedule.run_pending()
    time.sleep(1)