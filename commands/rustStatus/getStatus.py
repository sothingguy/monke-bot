import requests
from bs4 import BeautifulSoup
from datetime import datetime
import schedule
import time

def getElement(url):
    response = requests.get(url) # the url for the server
    html = response.text
    soup = BeautifulSoup(html, 'lxml') #makes readable

    element = soup.find_all('dd') # finds all <dd> tags
    element = str(element[1]) # gets the one with the amount of element
    
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

def output(data):
    now = datetime.now() # get date and time

    current_time = now.strftime("%H:%M") # take just time section

    print("Currently there are " + data[0] + "/" + data[1] + " people playing with " + data[2] + " people waiting in the queue. This was at " + current_time) # print out for testing/log
    
    file = open('commands/rustStatus/rustStatus.txt', 'w') #open text file to output to
    file.write(str("Currently there are " + data[0] + "/" + data[1] + " people playing with " + data[2] + " people waiting in the queue. This was at " + current_time)) #write to file
    file.close() # close file

def main(): # main function
    url = 'https://www.battlemetrics.com/servers/rust/1830848' # run at the start of script for testing
    element = getElement(url)
    data = findNumbers(element)
    output(data)

if __name__ == '__main__': # run commands
    main()

    schedule.every(2).minutes.do(main) # shedual to run every 2 mins

    while 1: # sleep while the sheduel waits
        schedule.run_pending()
        time.sleep(1)