import Crawler
import time

def printDatum(datum):
	print('  site : ', datum['site'])
	print(' title : ', datum['title'])
	print('author : ', datum['author'])
	print(' price : ', datum['price'])
	print('  link : ', datum['link'])
	print('')

if __name__=='__main__':
	crawler = Crawler.Crawler()

	crawler.openDriver()
	
	while True:
		title = str(input("Enter the book's title : ")).strip()
		
		if title == 'exit':
			break
		
		start_time = time.time()
		data = crawler.getCandidateList(title)
		for datum in data:
			print('image src : ', datum['image'])
			print('     isbn : ', datum['isbn'])
		end_time = time.time()
		print('candidate search time : ', (end_time - start_time))

		if len(data) == 0:
			print('we can\'t find some books')
		else:
			while True:
				index = input('Enter the index(0~' + str(len(data)-1) + ') : ')
				if index == '-1':
					break
				if not str.isnumeric(index):
					print('please, enter the integer')
				else:
					start_time = time.time()
					usedbook_data = crawler.getUsedbookData(data[int(index)]['isbn'])
					if len(usedbook_data) == 0:
						print('could not find data.')
					else:
						for usedbook_datum in usedbook_data:
							printDatum(usedbook_datum)
					end_time = time.time()
					print('usedbook search time : ', (end_time - start_time))

	crawler.closeDriver()