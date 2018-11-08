from selenium import webdriver
from bs4 import BeautifulSoup as bs
import re
# import os
# from multiprocessing import Pool

class Crawler:

	# It will be added more.
	target_list = ['aladin', 'kyobo']

	# Initialize options, driver and pool
	def __init__(self):
		# driver configurations
		self.options = webdriver.ChromeOptions()
		self.options.add_argument('headless')
		self.options.add_argument('window-size=1920x1080')
		self.options.add_argument("disable-gpu")	

		# self.driver = webdriver.Chrome('/Users/sewon/Downloads/chromedriver', chrome_options=self.options)
		# self.pool = Pool(processes=8)
		# multi processing is implemented later.

	# open the chrome driver
	def open_driver(self):
		self.driver = webdriver.Chrome('/Users/sewon/Downloads/chromedriver', chrome_options=self.options)

	# close the chrome driver
	def close_driver(self):
		self.driver.quit()

	# extract isbn from url using regular expression.
	def get_isbn(self, url):
		isbn_match = re.search(r'barcode=([0-9X]{10,13})', url)
		if not isbn_match:
			return None
		return isbn_match.group(1)

	# parse the title to format of kyobo
	def parse_title(self, title):
		return '%20'.join(title.split())

	# get candidate list using book's title.
	def get_candidate_list(self, title):

		# get the kyobo site and search the book using title.
		title = self.parse_title(title)
		search_url = 'http://www.kyobobook.co.kr/search/SearchCommonMain.jsp?vPstrCategory=TOT&vPstrKeyWord=' + title + '&vPplace=top'
		self.driver.get(search_url)

		# get the page's html and quit the brower.
		html = self.driver.page_source
		# self.driver.quit()

		# get the beautiful soup object and parse the html
		soup = bs(html, 'html.parser')

		# get the soup objects that contain the data about images and isbns
		images = soup.select('#container > div > form > table > tbody > tr > td.image > div.cover > a > img')
		isbns = soup.select('#container > div > form > table > tbody > tr > td.detail > div.title > a')

		# make dictionary list
		data = []
		for index in range(len(isbns)):
			datum = {}
			if images[index]['src'] == 'http://image.kyobobook.co.kr/newimages/apps/b2c/product/Noimage_l.gif':
				datum['image'] = './no_image.png'
			else:
				datum['image'] = images[index]['src']

			isbn = self.get_isbn(isbns[index]['href'])
			if isbn is None:
				break
			datum['isbn'] = isbn
			data.append(datum)

		return data

	# crawl data from some sites using isbn
	def get_usedbook_data(self, isbn):

		data = []

		# kyobo case
		search_url = 'http://www.kyobobook.co.kr/search/SearchUsedBookMain.jsp?vPstrCategory=USE&vPstrKeyWord=' + str(isbn) + '&vPplace=top'
		self.driver.get(search_url)
		html = self.driver.page_source

		soup = bs(html, 'html.parser')
		details = soup.select('#container > div.list_search_result > form > table > tbody > tr')

		for detail in details:
			datum = {}
			datum['site'] = 'kyobo'
			datum['title'] = detail.select('div.title > a > strong')[0].text.strip()
			datum['author'] = detail.select('div.author')[0].text.strip().split('\n')[0]
			datum['price'] = detail.select('td.price > div.sell_price > strong')[0].text.strip()
			datum['link'] = detail.select('div.title > a')[0]['href'].strip()
			data.append(datum)

		# aladin case
		try:
			search_url = 'https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Used&KeyWord=' + str(isbn) + '&KeyRecentPublish=0&OutStock=0&ViewType=Detail&CustReviewCount=0&CustReviewRank=0&KeyFullWord=' + str(isbn) + '&KeyLastWord=' + str(isbn) + '&CategorySearch=&chkKeyTitle=&chkKeyAuthor=&chkKeyPublisher='
			self.driver.get(search_url)
			self.driver.find_element_by_xpath('//*[@id="Search3_Result"]/div/table/tbody/tr/td[3]/table/tbody/tr[1]/td[2]/div/div[1]/a').click()
			html = self.driver.page_source

			soup = bs(html, 'html.parser')
			author = soup.select('body > table > tbody > tr:nth-of-type(1) > td > table > tbody > tr:nth-of-type(2) > td > a:nth-of-type(1)')[0].text.strip()
			details = soup.select('#Myform > div > table > tbody > tr > td:nth-of-type(2) > div:nth-of-type(1)')

			for detail in details:
				datum = {}
				datum['site'] = 'aladin'
				datum['title'] = detail.select('ul > li:nth-of-type(1) > a.bo > b')[0].text.strip()
				datum['author'] = author
				datum['price'] = detail.select('ul > li:nth-of-type(2) > span > b')[0].text.strip()
				datum['link'] = detail.select('ul > li:nth-of-type(1) > a.bo')[0]['href'].strip()
				data.append(datum)
		except:
			None
			
		return data
