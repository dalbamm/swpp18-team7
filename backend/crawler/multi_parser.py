# kyobo_parser.py
# import requests
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import os
import re
import time
from multiprocessing import Pool

# chromedriver : /Users/sewon/Downloads/chromedriver
# phantomJS	   : /Users/sewon/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs

def get_links(soup):
	
	images = soup.select('#container > div > form > table > tbody > tr > td.image > div.cover > a > img')
	isbns = soup.select('#container > div > form > table > tbody > tr > td.detail > div.title > a')

	data = []
	for index in range(len(isbns)):
		datum = {}
		datum['src'] = images[index]['src']
		datum['href'] = isbns[index]['href']
		data.append(datum)
	return data

def get_content(link):
	if link['src'] =='http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif':
		link['src'] = 'file:///Users/sewon/Study/SWPP/swpp18-team7/backend/crawler/no_image.png'

	isbn_match = re.search(r'barcode=([0-9X]{10,13})', link['href'])
	if not isbn_match:
		return

	print(link['href'])
	isbn = isbn_match.group(1)

	tag = '<img src=' + link['src'] + ' style=\'height: 10%; width: 10%;\'/><button onclick=\"alert(\'isbn : ' + isbn + '\')\"></button><br/>'
	fo.write(tag + '\n')

if __name__=='__main__':

	title = 'Computer Systems'

	options = webdriver.ChromeOptions()
	options.add_argument('headless')
	options.add_argument('window-size=1920x1080')
	options.add_argument("disable-gpu")

	# chrome case
	driver = webdriver.Chrome('/Users/sewon/Downloads/chromedriver', chrome_options=options)
	# phantomJS case
	# driver = webdriver.PhantomJS('/Users/sewon/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs')

	driver.get('http://www.kyobobook.co.kr/search/SearchCommonMain.jsp')
	driver.find_element_by_name('searchKeyword').send_keys(title)
	driver.find_element_by_xpath('//*[@id="searchTop"]/div[1]/div/input').click()

	html = driver.page_source
	soup = bs(html, 'html.parser')
	driver.get_screenshot_as_file('screen_shot.png')

	fo = open ('crawledData3.html', 'w+', 1)

	pool = Pool(processes=8)
	pool.map(get_content, get_links(soup))
	# for index in range(len(isbns)):
	# 	if images[index]['src'] == 'http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif':
	# 		images[index]['src'] = 'file:///Users/sewon/Study/SWPP/swpp18-team7/backend/crawler/no_image.png'

	# 	isbn_match = re.search(r'barcode=([0-9X]{10,13})', isbns[index]['href'])
	# 	if not isbn_match:
	# 		break
			
	# 	print(isbns[index]['href'])
	# 	isbn = isbn_match.group(1)

	# 	tag = '<img src=' + link[0] + ' style=\'height: 10%; width: 10%;\'/><button onclick=\'alert(' + isbn + ')\'></button><br/>'
	# 	fo.write(tag + '\n')

	fo.close()
	driver.quit()