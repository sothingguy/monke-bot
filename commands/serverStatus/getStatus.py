import requests
from bs4 import BeautifulSoup
from datetime import datetime
import schedule
import time
import json

def getUrl(file): # opens the json file to get the urls from and output to
    f = open(file,)
    data = json.load(f)
    f.close()
    return data # returns the files data

def getElement(url):
    try: # try to get url and eror if there was one
        response = requests.get(url) # the url for the server
    except:
        return "error" # return "error" to tell rest of program there was an error
    html = response.text
    soup = BeautifulSoup(html, 'lxml') #makes readable

    element = soup.find_all('dt') # finds all <dd> tags
    for x in range(len(element)):
        text = str(element[x])
        if (text == '<dt>Player count</dt>'):
            element = soup.find_all('dd')
            element = str(element[x])
            return element

def findNumbers(element):
    # setting up json
    current = "0"
    total = "0"
    queue = "0"
    time = "null"
    if (len(element) > 50):
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

def output(numbers, error, out):
    out['error'] = error
    out['data'] = numbers # set the output numbers in json

    now = datetime.now() # get date and time
    current_time = now.strftime("%H:%M") # take just time section
    out['time'] = current_time # set current date and time in json
    print(error, numbers, current_time, out['url'], out['id'])

def main(): # main function

    jsonFile = 'commands/serverStatus/rustStatus.json' # set what file the json data is in
    data = getUrl(jsonFile) # gets json file

    for servers in range(len(data)):
        error = False # sets there to have eben no error yet
        server = data[servers] # gets specific server from the list of servers
        url = server['url'] # gets urls
        element = getElement(url) # gets element from url
        if (element == "error"): # detect if there is an error in getting the url
            error = True # sets error to true and numbers to 0
            numbers = [0,0,0]
        else:
            numbers = findNumbers(element)
        output(numbers, error, server) # outputs int to data to be put into json file
    
    with open(jsonFile, 'w') as outfile: # writes to json file
        json.dump(data, outfile)
    
    jsonFile = 'commands/serverStatus/minecraftStatus.json' # set what file the json data is in
    data = getUrl(jsonFile) # gets json file

    for servers in range(len(data)):
        error = False # sets there to have eben no error yet
        server = data[servers] # gets specific server from the list of servers
        url = server['url'] # gets urls
        element = getElement(url) # gets element from url
        if (element == "error"): # detect if there is an error in getting the url
            error = True # sets error to true and numbers to 0
            numbers = [0,0,0]
        else:
            numbers = findNumbers(element)
        output(numbers, error, server) # outputs int to data to be put into json file
    
    with open(jsonFile, 'w') as outfile: # writes to json file
        json.dump(data, outfile)

if __name__ == '__main__': # run commands
    main()
    schedule.every(2).minutes.do(main) # shedual to run every 2 mins
    while 1: # sleep while the sheduel waits
        schedule.run_pending()
        time.sleep(1)