import Crawler
import time

def print_datum(datum):
	print('  site : ', datum['site'])
	print(' title : ', datum['title'])
	print('author : ', datum['author'])
	print(' price : ', datum['price'])
	print('  link : ', datum['link'])
	print('')

if __name__=='__main__':
	crawler = Crawler.Crawler()

	crawler.open_driver()
	
	while True:
		title = str(input("Enter the book's title : ")).strip()
		
		if title == 'exit':
			break
		
		start_time = time.time()
		data = crawler.get_candidate_list(title)
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
					usedbook_data = crawler.get_usedbook_data(data[int(index)]['isbn'])
					if len(usedbook_data) == 0:
						print('could not find data.')
					else:
						for usedbook_datum in usedbook_data:
							print_datum(usedbook_datum)
					end_time = time.time()
					print('usedbook search time : ', (end_time - start_time))

	crawler.close_driver()