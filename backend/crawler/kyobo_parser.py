# kyobo_parser.py
# import requests
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import os
import re

# chromedriver : /Users/sewon/Downloads/chromedriver
# phantomJS	   : /Users/sewon/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs

options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('window-size=1920x1080')
options.add_argument("disable-gpu")

# chrome case
driver = webdriver.Chrome('/Users/sewon/Downloads/chromedriver', chrome_options=options)
# phantomJS case
# driver = webdriver.PhantomJS('/Users/sewon/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs')

driver.get('http://www.kyobobook.co.kr/search/SearchCommonMain.jsp')
driver.find_element_by_name('searchKeyword').send_keys('Computer Systems')
driver.find_element_by_xpath('//*[@id="searchTop"]/div[1]/div/input').click()
driver.get_screenshot_as_file('screen_shot.png')

html = driver.page_source
soup = bs(html, 'html.parser')

images = soup.select('#container > div > form > table > tbody > tr > td.image > div.cover > a > img')
isbns = soup.select('#container > div > form > table > tbody > tr > td.detail > div.title > a')

fo = open ('crawledData.html', 'w+', 1)

for index in range(len(isbns)):
	if images[index]['src'] == 'http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif':
		images[index]['src'] = 'file:///Users/sewon/Study/SWPP/swpp18-team7/test/no_image.png'

	isbn_match = re.search(r'barcode=([0-9X]{10,13})', isbns[index]['href'])
	if not isbn_match:
		break
		
	print(isbns[index]['href'])
	isbn = isbn_match.group(1)

	tag = '<img src=' + images[index]['src'] + ' style=\'height: 10%; width: 10%;\'/><button onclick=\'alert(' + isbn + ')\'></button><br/>'
	fo.write(tag + '\n')

fo.close()
driver.quit()
# driver.get(url)
# html = driver.page_source
# soup = bs(html, 'html.parser')

# images = soup.select('img.rISBZc')
# isbns = soup.select('#rso > div > div > div > div > div > div.r > a > div > cite')

# fo = open ('result.html', 'w+', 1)

# for index in range(len(isbns)):
# 	if images[index]['src'] == '/googlebooks/images/no_cover_thumb.gif':
# 		images[index]['src'] = 'file:///Users/sewon/Study/SWPP/swpp18-team7/test/no_image.png'
	
# 	print(isbns[index].text)
# 	isbn_match = re.search(r'isbn=([0-9X]{10,13})', isbns[index].text)
# 	if not isbn_match:
# 		print("no match")
# 	isbn = isbn_match.group(1)

# 	tag = '<img src=' + images[index]['src'] + ' style=\'height: 10%; width: 10%;\' onclick=\'alert(' + isbn + ')\'/><br/>'
# 	fo.write(tag + '\n')

# fo.close()
# driver.get('file:///Users/sewon/Study/SWPP/swpp18-team7/test/result.html')

# import requests

# req = requests.get('http://www.kyobobook.co.kr/search/SearchCommonMain.jsp')
# print(req.status_code)
# print(req.text)