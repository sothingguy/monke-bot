import requests
from bs4 import BeautifulSoup
from datetime import datetime
import schedule
import time

def getUrl(): #gets the specific url for the server to get the status off
    f = open("commands/rustStatus/url.txt")
    url = str(f.read()) #reads url file
    f.close() # close file
    return url

def getElement(url):
    try: # try to get url and eror if there was one
        response = requests.get(url) # the url for the server
    except:
        return "error" # return "error" to tell rest of program there was an error
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

def output(data, error = False):
    f = open('commands/rustStatus/rustStatus.txt', 'w') #open text file to output to
    
    now = datetime.now() # get date and time
    current_time = now.strftime("%H:%M") # take just time section
    
    if (error): # if there was an error trying to get the url
        print(data + current_time)
        f.write(data + current_time) #write to file
    else:
        f = open('commands/rustStatus/rustStatus.txt', 'w') #open text file to output to

        print("Currently there are " + data[0] + "/" + data[1] + " people playing with " + data[2] + " people waiting in the queue. This was at " + current_time) # print out for testing/log
        
        f.write(str("Currently there are " + data[0] + "/" + data[1] + " people playing with " + data[2] + " people waiting in the queue. This was at " + current_time)) #write to file
    f.close() # close file

def main(): # main function
    url = getUrl() # run at the start of script for testing
    element = getElement(url)
    if (element == "error"): # detect if there is an error in getting the url
        output(url + " is not a valid url ", error = True) # sends error message to be displayed if there was an error
        return
    data = findNumbers(element)
    output(data)

if __name__ == '__main__': # run commands
    main()

    schedule.every(2).minutes.do(main) # shedual to run every 2 mins

    while 1: # sleep while the sheduel waits
        schedule.run_pending()
        time.sleep(1)