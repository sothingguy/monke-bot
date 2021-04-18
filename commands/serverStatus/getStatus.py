import requests
from bs4 import BeautifulSoup
import sys

def getElement(url):
    try: # try to get url and eror if there was one
        response = requests.get(url) # the url for the server
    except:
        return "error" # return "error" to tell rest of program there was an error
    html = response.text
    soup = BeautifulSoup(html, 'lxml') #makes readable

    name = soup.find("h2").get_text() # gets the name of the server
    try:
        long = True
        while long: # shortens any spaces that end up coming after the name of the server
            name = name[:len(name)-1]
            if (name[len(name)-1] == "C"):
                name = name[:len(name)-2]
                long = False
    except:
        name = soup.find("h2").get_text()

    element = soup.find_all('dt') # finds all <dd> tags
    for x in range(len(element)):
        text = str(element[x])
        if (text == '<dt>Player count</dt>'):
            element = soup.find_all('dd')
            element = str(element[x])
            return element, name

def findNumbers(element):
    # setting up json
    current = "0"
    total = "0"
    queue = "0"
    time = "null"
    if (len(element) > 50): # tells if there is a queue or not
        #sorts to find the specific numbers
        element = element[10:]

        for x in range(len(element)):
            if (element[x] == "<"):
                current = element[:x] # current players
                element = element[x:]
                break

        element = element[17:]

        for x in range(len(element)):
            if (element[x] == "<"):
                total = element[:x] # total players
                element = element[x:]
                break

        element = element[39:]

        for x in range(len(element)):
            if (element[x] == "<"):
                queue = element[:x] # players in the queue
                element = element[x:]
                break
    else:
        element = element[4:]
        for x in range(len(element)):
            if (element[x] == "/"):
                current = element[:x] # players in the queue
                element = element[x:]
                break
        
        element = element[1:]
        for x in range(len(element)):
            if (element[x] == "<"):
                total = element[:x] # players in the queue
                element = element[x:]
                break
    
    data = [current, total, queue]

    return data

def main(url): # main function
    element = getElement(url)
    if element[0] == "e":
        return "There was an error while getting the player count, maybe the url is dead, cheeck with ~*game*target"
    numbers = findNumbers(element[0])
    return element[1] + ": " + numbers[0] + "/" + numbers[1] + " (" + numbers[2] + ")"

if __name__ == '__main__': # run commands
    output = main(sys.argv[1])
    #output = main("https://www.battlemetrics.com/servers/minecraft/5873087") #minecraft
    #output = main("https://www.battlemetrics.com/servers/rust/6324892") #rust
    print(output)