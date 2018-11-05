## parser.py
import requests
from bs4 import BeautifulSoup as bs

LOGIN_INFO = {
	'userid':'id',
	'password':'pw'
}

with requests.Session() as s:
	first_page = s.get('https://sso.snu.ac.kr/3rdParty/loginFormPage.jsp?NONCE=wojufLMPw6nX5zlOh33QJZSy0IJI%2BOpitL45Mr69IawlObs95fB88neD7A5PPzV6qLW9ksOjeMh7uS4vVaYyww%3D%3D&UURL=https%3A%2F%2Fsso.snu.ac.kr%2Fnls3%2Ffcs')
	html = first_page.text
	soup = bs(html, 'html.parser')

	login_req = s.post('https://sso.snu.ac.kr/3rdParty/loginFormPage.jsp?NONCE=wojufLMPw6nX5zlOh33QJZSy0IJI%2BOpitL45Mr69IawlObs95fB88neD7A5PPzV6qLW9ksOjeMh7uS4vVaYyww%3D%3D&UURL=https%3A%2F%2Fsso.snu.ac.kr%2Fnls3%2Ffcs', data=LOGIN_INFO)
	print(login_req.status_code)

	if login_req.status_code != 200:
		raise Exception('I can\'t log in')

	for index in range(1, 1000):
		print('what')
		url = 'http://physed.snu.ac.kr/ko/board/notice/page/' + str(index) + '?pmove=' + str(index)
		notice_page = s.get(url)
		print(str(index) + '  ' + str(notice_page.status_code))
		if notice_page.status_code != 200:
			break

		soup = bs(notice_page.text, 'html.parser')
		notices = soup.select('#main-content > div.contentsArea > div > div > table > tbody > tr > td.alignLeft > a')
		for notice in notices:
			if notice.get('strong') is None:
				print(notice.text.strip())