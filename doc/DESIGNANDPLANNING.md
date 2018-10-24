### Boogle
Design and Planning Document </br>
10/16/18 </br>
Version 1.0 </br>

## System Architecture

### Model Design

![system_architecture](/doc/img/01_sysarc.jpg)
 
The above diagram illustrates the entity relationship of our model design. Each rectangle corresponds to a model and the lines and ovals between the models represent their relationship. The numbers along the lines indicate the cardinality constraints of each relation. The cardinality constraints are rather straightforward with the exception of that between an article and its author. We have indicated that an Article entity may be mapped to no User entity(0..*) in the case that the article is not one created by a Boogle user, but one that was crawled from different used book trade websites.
For all entities except the Book entity, id is the primary key. The primary key of Book is isbn, since the ISBN already distinguishes different books. The Book and User entities are connected via a join table. This join table will be used to maintain the list of books that a user is interested in, as well as the list of users that will need to be notified when a new entry of a specified book is uploaded. Since this will be a many-to-many relationship between the two models, we have decided to implement it with a join table.
 
### Entity Relation Schema
 
This is a diagram that shows through which property each pair of entities is related. This is the schema that the front-end and the back-end will use to communicate. From the back-end perspective, the starting point of the arrows are foreign keys within an entity. The foreign key points to an object of the model at the end of the arrow.</br>
The distinction between Book and Article may need some clarification. An article is a sale entry of a specific book. There can be multiple articles about a book, but one article may only reference a single book. A Book object, on the other hand, corresponds to a book prototype, and not to a specific sale entry. It will help in identifying exactly which book an article is about and in retrieving book information mainly based on the ISBN system.
 
### Views

 
### View Description

##### 1.	Main page (`/`)
-	If the user clicks `Sign In` button, the sign-in page pops up.</br>
-	If the user clicks `Sign Out` button, the user is signed out.</br>
-	If an unauthenticated user clicks `판매` button, sign-in page pops up.</br>
-	If the authenticated user clicks `판매` button, navigate to the sale page.</br>
-	If the user clicks `구매` button, navigate to the search page.</br>

##### 2.	Sign-up page (`/sign_up`)
-	Sign up a new user</br>
-	Get `email`, `password`, `password confirmation`, `phone number`(optional) as user inputs</br>
-	If the user `확인` button, this page is closed and navigate to sign-in page.</br>
-	If the user `취소` button, this page is closed and navigate to sign-in page.</br>

##### 3.	Sign-in page (`/sign_in`)
-	Sign in
-	Get `email`, `password` as user inputs for authentication.</br>
-	If the user clicks `회원가입` button, pop up the sign-up page.</br>
-	If the user clicks `확인` button, navigate to previous page.</br>
-	If the user clicks `취소` button, navigate to previous page.</br>

##### 4.	Search page (`/search`)
-	Search used books, navigate to target page through direct link.</br>
-	Get `book title` as user input to search used book.</br>
-	If the user `최저가 검색` button, navigate to certain page that the cheapest used book is registered.</br>
-	If the user `검색` button, list up the books which contain search word in `검색 후보` area.</br>
-	If the user clicks a cover in `검색 후보` area, list up the target used books in `검색 결과` area.</br>
-	If the user clicks `바로가기` button, navigate to target page through direct link.</br>
-	If the user clicks `관심 등록` button, register the book at interested book list.</br>
-	If the user clicks own email, navigate to user-info page.</br>
-	If the user clicks `Sign In` button, pop up the sign-in page.</br>
-	If the user clicks `Sign Out` button, sign out.</br>
-	If the unauthenticated user clicks `판매로 이동` button, pop up the sign-in page.</br>
-	If the authenticated user clicks `판매로 이동` button, navigate to sale page.</br>

##### 5.	Sale page (`/sale`)
-	Create a sale article.</br>
-	Get `book title`, `book info` such as author, publish year and so on, `article title`, `price`, `content` as inputs.</br>
-	If the user clicks `ISBN 검색` button, pop up the ISBN-search page.</br>
-	If the user clicks `등록` button, check if inputs are valid, create the sale article and navigate to book-detail page.</br>
-	If the user clicks `취소` button, navigate to main page.</br>
-	If the user clicks own email, navigate to user-info page.</br>
-	If the user clicks `Sign Out` button, sign out and navigate to main page.</br>
-	If the user clicks `구매로 이동` button, navigate to search page.</br>

##### 6.	Article-Detail page (`/sale/:id`)
-	Show the content, comments of selected article and create a comment in article.</br>
-	If the user is author of this article, `삭제` and `수정` button of article are visible and available.</br>
-	If the author of article clicks `삭제` button, remove this article.</br>
-	If the author of article clicks `수정` button, navigate to sale page filled with content.</br>
-	If the user clicks `뒤로 가기` button, navigate to previous page.</br>
-	Get `nick name`, `comment` as user inputs for comment.</br>
-	If the user clicks `올리기` button, check if the inputs are valid and create a new comment.</br>
-	If the user is author of comment, `삭제` and `수정` button of comment are visible and available.</br>
-	If the author of comment clicks `삭제` button, remove this comment.</br>
-	If the author of comment clicks `수정` button, pop up the prompt window for editing comment.</br>
-	If the user clicks own email, navigate to user-info page.</br>
-	If the user clicks `Sign Out` button, sign out.</br>
-	If the user clicks `Sign In` button, pop up the sign-in page.</br>

##### 7.	User-Info page (`/user`)
-	Show user’s information, sale articles which the user create, interested books.</br>
-	If the user clicks `변경` button of `email` or `password` or `phone number`, pop up the prompt window for editing the info.</br>
-	If the user clicks title of certain article, navigate to article-detail page of the article.</br>
-	If the user clicks title of certain book in interested books, navigate to search page searched about the selected book.</br>
-	If the user clicks bell icon, the alarm is set or canceled.</br>
-	If the user clicks `뒤로 가기` button, navigate to previous page.</br>
-	If the user clicks `확인` button, update the edited information.</br>
-	Although the user clicks own email, there is no change.</br>
-	If the user clicks `Sign Out` button, sign out and navigate to main page.</br>

##### 8.	ISBN-search page (`/isbn_search`)
-	Search information of book using ISBN.</br>
-	Get `ISBN` as user input</br>
-	If the user clicks camera icon, pop up the upload page and the user can upload image file that contains the barcode of book.</br>
-	If we get the ISBN, `검색 결과` area is filled with information of the book.</br>
-	If the user clicks `취소` button, close this page and navigate to sale page.</br>
-	If the user clicks `확인` button, close this page, navigate to sale page, and fill the form with information of the book.</br>

 
### Controller 
 
This diagram is formatted in accordance with the MVC model. Views are arranged on the left side and correspond to the basic components of frontend. On the right are the models that each view will be accessing. Controllers are represented as arrows. The text above the arrows denote the routes of the connected views and the texts below indicate the data that will be communicated between the view and the model.
 
### Design Details

### Frontend Design
### Frontend Diagram
 

### Frontend Description
#### Components
##### - Common members and methods
onClickMyInfo(): Redirect to the Myinfo page.</br>
onClickSignOut(): Request backend to set the current user as signed out status and redirect to the Main page.</br>
onClickGoMain():Redirect to the Myinfo page.</br>

##### 1.main
onClickSignIn(): Redirect to the Signin page.</br>
onClickBuy(): Redirect to the Search page</br>
onClickSell():: Redirect to the Sale page</br>
##### 2. signup
onClickCancel(): Redirect to the recently visited page</br>
onClickConfirm(): Send information written by a user to backend and request to form the new instance and append it to the User entity. Redirect to the recently visited page with authenticated state.</br>
inputValid(): Check information written by a user is valid or not by some basic rules such as the equivalence between password and password confirmation.</br>
##### 3. signin
onClickSignin(): Send information written by a user to backend and request to check whether corresponding User element exists or not. If it exists, redirect to the page before visiting Signin page. If not, popup the message noticing that there is no matched User element.</br>
onClickSignup(): Redirect to the Signup page.</br>
inputValid(): Check information written by a user is valid or not by some basic rules such as the email format.</br>

##### 4. search
onClickGoSale(): Redirect to the Sale page.</br>
onClickGoMyInfo(): Redirect to the user-info page.</br>
onClickSearch(): Request backend to start Searching process.</br>
onClickGoDirect():Request backend to start Direct Searching process.</br>
onClickInterested(): Request backend to update the User interested book information.</br>
getAritcleList(string: query): Request backend to send the article list matched with a string argument</br>
getCandidateList(string: query):Request backend to send the candidate list matched with a string argument</br>

##### 5. sale
onClickGoBuy(): Redirect to the Sale page.</br>
onClickGetISBN(): Pop up the prompt to get ISBN</br>
onClickBack(): Redirect to the recently visited page.</br>
onClickConfirm(): Request backend to post new article and send information written by a user</br>
inputValid():Check information written by a user is valid or not by some basic rules.</br>
getBookInfo(isbn: number): Request backend to send book information matched with the  isbn argument.</br>

##### 6. book-detail
onClickDelete(): Request backend to delete the article and redirect to the recently visited page.</br>
onClickEdit(): Request backend to update the article information and refresh the page.</br>
onCilckBack(): Redirect to the recently visited page.</br>
getCommentList(): Request to send comments written in the article</br>

##### 7. user-info
onClickBack(): Redirect to the recently visited page.</br>
onClickEditPassword(): Pop up the prompt to get a new password input by user</br>
onClickEditPhone():Pop up the prompt to get a new phone number input by user</br>
onClickConfirm(): Request backend to update the user information and redirect to the recently visited page.</br>
getArticleList(): Request backend to send the article list written by the current user.</br>
getBookList():Request backend to send the interested book list by the current user.</br>

#### Subcomponents
##### 1. comment-list
getComments():Request backend to send the comment list written by the current user.</br>
onClickDelete():Request backend to delete the comment from the matched comment list written by the current user.</br>
onClickEdit():Request backend to update the comment from the matched comment list written by the current user.</br>
onClickCreate():Request backend to add the new comment from the matched comment list written by the current user.</br>

##### 2. article-list
getAritclesByUserId(userId: number): Request backend to send the article list matched with the userId argument.</br>
getArticlesByISBN(isbn: number): Request backend to send the article list matched with the isbn argument.</br>

##### 3. candidate-list
getBooksByISBN(isbn: number): Request backend to send the book list matched with the isbn argument.</br>
getBooksByTitle(title: string): Request backend to send the book list matched with the title argument.</br>

### Services
##### 1.book-service
getBooksByISBN(isbn:number): Request the backend Book entity and return the instance that has matched isbn.</br>
getBooksByTitle(title: string): Request the backend Book entity and return the instance that has matched title.</br>
getCandidateList(title: string): Request backend to send the candidate list matched with a title argument.</br>
setInterestedBook(userId: number, isbn: number): Request backend to add the interested book list in matched user instance.</br>


##### 2. user-service
signIn(userId: number): Request backend to set the current user signed in.</br>
signOut(): Request backend to set the current user signed out.</br>
getCurrentUser(): Request backend to get the current user information.</br>
setCurrentUser(userId: number): Request backend to set the user as currently signed in</br>
addUser(User: user): Request backend to add the user in database.</br>
updateUserInfo(userId: number):Request backend to update the user information in database.</br>

##### 3. article-service
getArticlesByISBN(isbn: number): Request the backend to get Article entity and return the article list that has matched isbn.</br>
getArticlesByAuthor(authorId: number): Request the backend to get Article entity and return the article list that has matched authorId.</br>
deleteArticle(articleId: number): Request the backend to delete matched Article entity.</br>
addArticle(Article: article):Request the backend to add matched Article entity.</br>
updateArticle(articleId: number):Request the backend to update matched Article entity.</br>

##### 4. comment-service
getCommentsByArticleId(articleId: number): Request the backend to get commentList entity and return the article list that has matched articleId.</br>
addComment():Request the backend to add matched Comment entity.</br>
deleteComment():Request the backend to delete matched Comment entity.</br>
updateComment():Request the backend to update matched Comment entity.</br>

### Frontend Relations Diagram

 
 
### Relations between components and services
1) User service</br>
 
 
2) Book service</br>
 
 
3) Article service</br>
 

 
### Back-end API
The application will access the database by making http requests to the appropriate url in the following table.</br>
 

 
### Implementation Plan

We plan to divide the tasks by feature, and break down each task into smaller subtasks. The key function that we need to implement before we can move on to other features is the search feature. We plan to order the implementation of the tasks based on the working dependency chart presented above in the document. We have assigned one or two major features to each sprint. In each sprint from sprint 3 through sprint 5, we plan to implement specific features, and while doing so we will be performing unit tests and functional tests for each functionality that we implement in that sprint. The specific implementation plans for each sprint are as follow.</br>

##### Sprint 3
The highest priority in the working dependency chart goes to the search feature. This feature is needed in order to implement most of the other features. The sub-tasks for this feature include crawling ISBN-based book information from Google books, and crawling sale entries from other used book websites. This feature is crucial in implementing the sell feature, the notification feature and the account information feature. Therefore, this task will be the first one we plan to complete in sprint 3. We also intend to finish implementing the create account / sign-in features in sprint 3, since it is a relatively simple task and is also a prerequisite for the rest of the tasks. Since the crawling will happen each time a user makes a search, an inefficient crawling algorithm will slow down the search process. Therefore, the biggest challenge for this sprint will be to find an efficient algorithm for the crawling logic.

##### Sprint 4
In sprint 4 our plan is to implement the sales feature. The prerequisites for this task are tasks related to book information crawling and the sign-up / sign-in functionalities, which should have been finished in sprint 3. We will create the article creating interface and implement methods to integrate these articles to those crawled from other websites. In this sprint, we will also complete the update account information feature, which will finally facilitate the implementation of the notification feature in the next sprint. Since our current plan is not to maintain a database of all the sale entries out there, but rather to crawl the search results when there is a request, we will need to integrate search results from our own database of articles with the results crawled from other websites. This is expected to have a non-trivial effect on the search time, so finding an efficient way to implement this will be the main challenge.

##### Sprint 5
In sprint 5, we will work on the notification feature. We will need to implement functions to send e-mail/SMS to our users. Another important task is finding an efficient way to constantly monitor different used book websites to check for new entries of the books in the notification list. This task is expected to be more challenging than others since constant web crawling may take up a lot of the server’s resources and hinder the use of other features in the application.

##### Sprint 6
In sprint 6, assuming that we have completed all the tasks in the previous sprints as planned, we plan to perform integration tests on the entire application. If we still have some loose ends in some of the features that should have been completed, we will also invest time in sprint 6 to make sure that those features work as we intended.</br>

Below is the tentative task assignment. These are all based on estimates and will need to be modified as we implement each feature.</br>
 


### Testing Plan

We plan to perform unit tests on all of our modules and functional tests for all API’s. Each module and API will be tested within the same sprint as its implementation. The framework that we will be using to test Angular code is Jasmine, and the framework to test Django code will be python’s unittest framework. For integration testing, we will use Travis CI.</br>
We plan to take advantage of stubs and mocks to test our code. In particular, we will establish a user database stub to test features that make use of user information, such as creating a new account, signing in, updating user information, posting sale entries, and making notification requests. We will be creating mocks to test our notification feature, since this feature has the side effect of sending e-mails and SMS notifications to users.
Crawling book data is one of the key functionalities that our application will be employing. However, we expect that crawling will take up a significant amount of server resources. We have not yet decided on which tools to use, but we plan to perform load/stress tests on the crawling feature to find an optimal way to crawl data.
