from selenium import webdriver
from bs4 import BeautifulSoup as bs
import os
import re
from multiprocessing import Pool

class Crawler:

	# It will be added more.
	target_list = ['aladin', 'kyobo']

	# Initialize options, driver and pool
	def __init__(self):
		self.options = webdriver.ChromeOptions()
		self.options.add_argument('headless')
		self.options.add_argument('window-size=1920x1080')
		self.options.add_argument("disable-gpu")

		self.driver = webdriver.Chrome('/Users/sewon/Downloads/chromedriver', chrome_options=options)
		self.pool = Pool(processes=8)

	# get images and urls using corresponding html
	def get_links(self, html):
	
		soup = bs(html, 'html.parser')

		images = soup.select('#container > div > form > table > tbody > tr > td.image > div.cover > a > img')
		isbns = soup.select('#container > div > form > table > tbody > tr > td.detail > div.title > a')

		data = []
		for index in range(len(isbns)):
			datum = {}
			datum['src'] = images[index]['src']
			datum['href'] = isbns[index]['href']
			data.append(datum)

		return data

	# process the no images and extract isbn from url.
	# processed data will be written in file.
	def get_candidate_content(self, link):

		if link['src'] =='http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif':
			link['src'] = 'file:///Users/sewon/Study/SWPP/swpp18-team7/backend/crawler/no_image.png'

		isbn_match = re.search(r'barcode=([0-9X]{10,13})', link['href'])
		if not isbn_match:
			return

		isbn = isbn_match.group(1)

		tag = '<img src=' + link['src'] + ' style=\'height: 10%; width: 10%;\'/><button onclick=\"alert(\'isbn : ' + isbn + '\')\"></button><br/>'
		self.fo.write(tag + '\n')

	# def get_html(self, target, title):
	# 	# 

	# def get_data(self, isbn):
	# 	# It will crawl the usedbook list using isbn.

	# get candidate list using book's title.
	def get_candidate_list(self, title):

		self.driver.get('http://www.kyobobook.co.kr/search/SearchCommonMain.jsp')
		self.driver.find_element_by_name('searchKeyword').send_keys(title)
		self.driver.find_element_by_xpath('//*[@id="searchTop"]/div[1]/div/input').click()

		html = self.driver.page_source
		soup = bs(html, 'html.parser')

		self.fo = open ('crawledData3.html', 'w+', 1)

		self.pool.map(get_candidate_content, get_links(soup))

		self.fo.close()
		self.driver.quit()