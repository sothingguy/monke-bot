import requests
from bs4 import BeautifulSoup
url = "https://petittube.com/" # url to target
response = requests.get(url) # the url for the server
html = response.text
soup = BeautifulSoup(html, 'lxml') #makes readable

element = soup.find_all('iframe') # gets the html element
element = element[0] # gets the first iframe
element = element['src'] # gets the url

# shrotens to just video code
element = element[30:][:11]


# raw youtube video code
print('https://www.youtube.com/watch?v=' + element)