# google_parser.py
# import requests
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import os
import re

# chromedriver : /Users/sewon/Downloads/chromedriver
# phantomJS	   : /Users/sewon/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs

# chrome case
driver = webdriver.Chrome('/Users/sewon/Downloads/chromedriver')
# phantomJS case
# driver = webdriver.PhantomJS('/Users/sewon/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs')

url = 'https://www.google.com/search?tbm=bks&q=' + '+' + 'Computer' + '+' + 'systems'
driver.get(url)
html = driver.page_source
soup = bs(html, 'html.parser')

images = soup.select('img.rISBZc')
isbns = soup.select('#rso > div > div > div > div > div > div.r > a > div > cite')

fo = open ('result.html', 'w+', 1)

for index in range(len(isbns)):
	if images[index]['src'] == '/googlebooks/images/no_cover_thumb.gif':
		images[index]['src'] = 'file:///Users/sewon/Study/SWPP/swpp18-team7/test/no_image.png'
	
	print(isbns[index].text)
	isbn_match = re.search(r'isbn=([0-9X]{10,13})', isbns[index].text)
	if not isbn_match:
		print("no match")
	isbn = isbn_match.group(1)

	tag = '<img src=' + images[index]['src'] + ' style=\'height: 10%; width: 10%;\' onclick=\'alert(' + isbn + ')\'/><br/>'
	fo.write(tag + '\n')

fo.close()
driver.get('file:///Users/sewon/Study/SWPP/swpp18-team7/test/result.html')

