import requests
from bs4 import BeautifulSoup

def main():
    try:
        r = requests.get("https://randommer.io/random-songs")
    except:
        return "error"
    html = r.text
    soup = BeautifulSoup(html, 'lxml')

    soup = soup.find_all("a", {"rel": "noopener nofollow"})[0]["href"]
    return soup

if __name__ == '__main__':
    print(main())